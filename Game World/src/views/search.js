import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchGames } from '../api/data.js';
import { createSubmitHandler } from '../api/util.js';

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


const searchTemplate = (objects, param, onSubmit) => html`
                
        <!-- Catalogue -->
        <section id="catalog-page">
            <h1>Search</h1>
            <form @submit=${onSubmit}>
                <input type="text" name="search" .value=${param} >
                <input type="submit" value="Search" class="levels">
            </form>

            <!-- Display div: with information about every game (if any) -->
            ${objects.length < 1 ? html`<h3 class="no-articles">No articles yet</h3>` : objects.map(objectsHtml)}
            <!-- Display paragraph: If there is no games  -->
        </section>`;


export async function showSearch(ctx) {
    //URLSearchParams returns an object that I need to unpack to get to the page number.
    const query = Object.fromEntries([...(new URLSearchParams(ctx.querystring)).entries()]);
    //Param is whatever is in the url
    const param = query.search || '';

    const games = await searchGames(param);

    ctx.render(searchTemplate(games, param, createSubmitHandler(ctx, onSubmit)));
    ctx.updateNav()
}

function onSubmit(ctx, data, event) {
    //Encode in case search has special symbols
    ctx.page.redirect(`/search?search=` + encodeURIComponent(data.search));
}