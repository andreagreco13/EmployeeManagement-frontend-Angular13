import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee = new Employee();
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
    this.employeeService.
      getEmployeeById(this.id).subscribe({
        next: (data) => this.employee = data,
        error: (e) => console.log(e)
      });
    }

    onSubmit(){
      this.employeeService.
        updateEmployee(this.id, this.employee).subscribe({
          next: () => this.goToEmployList(),
          error: (e) => console.log(e)
        });
    }

    goToEmployList(){
      this.router.navigate(['/employees']);
    }

  }
