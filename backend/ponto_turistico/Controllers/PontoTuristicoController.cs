using Microsoft.AspNetCore.Mvc;
using ponto_turistico.Models;
using ponto_turistico.Services;
using System.Threading.Tasks;
using System.Linq;

[Route("api/pontoturistico")]
[ApiController]
public class PontoTuristicoController : ControllerBase
{
    private readonly IPontoTuristicoService _pontoTuristicoService;

    public PontoTuristicoController(IPontoTuristicoService pontoTuristicoService)
    {
        _pontoTuristicoService = pontoTuristicoService;
    }

    [HttpGet]
    public async Task<IActionResult> GetPontosTuristicos([FromQuery] string termoBusca = "", [FromQuery] int pagina = 1, [FromQuery] int limitePorPagina = 2)  // Limite por página default é 2
    {
        try
        {
            var (pontos, totalItens) = await _pontoTuristicoService.GetPontosTuristicos(termoBusca, pagina, limitePorPagina);

            // Calculando o número total de páginas
            var totalPaginas = (int)Math.Ceiling((double)totalItens / limitePorPagina);

            return Ok(new
            {
                pontos,
                totalItens,
                totalPaginas
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro interno: {ex.Message}");
        }
    }

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
            return CreatedAtAction(nameof(GetPontosTuristicos), new { id = pontoCriado.id }, pontoCriado);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro interno: {ex.Message}");
        }
    }
}
