import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { CgTrash, CgPen } from "react-icons/cg";
import { Link } from "react-router-dom";

const TableList = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
          .get("https://api-rogerbatt.herokuapp.com/")
          .then((response) => setUsers(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, [users]);
      
     function deleteUser(id) {
        axios
            .delete(`https://api-rogerbatt.herokuapp.com/${id}`)
        setUsers(users.filter(user => user._id !== id))
     }

    return (
        <div class="flex flex-col bg-gray-200 px-7 py-10">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <table class="min-w-full">
                    <thead class="bg-white border-b">
                        <tr>
                        <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Nome
                        </th>
                        <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Endereço
                        </th>
                        <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            CPF
                        </th>
                        <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Edit
                        </th>
                        </tr>
                    </thead>
                    {users.map((user) =>{
                        return(
                        <tbody>
                            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td class="text-gray-900 font-medium px-6 py-4 break-words">
                                {user.name}
                            </td>
                            <td class="text-gray-900 px-6 py-4">
                                {user.endereço}, {user.numeroCasa}
                            </td>
                            <td class="text-gray-900 px-6 py-4">
                                {user.cpf}
                            </td>
                            <td class="flex text-gray-900 px-6 py-6 space-x-3">
                                <button
                                className="text-2xl text-red-500"
                                onClick={() => {
                                    const confirmBox = window.confirm(
                                      "Deseja realmente deletar?"
                                    )
                                    if (confirmBox === true) {
                                        deleteUser(user._id)
                                    }
                                  }}>
                                    <CgTrash/>
                                </button>
                                <Link
                                to={`/editar/${user._id}`}
                                className="text-xl text-blue-500"
                                >
                                    <CgPen/>
                                </Link>
                            </td>
                            </tr>
                        </tbody>
                    )})}
                    </table>
                </div>
            </div>
        </div>
        
    )
}

export default TableList;