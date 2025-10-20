using BugFree.Areas.Identity.Data;
using BugFree.Areas.Project.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BugFree.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
           
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            ProjectConfiguration(builder);
            TicketConfiguration(builder);
            MembershipConfiguration(builder);
            CommentConfiguration(builder);
        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Membership> Memberships { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public void ProjectConfiguration(ModelBuilder builder)
        {


            builder.Entity<Project>().HasOne<ApplicationUser>(e => e.Owner).WithMany(e => e.Projects).HasForeignKey(e => e.UserId).IsRequired();


            builder.Entity<Project>().Property(e => e.UserId).HasColumnName("owner_id");
            builder.Entity<Project>().Property(e => e.ProjectId).HasColumnName("project_Id");
            builder.Entity<Project>().Property(e => e.ProjectName).HasColumnName("project_name");


        }
        public void TicketConfiguration(ModelBuilder builder)
        {
            builder.Entity<Ticket>().
                HasOne(e => e.Project).WithMany(e => e.Tickets).HasForeignKey(e => e.ProjectId).IsRequired();
        }



        public void MembershipConfiguration(ModelBuilder builder)
        {
            builder.Entity<Membership>().HasKey(m => new {
                m.ProjectId,
                m.UserId,
            });

            builder.Entity<Project>().
                HasMany(e => e.Memberships).
                WithOne().
                HasForeignKey(e => e.ProjectId).IsRequired().OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ApplicationUser>().
                HasMany(e => e.Memberships).
                WithOne().
                HasForeignKey(e => e.UserId).IsRequired().OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Membership>().Property(e => e.UserId).HasColumnName("project_member");
            builder.Entity<Membership>().Property(e => e.ProjectId).HasColumnName("project");


        }
        public void CommentConfiguration(ModelBuilder builder)
        {
            builder.Entity<Comment>().
                HasOne(e => e.User).
                WithMany(e => e.Comments).
                HasForeignKey(e => e.UserId).
                OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Comment>().
                HasOne(e => e.Project).
                WithMany(e => e.Comments).
                HasForeignKey(e => e.ProjectId).
                OnDelete(DeleteBehavior.Restrict);
        }
    }
}
