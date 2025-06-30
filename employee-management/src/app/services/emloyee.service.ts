import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, NewEmployeePayload } from '../model/employee.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5249/api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(emp: NewEmployeePayload): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, emp);
  }

  updateEmployee(id: number, emp: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, emp);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}