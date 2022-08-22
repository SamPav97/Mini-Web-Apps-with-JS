import * as api from './api.js'
// this is the data file where ull be gettn all ur data
//this is a dix with urls for all data locations
const endpoints = {
    'getAllObjects': `/data/books?sortBy=_createdOn%20desc`,
    'getObjectById': '/data/books/',
    'create': '/data/books',
    'getUserObjects': '/data/books',
    'updateById': '/data/books/',
    'delete': '/data/books/',
    'getLikes': '/data/likes',
    'addLike': '/data/likes'
};
export async function getAllObjects() {
    return api.get(endpoints.getAllObjects)
}
export async function getById(id) {// asks for the data about the furniture w the given id
    return api.get(endpoints.getObjectById + id);
}

export async function createObject(objectData) {
    return api.post(endpoints.create, objectData)
}

export async function getUserObjects(id) {// asks for the data about the object w the given id
    return api.get(endpoints.getUserObjects + id);
}

export async function updateById(id, data) {// asks for the data about the object w the given id
    return api.put(endpoints.updateById + id, data);
}

export async function deleteById(id) {
    return api.delete(endpoints.delete + id)
}

//below are requests for likes

export async function getLikesByObjectId(url) {
    return api.get(endpoints.getLikes + url)
}

export async function getMyLikesByObjectId(url) {
    return api.get(endpoints.getLikes + url)
}

export async function likeObject(data) {
    return api.post(endpoints.addLike, data)
}