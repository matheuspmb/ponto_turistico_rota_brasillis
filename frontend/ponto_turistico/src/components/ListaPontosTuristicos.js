import React, { useState, useEffect } from 'react';
import styles from '../styles/ListaPontosTuristicos.module.css';
import { useNavigate } from 'react-router-dom';
import BotaoBuscarLista from '../components/BotaoBuscarLista';
import { fetchPontosTuristicos } from '../services/api';

const ListaPontosTuristicos = () => {
    const [termoBusca, setTermoBusca] = useState('');
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [pesquisaRealizada, setPesquisaRealizada] = useState(false);
    const [detalhesVisiveis, setDetalhesVisiveis] = useState(null);
    const [totalItens, setTotalItens] = useState(0);

    useEffect(() => {
        if (pesquisaRealizada) {
            buscarPontos();
        }
    }, [pagina, pesquisaRealizada]);

    const buscarPontos = async () => {
        setLoading(true);
        try {
            const dados = await fetchPontosTuristicos(termoBusca, pagina, 3);
            console.log('Dados retornados pela API:', dados);

            if (dados && dados.pontos) {
                setItens(dados.pontos || []);
                const totalItensApi = dados.totalItens || 0;
                setTotalItens(totalItensApi);

                // Calculando o número total de páginas
                const paginasCalculadas = Math.max(1, Math.ceil(totalItensApi / 3));
                setTotalPaginas(paginasCalculadas);

                if (pagina > paginasCalculadas && paginasCalculadas > 0) {
                    setPagina(paginasCalculadas);
                }
            } else {
                console.error('Estrutura inesperada de dados:', dados);
                setItens([]);
                setTotalItens(0);
                setTotalPaginas(1);
            }
        } catch (err) {
            console.error('Erro ao buscar pontos turísticos:', err);
            setItens([]);
            setTotalItens(0);
            setTotalPaginas(1);
        }
        setLoading(false);
    };

    const handleBuscar = () => {
        if (!termoBusca.trim()) {
            alert("Por favor, insira um termo para buscar.");
            return;
        }
        setPagina(1);
        setPesquisaRealizada(true);
        buscarPontos();
    };

    const handlePaginaAnterior = () => {
        if (pagina > 1) setPagina((prev) => prev - 1);
    };

    const handlePaginaProxima = () => {
        if (pagina < totalPaginas) setPagina((prev) => prev + 1);
    };

    const handleVerDetalhes = (id) => {
        setDetalhesVisiveis((prevId) => (prevId === id ? null : id));
    };

    return (
        <div>
            <div className={styles.pesquisaContainer}>
                <input
                    type="textarea"
                    value={termoBusca}
                    onChange={(e) => {
                        const valor = e.target.value;
                        setTermoBusca(valor);

                        // Alteração: Se o campo de busca estiver vazio, redefine o estado `pesquisaRealizada` para evitar a mensagem indevida
                        if (!valor.trim()) {
                            setPesquisaRealizada(false);
                        }
                    }}
                    name="descricao"
                    placeholder="Digite um termo para buscar um ponto turístico..."
                />
                <BotaoBuscarLista onClick={handleBuscar} />
            </div>

            <div className={styles.listaTexto}>
                {loading && <p>Carregando...</p>}
                {pesquisaRealizada && !termoBusca && !loading && (
                    <p>Por favor, insira um termo para buscar.</p>
                )}
                {pesquisaRealizada && termoBusca && itens.length === 0 && !loading && (
                    <p>Não encontrei nenhum resultado para a sua busca :(</p>
                )}

                {itens.length > 0 && !loading ? (
                    itens.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <p>
                                <span className={styles.nomePontoTuristico}>{item.nome_ponto_turistico}</span>
                                <br />
                                <span className={styles.detalhesPonto}>
                                    {item.localizacao_UF}, {item.localizacao_cidade ? item.localizacao_cidade : item.referencia}
                                </span>
                            </p>
                            {detalhesVisiveis === item.id && (
                                <p className={styles.detalhesPonto}> {item.descricao} </p>
                            )}
                            <button onClick={() => handleVerDetalhes(item.id)}>
                                {detalhesVisiveis === item.id ? 'Esconder Detalhes' : 'Ver Detalhes'}
                            </button>
                        </div>
                    ))
                ) : null}
            </div>

            {itens.length > 0 && (
                <div className={styles.paginacao}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePaginaAnterior();
                        }}
                        aria-disabled={pagina === 1}
                        style={{ pointerEvents: pagina === 1 ? 'none' : 'auto' }}
                    >
                        Voltar
                    </a>
                    <span>
                        Página {pagina} de {totalPaginas}
                    </span>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePaginaProxima();
                        }}
                        aria-disabled={pagina === totalPaginas}
                        style={{
                            pointerEvents: pagina === totalPaginas ? 'none' : 'auto',
                        }}
                    >
                        Avançar
                    </a>
                </div>
            )}
        </div>
    );
};

export default ListaPontosTuristicos;
