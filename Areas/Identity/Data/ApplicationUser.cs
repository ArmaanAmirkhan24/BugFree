using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using BugFree.Areas.Project.Models;
using Microsoft.AspNetCore.Identity;

namespace BugFree.Areas.Identity.Data
{

    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser<int>
    {
        [NotMapped]
        public virtual ICollection<Membership>? Memberships { get; set; }

        [NotMapped]
        public virtual ICollection<Comment>? Comments { get; set; }

        [NotMapped]

        public virtual ICollection<BugFree.Areas.Project.Models.Project>? Projects { get; set; }
    }


}