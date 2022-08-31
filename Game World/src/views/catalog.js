import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllObjects } from '../api/data.js';

// You add the object id to the href for details so u can get the speciffic object later.
const objectsHtml = (object) => html`
            <div class="allGames">
                <div class="allGames-info">
                    <img src="${object.imageUrl}">
                    <h6>${object.category}</h6>
                    <h2>${object.title}</h2>
                    <a href="/details/${object._id}" class="details-button">Details</a>
                </div>
            </div>`

let allObjects = await getAllObjects();

let mappedObjects = allObjects.map(objectsHtml);


const catalogTemplate = (objects) => html`
                
        <!-- Catalogue -->
        <section id="catalog-page">
            <h1>All Games</h1>
            <!-- Display div: with information about every game (if any) -->
            ${objects.length < 1 ? html`<h3 class="no-articles">No articles yet</h3>` : objects}
            <!-- Display paragraph: If there is no games  -->
        </section>`;


export async function showAllObjects(ctx) {
    ctx.render(catalogTemplate(mappedObjects));
    ctx.updateNav()
}