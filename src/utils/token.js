const TOKEN='token_key'
function setToken(token) {
    localStorage.setItem(TOKEN,token)
}

function getToken(){
   return  localStorage.getItem(TOKEN)
}

function removeToken() {
    localStorage.removeItem(TOKEN)
}
export {
    setToken,
    getToken,
    removeToken
}