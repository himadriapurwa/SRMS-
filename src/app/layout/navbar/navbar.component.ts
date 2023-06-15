import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(){}
   active_class():any {
    $('li').on('click', function(){
      $('li').removeClass('active');
      $(this).toggleClass('active');
    })
  }
}


// $('li').on('click', function(){
//   $('li').removeClass('active');
//   $(this).toggleClass('active');
// })
