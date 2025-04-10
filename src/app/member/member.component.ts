import { Component, OnInit } from '@angular/core';
import { Member } from 'src/Modeles/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',//nom eli 3tah framework le composant hedha bech tnajem t3ayetou fi page html
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  // dataSource : any = [
  //   {id:'1', cin:'11165887',name:'Sirine', type:'Etudiante',createdDate:'2021-05-12'},
  //   {id:'2', cin:'11126992',name:'Hanen', type:'Teacher',createdDate:'2021-05-12'}
  // ]; //dataSouce est un tableau vide de type any (tout type)

  //_____________________________________Après___________________________________________________

  dataSource: Member[] = []
  displayedColumns: string[] = ['id', 'name', 'cin', 'type', 'createdDate', 'actions'];
  //injection de dépendences: mécanisme qui permet au composant d'utiliser un service
  constructor(private MS: MemberService, private dialog: MatDialog) { }
  ngOnInit(): void {//se charge automatiquement lorsqu'on charge le composant
    this.MS.GetAllMembers().subscribe((data) => {
      this.dataSource = data //action
    })
  }
  delete(id: String) {
    //lançer la boite
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '250px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MS.deleteMemberById(id).subscribe(() => {
          //
          this.MS.GetAllMembers().subscribe((data) => {
            this.dataSource = data //action
          })
        })
      }
    });
    //tester le click si = confirm ou non

  }
}
