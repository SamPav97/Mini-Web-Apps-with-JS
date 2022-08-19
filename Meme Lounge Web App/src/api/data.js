import * as api from './api.js'
// this is the data file where ull be gettn all ur data
//this is a dix with urls for all data locations
const endpoints = {
    'getAllMemes': `/data/memes?sortBy=_createdOn%20desc`,
    'getUserMemes': '/data/memes',
    'create': '/data/memes',
    'getMemeById': '/data/memes/',
    'updateById': '/data/memes/',
    'delete': '/data/memes/'
    
};
// this is the func for gettn all furniture
export async function getAllMemes() {
   return api.get(endpoints.getAllMemes)
}

export async function createMeme(memeData) {
    return api.post(endpoints.create, memeData)
}

export async function getUserMemes(id) {// asks for the data about the furniture w the given id
    return api.get(endpoints.getUserMemes + id);
}

export async function getById(id) {// asks for the data about the furniture w the given id
    return api.get(endpoints.getMemeById + id);
}

export async function updateById(id, data) {// asks for the data about the furniture w the given id
    return api.put(endpoints.updateById + id, data);
}

export async function deleteById(id) {
    return api.delete(endpoints.delete + id)
}