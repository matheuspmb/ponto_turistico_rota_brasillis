import React, { useState } from 'react';
import styles from '../../styles/CadastroPontoTuristico.module.css';
import Input from "../Input";
import logoEmpresa from '../../imagens/logoEmpresa.png'
import { cadastrarPontoTuristico } from '../../services/api'
import BotaoCadastrarNovoPontoTuristico from '../BotaoCadastrarNovoPontoTuristico';
import BotaoVoltar from '../BotaoVoltar';

function CadastroPontoTuristico() {
  const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
     "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
  const [dados, setDados] = useState({
    nome: '',
    descricao: '',
    referencia: '',
    uf: '',
    cidade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prevDados) => ({
      ...prevDados,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await cadastrarPontoTuristico(dados);
    if (resultado) {
      alert('Ponto turístico cadastrado com sucesso!');
    } else {
      alert('Erro ao cadastrar ponto turístico.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.cadastro_container}>
        <div className={styles.logotipoCad}>
          <img src={logoEmpresa} alt="logo-empresa" title="logo-empresa" />
        </div>
        <div>
          <Input
            type="text"
            text="Nome:"
            name="nome"
            placeholder="Digite o nome do ponto turístico..."
            handleOnChange={handleChange}
            value={dados.nome}
          />
          
          <label>Localização:</label>
          <div className={styles.localizacao}>
            <label>UF/Cidade:</label>
            <select name="uf" value={dados.uf} onChange={handleChange}>
              <option>- -</option>
              {ufs.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
            <input
              type="text"
              name="cidade"
              value={dados.cidade}
              placeholder='Digite a cidade do ponto turístico...'
              onChange={handleChange}
            />
          </div>

          <Input
            type="text"
            text="Referência:"
            name="referencia"
            placeholder="Digite uma referência sobre o ponto turístico..."
            handleOnChange={handleChange}
            value={dados.referencia}
          />

          <Input
            type="text"
            text="Descrição:"
            name="descricao"
            placeholder="Descreva o ponto turístico..."
            handleOnChange={handleChange}
            value={dados.descricao}
          />
        </div>

        <div className={styles.buttons}>
          <BotaoVoltar />
          <BotaoCadastrarNovoPontoTuristico />
        </div>
      </div>
    </form>
  );
}

export default CadastroPontoTuristico;
