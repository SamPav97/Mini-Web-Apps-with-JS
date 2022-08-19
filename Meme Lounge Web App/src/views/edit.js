import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateById } from '../api/data.js';
import { notify } from './notify.js';


const createTemplate = (mem, listener) => html`
               <section id="edit-meme">
            <form id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${mem.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" .value=${mem.description}>
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${mem.imageUrl}>
                    <input @click=${listener} type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`;


export async function showEdit(ctx) {
    let meme = await getById(ctx.params.detailsId)
    ctx.render(createTemplate(meme, onSubmit));
    ctx.updateNav()

    async function onSubmit(event) {
        event.preventDefault();
        let form = event.target.parentElement.parentElement;
        const formData = new FormData(form);
        let description = formData.get('description').trim();
        let title = formData.get('title').trim();//the path needs to be acommodate for. remember u set path in catalog too
        let imageUrl = formData.get('imageUrl').trim();

        if (description.length < 1 || title.length < 1 || imageUrl.length < 1) {
            notify('Fields cannot be empty!')
            
            return
        }
        await updateById(ctx.params.detailsId, {title, description, imageUrl});
        form.reset()
        window.location = '/allMemes';
        
    }
}
