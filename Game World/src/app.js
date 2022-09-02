// Routing and handling views happens here.
import page from '../node_modules/page/page.mjs';
import { render as litRender } from '../node_modules/lit-html/lit-html.js';
import { navDisp } from './views/nav.js';
import { showHome } from './views/home.js';
import { showAllObjects } from './views/catalog.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { logout } from './api/userActions.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { showSearch } from './views/search.js';


const main = document.getElementById('main-content');

// Call views according to url. Routing with 'Page.js'
page(decorateContext);
page('/index.html', '/');
page('/', '/home');
page('/home', showHome)
page('/allObjects', showAllObjects);
page('/search', showSearch);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', onLogout);
page('/details/:detailsId', showDetails);
page('/createObject', showCreate);
page('/edit/:detailsId', showEdit);
page('*', notFound);


page.start();


function render(templateResult) {
    litRender(templateResult, main);
}

// Decorate context with render and nav bar update.
function decorateContext(ctx, next) {
    ctx.render = render;
    ctx.updateNav = updateNav;
    next();
}

function notFound(ctx) {
    ctx.render('404 Not Found');
}

function updateNav() {
    navDisp()
}

function onLogout() {
    logout()
    updateNav()
    window.location = '/'

}