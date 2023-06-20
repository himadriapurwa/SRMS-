import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  data: any = {
    username: 'himadri',
    password: 'himadri',
  };
  
  constructor(private router: Router, private hs: HeroService) { }
  login() {
    //  this.router.navigate(['/emp-raise-req'])
    
    console.log('data', this.data);
    $.cordys.authentication.sso
      .authenticate(this.data.username, this.data.password)
      .done((resp: any) => {
        console.log('Done');
      });
      console.log("logged in successfully with user :",this.data.username)
      this.hs._set('loggedInuser', this.data.username);
      this.router.navigate(['/attendee-pending-req']) 
      // debugger;
     
  }
  ngOnInit(): void {}
}

// ng g c layout
// ng g m layout/dashboard --route dashboard --module app.module

