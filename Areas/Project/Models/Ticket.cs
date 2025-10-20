
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BugFree.Areas.Project.Models
{
    public class Ticket

    {
      
      


        [Key]
        public  int Id { get; set; }
        [Required]
        [Column("category")]
        public string? Category { get; set; }

        [Required]
        [Column("description")]
        public string? Description { get; set; }

        [Required]
        [Column("deadline")]
        public DateTime Deadline { get; set; }

        [Required]
        [Column("priority")]
        public string Priority { get; set; }

        [Required]
        [Column("project_id")]

        public int ProjectId { get; set; }
        

        [NotMapped]
        public virtual Project? Project {  get; set; } 

        


    }
}
