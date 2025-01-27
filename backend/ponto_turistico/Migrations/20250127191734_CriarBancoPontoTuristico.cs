using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ponto_turistico.Migrations
{
    /// <inheritdoc />
    public partial class CriarBancoPontoTuristico : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PontosTuristicos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome_ponto_turistico = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    localizacao_UF = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    localizacao_cidade = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    referencia = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    descricao = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    criadoEm = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PontosTuristicos", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PontosTuristicos");
        }
    }
}
