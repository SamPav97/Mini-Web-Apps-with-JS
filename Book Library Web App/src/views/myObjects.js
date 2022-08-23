import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserObjects } from '../api/data.js';

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