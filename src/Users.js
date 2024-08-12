import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import axios from "axios";
import { useEffect, useState } from "react";

// const users = [
//     {
//         id:1,
//         name: "John",
//     },
//     {
//         id:2,
//         name: "Nuwan",
//     },
// ]

const Users = () => {
    const [users, setUsers] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [seletedUser, setSelectedUser] = useState({})

    useEffect(() => {
        getUsers()

    }, [])
    const getUsers = () => {
        axios.get('http://localhost:3002/api/users').then(response => {

            setUsers(response?.data?.response || []);
        }).catch(error => { console.log(error); })

    }
    const addUsers = (data) => {
        setSubmitted(true)

        const payload = {
            id: data.id,
            name: data.name
        }
        axios.post('http://localhost:3002/api/createuser', payload).then(() => {

            getUsers()
            setSubmitted(false)
            setIsEdit(false)
        }).catch(error => { console.log(error); })
    }
    const updateUser = (data) => {
        setSubmitted(true)
        
        const payload = {
            id: data.id,
            name: data.name
        }
        axios.put('http://localhost:3002/api/updateuser', payload).then(() => {

        getUsers()
        setSubmitted(false)
        setIsEdit(false)
    }).catch(error => { console.log(error); })

    }

    const deleteUser1 = (data) => {
        console.log(data);
      
        axios.delete('http://localhost:3002/api/deleteuser', data).then(() => {
        console.log("deleted successfully");
        getUsers()
     
    }).catch(error => { console.log(error); })
    }
    return (
        <Box sx={{ width: 'calc(100%-100px)', margin: 'auto', marginTop: '100px' }}>

            <UserForm 
            addUser = {addUsers} submitted = {submitted} data = {seletedUser} isEdit={isEdit} updateUser={updateUser}/>
            <UserTable rows={users} selectedUser={data=>{setSelectedUser(data); setIsEdit(true)}} deleteUser={data=>{window.confirm("Are u sure") && deleteUser1(data)}}/>
        </Box>
    )
}
export default Users;