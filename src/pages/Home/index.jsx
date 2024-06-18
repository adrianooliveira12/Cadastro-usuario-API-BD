import "./style.css";
import { useEffect, useState, useRef } from "react";
import Lixeira from "../../assets/lixeira.jpg.jpg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUser() {
    const usersFromApi = await api.get("/usuario");

    setUsers(usersFromApi.data);
  }
  async function createUser() {
    await api.post("/usuario", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUser();
  }
  async function deleteUser(id) {
    await api.delete(`/usuario/${id}`);
    getUser();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de usuário</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <button type="button" onClick={createUser}>
          Cadastrar
        </button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <dir>
            <p>Nome:{user.name}</p>
            <p>Idade:{user.age}</p>
            <p>Email:{user.email}</p>
          </dir>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Lixeira} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
