import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import Lixeira from "../../assets/lixeira.png";
import Editar from "../../assets/editar.png";
import "./style.css";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoUsuario, setEditandoUsuario] = useState(null);

  const inputNome = useRef();
  const inputEmail = useRef();
  const inputIdade = useRef();

  const [editNome, setEditNome] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editIdade, setEditIdade] = useState("");

  // Buscar usuários
  async function getUsuarios() {
    try {
      const response = await api.get("/cadastro");
      console.log("Usuários da API:", response.data); // depuração
      setUsuarios(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  }

  // Criar usuário
  async function createUsuario() {
    await api.post("/cadastro", {
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      idade: inputIdade.current.value,
    });
    inputNome.current.value = "";
    inputEmail.current.value = "";
    inputIdade.current.value = "";
    getUsuarios();
  }

  // Deletar usuário
  async function deleteUsuario(id) {
    await api.delete(`/cadastro/${id}`);
    getUsuarios();
  }

  // Atualizar usuário
  async function updateUsuario(id) {
    await api.put(`/cadastro/${id}`, {
      nome: editNome,
      email: editEmail,
      idade: editIdade,
    });
    setEditandoUsuario(null);
    getUsuarios();
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <div className="container">
      <h1>📋 Gerenciamento de Usuários</h1>

      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        <input ref={inputNome} type="text" placeholder="Nome" className="input" required />
        <input ref={inputIdade} type="number" placeholder="Idade" className="input" required />
        <input ref={inputEmail} type="email" placeholder="Email" className="input" required />
        <button type="button" className="btn-cadastrar" onClick={createUsuario}>Cadastrar</button>
      </form>

      <div className="cards">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="card">
            {editandoUsuario === usuario.id ? (
              <div className="edit-form">
                <input value={editNome} onChange={(e) => setEditNome(e.target.value)} className="input-edit" />
                <input value={editIdade} onChange={(e) => setEditIdade(e.target.value)} className="input-edit" />
                <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="input-edit" />
                <div className="edit-buttons">
                  <button onClick={() => updateUsuario(usuario.id)} className="btn-save">Salvar</button>
                  <button onClick={() => setEditandoUsuario(null)} className="btn-cancel">Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Idade:</strong> {usuario.idade}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <div className="card-footer">
                  <button
                    onClick={() => {
                      setEditandoUsuario(usuario.id);
                      setEditNome(usuario.nome);
                      setEditEmail(usuario.email);
                      setEditIdade(usuario.idade);
                    }}
                    className="btn-icon"
                  >
                    <img src={Editar} alt="Editar" />
                  </button>
                  <button onClick={() => deleteUsuario(usuario.id)} className="btn-icon">
                    <img src={Lixeira} alt="Excluir" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
