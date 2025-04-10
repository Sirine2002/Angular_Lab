import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/Modeles/Evt';
import { EventService } from 'src/Services/event.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModelEvtComponent } from '../model-evt/model-evt.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']

})
export class EventComponent implements OnInit, AfterViewInit {

  dataSource!: MatTableDataSource<Evt>;
  displayedColumns: string[] = ['id', 'titre', 'dateDebut', 'dateFin', 'lieu', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ES: EventService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit() {
    this.fetchdata()
  }
  fetchdata(): void {
    this.ES.GetAllEvent().subscribe((data) => {
      this.dataSource.data = data;
    })
  }
  ngAfterViewInit() { //se lançe automatiquement
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  open(): void {
    //lançer ouverture de boite 
    let dialogRef = this.dialog.open(ModelEvtComponent, {
      height: '350px',
      width: '410px',
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          {
            console.log("Dialog output:", data)
            this.ES.addEvent(data).subscribe(() => {
              this.fetchdata()
            })
          }
        }
      }
    );
  }
  openedit(id: string): void {
    const dialogConfig = new MatDialogConfig();
    this.ES.getEventById(id).subscribe((evtRecupere) => {
      //envoyer evtRecupere vers la boite
      dialogConfig.data = evtRecupere;
      let dialogRef = this.dialog.open(ModelEvtComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        (data) => {
          if (data) {
            this.ES.updateEvent(data, id).subscribe(() => {
              this.fetchdata();
            })
          }
        }
      )
    })
  }
  delete(id: string): void {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.ES.deleteEvent(id).subscribe(() => {
            this.fetchdata();
          })
        }

      }
    )
  }
}
