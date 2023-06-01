import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-admin-approval-requests',
  templateUrl: './admin-approval-requests.component.html',
  styleUrls: ['./admin-approval-requests.component.css']
})
export class AdminApprovalRequestsComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  data: any={
    table:[],
  };
  editData: any = {
    category: '',
    issue_with: '',
    // document1: '',
  };
    constructor(private hs: HeroService){ }
    submit() {
      console.log('data', this.editData);
   }
    ngOnInit(): void {
      let that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5, 10, 15],
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
          $('td', row).on('click', () => {
            self.CopyData(data);
            console.log(data)
            // $('#mngrModal').modal('show');
          });
          return row;
        },
        columns: [
          {
            title: 'REQUEST ID',
            data: 'sr_id',
          },
          {
            title: 'STATUS',
            data: 'status',
          },
          
          
          {
            title: 'CATEGORY',
            data: 'category',
          },
         
          {
            title: 'DESCRIPTION',
            data: 'resolution_description',
          },
        ],
      };
  }
  CopyData(data: Object | any[]) {
  }
  }
