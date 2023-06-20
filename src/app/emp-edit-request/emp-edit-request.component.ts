import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

declare var $:any;

@Component({
  selector: 'app-emp-edit-request',
  templateUrl: './emp-edit-request.component.html',
  styleUrls: ['./emp-edit-request.component.css']
})


export class EmpEditRequestComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  issue_with = '';
  category = '';
  sr_id='';
  data: any={
    table:[],
  };
  category_data: any=[];
  l2_attendee_data:any=[];
  editData: any = {
    category: '',
    issue_with: '',
    // document1: '',
  };
    constructor(private hs: HeroService){ }
    submit() {
      console.log('data', this.editData);

      
   }
   
   someClickHandler(info: any): void {
    this.issue_with = info.issue_with;
    this.category = info.category;
    this.sr_id = info.sr_id;
  }

    ngOnInit(): void {
      let that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 8,
        lengthMenu: [5, 8, 15],
        processing: true,
  
        ajax: (dataTablesParameters: any, callback) => {
          that.hs
            .ajax(
              'GetRequestsForApprovalOfAdmin',
              'http://schemas.cordys.com/himadri_srmWSP',
              {})
        
            .then((resp:any) => {
              that.data = that.hs.xmltojson(resp, 'himadri_request_approval');
              that.data = Array.isArray(that.data)
            ? that.data
            : [that.data];
              callback({
                recordsTotal: that.data.length,
                recordsFiltered: that.data.length,
                data: that.data,
              });
              console.log('Data = ', that.data);
            });
        },
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).off('click');
          $('td', row).on('click', function(){
            self.CopyData(data);
            self.someClickHandler(data);
            console.log(data)
            $('#exampleModal').modal('show');
            console.log(index,'index');
          }
          );
          return row;
        },
        
        columns: [
          {
            title: 'Request Id',
            data: 'sr_id',
          },
          {
            title: 'Status',
            data: 'status',
          },
          {
            title: 'Category',
            data: 'category',
          },
         
          {
            title: 'Issue With',
            data: 'issue_with',
          },
          {
            title: 'Action',
          render:function() {
            return `<button type="button" class="btn btn-link p-0" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit icon"></i></button>`;
          }}
        ],
      };


      // dropdown for category
      this.hs
      .ajax(
        'GetAllCategoryDetails',
        'http://schemas.cordys.com/himadri_srmWSP',
        {
        }
      )
      .then((resp: any) => {
         this.category_data = this.hs.xmltojson(resp, 'himadri_category');});
  }
  CopyData(data: Object | any[]) {
  }
  }




