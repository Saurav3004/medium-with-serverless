import { useEffect, useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../config"


interface Blog{
    content:string,
    title:string,
    publishedDate:string,
    id:number,
    author: {
        name:string
    }
}
export const useBlogs = () => {
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{headers:{Authorization:localStorage.getItem("token")}}).then((response) => {
            console.log(response.data)
            setLoading(false)
            setBlogs(response.data)

        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    },[])
    return {
        loading,blogs
    }
}