using System;

namespace ponto_turistico.Models
{
    public class PontoTuristico
    {
        public int id { get; set; }
        public string nome_ponto_turistico { get; set; } = string.Empty;
        public string localizacao_UF { get; set; } = string.Empty;
        public string localizacao_cidade { get; set; } = string.Empty;
        public string referencia { get; set; } = string.Empty;
        public string descricao { get; set; } = string.Empty;
        public DateTime criadoEm { get; set; } = DateTime.Now; 
    }
}
