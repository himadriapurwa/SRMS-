import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-raise-request',
  templateUrl: './raise-request.component.html',
  styleUrls: ['./raise-request.component.css']
})
export class RaiseRequestComponent implements OnInit{

  data: any = {
    name: '',
    email: '',
    number: '',
  };
  
  constructor(private router: Router) { }
  submit() {
     this.router.navigate(['/dashboard'])
     console.log('data', this.data);
    
  }
  ngOnInit(): void {}
}

// ng g c layout
// ng g m layout/dashboard --route dashboard --module app.module

