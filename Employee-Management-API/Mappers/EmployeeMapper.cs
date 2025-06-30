using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Employee_Management_API.DTO;
using Employee_Management_API.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Employee_Management_API.Mappers
{
    public static class EmployeeMapper
    {
        public static EmployeeDto ToEmployeeDto(this Employee employeeDto) {
            return new EmployeeDto
            {
                Id = employeeDto.Id,
                fullName = employeeDto.fullName,
                Email = employeeDto.Email,
                JobTitle = employeeDto.JobTitle,
                Department = employeeDto.Department,
                DateOfJoining = employeeDto.DateOfJoining
            };
        }
        
        public static Employee ToEmployeeFromCreateDto(this CreateEmployeeDto EmployeeDto)
        {
            return new Employee
            {
                fullName = EmployeeDto.fullName,
                Email = EmployeeDto.Email,
                JobTitle = EmployeeDto.JobTitle,
                Department = EmployeeDto.Department,
                DateOfJoining = EmployeeDto.DateOfJoining
            };
        }
    }
}