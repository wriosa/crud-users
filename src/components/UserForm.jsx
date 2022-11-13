import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserForm = ({ getUsers, userSelected, desSelectUser }) => {
    const initialValues = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: "",
    }

    const { handleSubmit, register, reset } = useForm();

    useEffect(() => {
        if (userSelected) {
            reset(userSelected)
        } else {
            reset(initialValues)
        }
    }, [userSelected])

    const submit = (data) => {
        console.log(data);
        if (userSelected) {
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
                .then(() => {
                    getUsers();
                    desSelectUser();
                    Swal.fire('User updated successfully', '', 'success')
                })
                .catch(error => Swal.fire(error.response?.data, '', 'error'));
        } else {
            axios.post('https://users-crud1.herokuapp.com/users/', data)
                .then(() => {
                    getUsers();
                    reset(initialValues)
                    Swal.fire('User created successfully', '', 'success')
                })
                .catch(error => Swal.fire(error.response?.data, '', 'error'));
        }

    }
    return (
        <div className="post-form">
            <h2>New user</h2>
            <form onSubmit={handleSubmit(submit)}>
                <p>
                    <label htmlFor="first_name"><i className="fa-solid fa-circle-user"></i> </label>
                    <input {...register("first_name")} type="text" id='first_name' placeholder='First Name' className='input-name' />
                </p>
                <p>
                    <label htmlFor="last_name"> </label>
                    <input {...register("last_name")} type="text" id='last_name' placeholder='Last Name' className='input-last' />
                </p>
                <p className='block'>
                    <label htmlFor="email"><i className="fa-solid fa-envelope"></i> </label>
                    <input {...register("email")} type="email" id='email' placeholder='Email' className='input-all' />
                </p>
                <p className='block'>
                    <label htmlFor="password"><i className="fa-solid fa-lock"></i> </label>
                    <input {...register("password")} type="password" id='password' placeholder='Password' className='input-all' />
                </p>
                <p className='block'>
                    <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i> </label>
                    <input {...register("birthday")} type="date" id='birthday' className='input-all' />
                </p>
                <button className='block'>{userSelected ? "Update":"Submit"}</button>
            </form>
        </div>

    );
};

export default UserForm;