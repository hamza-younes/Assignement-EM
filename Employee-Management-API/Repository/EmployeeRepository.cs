using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Employee_Management_API.Data;
using Employee_Management_API.DTO;
using Employee_Management_API.Interfaces;
using Employee_Management_API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Employee_Management_API.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly ApplicationDbContext _context;
        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        
        public async Task<Employee> CreateAsync(Employee employeeModel)
        {
            await _context.Employees.AddAsync(employeeModel);
            await _context.SaveChangesAsync();
            return employeeModel;
        }

        public async Task<Employee?> DeleteAsync(int id)
        {
            var employeeModel = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (employeeModel == null)
            {
                return null;
            }

            _context.Employees.Remove(employeeModel);
            await _context.SaveChangesAsync();
            return employeeModel;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        public async Task<Employee?> UpdateAsync(int id, UpdateEmployeeDto employeeDto)
        {
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (existingEmployee == null)
            {
                return null;
            }

            existingEmployee.fullName = employeeDto.fullName;
            existingEmployee.Email = employeeDto.Email;
            existingEmployee.JobTitle = employeeDto.JobTitle;
            existingEmployee.Department = employeeDto.Department;
            existingEmployee.DateOfJoining = employeeDto.DateOfJoining;

            await _context.SaveChangesAsync();

            return existingEmployee;
        }
    }
}