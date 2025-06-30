import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/emloyee.service';
import { Employee } from '../../model/employee.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit{

   employees: Employee[] = [];
   filteredEmployees: Employee[] = [];
   searchId: number | null = null;

  private employeeService =inject(EmployeeService)

   ngOnInit(): void {
    this.loadEmployees();
  }

   loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = [...data]; 
    });
  }

   searchEmployeeById(): void {
    if (this.searchId !== null) {
      this.employeeService.getEmployee(this.searchId).subscribe({
        next: (employee) => {
          this.filteredEmployees = [employee];
        },
        error: () => {
          this.filteredEmployees = [];
        }
      });
    }
    }

    clearSearch(): void {
    this.searchId = null;
    this.filteredEmployees = [...this.employees];
    }

    onSearchInputChange() {
      if (this.searchId === null || this.searchId === undefined || this.searchId === 0) {
        this.clearSearch();
      }
    }

    deleteEmployee(id: number) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          this.loadEmployees(); // mna3mel reload lal list men b3da
        });
      }
    }
}
