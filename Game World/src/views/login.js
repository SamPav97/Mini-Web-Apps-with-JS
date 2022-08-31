import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/userActions.js';
import { notify } from './notify.js';

const loginTemp = (onSubmit) => html`
        <!-- Login Page ( Only for Guest users ) -->
        <section id="login-page" class="auth">
            <form id="login" @submit=${onSubmit}>

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`

export async function showLogin(ctx) {
    ctx.render(loginTemp(onSubmit));
    ctx.updateNav();

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        let email = formData.get('email');
        let password = formData.get('password');

        if (email.length < 1 || password.length < 1) {
            notify('All fields are required!')
            return
        }
        try{
        await login(email, password);
        form.reset()
        ctx.page.redirect('/home');

        } catch(err){
            notify('We cannot log you in!')
        }
    }
}