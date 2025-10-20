using BugFree.Areas.Identity.Data;
using BugFree.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BugFree.Areas.Project.Models;
using Microsoft.Build.Construction;
using Microsoft.CodeAnalysis.CSharp.Syntax;

using Microsoft.EntityFrameworkCore;

namespace BugFree.Areas.Project.Controllers
{
    [ApiController]
    [RequireHttps]
    [Route("projects")]
    public class ApiProjectController:Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _dbContext;
        public ApiProjectController(UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }









        [HttpPost("delete", Name = "deleteProject")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteProject([FromForm] int id)
        {
            var user = await GetCurrentUserAsync();
            BugFree.Areas.Project.Models.Project project = await _dbContext.Projects.FindAsync(id);
            if (project!=null && user.Id == project.UserId)
            {

                _dbContext.Projects.Remove(project);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            return Unauthorized();
        }






        [HttpPost("edit", Name = "editProject")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditProject([FromForm] int id, [FromForm] string name)
        {
          var user = await GetCurrentUserAsync();
          BugFree.Areas.Project.Models.Project project = await _dbContext.Projects.FindAsync(id);
            if (project != null && user.Id == project.UserId)
            {

                project.ProjectName = name;
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            return Unauthorized();

        }




        [HttpPost("tickets/add", Name = "addNewTicket")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AddTicket( [FromBody] Project.Models.RequestModels.TicketObject ticket)
        {
            var user = await GetCurrentUserAsync();
            
            Areas.Project.Models.Ticket newTicket = new Ticket
            {
            
                Category = ticket.Category,
                Description = ticket.Description,
                Deadline = ticket.Deadline,
                Priority = ticket.Priority,
                ProjectId = ticket.ProjectId

            };
            _dbContext.Tickets.Add(newTicket);
            await _dbContext.SaveChangesAsync();
            return Json(new {id = newTicket.Id ,category = newTicket.Category, description = newTicket.Description, deadline = newTicket.Deadline, priority = newTicket.Priority, projectId = newTicket.ProjectId, username = user?.UserName});
        }


        [HttpPost("tickets/delete" , Name = "deleteTicket" )]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteTicket([FromForm] int ticketId)
        {
            var user = await GetCurrentUserAsync();
            int userId = user.Id;
            BugFree.Areas.Project.Models.Ticket ticket = await _dbContext.Tickets.FindAsync(ticketId);
            BugFree.Areas.Project.Models.Project project = await _dbContext.Projects.FindAsync(ticket.ProjectId);
            if(ticket != null && project != null && project.UserId == userId )
            {
                _dbContext.Tickets.Remove(ticket);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            return Unauthorized();
        }


        [HttpPost("tickets/edit", Name = "editTicket")]
        [ValidateAntiForgeryToken]

        public async Task<ActionResult> EditTicket([FromBody] Project.Models.RequestModels.TicketObject ticketObject)
        {
            var user = await GetCurrentUserAsync();
            int userId = user.Id;
            var ticket = await _dbContext.Tickets.FindAsync(ticketObject.Id);
            var project = await _dbContext.Projects.FindAsync(ticket?.ProjectId);
            if (ticket != null && project != null && project.UserId == userId)
            {
                ticket.Category = ticketObject.Category;
                ticket.Description = ticketObject.Description;
                ticket.Deadline = ticketObject.Deadline;
                ticket.Priority = ticketObject.Priority;
                await _dbContext.SaveChangesAsync();
                return Json(ticketObject);

            }
            return Unauthorized();
        }

        private Task<ApplicationUser?> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
        
    }
}
