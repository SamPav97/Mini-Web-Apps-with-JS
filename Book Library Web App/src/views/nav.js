import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemp = () => html`                <section class="navbar-dashboard">
<a href="/allObjects">Dashboard</a>
<!-- Guest users -->
<div id="guest" style="display: ${localStorage.user ? 'none': 'inline'}">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
</div>
<!-- Logged-in users -->
<div id="user" style="display: ${localStorage.user ? 'inline': 'none'}">
    <span>Welcome, ${localStorage.user ? JSON.parse(localStorage.user).email : 'No User'}</span>
    <a class="button" href="/myObjects">My Books</a>
    <a class="button" href="/createObject">Add Book</a>
    <a class="button" href="/logout">Logout</a>
</div>
</section>` 

export function navDisp() {
    render(navTemp(), document.querySelector('nav'))
}