import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllObjects } from '../api/data.js';

const objectsHtml = (object) => html` 
                               <li class="otherBooks">
                    <h3>${object.title}</h3>
                    <p>${object.type}</p>
                    <p class="img"><img src="${object.imageUrl}"></p>
                    <a class="button" href="/details/${object._id}">Details</a>
                </li>`

let allObjects = await getAllObjects();

let mappedObjects = allObjects.map(objectsHtml);


const catalogTemplate = (objects) => html`
                <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <ul class="other-books-list">
            ${objects.length < 1 ? html`<p class="no-memes">No books in database!</p>` : objects}
            </ul>
        </section>`;


export async function showAllObjects(ctx) {
    ctx.render(catalogTemplate(mappedObjects));
    ctx.updateNav()
}
