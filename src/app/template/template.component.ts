import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  constructor(private router: Router){}
  title = 'lab';
  isLogin:boolean = false;
  
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Ne capture que les fins de navigation
    ).subscribe((event: any) => {
      this.isLogin =(event.url.includes('/login')); // Vérifie si l'URL contient '/login'
      console.log('isLogin:', this.isLogin);
    });
  }

}
