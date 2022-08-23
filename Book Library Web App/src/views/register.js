import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/userActions.js';

const registerTemp = (onSubmit) => html`
             <section id="register-page" class="register">
            <form @submit=${onSubmit} id="register-form" action="" method="">
                <fieldset>
                    <legend>Register Form</legend>
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
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
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
        let repPassword = formData.get('confirm-pass');

        if (email.length < 1 || password.length < 1 || password != repPassword) {
            window.alert('Fields cannot be empty or passwords do not match!');
            return
        }

        await register(email, password);
        form.reset()
        ctx.page.redirect('/allObjects'); //not to home but to catalog fix later
    }
}