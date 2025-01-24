using ponto_turistico.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ponto_turistico.Services
{
    public interface IPontoTuristicoService
    {
        Task<PontoTuristico> GetPontoTuristicoById(int id);
        Task<IEnumerable<PontoTuristico>> GetPontosTuristicos();
        Task<PontoTuristico> CadastrarPontoTuristico(PontoTuristico pontoTuristico);
    }
}
