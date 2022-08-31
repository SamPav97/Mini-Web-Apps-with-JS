import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, dislikeGame, getById, getCommentsByObjectId, getLikesByObjectId, hasLiked, likeObject } from '../api/data.js';
import { commentForm, comments } from './comments.js';

const detailsTemp = (obj, onD, commentForm, comments, onLike, onDislike) => html`
        <!--Details Page-->
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${obj.imageUrl}" />
                    <h1>${obj.title}</h1>
                    <span class="levels">MaxLevel: ${obj.maxLevel}</span>
                    <span class="levels">Likes: ${obj.likes}</span>
                    ${obj.canLike ? html`
                    <div class="buttons">
                    <a @click=${onLike} href="javascript:void(0)" class="button">Like</a>
                    </div>`
                    : nothing}
                    ${obj.canDislike ? html`
                    <div class="buttons">
                    <a @click=${onDislike} href="javascript:void(0)" class="button">Dislike</a>
                    </div>`
                    : nothing}
                    <p class="type">${obj.category}</p>
                </div>

                <p class="text">
                    ${obj.summary}
                </p>

                ${comments}

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                <div class="buttons">
                    <a href="/edit/${obj._id}" class="button" style="display: ${localStorage.user? (obj._ownerId == JSON.parse(localStorage.user)._id ? 'inline' : 'none'):'none'}">Edit</a>
                    <a @click=${onD} href="javascript:void(0)" class="button" style="display: ${localStorage.user? (obj._ownerId == JSON.parse(localStorage.user)._id ? 'inline' : 'none'):'none'}">Delete</a>
                </div>
            </div>

            ${localStorage.user? (obj._ownerId != JSON.parse(localStorage.user)._id ? commentForm : 'none'):'none'}

        </section>
`;

export async function showDetails(ctx){
    const gameId = ctx.params.detailsId;
    const [getObject, commentSection] = await Promise.all([getById(gameId), getCommentsByObjectId(gameId)]);
    const [likes, liked] = await Promise.all([
        getLikesByObjectId(gameId),
        hasLiked(gameId, JSON.parse(localStorage.user))
    ]);
    getObject.likes = likes;

    // I demonstrate two different methods for checking log status and owenrship. One below and one in the html temp above.
    if (localStorage.user) {
        getObject.hasUser = true;
        getObject.isOwner = JSON.parse(localStorage.user)._id == getObject._ownerId;
        getObject.canLike = !getObject.isOwner && !liked;
        getObject.canDislike = !gameId.isOwner && liked;
    }

    ctx.render(detailsTemp(getObject, onDel, commentForm(ctx), comments(commentSection), onLike, onDislike))
    ctx.updateNav()
    

    function onDel() {
        const choice = confirm('Are you sure you want to delete this game?');
        if (choice) {
        deleteById(ctx.params.detailsId);
        window.location = '/allObjects';
        } 
    }

    async function onLike() {
        await likeObject(gameId);
        ctx.page.redirect('/details/' + gameId);
    }

    async function onDislike() {
        dislikeGame(liked)
        ctx.page.redirect('/details/' + gameId);
    }

}