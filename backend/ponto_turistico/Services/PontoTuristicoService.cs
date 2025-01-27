using ponto_turistico.Models;
using ponto_turistico.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace ponto_turistico.Services
{
    public class PontoTuristicoService : IPontoTuristicoService
    {
        private readonly ApplicationDbContext _context;

        public PontoTuristicoService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Função para obter pontos turísticos com base no termo de busca, página e limite de itens por página
        public async Task<(List<PontoTuristico>, int)> GetPontosTuristicos(string termoBusca, int pagina, int limitePorPagina)
        {
            var query = _context.PontosTuristicos.AsQueryable();

            if (!string.IsNullOrEmpty(termoBusca))
            {
                query = query.Where(p =>
                    p.nome_ponto_turistico.Contains(termoBusca) ||
                    p.descricao.Contains(termoBusca) ||
                    p.localizacao_cidade.Contains(termoBusca) ||
                    p.localizacao_UF.Contains(termoBusca)
                );
            }

            var totalItens = await query.CountAsync();

            var pontos = await query
                .OrderByDescending(p => p.criadoEm) // Ordenando pela data de criação (decrescente)
                .Skip((pagina - 1) * limitePorPagina)
                .Take(limitePorPagina)
                .ToListAsync();

            return (pontos, totalItens);
        }

        // método CadastrarPontoTuristico
        public async Task<PontoTuristico> CadastrarPontoTuristico(PontoTuristico ponto)
        {
            _context.PontosTuristicos.Add(ponto); // Adiciona o ponto turístico no banco de dados
            await _context.SaveChangesAsync(); // Salva as mudanças no banco de dados
            return ponto;
        }

    }
}






