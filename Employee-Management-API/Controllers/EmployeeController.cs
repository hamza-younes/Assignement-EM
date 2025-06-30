using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Employee_Management_API.DTO;
using Employee_Management_API.Interfaces;
using Employee_Management_API.Mappers;
using Employee_Management_API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Employee_Management_API.Controllers
{

    [ApiController]
    [Route("api/employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepo;
        public EmployeeController(IEmployeeRepository employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _employeeRepo.GetAllAsync();
            return Ok(employees);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var employees = await _employeeRepo.GetByIdAsync(id);

            if (employees == null)
            {
                return NotFound();
            }

            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEmployeeDto employeeDto)
        {
            var employeeModel = employeeDto.ToEmployeeFromCreateDto();
            await _employeeRepo.CreateAsync(employeeModel);
            return CreatedAtAction(nameof(GetById), new { id = employeeModel.Id }, employeeModel.ToEmployeeDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateEmployeeDto UpdateDto)
        {
            var employeeModel = await _employeeRepo.UpdateAsync(id, UpdateDto);

            if (employeeModel == null)
            {
                return NotFound();
            }
            return Ok(employeeModel.ToEmployeeDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var employeeModel = await _employeeRepo.DeleteAsync(id);

            if (employeeModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}