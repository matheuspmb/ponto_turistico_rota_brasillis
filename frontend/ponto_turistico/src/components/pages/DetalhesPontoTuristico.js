import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import logoEmpresa from '../../imagens/logoEmpresa.png';
import styles from '../../styles/CadastroPontoTuristico.module.css';
import BotaoVoltar from "../BotaoVoltar";
import BotaoCadastrarNovoPontoTuristico from "../BotaoCadastrarNovoPontoTuristico";
import Input from "../Input";
import { fetchPontoTuristicoPorId } from '../../services/api';

function CadastroPontoTuristico() {
    const { id } = useParams(); 
    const [ponto, setPonto] = useState(null); 

    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
         "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    useEffect(() => {
        const fetchDetalhes = async () => {
            try {
                const dados = await fetchPontoTuristicoPorId(id); // Buscar os dados do ponto turístico pelo ID
                setPonto(dados);
            } catch (err) {
                console.error("Erro ao buscar ponto turístico:", err);
            }
        };

        fetchDetalhes();
    }, [id]);

    if (!ponto) {
        return <p>Carregando...</p>; // Vai exibir "Carregando..." enquanto os dados não chegam
    }

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
                        name="Nome"
                        placeholder="..."
                        value={ponto.nome}
                    />

                    <label>Localização:</label>
                    <div className={styles.localizacao}>
                        <label>UF/Cidade:</label>
                        <select value={ponto.uf} onChange={(e) => {}}>
                            <option>- -</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="Cidade"
                            placeholder="..."
                            value={ponto.cidade}
                            readOnly
                        />
                    </div>

                    <Input
                        type="text"
                        text="Referência:"
                        name="Referencia"
                        placeholder="..."
                        value={ponto.referencia} 
                    />

                    <Input
                        type="text"
                        text="Descrição:"
                        name="descricao"
                        placeholder="Descreva o ponto turístico..."
                        value={ponto.descricao} 
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
