using Microsoft.EntityFrameworkCore;
using ponto_turistico.Models;

namespace ponto_turistico.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<PontoTuristico> PontosTuristicos { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
    }
}


