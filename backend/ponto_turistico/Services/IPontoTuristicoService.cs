using ponto_turistico.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ponto_turistico.Services
{
    public interface IPontoTuristicoService
    {
        Task<(List<PontoTuristico> Pontos, int TotalPaginas)> GetPontosTuristicos(string termoBusca, int pagina, int itensPorPagina);
        Task<PontoTuristico> CadastrarPontoTuristico(PontoTuristico ponto);
    }
}
