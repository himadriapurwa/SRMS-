import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-emp-history',
  templateUrl: './emp-history.component.html',
  styleUrls: ['./emp-history.component.css']
})
export class EmpHistoryComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  data: any={
    table:[],
  }
    constructor(private hs: HeroService){ }
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
              'GetAllApprovalRequestDetailsSearch',
              'http://schemas.cordys.com/himadri_srmWSP',
              {category:'',status:''})
        
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
          $('td', row).on('click', () => {
            self.CopyData(data);
            console.log(data)
            // $('#mngrModal').modal('show');
          });
          return row;
        },
        columns: [
          {
            title: 'Request Id',
            data: 'sr_id',
          },
          {
            title: 'Issue With',
            data: 'issue_with',
          },
        
          {
            title: 'Category',
            data: 'category',
          },
          {
            title: 'Priority',
            data: 'priority',
          },
          {
            title: 'Status',
            data:'status',
          render:function(data, type, row) {
            if(data=="Pending with Admin"){
              return `<span class="badge rounded-pill text-bg-primary">Pending with Admin</span>`;
            }
            else if(data=="InProgress with L1 Attendee"){
              return `<span class="badge badge-pill badge-primary">InProgress with L1 Attendee</span>`; 
            }
            else if(data=="Initiated"){
              return `<span class="badge badge-pill badge-primary">Initiated</span>`; 
            }
            else if(data=="Rejected"){
              return `<span class="badge badge-pill badge-primary">Rejected</span>`; 
            }
            else if(data=="Rejected"){
              return `<span class="badge badge-pill badge-primary">Rejected</span>`; 
            }
            else if(data=="Rejected"){
              return `<span class="badge badge-pill badge-primary">Rejected</span>`; 
            }
            else if(data=="Rejected"){
              return `<span class="badge badge-pill badge-primary">Rejected</span>`; 
            }
            
            return `<span class="badge badge-pill badge-primary">Resolved</span>`;
           

          }
        },
          {
            title: 'Resolution',
            data: 'resolution_description',
          },
        ],
      };
  }
  CopyData(data: Object | any[]) {
    //throw new Error('Method not implemented.');
  }
  }



