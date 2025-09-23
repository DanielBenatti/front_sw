import './style.css'
import Lixeira from '../../assets/lixeira.png'

function Home() {
  const usuarios = [{
    id: 1,
    nome: 'Kevyn',
    idade: 30,
    email: 'kevin@email.com'
  },{
    id: 2,
    nome: 'Bryan',
    idade: 2,
    email: 'bryan@email.com'
  }]
  
  return (
   <div className='container'>
      <form class='formulario'>
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type="text" />
        <input name='idade' type="number" />
        <input name='email' type="email" />
        <button type='button'>Cadastrar</button>
      </form>
      
      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: {usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <p>Email: {usuario.email}</p>
          </div>
          <div class="card-footer">
            <button>
              <img src={Lixeira} alt="" />
            </button>
            <button>
              <img src={Lixeira} alt="" />
            </button>
          </div>
        </div>
      ))}
   </div>
  )
}

export default Home
