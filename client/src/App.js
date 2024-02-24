import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const apiURL = 'http://localhost:8000';
  const [estudantes, setEstudantes] = useState([]);
  const [novoEstudante, setNovoEstudante] = useState({
    nome: '',
    dataNascimento: ''
  });
  const [estudanteSelecionado, setEstudanteSelecionado] = useState(null);

  const [erro, setErro] = useState(null);
  const buscarRegistros = async () => {
    try {
      const response = await axios.get(`${apiURL}/estudantes`);
      setEstudantes(response.data);
      setErro('');
    } catch (error) {
      setErro('Erro ao buscar estudantes: ' + error.message);
    }
  };

  const AdicionarEstudante = async () => {
    try {
      const dataNascimentoFormatada = novoEstudante.dataNascimento
        .split('-')
        .reverse()
        .join('-');
      const novoEstudanteFormatado = {
        nome: novoEstudante.nome,
        dataNascimento: dataNascimentoFormatada,
      };
      if (estudanteSelecionado) {
        await axios.put(`${apiURL}/estudantes/${estudanteSelecionado.id}`,

          novoEstudanteFormatado);
      } else {
        await axios.post(`${apiURL}/estudantes`, novoEstudanteFormatado);
      }
      setEstudanteSelecionado(null);
      setNovoEstudante({ nome: '', dataNascimento: '' });
      buscarRegistros();
      setErro('');
    } catch (error) {
      setErro(`Erro ao adicionar estudante: ${error.message}`);
    }
  };
  const CancelarAtualizacao = () => {
    setEstudanteSelecionado(null);
    setNovoEstudante({ nome: '', dataNascimento: '' });
  };
  const EditarEstudante = (estudante) => {
    setEstudanteSelecionado(estudante);
    const dataNascimentoFormatada = estudante.dataNascimento
      .split('-')
      .reverse()
      .join('-');
    setNovoEstudante({
      nome: estudante.nome, dataNascimento:

        dataNascimentoFormatada
    });
  };

  useEffect(() => {
    buscarRegistros();
  }, []);
  return (
    <div className="container">
      <h1>Gerenciamento de Estudantes</h1>
      {erro && <p className="error">{erro}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estudantes.map((estudante) => (
            <tr key={estudante.id}>
              <td>{estudante.nome}</td>
              <td>{estudante.dataNascimento}</td>
              <td>
                <button className="editButton">
                  Editar
                </button>
                <button className="removeButton">
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Adicionar/Atualizar Estudante</h2>
      <div className="form">
        <label>Nome: </label>
        <input
          type="text"
          value={novoEstudante.nome}
          onChange={(e) => setNovoEstudante({
            ...novoEstudante, nome:

              e.target.value
          })}
        />
        <label>Data de Nascimento: </label>
        <input
          type="date"
          value={novoEstudante.dataNascimento}

          onChange={(e) => setNovoEstudante({
            ...novoEstudante,

            dataNascimento: e.target.value
          })}

        />
        <button className="addButton" onClick={AdicionarEstudante}>
          Adicionar
        </button>
      </div>
    </div>
  );
}
export default App;