import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemp = () => html`<nav>
<a href="/allMemes">All Memes</a>
 <!-- Logged users -->
<div class="user"  style="display: ${localStorage.user ? 'inline': 'none'}">
    <a href="/createMeme">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${localStorage.user ? JSON.parse(localStorage.user).email : 'No User'}</span>
        <a href="/myProfile">My Profile</a>
        <a href="/logout">Logout</a>
    </div>
</div>
<!-- Guest users -->
<div class="guest" style="display: ${localStorage.user ? 'none': 'inline'}">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/home">Home Page</a>
</div>
</nav>` 

export function navDisp() {
    render(navTemp(), document.querySelector('nav'))
}




// <a href="/browseTeams" class="action">Browse Teams</a>
// <a href="/login" class="action" style="display: ${localStorage.user ? 'none': 'inline'}">Login</a>
// <a href="/register" class="action" style="display: ${localStorage.user ? 'none': 'inline'}">Register</a>
// <a href="/myTeams" class="action" style="display: ${localStorage.user ? 'inline': 'none'}">My Teams</a>
// <a href="/logout" class="action" style="display: ${localStorage.user ? 'inline': 'none'}">Logout</a>
// <!-- <a href="/browseTeams" class="action">Browse Teams</a>
// <a href="/login" class="action">Login</a>
// <a href="/register" class="action">Register</a>
// <a href="/myTeams" class="action">My Teams</a>
// <a href="/logout" class="action">Logout</a> -->