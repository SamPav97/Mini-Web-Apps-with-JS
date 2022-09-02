// Comments template and display logic below.
import { html } from '../../node_modules/lit-html/lit-html.js';
import { commentObject } from '../api/data.js';
import { notify } from './notify.js';

// Map all comments to template below.
export function comments(data) {
    let commentTemp = (comm) => html`
                        <li class="comment">
                            <p>Content: ${comm.comment}</p>
                        </li>
    `;

    let comms = data.map(commentTemp);

    // Display comments.
    let commentsHtml = (objects) => html`
                    <div class="details-comments">
                        <h2>Comments:</h2>
                        <ul>
                            ${objects.length < 1 ? html`<p class="no-comment">No comments.</p>` : objects}
                        </ul>
                        <!-- Display paragraph: If there are no games in the database -->
                    </div>
    `;

    return commentsHtml(comms)
};

// Receive and handle new comments.
export function commentForm(ctx) {
    let commentF = (onComm) => html`
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            <article class="create-comment">
                <label>Add new comment:</label>
                <form class="form" @submit=${onComm}>
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>`;

    async function onComment(event) {
        event.preventDefault();
        let gameId = ctx.params.detailsId;
        const form = event.target;
        const formData = new FormData(form);
        let comment = formData.get('comment').trim();
        if (comment.length < 1) {
            notify('Comment cannot be empty!')
        } else {
            commentObject({ gameId, comment });
        };
        form.reset();
        ctx.page.redirect(`/details/${gameId}`);
    }

    return commentF(onComment)
}