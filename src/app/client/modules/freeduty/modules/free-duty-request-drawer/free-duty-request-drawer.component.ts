import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {tap} from 'rxjs';

@Component({
  selector: 'mib-free-duty-request-drawer',
  templateUrl: './free-duty-request-drawer.component.html',
  styleUrls: ['./free-duty-request-drawer.component.scss']
})
export class FreeDutyRequestDrawerComponent implements OnInit {

  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<FreeDutyRequestDrawerComponent>,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      selected: ['test']
    })
    this.form.valueChanges.pipe(
      tap((val) => {
        console.log(val)
      })
    ).subscribe()
  }
}
