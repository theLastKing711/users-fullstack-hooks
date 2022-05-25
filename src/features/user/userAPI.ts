import { useEffect, useState } from 'react';
import { apiURL } from './../../utils/constants';
import { User } from './../../common/types';
import axios from "axios";





const initalUserState: User = {name: '', email: '', password: ''}

     

export const postData = async <T, R>(url: string, payload: T)  => {

    console.log("paylaod", payload)
        
    const postURL = `${apiURL}${url}`

    const { data } = await axios.post(postURL, 
        payload
        )
    
    return data as R;
}

export const updateData = async <T, R>(url: string, payload: T)  => {

    console.log("paylaod", payload)
        
    const postURL = `${apiURL}${url}`

    const { data } = await axios.patch(postURL, 
        payload
        )
    
    return data as R;
}

export const deleteData = async (url: string, id: number): Promise<boolean>  => {

        
    const deleteUrl = `${apiURL}${url}/${id}`

    const { data } = await axios.delete(deleteUrl)
    
    return data;
}


export const useFetch = <T>(url: string): [T | null,React.Dispatch<React.SetStateAction<T | null>>, boolean, string] => {

    const [response, setResponse] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")


    const fetchData = async <T>(url: string): Promise<void>  => {

        const getUrl = `${apiURL}${url}`
    
        const { data } = await axios.get(getUrl)

        console.log("data", data)
        
        setResponse(data)
    
    }

    
    useEffect(() => {
        try {
            setIsLoading(true)
            const resp =  fetchData<T>(url)
            setIsLoading(false)

            console.log("response", resp)

        }
        catch(err) {
            console.log("err", err)
            setError("")
        }
    }, [])

    return [response,setResponse, isLoading, error]
    
}