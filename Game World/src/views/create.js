// Create new game template.
import { html } from '../../node_modules/lit-html/lit-html.js';
import { createObject } from '../api/data.js';
import { notify } from './notify.js';


const createTemplate = (listener) => html`
<!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="auth">
    <form id="create" @submit=${listener}>
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>
`;

// Handle new game.
export async function showCreate(ctx) {
    ctx.render(createTemplate(onSubmit));
    ctx.updateNav()

    async function onSubmit(event) {
        event.preventDefault();
        let form = event.target;
        const formData = new FormData(form);
        let title = formData.get('title').trim();
        let category = formData.get('category').trim();
        let maxLevel = formData.get('maxLevel').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let summary = formData.get('summary');

        if (category.length < 1 || title.length < 1 || imageUrl.length < 1 || maxLevel.length < 1 || summary.length < 1) {
            //Notify failure to send.
            notify('Fields cannot be empty!')
            return
        }
        //Send new Game to server if conditions above are met.
        await createObject({ title, category, maxLevel, imageUrl, summary });
        form.reset()
        window.location = '/allObjects';
    }
}
