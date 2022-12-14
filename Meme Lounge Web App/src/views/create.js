import { html } from '../../node_modules/lit-html/lit-html.js';
import { createMeme } from '../api/data.js';
import { notify } from './notify.js';


const createTemplate = (listener) => html`
        <section id="create-meme">
            <form id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input @click = ${listener} type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>`;


export async function showCreate(ctx) {
    ctx.render(createTemplate(onSubmit));
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
        await createMeme({title, description, imageUrl});
        form.reset()
        window.location = '/allMemes';
        
    }
}