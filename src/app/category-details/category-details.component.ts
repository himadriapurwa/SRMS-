import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  data: any={
    table:[],
  }
 

  addCategory(){
    // $('#addcategoryModal').modal('show');
  }
  updateCategory(){
    // $('#updatecategoryModal').modal('show');
  }
  deleteCategory(){
    // $('#deletecategoryModal').modal('show');
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
              'GetCategoryAttendeeDetails',
              'http://schemas.cordys.com/himadri_srmWSP',
              {})
        
            .then((resp:any) => {
              that.data = that.hs.xmltojson(resp, 'himadri_attendee_master');

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
            // $('#categoryModal').modal('show');
          });
          return row;
        },
        columns: [
          {
            title: 'Category',
            data: 'himadri_category.category_name',
          },
          {
            title: 'Attendee',
            data: 'himadri_attendee.attendee',
          },
          {
            title: 'Attendee Type',
            data: 'attendee_type',
          }
        ],
      };

  }
  CopyData(data: Object | any[]) {
    //throw new Error('Method not implemented.');
  }
  }


