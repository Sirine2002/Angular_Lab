import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-pub-modal',
  templateUrl: './pub-modal.component.html',
  styleUrls: ['./pub-modal.component.css']
})
export class PubModalComponent {
  constructor( private dialogRef:MatDialogRef<PubModalComponent>) { 
    this.form=new FormGroup({
      titre:new FormControl(''),
      lien:new FormControl(''),
      type:new FormControl(''),
      sourcePdf:new FormControl(''),
      date:new FormControl(''),
    })
  }
  form!: FormGroup;
  save(){
    this.dialogRef.close(this.form.value);
  }
  close(){
    this.dialogRef.close();
  }
selectedValue!: string ;
  
  

  foods: Food[] = [
    {value: 'conf', viewValue: 'conf'},
    {value: 'journal', viewValue: 'journal'},
    {value: 'workshop', viewValue: 'workshop'},
  ];

}
