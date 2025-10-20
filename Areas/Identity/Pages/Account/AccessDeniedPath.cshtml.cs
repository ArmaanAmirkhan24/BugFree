using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BugFree.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class AccessDeniedPathModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
