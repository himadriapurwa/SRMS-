import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-raise-req',
  templateUrl: './emp-raise-req.component.html',
  styleUrls: ['./emp-raise-req.component.css']
})
export class EmpRaiseReqComponent implements OnInit{

  data: any = {
    name: '',
    email: '',
    number: '',
  };     
  constructor() { }
  submit() {
     //this.router.navigate(['/dashboard'])
     console.log('data', this.data);
  }
  ngOnInit(): void {}
}