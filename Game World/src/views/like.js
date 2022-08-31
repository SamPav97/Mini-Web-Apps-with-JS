import { getLikesByObjectId, getMyLikesByObjectId, likeObject } from "../api/data.js";
import { html } from '../../node_modules/lit-html/lit-html.js';

export async function returnLikeTemplate(ctx, obj) {
    function likesControlTemp(showLikeButton, onLike, likes) {
        if(showLikeButton) {
            return html`
            <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>
            <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>`
        } else {
            return html`
            <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${likes}</span>
        </div>`
        }
    }

    //Below the getMyLikesByObjectId checks if I have liked the given object, returns 0 and 1
    let [likes, hasLike] = await Promise.all([
        getLikesByObjectId(`?where=bookId%3D%22${obj._id}%22&distinct=_ownerId&count`),
        localStorage.user ? await getMyLikesByObjectId(`?where=bookId%3D%22${obj._id}%22%20and%20_ownerId%3D%22${JSON.parse(localStorage.user)._id}%22&count`) : 0
    ]);
    let isOwner = localStorage.user && JSON.parse(localStorage.user)._id ==  obj._ownerId;

    //If I liked it showLikeButton will be false and I will not have a like button.
    let showLikeButton = !isOwner && hasLike == false && localStorage.user != null;


    return likesControlTemp(showLikeButton, onLike, likes)
    
    //This is the event listener function.
    async function onLike() {
        let bookId = ctx.params.detailsId
        await likeObject({bookId});
        ctx.page.redirect('/details/' + ctx.params.detailsId);
    }
}
