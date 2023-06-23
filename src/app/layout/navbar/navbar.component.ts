import { Component } from '@angular/core';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userDetails: any;
  a: any;
  constructor(private hs: HeroService){}


   active_class():any {
    $('li').on('click', function(){
      $('li').removeClass('active');
      // $(this).toggleClass('active');
    })
  }
  ngOnInit(): void {
  this.hs
  .ajax(
    'GetUserDetails',
    'http://schemas.cordys.com/UserManagement/1.0/User',
    {}
  )
  .then((resp: any) => {
    this.userDetails = this.hs.xmltojson(resp, 'User');
    console.log('userDetails', this.userDetails);
    this.a = this.userDetails.UserName;
    console.log('a', this.a);
  });
  }


}

