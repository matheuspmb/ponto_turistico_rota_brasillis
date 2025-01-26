const API_URL = 'https://localhost:5001/api/pontosturistico';

export const cadastrarPontoTuristico = async (ponto) => {
  try {
      const response = await fetch('https://localhost:5001/api/pontoturistico', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(ponto)
      });

      if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
      }

      return await response.json();
  } catch (err) {
      console.error("Erro ao cadastrar ponto turístico:", err);
      throw err;
  }
};

export const fetchPontosTuristicos = async (termoBusca = '', pagina = 1) => {
  try {
    const url = `${API_URL}?search=${termoBusca}&page=${pagina}`;
    console.log('Requisição para URL:', url); // Log da URL para verificar
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar pontos turísticos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Dados retornados pela API:', data); // Verifique a estrutura dos dados
    return data;

  } catch (err) {
    console.error("Erro ao buscar pontos turísticos:", err);
    return { pontos: [], totalPaginas: 1 }; // Retorna uma estrutura vazia em caso de erro
  }
};

// Função para buscar um ponto turístico específico pelo ID
export const fetchPontoTuristicoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`); // Fazendo a requisição com o ID específico

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erro ao buscar ponto turístico por ID: ${errorDetails}`);
    }

    const data = await response.json(); // Retorna os dados do ponto turístico
    return data;
  } catch (error) {
    console.error('Erro ao buscar ponto turístico por ID:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};
