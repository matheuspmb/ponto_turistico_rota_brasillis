using ponto_turistico.Models;
using ponto_turistico.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ponto_turistico.Services
{
    public class PontoTuristicoService : IPontoTuristicoService
    {
        private readonly ApplicationDbContext _context;

        public PontoTuristicoService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Método para cadastrar ponto turístico
        public async Task<PontoTuristico> CadastrarPontoTuristico(PontoTuristico pontoTuristico)
        {
            // Adiciona o ponto turístico ao contexto
            await _context.PontosTuristicos.AddAsync(pontoTuristico);
            
            // Salva as alterações no banco de dados
            await _context.SaveChangesAsync();
            
            // Retorna o ponto turístico cadastrado
            return pontoTuristico;
        }

        // Método para obter um ponto turístico por ID
        public async Task<PontoTuristico> GetPontoTuristicoById(int id)
        {
            return await _context.PontosTuristicos.FindAsync(id);
        }

        // Método para obter todos os pontos turísticos
        public async Task<IEnumerable<PontoTuristico>> GetPontosTuristicos()
        {
            return await _context.PontosTuristicos.ToListAsync();
        }
    }
}
