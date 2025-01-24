import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import logoEmpresa from '../../imagens/logoEmpresa.png';
import styles from '../../styles/CadastroPontoTuristico.module.css';
import BotaoVoltar from "../BotaoVoltar";
import BotaoCadastrarNovoPontoTuristico from "../BotaoCadastrarNovoPontoTuristico";
import InputFormulario from "../InputFormulario"; // Corrigido para o componente correto
import { fetchPontoTuristicoPorId, cadastrarPontoTuristico } from '../../services/api';

function CadastroPontoTuristico() {
    const { id } = useParams(); 
    const [ponto, setPonto] = useState({
        nome: '',
        uf: '',
        cidade: '',
        referencia: '',
        descricao: '',
    }); // Inicializando com valores vazios para o ponto turístico

    const [isSubmitting, setIsSubmitting] = useState(false);

    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
         "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    useEffect(() => {
        const fetchDetalhes = async () => {
            try {
                const dados = await fetchPontoTuristicoPorId(id); // Irá buscar os dados do ponto turístico pelo ID
                setPonto(dados);
            } catch (err) {
                console.error("Erro ao buscar ponto turístico:", err);
            }
        };

        if (id) fetchDetalhes();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPonto({
            ...ponto,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
          const dadosSalvos = await cadastrarPontoTuristico(ponto);
          if (dadosSalvos) {
              alert("Ponto turístico cadastrado com sucesso!");
          } else {
              alert("Erro ao cadastrar ponto turístico.");
          }
      } catch (err) {
          console.error("Erro ao cadastrar ponto turístico", err);
          alert("Erro ao cadastrar ponto turístico.");
      }
  
      setIsSubmitting(false);
  };  

    if (!ponto) {
        return <p>Carregando...</p>; // Vai exibir "Carregando..." enquanto os dados não chegam
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.cadastro_container}>
                <div className={styles.logotipoCad}>
                    <img src={logoEmpresa} alt="logo-empresa" title="logo-empresa" />
                </div>
                <div>
                    <InputFormulario
                        type="text"
                        text="Nome:"
                        name="nome"
                        placeholder="Nome do ponto turístico"
                        value={ponto.nome}
                        onChange={handleChange} // A função de atualização do estado
                    />

                    <label>Localização:</label>
                    <div className={styles.localizacao}>
                        <label>UF/Cidade:</label>
                        <select name="uf" value={ponto.uf} onChange={handleChange}>
                            <option value="">Estado</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                        {/* Removido readOnly para permitir edição */}
                        <input
                            type="text"
                            name="cidade"
                            placeholder="Cidade do ponto turístico"
                            value={ponto.cidade}
                            onChange={handleChange} // A função de atualização do estado
                        />
                    </div>

                    <InputFormulario
                        type="text"
                        text="Referência:"
                        name="referencia"
                        placeholder="Referência"
                        value={ponto.referencia}
                        onChange={handleChange} // A função de atualização do estado
                    />

                    <InputFormulario
                        type="text"
                        text="Descrição:"
                        name="descricao"
                        placeholder="Descreva o ponto turístico"
                        value={ponto.descricao}
                        onChange={handleChange} // A função de atualização do estado
                    />
                </div>

                <div className={styles.buttons}>
                    <BotaoVoltar />
                    <BotaoCadastrarNovoPontoTuristico onClick={handleSubmit} />
                </div>
            </div>
        </form>
    );
}

export default CadastroPontoTuristico;
