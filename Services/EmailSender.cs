using Microsoft.AspNetCore.Identity.UI.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
namespace BugFree.Services
{
    public class EmailSender : IEmailSender
    {
        public async Task SendEmailAsync(string emailaddress, string subject, string htmlMessage)
        {
            try
            {
                String smtpServer = "smtp.gmail.com";
                int port = 587;
                var fromMail = "examemailforportfolio3@gmail.com";
                var password = "lgbu ajkv gdyu ryzq";

                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("BugFree Support", fromMail));
                email.To.Add(new MailboxAddress(emailaddress, emailaddress));
                email.Subject = subject;
                email.Body = new TextPart("html") { Text = htmlMessage };

                using var smtp = new SmtpClient();
                await smtp.ConnectAsync(smtpServer, port, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(fromMail, password);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);

               
            }
            catch (Exception ex)
            {
             
            }
        }
    }
}
