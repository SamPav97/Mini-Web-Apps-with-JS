import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { returnLikeTemplate } from './like.js';


const detailsTemp = (obj, onD, likeTemp) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${obj.title}</h3>
                <p class="type">Type: ${obj.type}</p>
                <p class="img"><img src="${obj.imageUrl}"></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    <a class="button" href="/edit/${obj._id}" style="display: ${localStorage.user? (obj._ownerId == JSON.parse(localStorage.user)._id ? 'inline' : 'none'):'none'}">Edit</a>
                    <a @click=${onD} class="button" href="javascript:void(0)" style="display: ${localStorage.user? (obj._ownerId == JSON.parse(localStorage.user)._id ? 'inline' : 'none'):'none'}">Delete</a>

                    <!-- Bonus -->
                    ${likeTemp}
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${obj.description}</p>
            </div>
        </section>
       `

export async function showDetails(ctx){// this is how u get the id from params.
    const getObject = await getById(ctx.params.detailsId);
    let likeTemp = await returnLikeTemplate(ctx, getObject) //get the completed template for likes
    ctx.render(detailsTemp(getObject, onDel, likeTemp))
    ctx.updateNav()
    

    function onDel() {
        const choice = confirm('Are you sure you want to delete this meme?');
        if (choice) {
        deleteById(ctx.params.detailsId);
        window.location = '/allObjects';
        } 
    }

}