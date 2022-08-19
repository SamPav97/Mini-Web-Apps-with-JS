import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/userActions.js';
import { notify } from './notify.js';

const registerTemp = (onSubmit) => html`
              <section id="register">
            <form id="register-form">
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input @click = ${onSubmit} type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>
`

export async function showRegister(ctx) {
    ctx.render(registerTemp(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target.parentElement.parentElement;
        const formData = new FormData(form);
        let email = formData.get('email');
        let username = formData.get('username');
        let password = formData.get('password');
        let repPassword = formData.get('repeatPass');
        let gender = formData.get('gender');

        if (email.length < 1 || password.length < 1 || username.length < 1 || password != repPassword) {
            notify('Fields cannot be empty!');
            return
        }

        await register(username, email, password, gender );
        form.reset()
        ctx.page.redirect('/allMemes'); //not to home but to catalog fix later
    }
}