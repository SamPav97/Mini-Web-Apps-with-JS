import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateById } from '../api/data.js';
//import { notify } from './notify.js';


const editTemplate = (obj, listener) => html`
 <!-- Edit Page ( Only for the creator )-->
        <section id="edit-page" class="auth">
            <form id="edit" @submit=${listener}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" .value=${obj.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" .value=${obj.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${obj.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" .value=${obj.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary" .value=${obj.summary}></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
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
        let title = formData.get('title').trim();
        let category = formData.get('category').trim();
        let maxLevel = formData.get('maxLevel').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let summary = formData.get('summary');

        if (category.length < 1 || title.length < 1 || imageUrl.length < 1 || maxLevel.length < 1 || summary.length < 1) {
            notify('Fields cannot be empty!')
            return
        }
        await updateById(ctx.params.detailsId, {title, category, maxLevel, imageUrl, summary});
        form.reset()
        window.location = `/details/${ctx.params.detailsId}`;
        
    }
}



// <section id="edit-meme">
// <form id="edit-form">
//     <h1>Edit Meme</h1>
//     <div class="container">
//         <label for="title">Title</label>
//         <input id="title" type="text" placeholder="Enter Title" name="title" .value=${mem.title}>
//         <label for="description">Description</label>
//         <textarea id="description" placeholder="Enter Description" name="description" .value=${mem.description}>
//             </textarea>
//         <label for="imageUrl">Image Url</label>
//         <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${mem.imageUrl}>
//         <input @click=${listener} type="submit" class="registerbtn button" value="Edit Meme">
//     </div>
// </form>
// </section>