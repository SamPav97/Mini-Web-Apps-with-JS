import * as api from './api.js'
// this is the data file where ull be gettn all ur data
//this is a dix with urls for all data locations
const endpoints = {
    'getAllObjects': `/data/games?sortBy=_createdOn%20desc&distinct=category`,
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
    'addComment': '/data/comments'
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

//below are requests for comments

export async function getCommentsByObjectId(gameId) {
    return api.get(endpoints.getComments + `?where=gameId%3D%22${gameId}%22`)
}

export async function commentObject(data) {
    return api.post(endpoints.addComment, data)
}