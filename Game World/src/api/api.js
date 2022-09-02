// All API calls go through this file.
const host = 'http://localhost:3030';

// Function below takes the method for the request, the url for the call, and the data (if any).
async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    // If there is data attach it to the request.
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // See if person making the request is logged in and give them the corresponding permissions.
    const user = JSON.parse(localStorage.getItem('user'));//note this can sometimes be in session storage

    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    // Make the request but have it in try/catch to catch potential errors.
    try {
        const res = await fetch(host + url, options);

        // Forward error if one.
        if (res.ok != true) {
            if(res.status == 403){
                localStorage.removeItem('user');
            }
            const error = await res.json();
            throw new Error(error.message);
        }

        //Get result. Parse the body of result as JSON if result is not empty.
        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

// Different function for each method to export and use them.
async function get(url) {
    return request('get', url);
}

async function post(url, data) {
    return request('post', url, data);
}

async function put(url, data) {
    return request('put', url, data);
}

async function del(url, data) {
    return request('delete', url, data);
}

export{
    get,
    post,
    put,
    del as delete
}