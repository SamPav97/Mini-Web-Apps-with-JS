import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';


const detailsTemp = (obj, onD) => html`
       <section id="meme-details">
            <h1> Meme Title: ${obj.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${obj.imageUrl}">
                </div>
                <div id=${obj._id} class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${obj.description}
                    </p>

                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    <a class="button warning" href="/edit/${obj._id}" style="display: ${localStorage.user? (obj._ownerId == JSON.parse(localStorage.user)._id ? 'inline' : 'none'):'none'}">Edit</a>
                    <button @click=${onD} class="button danger" style="display: ${localStorage.user? (obj._ownerId == JSON.parse(localStorage.user)._id ? 'inline' : 'none'):'none'}">Delete</button>
                    
                </div>
            </div>`

export async function showDetails(ctx){
    const getMeme = await getById(ctx.params.detailsId)
    ctx.render(detailsTemp(getMeme, onDel))
    ctx.updateNav()
    
    function onDel() {
        const choice = confirm('Are you sure you want to delete this meme?');
        if (choice) {
        deleteById(ctx.params.detailsId);
        window.location = '/allMemes';
        }
}

}