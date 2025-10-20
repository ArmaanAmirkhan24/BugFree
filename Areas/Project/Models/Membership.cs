using System.ComponentModel.DataAnnotations.Schema;

namespace BugFree.Areas.Project.Models
{
    public class Membership
    {
        public int UserId { get; set; }

        public int ProjectId { get; set; }

        [NotMapped]
        public virtual Ticket? Ticket { get; set; }

        [NotMapped]
        public virtual Project? Project { get; set; }


    }
}
