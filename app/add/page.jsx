'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Add = () => {
    const router = useRouter();

    const [value, setValue] = useState({
        title: "",
        desc: ""
    })

    const handleOnChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const request = await axios.post('/api/todo', value);
            const response = request.data;

            if (request.status == 200) {
                router.push('/');
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <form className='bg-blue-600 p-8 mt-5 rounded-lg flex flex-col'>
                <h1 className='text-3xl text-white font-bold'>Add Todo</h1>
                <input name='title' value={value.title} onChange={handleOnChange} type="text" placeholder='Enter your Title here...' className='my-4 p-2 rounded-md outline-none' />
                <input name='desc' value={value.desc} onChange={handleOnChange} type="text" placeholder='Enter your Description here...' className='my-4 p-2 rounded-md outline-none' />
                <button onClick={handleSubmit} className='w-full bg-green-500 text-white text-lg font-semibold p-1 rounded-md mt-4 '>Submit</button>
            </form>
        </div>
    )
}

export default Add