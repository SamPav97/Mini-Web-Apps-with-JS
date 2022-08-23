import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserMemes } from '../api/data.js';

const myMemesTemp = (object) => html` 
    <div class="user-meme">
        <p class="user-meme-title">${object.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${object.imageUrl}">
        <a class="button" href="/details/${object._id}">Details</a>
    </div>`

const myTeamsTemp = (mappedMeme) => html`
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile"
                    src="${localStorage.user ? (JSON.parse(localStorage.user).gender == 'female' ? '/images/female.png' : '/images/male.png') : 'noPic'}">
                <div class="user-content">
                    <p>${JSON.parse(localStorage.user).username}</p>
                    <p>${JSON.parse(localStorage.user).email}</p>
                    <p>My memes count: ${mappedMeme.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${mappedMeme.length < 1 ? html`<p class="no-memes">No memes in database.</p>` : mappedMeme}
            </div>
        </section>`;


export async function showMyMemes(ctx) {
    let allMyMemes = []
    if (localStorage) {
        allMyMemes = await getUserMemes(`?where=_ownerId%3D%22${JSON.parse(localStorage.user)._id}%22&sortBy=_createdOn%20desc`)
    }
    let mappedMemes = allMyMemes.map(myMemesTemp);

    ctx.render(myTeamsTemp(mappedMemes));
    ctx.updateNav()
}