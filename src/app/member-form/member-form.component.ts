import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  constructor(private MS: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { } //injection de dépendence

  form!: FormGroup; // permet d'initialiser bel type mte3ou elli bech tektbou
  ngOnInit() {
    //1. récupérer la route avtive
    const idCourant = this.activatedRoute.snapshot.params['id']
    console.log("idCourant : ", idCourant)
    //2. chercher id dans la route 
    //3. if id existe => je suis dans edit: GetMemberById ()
    if (idCourant) {
      this.MS.GetMemberById(idCourant).subscribe((a) => {
        this.form = new FormGroup({
          cin: new FormControl(a.cin, [Validators.required]),
          name: new FormControl(a.name, [Validators.required]),
          type: new FormControl(a.type),
          createdDate: new FormControl(a.createdDate)
        })
      }
      )
    }
    //4. else => je suis dans create
    else {
      this.form = new FormGroup({
        cin: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        type: new FormControl(null),
        createdDate: new FormControl(null)
      })
    }

  }
  onsub(): void {
    const idCourant=this.activatedRoute.snapshot.params['id']
    if(idCourant){
      this.MS.updateMember(idCourant,this.form.value).subscribe(() => {
        //redirection vers le path
        this.router.navigate([''])
      })
    }else{
    console.log(this.form.value);
    this.MS.addMember(this.form.value).subscribe(() => {
      //redirection vers le path
      this.router.navigate([''])
    })
  }
  }


}
