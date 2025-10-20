using BugFree.Areas.Identity.Data;
using BugFree.Areas.Project.Models;
using BugFree.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Construction;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace BugFree.Areas.Project.Controllers
{
    [Area("Project")]
    [RequireHttps]
    public class ProjectController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _dbContext;
        public ProjectController(UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult> All()

        {
            
            Console.WriteLine("Hey boys");
            var user = await GetCurrentUserAsync();

            var projects = await _dbContext.Projects.Where<Models.Project>(p => p.UserId == user.Id).ToListAsync<Models.Project>();
            
           
            return View(projects);
        }
        [HttpGet]
        public async Task<ActionResult> Details(int id)
        {
            var user = await GetCurrentUserAsync();
            BugFree.Areas.Project.Models.Project projectData = await _dbContext.Projects.FindAsync(id);
            
            if (projectData != null && projectData.UserId == user?.Id)
            {
                DetailsViewModel detailsViewData = new DetailsViewModel();
                var ticketData = await _dbContext.Tickets.Where<Ticket>(r => r.ProjectId == id).ToListAsync<Ticket>();
                detailsViewData.tickets = ticketData;
                detailsViewData.project = projectData;
                return View(detailsViewData);
            }
            else

               return Unauthorized();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> All(string projectName)
        {
            var user = await GetCurrentUserAsync();
            var userId = user.Id;

            BugFree.Areas.Project.Models.Project project = new Models.Project { ProjectName = projectName, UserId = userId };
            _dbContext.Projects.Add(project);
            if (String.IsNullOrWhiteSpace(projectName))
                projectName = "n/a";
            await _dbContext.SaveChangesAsync();
            var projects = await _dbContext.Projects.Where<Models.Project>(p => p.UserId == userId).ToListAsync<Models.Project>();
            return View(projects);
        }
        
        
        private Task<ApplicationUser?> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}
