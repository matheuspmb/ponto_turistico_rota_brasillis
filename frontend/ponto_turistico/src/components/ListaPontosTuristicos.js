import React, { useState, useEffect } from 'react';
import styles from '../styles/ListaPontosTuristicos.module.css';
import { Link, useNavigate } from 'react-router-dom';
import BotaoBuscarLista from '../components/BotaoBuscarLista';
import { fetchPontosTuristicos } from '../services/api'; // Certifique-se que este serviço está corretamente configurado

const ListaPontosTuristicos = () => {
    const [termoBusca, setTermoBusca] = useState('');
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [pesquisaRealizada, setPesquisaRealizada] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (pesquisaRealizada) {
            buscarPontos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina]);

    const buscarPontos = async () => {
        setLoading(true);
        try {
            const dados = await fetchPontosTuristicos(termoBusca, pagina);
            console.log(dados); 
            if (dados && dados.pontos) {
                setItens(dados.pontos || []);
                setTotalPaginas(dados.totalPaginas || 1);
            } else {
                console.error('Estrutura inesperada de dados:', dados);
            }
        } catch (err) {
            console.error('Erro ao buscar pontos turísticos:', err);
        }
        setLoading(false);
    };

    const handleBuscar = () => {
        setPagina(1); // Reinicia a página ao buscar
        setPesquisaRealizada(true);
    };

    const handlePaginaAnterior = () => {
        if (pagina > 1) setPagina((prev) => prev - 1);
    };

    const handlePaginaProxima = () => {
        if (pagina < totalPaginas) setPagina((prev) => prev + 1);
    };

    const handleVerDetalhes = (id) => {
        navigate(`/detalhes/${id}`); // Navega para a página de detalhes
    };

    return (
        <div>
            <div className={styles.pesquisaContainer}>
                <input
                    type="text"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    name="descricao"
                    placeholder="Digite um termo para buscar um ponto turístico..."
                />
                <BotaoBuscarLista onClick={handleBuscar} />
            </div>

            <div className={styles.listaTexto}>
                {loading && <p>Carregando...</p>}
                {pesquisaRealizada && itens.length === 0 && !loading && (
                    <p>Não encontrei nenhum resultado para a sua busca :(</p>
                )}

                {itens.length > 0 && !loading ? (
                    itens.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <p>
                                <strong>{item.nome}</strong>
                            </p>
                            <p>{item.localizacao}</p>
                            <button onClick={() => handleVerDetalhes(item.id)}>
                                Ver Detalhes
                            </button>
                        </div>
                    ))
                ) : null}
            </div>

            {itens.length > 0 && (
                <div className={styles.paginacao}>   // paginação
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
