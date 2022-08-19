import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/userActions.js';
import { notify } from './notify.js';

const loginTemp = (onSubmit) => html`
        <section id="login">
            <form id="login-form">
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input @click = ${onSubmit} type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>
`

export async function showLogin(ctx) {
    ctx.render(loginTemp(onSubmit));
    ctx.updateNav();

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target.parentElement.parentElement;
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
        ctx.page.redirect('/allMemes'); //change to catalog

        } catch(err){
            notify('We cannot log you in!')
        }
    }
}