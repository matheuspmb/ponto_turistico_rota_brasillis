const API_URL = "http://localhost:5000/api";

export const fetchPontosTuristicos = async (termoBusca, pagina) => {
  try {
    const response = await fetch(`${API_URL}/pontos?search=${termoBusca}&page=${pagina}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar pontos turísticos');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar pontos turísticos:", err);
    return { pontos: [], totalPaginas: 1 };
  }
};

export const fetchPontoTuristicoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/pontos/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar ponto turístico por ID');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar ponto turístico por ID:', error);
    throw error;
  }
};

// Função para cadastrar um novo ponto turístico
export const cadastrarPontoTuristico = async (dados) => {
  try {
    const response = await fetch(`${API_URL}/pontos`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar ponto turístico.");
    }

    const data = await response.json(); // Verifique o que está sendo retornado da API
    return data; // Retorne os dados que foram salvos
  } catch (error) {
    console.error(error);
    return null;
  }
};


