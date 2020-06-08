import JwtDecode from "jwt-decode"
import NameItem from '../../config/sessionStorage'

const authenticate = () => {
    if(!sessionStorage.getItem(NameItem.ACCESS_TOKEN)){
        return false
    }
    var {exp} = JwtDecode(sessionStorage.getItem(NameItem.ACCESS_TOKEN))
    if (exp < Date.now()/1000){
        return false;
    }
    return true
}

export const isAuthen = {
    isAuthenticated: authenticate()
}
 
