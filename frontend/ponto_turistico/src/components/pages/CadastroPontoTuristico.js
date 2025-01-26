import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import logoEmpresa from '../../imagens/logoEmpresa.png';
import styles from '../../styles/CadastroPontoTuristico.module.css';
import BotaoVoltar from "../BotaoVoltar";
import BotaoCadastrarPontoTuristico from "../BotaoCadastrarPontoTuristico";
import InputFormulario from "../InputFormulario";
import { fetchPontoTuristicoPorId, cadastrarPontoTuristico } from '../../services/api';

function CadastroPontoTuristico() {
    const { id } = useParams(); 
    const [ponto, setPonto] = useState({
        nome_ponto_turistico: '',
        localizacao_UF: '',
        localizacao_cidade: '',
        referencia: '',
        descricao: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true); // Adicionando estado de carregamento

    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
         "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    useEffect(() => {
        const fetchDetalhes = async () => {
            try {
                const dados = await fetchPontoTuristicoPorId(id); // Buscar dados do ponto turístico
                setPonto(dados);
            } catch (err) {
                console.error("Erro ao buscar ponto turístico:", err);
            } finally {
                setLoading(false); // Após o carregamento, muda o estado
            }
        };

        if (id) fetchDetalhes();
        else setLoading(false); // Se não houver ID, desconsidera o carregamento
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

    if (loading) {
        return <p>Carregando...</p>; // Exibe "Carregando..." enquanto os dados não chegam
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
                        name="nome_ponto_turistico"
                        placeholder="Nome do ponto turístico"
                        value={ponto.nome_ponto_turistico}
                        onChange={handleChange}
                    />

                    <label>Localização:</label>
                    <div className={styles.localizacao}>
                        <label>UF/Cidade:</label>
                        <select name="localizacao_UF" value={ponto.localizacao_UF} onChange={handleChange}>
                            <option value="">Estado</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="localizacao_cidade"
                            placeholder="Cidade do ponto turístico"
                            value={ponto.localizacao_cidade}
                            onChange={handleChange}
                        />
                    </div>

                    <InputFormulario
                        type="text"
                        text="Referência:"
                        name="referencia"
                        placeholder="Referência"
                        value={ponto.referencia}
                        onChange={handleChange}
                    />

                    <InputFormulario
                        type="text"
                        text="Descrição:"
                        name="descricao"
                        placeholder="Descreva o ponto turístico"
                        value={ponto.descricao}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.buttons}>
                    <BotaoVoltar />
                    <BotaoCadastrarPontoTuristico />
                </div>
            </div>
        </form>
    );
}

export default CadastroPontoTuristico;
