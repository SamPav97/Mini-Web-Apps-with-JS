// All functions that get speciffic data from API are in this file.
import * as api from './api.js'

// Page size necessary for pagination
const pageSize = 3;

// URL locations of different data.
const endpoints = {
    getAllObjects: (page) => `/data/games?sortBy=_createdOn%20desc&offset=${(page - 1) * pageSize}&pageSize=${pageSize}`,
    'getObjectById': '/data/games/',
    'create': '/data/games',
    'delete': '/data/games/',
    'updateById': '/data/games/',
    'getUserObjects': '/data/books',
    'likesByObjectId': '/data/likes?count&distinct=_ownerId&where=',
    'ownLike': '/data/likes?where=',
    'addLike': '/data/likes',
    'dislike': '/data/likes/',
    'getComments': '/data/comments',
    'addComment': '/data/comments',
    'count': '/data/games?count',
    'search': '/data/games?where='
};

// Requests for data.
export async function getAllObjects(page) {
    return api.get(endpoints.getAllObjects(page))
}
export async function getById(id) {
    return api.get(endpoints.getObjectById + id);
}

export async function createObject(objectData) {
    return api.post(endpoints.create, objectData)
}

export async function getUserObjects(id) {
    return api.get(endpoints.getUserObjects + id);
}

export async function updateById(id, data) {
    return api.put(endpoints.updateById + id, data);
}

export async function deleteById(id) {
    return api.delete(endpoints.delete + id)
}

//Below are requests for likes.
export async function getLikesByObjectId(gameId) {
    return api.get(endpoints.likesByObjectId + encodeURIComponent(`gameId="${gameId}"`))
}

export async function hasLiked(gameId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const likes = await api.get(endpoints.ownLike + encodeURIComponent(`gameId="${gameId}" AND _ownerId="${userId}"`))
        return likes[0] || false;
    };
}

export async function dislikeGame(likeId) {
    return api.delete(endpoints.dislike + likeId._id);
}

export async function likeObject(gameId) {
    return api.post(endpoints.addLike, { gameId });
}

// Below are requests for comments.
export async function getCommentsByObjectId(gameId) {
    return api.get(endpoints.getComments + `?where=gameId%3D%22${gameId}%22`)
}

export async function commentObject(data) {
    return api.post(endpoints.addComment, data)
}

// Below are pagination related requests.
export async function getCount() {
    const count = await api.get(endpoints.count);
    return Math.ceil(count / pageSize);
}

// Search related requests below.
export async function searchGames(param) {
    return api.get(endpoints.search + encodeURIComponent(`title LIKE "${param}"`));
}