
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BugFree.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace BugFree.Areas.Project.Models
{
    [Table("projects")]
    public class Project
    {
       


        [Key]
        public int ProjectId { get; set; }



        [Required]
        public string? ProjectName { get; set; }
        
        public int UserId { get; set; }

        [NotMapped]
        public virtual ApplicationUser? Owner { get; set; }
        [NotMapped]
        public virtual ICollection<Ticket>? Tickets { get; set; }
        [NotMapped]
        public virtual ICollection<Membership>? Memberships { get; set; }
        [NotMapped]
        public virtual ICollection<Comment>? Comments { get; set; }


    }
}
