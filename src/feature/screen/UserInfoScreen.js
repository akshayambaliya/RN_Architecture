import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRatesInformation } from '../UserDetailsActions';
import UserinfoScreenView from './UserinfoScreen.view'

const UserInfoScreen = () => {
    const dispatch = useDispatch();
    const data = { name: "test", salary: "123", age: "23" }
    useEffect(() => {
        dispatch(getRatesInformation(data, (data) => {
            console.log("SUcessData", data)
        }, (error) => { console.log("Error", error) }))
    }, [])
    

    return <UserinfoScreenView />
}

export default UserInfoScreen