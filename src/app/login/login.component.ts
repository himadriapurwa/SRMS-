import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { ToastrService } from 'ngx-toastr';

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
    
    console.log('data', this.data);
    $.cordys.authentication.sso
      .authenticate(this.data.username, this.data.password)
      .done((resp: any) => {
        console.log('Done');
            $.cordys.ajax({
                  method: 'GetUserDetails',
                  namespace: 'http://schemas.cordys.com/UserManagement/1.0/Organization',
                  dataType: '* json',
                  
                }).done((resp:any)=>{
          
                  var x = $.cordys.json.findObjects(resp,"Role");
                  
                  for (let index = 0; index < x.length; index++) {
                   
                    if(x[index].text=="SRMS_Admin"){
                     this.router.navigate(['/admin-approval-requests']);
        }
                    if(x[index].text=="SRMS_Employee"){
                     this.router.navigate(['/emp-raise-req']);
                    }
                    if(x[index].text=="SRMS_L1_Attendee"){
             this.router.navigate(['/attendee-pending-req']);
          
                    }
                  if(x[index].text=="SRMS_L2_Attendee"){
                   this.router.navigate(['/attendee-pending-req']);
                    }
           }
                })
                }
               );
      ;
      console.log("logged in successfully with user :",this.data.username)
      this.hs._set('loggedInuser', this.data.username);
      
      setTimeout(() => {
        // this.router.navigate(['/attendee-pending-req']) 
        
    }, 5000);
      // debugger;
     
  }
  ngOnInit(): void {}
}

// ng g c layout
// ng g m layout/dashboard --route dashboard --module app.module

