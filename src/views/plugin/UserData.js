import { jwtDecode } from "jwt-decode"


function UserData (){
    let access_token = localStorage.getItem("access_token")
    let refresh_token = localStorage.getItem("refresh_token")
    if(access_token && refresh_token){
        const token = refresh_token
        const decode = jwtDecode(token)
        return decode
    }
    else{
        //pass
    }
}


export default UserData;