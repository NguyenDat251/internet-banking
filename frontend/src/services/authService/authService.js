import JwtDecode from "jwt-decode"
import NameItem from '../../config/sessionStorage'

const authenticate = (page) => {
    if(sessionStorage.getItem(NameItem.ACCESS_TOKEN) === null){
        return false
    }
    var jwt = JwtDecode(sessionStorage.getItem(NameItem.ACCESS_TOKEN))
    switch(page){
        case '':
            if(!jwt.customer_id)
                return false
            break;
        case '/employee':
            if(!jwt.employee_id)
                return false
            break;
        case '/admin':
            if(!jwt.admin_id)
                return false
            break;
        default: 
    }
    var {exp} = JwtDecode(sessionStorage.getItem(NameItem.ACCESS_TOKEN))
    if (exp < Date.now()/1000){
        return false;
    }
    return true
}

export function isAuthen(page) {
    if (authenticate(page)){
        return true;
    } else return false;
}
 
