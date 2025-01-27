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
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({}); // Para armazenar erros de validação

    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
        "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    useEffect(() => {
        const fetchDetalhes = async () => {
            try {
                const dados = await fetchPontoTuristicoPorId(id);
                setPonto(dados);
            } catch (err) {
                console.error("Erro ao buscar ponto turístico:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetalhes();
        else setLoading(false);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPonto({
            ...ponto,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!ponto.nome_ponto_turistico) newErrors.nome_ponto_turistico = "Nome é obrigatório!";

        if (!ponto.localizacao_UF) newErrors.localizacao_UF = "UF é obrigatório!";

        if (!ponto.localizacao_cidade && !ponto.referencia) newErrors.localizacao = "Cidade ou Referência é obrigatório!";

        if (!ponto.descricao || ponto.descricao.length > 100) newErrors.descricao = "Descrição é obrigatório e não pode ter mais de 100 caracteres!";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Se houver erros, não envia o formulário

        setIsSubmitting(true);

        try {
            const dadosSalvos = await cadastrarPontoTuristico(ponto);
            if (dadosSalvos) {
                alert("Ponto turístico cadastrado com sucesso!");

                // Limpar os campos após o cadastramento com sucesso
                setPonto({
                    nome_ponto_turistico: '',
                    localizacao_UF: '',
                    localizacao_cidade: '',
                    referencia: '',
                    descricao: '',
                });
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
        return <p>Carregando...</p>;
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
                        error={errors.nome_ponto_turistico}
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
                        type="textarea" 
                        text="Descrição:"
                        name="descricao"
                        placeholder="..."
                        value={ponto.descricao}
                        onChange={handleChange}
                        isDescricao={true}
                        error={errors.descricao}
                    />

                    {errors.nome_ponto_turistico && <p className={styles.error}>{errors.nome_ponto_turistico}</p>}
                    {errors.localizacao_UF && <p className={styles.error}>{errors.localizacao_UF}</p>}
                    {errors.localizacao && <p className={styles.error}>{errors.localizacao}</p>}
                    {errors.descricao && <p className={styles.error}>{errors.descricao}</p>}
                </div>

                <div className={styles.buttons}>
                    <BotaoVoltar />
                    <BotaoCadastrarPontoTuristico isSubmitting={isSubmitting} />
                </div>
            </div>
        </form>
    );
}

export default CadastroPontoTuristico;






