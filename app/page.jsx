'use client'
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [todo, setTodo] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getTodo = async () => {
      try {
        const request = await axios.get('/api/todo');
        const response = request.data;
        setTodo(response.Todo);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    getTodo();

  }, [refresh])

  const handleUpdate = (id) => {
    router.push(`edit/${id}`)
  }

  const handleDelete = async (id) => {
    const request = await axios.delete(`api/todo/${id}`);
    setRefresh(!refresh);

  }

  return (
    <div className="flex justify-center items-center my-10 ">
      <div className="bg-yellow-200 w-3/4 md:w-1/2 flex flex-col mt-5 items-center justify-center p-2 shadow-lg rounded-md ">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold text-blue-500 ">TODO LIST</h1>
          <button className="text-lg font-semibold bg-blue-400 px-2 py-1 rounded-sm">
            <Link className="flex items-center justify-center gap-2" href='/add'> ADD
              <FaPlus className="text-white" />
            </Link>

          </button>
        </div>

        {
          todo && todo.map((e, id) => {
            return (
              <div key={id} className="flex justify-between w-full items-center border-b-4 border-b-sky-500 rounded-xl p-2 mt-4 ">
                <div className="flex flex-col gap-2">
                  <h1 className='text-xl font-bold' >{e.title}</h1>
                  <p className='text-lg'>{e.desc}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <MdEdit onClick={() => handleUpdate(e._id)} className="cursor-pointer text-2xl" />
                  <MdDelete onClick={() => handleDelete(e._id)} className="cursor-pointer text-red-500 text-2xl" />
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  );
}
