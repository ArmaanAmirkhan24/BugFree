using BugFree.Areas.Identity.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BugFree.Areas.Project.Models
{
    [Table("comments")]
    public class Comment
    {
        [Key]
        [Column("column_id")]
        public int CommentId { get; set; }
        [Required]
        [Column("comment")]
        public string? UserComment {  get; set; }

        [Required]

        [Column("project")]
        public int ProjectId { get; set; }

        [Required]

        [Column("commenter")]
        public int UserId { get; set; }

        [NotMapped]

        public virtual ApplicationUser?  User { get; set; }

        [NotMapped]

        public virtual Project? Project { get; set; }
        
    }
}
