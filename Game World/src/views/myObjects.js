import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserObjects } from '../api/data.js';

//u add the object id to the href for details so u can get the speciffic object later
const myObjectTemp = (object) => html` 
                   <li class="otherBooks">
                    <h3>${object.title}</h3>
                    <p>Type: ${object.type}</p>
                    <p class="img"><img src="${object.imageUrl}"></p>
                    <a class="button" href="/details/${object._id}">Details</a>
                </li>`


const myObjectsTemp = (mappedObjects) => html`
               <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            <ul class="my-books-list">
            ${mappedObjects.length < 1 ? html`<p class="no-memes">No books in database!</p>` : mappedObjects}
            </ul>
        </section> `;


export async function showMyObjects(ctx) {
    let allMyObjects = []
    if (localStorage) {
        allMyObjects = await getUserObjects(`?where=_ownerId%3D%22${JSON.parse(localStorage.user)._id}%22&sortBy=_createdOn%20desc`)
    }
    let mappedObjects = allMyObjects.map(myObjectTemp);

    ctx.render(myObjectsTemp(mappedObjects));
    ctx.updateNav()
}


{/* <section id="user-profile-page" class="user-profile">
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
        </section> */}

    //     <div class="user-meme">
    //     <p class="user-meme-title">${object.title}</p>
    //     <img class="userProfileImage" alt="meme-img" src="${object.imageUrl}">
    //     <a class="button" href="/details/${object._id}">Details</a>
    // </div>