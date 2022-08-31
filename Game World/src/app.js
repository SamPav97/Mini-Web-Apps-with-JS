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
// import { showMyObjects } from './views/myObjects.js';

import * as api from './api/data.js'
window.api = api

const main = document.getElementById('main-content');

page(decorateContext);
page('/index.html', '/');
page('/', '/home'); // In case we want a different home page than "/"
page('/home', showHome)
page('/allObjects', showAllObjects);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', onLogout);
page('/details/:detailsId', showDetails);//this is a param after ":" u can find it in the href when creating the caralog
page('/createObject', showCreate);
page('/edit/:detailsId', showEdit);
// page('/myObjects', showMyObjects);
page('*', notFound);


page.start();


function render(templateResult) {
    litRender(templateResult, main);
}

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