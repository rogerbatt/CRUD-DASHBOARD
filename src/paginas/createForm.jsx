import {useState} from 'react';
import axios from "axios";
import InputMask from "react-input-mask";

function CreateForm(props) {
  const [nomie, setNomie] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [cpff, setCnpj] = useState('');

  const [message, setMessage] = useState('');
  const [teste, setTeste] = useState('');

function onCreatePost(e) {
  e.preventDefault();
  const postData = {
      name: nomie,
      endereço: endereco,
      cpf: cpff,
      numeroCasa: numero
  };

  axios
    .post(
      `https://api-rogerbatt.herokuapp.com/`,
      postData,
    )
    .then(() => {
      setMessage('Usuário criado!');
      setTeste('bg-green-100 text-green-400 text-center rounded-lg p-2 animate-bounce')      
    }).catch((error) => {
      setMessage(error);
    });
}
  return (
    <div className="bg-gray-100 px-10 py-10">
      <form className="bg-black px-10 py-7 rounded-2xl" onSubmit={onCreatePost}>
        <input value={nomie} onChange={(e) => setNomie(e.target.value)} className="font-bold placeholder:text-black placeholder:font-bold bg-white w-full border rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm" placeholder="Nome" type="text"/>

        <div className="flex my-2">
          <input value={endereco} onChange={(e) => setEndereco(e.target.value)} className="w-full font-bold  placeholder:text-black placeholder:font-bold block bg-white border  rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm" placeholder="Endereço" type="text"/>
          <input value={numero} onChange={(e) => setNumero(e.target.value)} className="w-1/3 font-bold placeholder:text-black placeholder:font-bold block bg-white border rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm" placeholder="Nº" type="number"/>
        </div>

        <InputMask
          value={cpff}
          onChange={(e) => setCnpj(e.target.value)}
          mask="999.999.999-99"
          placeholder="CPF"
          className="placeholder:text-black placeholder:font-bold font-bold bg-white w-full border rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
        />

        <div className="grid">
          <button type="submit" className="justify-self-end mt-3 bg-green-300 py-2 px-5 rounded-full font-bold">Criar</button>
        </div>
        </form>
        <h1 className={teste} onClick={()=>setTeste('invisible')}>{message} </h1>
    </div>
  );
}

export default CreateForm;


