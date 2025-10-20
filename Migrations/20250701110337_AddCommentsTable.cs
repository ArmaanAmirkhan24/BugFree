using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugFree.Migrations
{
    /// <inheritdoc />
    public partial class AddCommentsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    column_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserComment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    project = table.Column<int>(type: "int", nullable: false),
                    commenter = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.column_id);
                    table.ForeignKey(
                        name: "FK_comments_AspNetUsers_commenter",
                        column: x => x.commenter,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_comments_projects_project",
                        column: x => x.project,
                        principalTable: "projects",
                        principalColumn: "project_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_comments_commenter",
                table: "comments",
                column: "commenter");

            migrationBuilder.CreateIndex(
                name: "IX_comments_project",
                table: "comments",
                column: "project");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comments");
        }
    }
}
