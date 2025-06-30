using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Employee_Management_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Employee_Management_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Employee> Employees{ get; set; }
    }
}