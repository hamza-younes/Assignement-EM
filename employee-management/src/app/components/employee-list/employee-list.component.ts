import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/emloyee.service';
import { Employee } from '../../model/employee.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit{

   employees: Employee[] = [];

  private employeeService =inject(EmployeeService)

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees(); // mna3mel reload lal list men b3da
      });
    }
  }
}
