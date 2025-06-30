export interface Employee{
    id: number,
    fullName: string,
    email: string,
    jobTitle: string,
    department: string,
    dateOfJoining: string;
}

export interface NewEmployeePayload {
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
  dateOfJoining: string;
}

//optional la jareb chi
export interface EmployeeCreateDTO {
  firstName:string,
  lastName:string,
  email: string;
  jobTitle: string;
  department: string;
  dateOfJoining: string;
}

