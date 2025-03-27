/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useCallback, useState } from "react";


export const UsersContext = createContext({
    user: "",
    userAppointments: [],
    registerUser: async() => {},
    loginUser: async() => {},
    createAppointment: async() => {},
    getUserAppointment: async() => {},
    logOut: () => {},
    cancelUserAppointment: async() => {}
})

export const UsersProvider = ({children}) => {


    const [user, setUser] = useState(localStorage.getItem("user") ?? false)
    const [userAppointments, setUserAppointments] = useState([])

    const registerUser = async(userData) => {
        console.log(userData)
        const userR = await axios.post("http://localhost:3000/users/register", userData)
        return userR
    }

    const loginUser = async(LoginUser) => {
        const res = await axios.post("http://localhost:3000/users/login", LoginUser)
        localStorage.setItem("user", res.data.user.id);
        setUser(res.data.user.id)
        return res;
    }

    const logOut = () => {
        localStorage.removeItem("user")
        setUser(false)
        setUserAppointments([])
    }

    const createAppointment = async(values) => {
        await axios.post("http://localhost:3000/appointments/schedule", values)
    }


    const getUserAppointment = useCallback(async(userId) => {
        const {data} = await axios.get(`http://localhost:3000/users/${userId}`)
        console.log(data)
        setUserAppointments(data.response.appointments)
        
    }, [setUserAppointments])


    const cancelUserAppointment = async(appointmentId) => {
        await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`)
        const newAppointments = userAppointments.map((appointment) => appointment.id === appointmentId ? {...appointment, status: "cancelled"} : appointment)
        setUserAppointments(newAppointments)
    }







    const value = {
        user,
        userAppointments,
        registerUser,
        loginUser,
        logOut,
        createAppointment,
        getUserAppointment,
        cancelUserAppointment
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}


