import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { CgTrash, CgPen, CgSearch } from "react-icons/cg";
import { Link } from "react-router-dom";

const TableList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);

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
        <div className="flex flex-col py-10 rounded-2xl">
            <div className="">
                <div className="py-2 inline-block min-w-full px-10">
                    <div className="flex justify-between mb-5">
                        <h1 className="font-bold">Data Account</h1>
                        <div className="flex justify-center items-center bg-gray-100 py-2 px-5 rounded-full ">
                            <input
                                className="font-bold bg-gray-100 outline-0 placeholder:text-black"
                                type="text"
                                placeholder='Procurar...'
                                onChange={(event) =>{setSearchTerm(event.target.value);
                                }}
                            />
                              <CgSearch className="text-black text-xl"/>
                        </div>
                    </div>
                    <table>
                    <thead className="bg-white border-b">
                        <tr>
                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Nome
                        </th>
                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Endereço
                        </th>
                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            CPF
                        </th>
                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Edit
                        </th>
                        </tr>
                    </thead>
                    {users
                    .filter(user => user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
                    .map((user, key) =>{
                            return(
                                <tbody key={key}>
                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="text-gray-900 font-medium px-6 py-4 break-words">
                                        {user.name}
                                    </td>
                                    <td className="text-gray-900 px-6 py-4">
                                        {user.endereço}, {user.numeroCasa}
                                    </td>
                                    <td className="text-gray-900 px-6 py-4">
                                        {user.cpf}
                                    </td>
                                    <td className="flex text-gray-900 px-6 py-6 space-x-3">
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