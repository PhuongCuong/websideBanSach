import actionTypes from './actionTypes';
import { handlegetAllBook, handlegetAllbookbycart } from '../../services/bookService';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const fetchallBookStart = (maSach) => {
    return async (dispatch, getState) => {
        try {
            let res = await handlegetAllbookbycart(maSach);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_BOOK_SUCCESS,
                    bookInfo: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_BOOK_FAIL,

                });
            }
        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log(e)
        }
    }
}


export const addnewItem = (key, value) => ({
    type: actionTypes.ADD_NEW_ITEM_BOOK,
    key,
    value
})

export const updatedCopybook = (copybook) => ({
    type: actionTypes.UPDATE_COPY_BOOK,
    copybook: copybook
})

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BOOK_SUCCESS,
    bookInfo: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_BOOK_FAIL,
})
