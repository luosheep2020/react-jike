import {createSlice} from "@reduxjs/toolkit";
import {getToken, removeToken, setToken as _setToken} from "@/utils/index.js";
import {getProfileAPI, loginAPI} from "@/apis/user.js";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        dispatch(setToken(res.data.token))
    }
}

// 获取个人用户信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}
const {setToken, setUserInfo, clearUserInfo} = userStore.actions
const userReducer = userStore.reducer
export {setToken, fetchLogin, setUserInfo, fetchUserInfo, clearUserInfo}
export default userReducer