import axios from 'axios'
import { useRouter } from 'vue-router';
import constants from './constants';

const url = constants.URL;

//const url = "http://192.168.1.20:3000/api"
let getPosts = async () => {

    try {

        const u = url + "/post"

        console.log(u)

        const res = await axios.get(u)
        return res.data
    }
    catch (error) {

        console.log(error)
    }
}
let commentPost = async (post_id, c) => {

    try {

        const u = url + "/commentPost"

        const res = await axios.post(u, { _id: post_id, comment: c })

        return res.data
    }
    catch (error) {

        console.log(error)
    }

}


let getPhoto = async () => {

    try {

        const u = url + "/photo"

        const res = await axios.get(u)
        return res.data
    }
    catch (error) {

        console.log(error)
    }
}
let getPhotoById = async (ids) => {

    try {

        const u = url + "/postbyid"

        console.log("ck", ids)

        const res = await axios.post(u, ids)
        return res.data
    }
    catch (error) {

        console.log(error)
    }
}

let makePost = async (data) => {

    try {

        const u = url + "/post"

        console.log(u)

        const res = await axios.post(u, data)
        return res
    }
    catch (error) {

        console.log(error)
    }
}
let makePhoto = async (data) => {

    try {
        const u = url + "/photo"
        const res = await axios.post(u, data)
        return res
    }
    catch (error) {

        return error.response;
    }
}
let deletePhoto = async (data) => {

    try {

        const u = url + "/photo"
        const bd = { "_id": data }

        console.log(data)
        const res = await axios.delete(u, {
            data: bd
        })
        return res
    }
    catch (error) {

        return error.response;
    }
}

let createProfile = async (data) => {

    try {
        const u = url + "/profile"
        const res = await axios.post(u, { user: data })
        return res
    }
    catch (error) {

        return error.response;
    }
}


let getProfile = async (user) => {

    try {
        const u = url + "/profile"
        const params = { "user": user };
        const res = await axios.get(u, { params })

        console.log(res.data)
        return res.data
    }
    catch (error) {

        return error.response;
    }
}



export default {
    makePhoto, getPhoto, deletePhoto,
    makePost, getPosts, getPhotoById, commentPost, createProfile,
    getProfile
}