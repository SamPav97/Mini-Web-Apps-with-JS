import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMemes } from '../api/data.js';

//u add the object id to the href for details so u can get the speciffic object later
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
//let allIdTeams = allTeams.map(a => a._id)

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
    //updatenav
}


// {
//     "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
//     "name": "Storm Troopers",
//     "logoUrl": "/assets/atat.png",
//     "description": "These ARE the droids we're looking for",
//     "_createdOn": 1615737591748,
//     "_id": "34a1cab1-81f1-47e5-aec3-ab6c9810efe1"
// },