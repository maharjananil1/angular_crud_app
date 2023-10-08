import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../core/core.service";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  educations: string[] = [
    'SEE',
    'Intermidate',
    'Bachelors',
    'Masters'
  ]

  constructor(private _fb: FormBuilder,
              private _empService: EmployeeService,
              private _dialogRef: MatDialogRef<EmpAddEditComponent>,
              private _coreService:CoreService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = _fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  ngOnInit() {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (res: any) => {
            this._coreService.openSnackBar("Employee Updated",'done');
            this._dialogRef.close(true);
          }, error: console.error
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Employee Added",'done');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }

}
