using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee_Management_API.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string fullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public DateTime DateOfJoining { get; set; }
        
    }
}