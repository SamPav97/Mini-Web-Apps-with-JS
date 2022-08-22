import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllObjects } from '../api/data.js';

//u add the object id to the href for details so u can get the speciffic object later
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


{/* <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
				<!-- Display : All memes in database ( If any ) -->
                ${mappedMemes.length < 1 ? html`<p class="no-memes">No memes in database.</p>` : mappedMemes}
			</div>
        </section> */}

    //     <div class="meme">
    //     <div class="card">
    //         <div class="info">
    //             <p class="meme-title">${object.title}</p>
    //             <img class="meme-image" alt="meme-img" src="${object.imageUrl}">
    //         </div>
    //         <div id="data-buttons">
    //             <a class="button" href="/details/${object._id}">Details</a>
    //         </div>
    //     </div>
    // </div>