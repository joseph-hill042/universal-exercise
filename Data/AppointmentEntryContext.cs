using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AppointmentEntry.Models
{
    public class AppointmentEntryContext : DbContext
    {
        public AppointmentEntryContext (DbContextOptions<AppointmentEntryContext> options)
            : base(options)
        {
        }

        public DbSet<AppointmentEntry.Models.Appointment> Appointment { get; set; }
    }
}
