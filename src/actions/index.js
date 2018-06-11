import types from './types';

export function updateChat(log){
    return {
        type: types.UPDATE_CHAT_LOG,
        payload: log
    }
}

export function updateInput(name, value){
    return {
        type: types.UPDATE_INPUT,
        payload: {name, value}
    }
}