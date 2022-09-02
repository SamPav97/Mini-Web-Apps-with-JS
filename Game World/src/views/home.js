// Home view template.
import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllObjects } from '../api/data.js';

// Display 3 most recent games.
const objectsHtml = (object) => html`
    <div class="game">
        <div class="image-wrap">
            <img src=".${object.imageUrl}">
        </div>
        <h3>${object.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${object._id}" class="btn details-btn">Details</a>
        </div>
    </div>`

let allObjects = await getAllObjects();

let mappedObjects = allObjects.slice(0, 3).map(objectsHtml);


const homeTemp = (objects) => html`
<!--Home Page-->
<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>

        <!-- Display div: with information about every game (if any) -->
        ${objects.length < 1 ? html`<p class="no-articles">No games yet</p>` : objects}
    </div>
</section>
`

export function showHome(ctx) {
    ctx.render(homeTemp(mappedObjects))
    ctx.updateNav()
}