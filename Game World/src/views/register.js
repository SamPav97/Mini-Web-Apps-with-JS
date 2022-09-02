// Register template and functionalities.
import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/userActions.js';
import { notify } from './notify.js';

const registerTemp = (onSubmit) => html`
        <!-- Register Page ( Only for Guest users ) -->
        <section id="register-page" class="content auth">
            <form id="register" @submit=${onSubmit}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>
        
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">
        
                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">
        
                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">
        
                    <input class="btn submit" type="submit" value="Register">
        
                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`

export async function showRegister(ctx) {
    ctx.render(registerTemp(onSubmit))
    ctx.updateNav()

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        let email = formData.get('email');
        let password = formData.get('password');
        let repPassword = formData.get('confirm-password');

        if (email.length < 1 || password.length < 1 || password != repPassword) {
            notify('Fields cannot be empty or passwords do not match!');
            return
        }

        await register(email, password);
        form.reset()
        ctx.page.redirect('/home');
    }
}