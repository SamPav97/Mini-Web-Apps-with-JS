import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateById } from '../api/data.js';


const editTemplate = (obj, listener) => html`
      <section id="edit-page" class="edit">
            <form @submit=${listener} id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" .value=${obj.title}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description" .value=${obj.description}></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" .value="${obj.imageUrl}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" .value="${obj.type}">
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`;


export async function showEdit(ctx) {
    let detail = await getById(ctx.params.detailsId)
    ctx.render(editTemplate(detail, onSubmit));
    ctx.updateNav()

    async function onSubmit(event) {
        event.preventDefault();
        let form = event.target;
        const formData = new FormData(form);
        let description = formData.get('description').trim();
        let title = formData.get('title').trim();//the path needs to be acommodate for. remember u set path in catalog too
        let imageUrl = formData.get('imageUrl').trim();
        let type = formData.get('type');

        if (description.length < 1 || title.length < 1 || imageUrl.length < 1) {
            window.alert('Fields cannot be empty!')  
            return
        }
        await updateById(ctx.params.detailsId, {title, description, imageUrl, type});
        form.reset()
        window.location = `/details/${ctx.params.detailsId}`;
        
    }
}