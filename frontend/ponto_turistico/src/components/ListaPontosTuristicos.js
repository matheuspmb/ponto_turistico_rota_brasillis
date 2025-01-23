import React, { useState } from 'react';
import styles from '../styles/ListaPontosTuristicos.module.css';
import { Link } from 'react-router-dom';
import BotaoBuscarLista from "../components/BotaoBuscarLista";
import { fetchPontosTuristicos } from '../services/api';

import { useNavigate } from 'react-router-dom';

const ListaPontosTuristicos = () => {
    const [termoBusca, setTermoBusca] = useState('');
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [pesquisaRealizada, setPesquisaRealizada] = useState(false);
    const navigate = useNavigate(); // Hook para navegação

    const handleBuscar = async () => {
        setLoading(true);
        setPesquisaRealizada(true);
        try {
            const dados = await fetchPontosTuristicos(termoBusca, pagina);
            setItens(dados.pontos);
            setTotalPaginas(dados.totalPaginas);
        } catch (err) {
            console.error("Erro ao buscar pontos turísticos:", err);
        }
        setLoading(false);
    };

    const handlePaginaAnterior = () => {
        if (pagina > 1) setPagina(pagina - 1);
    };

    const handlePaginaProxima = () => {
        if (pagina < totalPaginas) setPagina(pagina + 1);
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
                            <p><strong>{item.nome}</strong></p>
                            <p>{item.localizacao}</p>
                            <button >
                                Ver Detalhes
                            </button>
                        </div>
                    ))
                ) : null}
            </div>

            {itens.length > 0 && (
                <div className={styles.paginacao}>
                    <a href="#" onClick={handlePaginaAnterior}
                        aria-disabled={pagina === 1}
                        style={{ pointerEvents: pagina === 1 ? 'none' : 'auto' }}>
                        Voltar
                    </a>
                    <span>Página {pagina} de {totalPaginas}</span>
                    <a href="#" onClick={handlePaginaProxima}
                        aria-disabled={pagina === totalPaginas}
                        style={{ pointerEvents: pagina === totalPaginas ? 'none' : 'auto' }}>
                        Avançar
                    </a>
                </div>
            )}
        </div>
    );
};

export default ListaPontosTuristicos;
