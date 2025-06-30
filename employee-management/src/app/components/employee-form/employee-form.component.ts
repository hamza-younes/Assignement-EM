import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/emloyee.service';
import { EmployeeCreateDTO } from '../../model/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {

  jobTitles = ['Software Engineer', 'Softwar Developer', 'Project Manager', 'QA Tester', 'Designer', 'HR Specialist']
  departments =['Engineering', 'Marketing', 'Human Resources', 'Finance', 'Operations', 'Uk31', 'Uk24', 'Uk23'] 


  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  employeeId?: number;
  isEditMode = false;
  
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    jobTitle: ['', Validators.required],
    department: ['', Validators.required],
    dateOfJoining: ['', Validators.required]
  });

  private formatDateForInput(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0]; // hay betchlna l T mnl l backend w betraje3a mni7a lal date
}

  constructor(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = +id;
      this.isEditMode = true;
      this.employeeService.getEmployee(this.employeeId).subscribe((employee) => {
        const [firstName, ...rest] = employee.fullName.split(' ');
        const lastName = rest.join(' ');
        this.form.patchValue({
          firstName,
          lastName,
          email: employee.email,
          jobTitle: employee.jobTitle,
          department: employee.department,
          dateOfJoining: this.formatDateForInput(employee.dateOfJoining),

        });
      });
    }
  }
onSubmit() {
  if (this.form.invalid) return;

  const formValue = this.form.value;
  const fullName = `${formValue.firstName} ${formValue.lastName}`.trim();

  const payload = {
    fullName,
    email: formValue.email!,
    jobTitle: formValue.jobTitle!,
    department: formValue.department!,
    dateOfJoining: formValue.dateOfJoining!,
  };

  if (this.isEditMode && this.employeeId) {
    this.employeeService.updateEmployee(this.employeeId, { id: this.employeeId, ...payload }).subscribe(() => {
      this.router.navigate(['/']);
    });
  } else {
    this.employeeService.addEmployee(payload).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

   
}
