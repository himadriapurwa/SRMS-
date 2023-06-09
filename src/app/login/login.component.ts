import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private router: Router) { }
  login() {
     this.router.navigate(['/emp-raise-req'])
    console.log('data', this.data);
    $.cordys.authentication.sso
      .authenticate(this.data.username, this.data.password)
      .done((resp: any) => {
        console.log('Done');
      }); 
      console.log("logged in successfully")
  }
  ngOnInit(): void {}
}

// ng g c layout
// ng g m layout/dashboard --route dashboard --module app.module

