

using static BugFree.Areas.Project.Models.Ticket;

namespace BugFree.Areas.Project.Models.RequestModels

{
    public class TicketObject
    {
        
        public int Id { get; set; }
        public string Category { get; set; }

        public string Description { get; set; }

        public DateTime Deadline { get; set; }

        public string Priority { get; set; } 
        
        public int ProjectId { get; set; }



    }
}
