import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import logoEmpresa from '../../imagens/logoEmpresa.png';
import styles from '../../styles/CadastroPontoTuristico.module.css';
import BotaoVoltar from "../BotaoVoltar";
import Input from "../InputFormulario";
import { fetchPontoTuristicoPorId } from '../../services/api';

function CadastroPontoTuristico() {
    const { id } = useParams(); 
    const [ponto, setPonto] = useState(null); 
    const [erro, setErro] = useState(null);  // Novo estado para exibir erros
    const [loading, setLoading] = useState(true); // Novo estado de carregamento

    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
         "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    useEffect(() => {
        const fetchDetalhes = async () => {
            try {
                const dados = await fetchPontoTuristicoPorId(id); // Buscar os dados do ponto turístico pelo ID
                setPonto(dados);
                setLoading(false);
            } catch (err) {
                setErro("Erro ao buscar ponto turístico. Tente novamente mais tarde.");
                setLoading(false);
                console.error("Erro ao buscar ponto turístico:", err);
            }
        };

        fetchDetalhes();
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>; // Vai exibir "Carregando..." enquanto os dados não chegam
    }

    if (erro) {
        return <p>{erro}</p>; // Exibe uma mensagem de erro se a requisição falhar
    }

    // Função para atualizar o estado do ponto turístico ao editar
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPonto({
            ...ponto,
            [name]: value
        });
    };

    return (
        <form>
            <div className={styles.cadastro_container}>
                <div className={styles.logotipoCad}>
                    <img src={logoEmpresa} alt="logo-empresa" title="logo-empresa" />
                </div>
                <div >
                    <Input
                        type="text"
                        text="Nome:"
                        name="nome"
                        placeholder="..."
                        value={ponto.nome}
                        onChange={handleInputChange}
                    />

                    <label>Localização:</label>
                    <div className={styles.localizacao}>
                        <label>UF/Cidade:</label>
                        <select 
                            value={ponto.uf} 
                            name="uf" 
                            onChange={handleInputChange}
                        >
                            <option>- -</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="cidade"
                            placeholder="..."
                            value={ponto.cidade}
                            onChange={handleInputChange}  // Permitindo alteração
                        />
                    </div>

                    <Input
                        type="text"
                        text="Referência:"
                        name="referencia"
                        placeholder="..."
                        value={ponto.referencia} 
                        onChange={handleInputChange}
                    />

                    <Input
                        type="text"
                        text="Descrição:"
                        name="descricao"
                        placeholder="Descreva o ponto turístico..."
                        value={ponto.descricao} 
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.buttonsDetalhes}>
                    <BotaoVoltar />
                </div>
            </div>
        </form>
    );
}

export default CadastroPontoTuristico;
