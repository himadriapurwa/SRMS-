import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-attendee-ratings',
  templateUrl: './attendee-ratings.component.html',
  styleUrls: ['./attendee-ratings.component.css']
})

export class AttendeeRatingsComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  data: any={
    table:[],
  }
    constructor(private hs: HeroService){ }
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
              'GetAllAttendeeDetails',
              'http://schemas.cordys.com/himadri_srmWSP',
              {})
        
            .then((resp:any) => {
              that.data = that.hs.xmltojson(resp, 'himadri_attendee');
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
            title: 'Attendee',
            data: 'attendee',
          },
          {
            title: 'Attendee Email',
            data: 'attendee_email',
          },
        
          {
            title: 'Average Rating',
            data: 'avg_rating',
          }
        ],
      };
  }
  CopyData(data: Object | any[]) {
    //throw new Error('Method not implemented.');
  }
  }



