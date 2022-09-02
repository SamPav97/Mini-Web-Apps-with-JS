//Display the catalog view with data received from API.
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAllObjects, getCount } from '../api/data.js';

// All objects received from the API are fitted into template below.
const objectsHtml = (object) => html`
            <div class="allGames">
                <div class="allGames-info">
                    <img src="${object.imageUrl}">
                    <h6>${object.category}</h6>
                    <h2>${object.title}</h2>
                    <!-- Navigate to speciffic object with url below -->
                    <a href="/details/${object._id}" class="details-button">Details</a>
                </div>
            </div>`

// Once fitted in template above, objects are added to the page.
const catalogTemplate = (objects, page, pages) => html`
        <!-- Catalogue -->
        <section id="catalog-page">
            <h1>All Games</h1>
            <div class="levels">
                <!-- Pagination -->
                Page: ${page} of ${pages}
                ${page > 1 ? html`<a href="/allObjects?page=${page - 1}">&lt; Prev</a>` : nothing}
                ${page < pages ? html`<a href="/allObjects?page=${page + 1}">&gt; Next</a>` : nothing}
            </div>
            <!-- Display div: with information about every game (if any) -->
            ${objects.length < 1 ? html`<h3 class="no-articles">No articles yet</h3>` : objects.map(objectsHtml)}
                <!-- Display paragraph: If there is no games  -->
        </section>`;


export async function showAllObjects(ctx) {
    // URLSearchParams returns an object that I need to unpack to get to the page number.
    const query = Object.fromEntries([...(new URLSearchParams(ctx.querystring)).entries()]);
    const page = Number(query.page || 1);

    // Get the number of pages you have so you can decide when to stop showing the 'next' button in pagination.
    let [allObjects, pages] = await Promise.all([
        getAllObjects(page),
        getCount()
    ]);
    ctx.render(catalogTemplate(allObjects, page, pages));
    ctx.updateNav()
}