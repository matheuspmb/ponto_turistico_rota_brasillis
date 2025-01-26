using Microsoft.EntityFrameworkCore;
using ponto_turistico.Data;
using ponto_turistico.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuração de CORS (permite acesso ao frontend React)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configuração dos serviços
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// Adiciona o contexto do banco de dados (DbContext) e configura a string de conexão
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Registra o serviço de pontos turísticos
builder.Services.AddScoped<IPontoTuristicoService, PontoTuristicoService>();

var app = builder.Build();

// Configuração do pipeline de requisição HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Habilitando o CORS para permitir o frontend acessar a API
app.UseCors("AllowReactApp");

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
