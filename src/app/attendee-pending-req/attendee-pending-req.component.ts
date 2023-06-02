import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-attendee-pending-req',
  templateUrl: './attendee-pending-req.component.html',
  styleUrls: ['./attendee-pending-req.component.css']
})
export class AttendeePendingReqComponent implements OnInit{
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
              'GetAttendeeRequests',
              'http://schemas.cordys.com/himadri_srmWSP',
              {l1_attendee:'himadri',l2_attendee:'himadri'})
        
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
            title: 'L1 ATTENDEE',
            data: 'l1_attendee',
          },
        
          {
            title: 'L2 ATTENDEE',
            data: 'l2_attendee',
          },
          {
            title: 'CATEGORY',
            data: 'category',
          },
          {
            title: 'PRIORITY',
            data: 'priority',
          },
          {
            title: 'STATUS',
            data: 'status',
          },
          
        ],
      };
  }
  CopyData(data: Object | any[]) {
    //throw new Error('Method not implemented.');
  }
  }




