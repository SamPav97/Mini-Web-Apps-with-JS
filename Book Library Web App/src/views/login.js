import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/userActions.js';
//import { notify } from './notify.js';

const loginTemp = (onSubmit) => html`
   <section id="login-page" class="login">
            <form @submit=${onSubmit} id="login-form" action="" method="">
                <fieldset>
                    <legend>Login Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
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
            window.alert('All fields are required!')
            return
        }
        try{
        await login(email, password);
        form.reset()
        ctx.page.redirect('/allObjects'); //change to catalog

        } catch(err){
            window.alert('We cannot log you in!')
        }
    }
}