import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMemes } from '../api/data.js';

const memesHtml = (object) => html` 
                <div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${object.title}</p>
                            <img class="meme-image" alt="meme-img" src="${object.imageUrl}">
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/details/${object._id}">Details</a>
                        </div>
                    </div>
                </div>`

let allMemes = await getAllMemes();

let mappedMemes = allMemes.map(memesHtml);


const catalogTemplate = () => html`
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
				<!-- Display : All memes in database ( If any ) -->
                ${mappedMemes.length < 1 ? html`<p class="no-memes">No memes in database.</p>` : mappedMemes}
			</div>
        </section>`;


export async function showAllMemes(ctx) {
    ctx.render(catalogTemplate());
    ctx.updateNav()
}
