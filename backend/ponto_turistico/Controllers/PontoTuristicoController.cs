using Microsoft.AspNetCore.Mvc;
using ponto_turistico.Models;
using ponto_turistico.Services;
using System.Threading.Tasks;

namespace ponto_turistico.Controllers
{
    [Route("api/pontoturistico")]
    [ApiController]
    public class PontoTuristicoController : ControllerBase
    {
        private readonly IPontoTuristicoService _pontoTuristicoService;

        public PontoTuristicoController(IPontoTuristicoService pontoTuristicoService)
        {
            _pontoTuristicoService = pontoTuristicoService;
        }

        // GET /api/pontoturistico
        [HttpGet]
        public async Task<IActionResult> GetAllPontos()
        {
            try
            {
                var pontos = await _pontoTuristicoService.GetPontosTuristicos();
                return Ok(pontos);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        // POST /api/pontoturistico
        [HttpPost]
        public async Task<IActionResult> CreatePonto([FromBody] PontoTuristico ponto)
        {
            if (ponto == null)
            {
                return BadRequest("Os dados enviados são inválidos.");
            }

            try
            {
                var pontoCriado = await _pontoTuristicoService.CadastrarPontoTuristico(ponto);
                
                return CreatedAtAction(nameof(GetAllPontos), new { id = pontoCriado.id }, pontoCriado);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
    }
}
