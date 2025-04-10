import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pub } from 'src/Modeles/Pub';
import { PubService } from 'src/Services/pub.service';
import { ModelEvtComponent } from '../model-evt/model-evt.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PubDetailsComponent } from '../pub-details/pub-details.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  constructor(private PS:PubService,private dialog:MatDialog) {  
    this.dataSource = new MatTableDataSource();
  }
  //dataSource:Pub[] = []
  dataSource!:MatTableDataSource<Pub>;
  displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'date', 'sourcePdf','actions'];
  ngOnInit(){
    this.fetch();
  }

  fetch(){
    this.PS.GetAllPubs().subscribe(
      (data) => {
        this.dataSource.data = data
      }
    )
  }

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openVis(id:string){
    //lançer ouverture de boite
    const x =  new MatDialogConfig(); 
    x.data=id;
    let dialogRef = this.dialog.open(PubDetailsComponent,x );
   
}

  // open(): void {
  //     //lançer ouverture de boite 
  //     let dialogRef = this.dialog.open(ModelEvtComponent, {
  //       height: '350px',
  //       width: '410px',
  //     });
  
  //     dialogRef.afterClosed().subscribe(
  //       data => {
  //         if (data) {
  //           {
  //             console.log("Dialog output:", data)
  //             this.PS.addPub(data).subscribe(() => {
  //               this.fetch()
  //             })
  //           }
  //         }
  //       }
  //     );
  //   }

}
