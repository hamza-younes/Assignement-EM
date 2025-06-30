using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Employee_Management_API.DTO;
using Employee_Management_API.Models;

namespace Employee_Management_API.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee> CreateAsync(Employee employeeModel);
         Task<Employee?> UpdateAsync(int id, UpdateEmployeeDto employeeDto);
         Task<Employee?> DeleteAsync(int id);
    }
}