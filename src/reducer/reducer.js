export const initialState = {
    user: null,
    playlist: [],
    token: null,
    discovery: []
}
export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":

            return {
                ...state,
                user: action.user
            };

        case "SET_PLAYLIST":

            return {
                ...state,
                playlist: action.playlist
            };

        case "SET_TOKEN":

            return {
                ...state,
                token: action.token
            };

        case "SET_DISCOVERY":
            return {
                ...state,
                discovery: action.discovery
            };

        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing
            };
        default:
            return state;


    };
}

