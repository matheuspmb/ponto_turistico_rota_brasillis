using System;
using System.ComponentModel.DataAnnotations;

namespace ponto_turistico.Models
{
    public class PontoTuristico
    {
        public int id { get; set; }

        [Required(ErrorMessage = "O nome do ponto turístico é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
        public string nome_ponto_turistico { get; set; } = string.Empty;

        [Required(ErrorMessage = "A localização (UF) é obrigatória.")]
        [StringLength(2, ErrorMessage = "A UF deve conter exatamente 2 caracteres.")]
        public string localizacao_UF { get; set; } = string.Empty;

        [StringLength(50, ErrorMessage = "A cidade deve ter no máximo 50 caracteres.")]
        public string? localizacao_cidade { get; set; }

        [StringLength(50, ErrorMessage = "A referência deve ter no máximo 50 caracteres.")]
        public string? referencia { get; set; }

        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(100, ErrorMessage = "A descrição deve ter no máximo 100 caracteres.")]
        public string descricao { get; set; } = string.Empty;

        public DateTime criadoEm { get; set; } = DateTime.Now;
    }
}
