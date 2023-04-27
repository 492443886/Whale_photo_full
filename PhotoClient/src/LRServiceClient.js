import constants from  './constants';
import axios from 'axios'

//const url = "http://localhost:3000/api"
//const url = "http://192.168.1.20:3000/api"


const url = constants.URL;

let login = async (username, password) => {

    try {
        const u = url + "/login"
        const res = await axios.post(u, {
            "username": username,
            "password": password
        })
        console.log("res: " + res)
        return res;
    }
    catch (error) {
        if (error.response) {
            return error.response
        }
    }
}

let register = async (username, password) => {

    try {

        const u = url + "/register"

        const res = await axios.post(u, {
            "username": username,
            "password": password
        }
        )
        return res
    }
    catch (error) {

        if (error.response) {

            return error.response
        }
    }


}

export default{ login, register }