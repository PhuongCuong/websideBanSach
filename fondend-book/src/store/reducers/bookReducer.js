import actionTypes from '../actions/actionTypes';

const initialState = {
    bookInfo: {},
    copybook: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_BOOK_SUCCESS:
            // localStorage.setItem('copybook', JSON.stringify(updatedCopybook));
            return {
                ...state,
                bookInfo: action.bookInfo
            }
        case actionTypes.FETCH_ALL_BOOK_FAIL:
            state.bookInfo = action.bookInfo
            return {
                ...state,
            }
        case actionTypes.UPDATE_COPY_BOOK:
            return {
                ...state,
                copybook: [...action.copybook]
            }
        case actionTypes.CLEARN_ALL_COPY_BOOK:
            return {
                ...state,
                copybook: []
            }
        case actionTypes.ADD_NEW_ITEM_BOOK:
            return {
                ...state,
                bookInfo: {
                    ...state.bookInfo,
                    [action.key]: action.value
                }
            }

        default:
            return state;
    }

}

export default appReducer;