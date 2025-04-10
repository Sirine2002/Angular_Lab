import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-model-evt',
  templateUrl: './model-evt.component.html',
  styleUrls: ['./model-evt.component.css']
})
export class ModelEvtComponent {
  constructor(public dialogRef:MatDialogRef<ModelEvtComponent>,@Inject(MAT_DIALOG_DATA) data:any){
    if(data){
      this.form=new FormGroup({
        titre:new FormControl(data.titre),
        dateDebut:new FormControl(data.dateDebut),
        dateFin:new FormControl(data.dateFin),
        lieu:new FormControl(data.lieu)
    });
    }
    else{
      this.form = new FormGroup({
              titre: new FormControl(null),
              dateDebut: new FormControl(null),
              dateFin: new FormControl(null),
              lieu: new FormControl(null)
            })
    }
  }
  //forçage de type boite 
  //déclarer form
  form!:FormGroup;

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
  //inisialiser form
}
