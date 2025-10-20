using System.ComponentModel.DataAnnotations;

namespace BugFree.Areas.Project.Models
{
    public class DetailsViewModel
    {
        public IEnumerable<Ticket> tickets { get; set; }

        public Project project { get; set; }

    }
}
