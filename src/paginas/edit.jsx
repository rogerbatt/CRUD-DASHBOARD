import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";

const Edit = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    endereço: "",
    numeroCasa: "",
    cpf: ""
  });

  const { name, numeroCasa, cpf, endereço } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`https://api-rogerbatt.herokuapp.com/${id}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [id]);

  const onSubmit = async e => {
    await axios.patch(`https://api-rogerbatt.herokuapp.com/${id}`, user);
    history.push("/");
  };


  return (
<div class="flex items-center justify-center">
  <div className="bg-gray-100 px-10 py-10">
    <form className="bg-black px-10 py-7 rounded-2xl" onSubmit={e => onSubmit(e)}>
      <input
        className="font-bold placeholder:text-black placeholder:font-bold bg-white w-full border rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
        type="text"
        name="name"
        placeholder={name}
        value={name}
        onChange={e => onInputChange(e)}
      />

      <div className="flex my-2">
        <input
          className="w-full font-bold  placeholder:text-black placeholder:font-bold block bg-white border  rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
          type="text"
          name="endereço"
          value={endereço}
          onChange={e => onInputChange(e)}
        />
        <input
          className="w-1/3 font-bold placeholder:text-black placeholder:font-bold block bg-white border rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
          type="number"
          name="numeroCasa"
          value={numeroCasa}
          onChange={e => onInputChange(e)}
        />
      </div>

      <InputMask
        className="placeholder:text-black placeholder:font-bold font-bold bg-white w-full border rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
        mask="999.999.999-99"
        type="text"
        name="cpf"
        value={cpf}
        onChange={e => onInputChange(e)}
      />

      <div className="grid">
        <Link
          to={`/`}
          type="submit"
          className="justify-self-end mt-3 bg-green-300 py-2 px-5 rounded-full font-bold"
          onClick={() => {
            const confirmBox = window.confirm(
              "Deseja confirmar esta atualização?"
            )
          if (confirmBox === true) {
            onSubmit(user.id)
          }
          }}onSubmit
        >
          Editar
        </Link>
      </div>
    </form>
  </div>
</div>
  );
};

export default Edit;