import { html } from '../../node_modules/lit-html/lit-html.js';
import { createObject } from '../api/data.js';

const createTemplate = (listener) => html`
 <section id="create-page" class="create">
            <form @submit=${listener} id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>`;


export async function showCreate(ctx) {
    ctx.render(createTemplate(onSubmit));
    ctx.updateNav()

    async function onSubmit(event) {
        event.preventDefault();
        let form = event.target;
        const formData = new FormData(form);
        let description = formData.get('description').trim();
        let title = formData.get('title').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let type = formData.get('type');

        if (description.length < 1 || title.length < 1 || imageUrl.length < 1) {
            window.alert('Fields cannot be empty!')
            return
        }
        await createObject({title, description, imageUrl, type});
        form.reset()
        window.location = '/allObjects';
    }
}
