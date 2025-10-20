using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugFree.Migrations
{
    /// <inheritdoc />
    public partial class AddCommentsTableUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserComment",
                table: "comments",
                newName: "comment");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "comment",
                table: "comments",
                newName: "UserComment");
        }
    }
}
