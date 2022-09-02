// Nav bar template.
import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemp = () => html`
            <!-- Navigation -->
            <h3><a class="home" href="/home">GamesPlay</a></h3>
            <nav>
                <span>Welcome${localStorage.user ? ', ' + JSON.parse(localStorage.user).email : '!'}</span>
                <a href="/allObjects">All games</a>
                <a href="/Search">Search</a>
                <!-- Logged-in users -->
                <div id="user" style="display: ${localStorage.user ? 'inline': 'none'}">
                    <a href="/createObject">Create Game</a>
                    <a href="/logout">Logout</a>
                </div>
                <!-- Guest users -->
                <div id="guest" style="display: ${localStorage.user ? 'none': 'inline'}">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
            </nav>
` 

export function navDisp() {
    render(navTemp(), document.querySelector('header'))
}