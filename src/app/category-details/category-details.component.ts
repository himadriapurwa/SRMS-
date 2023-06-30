import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { ToastrService } from 'ngx-toastr';
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
  dataModal: any = {
   
    category: '',
    l1_attendee:'',
    l2_attendee:'',
    category_id:''
  
  };
  category_data: any=[];
  changed_category: any=[];
  l2: any=[];
  l1_attendee_data: any=[];
  
  selectedDiv: string='';
  attendee_data: any=[];
  cat_id: any;
  category_id: any;

  addCategory(){
    
    // $('#addcategoryModal').modal('show');
  }
  updateCategory(){
    // $('#updatecategoryModal').modal('show');
  }
  deleteCategory(){
    // $('#deletecategoryModal').modal('show');
  }
  category_change(event:any) {
    //  l1 attendee list
    this.changed_category =  event;
   console.log("a", this.changed_category)
    this.hs
    .ajax(
      'GetL1AttendeesListByCataegory',
      'http://schemas.cordys.com/himadri_srmWSP',
      {
        category_name: this.changed_category,
      }
    )
    .then((resp: any) => {
       this.l1_attendee_data = this.hs.xmltojson(resp, 'himadri_attendee');
       this.l1_attendee_data = Array.isArray(this.l1_attendee_data) ? this.l1_attendee_data : [this.l1_attendee_data];
       console.log(this.l1_attendee_data.length)
    });
     }

     l1_attendee_change(event:any){
      let changed_l1_attendee =  event;
      this.hs.ajax(
      'GetL2AttendeesListByCategory',
      'http://schemas.cordys.com/himadri_srmWSP',
      {category_name: this.changed_category, attendee: changed_l1_attendee})
    .then((resp: any) => {
       this.l2 = this.hs.xmltojson(resp, 'himadri_attendee');
       this.l2 = Array.isArray(this.l2) ? this.l2 : [this.l2];
      });
     }  

     saveAddCategory(){
      this.hs.ajax('UpdateHimadri_category','http://schemas.cordys.com/himadri_srmWSP',
        {
          tuple: {
            new: {
              himadri_category  : {
                category_name: this.dataModal.category,
              },
            },}, })
      .then((resp: any) => {this.toastr.success('New Category added Successfully');});

      this.hs.ajax('GetCategoryIdbyName','http://schemas.cordys.com/himadri_srmWSP',
      {
        tuple: {
          new: {
            himadri_category  : {
              category_name: this.dataModal.category,},
          },},})
    .then((resp: any) => {this.cat_id= this.hs.xmltojson(resp, 'himadri_category');
  this.category_id=this.cat_id.cat_id;
  });

    this.hs.ajax('UpdateHimadri_attendee_master','http://schemas.cordys.com/himadri_srmWSP',
    {
      tuple: {
        new: {
          himadri_attendee_master  : {
            category_id:this.category_id,
            attendee_id:this.dataModal.l1_attendee,
            attendee_type:'l1' },
        },},})
  .then((resp: any) => {});
    

  this.hs.ajax('UpdateHimadri_attendee_master','http://schemas.cordys.com/himadri_srmWSP',
  {
    tuple: {
      new: {
        himadri_attendee_master : {
          category_id:this.category_id,
          attendee_id:this.dataModal.l2_attendee,
          attendee_type:'l2' },
      },},})
.then((resp: any) => {});

  
  }

// UPDATE CATEGORY
     updateCat(){
  //     this.hs.ajax('GetCategoryIdbyName','http://schemas.cordys.com/himadri_srmWSP',
  //     {
  //             category_name: this.dataModal.category,},
  //         )
  //   .then((resp: any) => {this.cat_id= this.hs.xmltojson(resp, 'himadri_category');
  // console.log('respdd',this.category_id)});

    this.hs.ajax('UpdateHimadri_attendee_master','http://schemas.cordys.com/himadri_srmWSP',
    {
      tuple: {
        new: {
          himadri_attendee_master  : {
            category_id:this.dataModal.category_id,
            attendee_id:this.dataModal.l1_attendee,
            attendee_type:'l1' },
        },},})
  .then((resp: any) => {console.log("doneeee")});
    

  this.hs.ajax('UpdateHimadri_attendee_master','http://schemas.cordys.com/himadri_srmWSP',
  {
    tuple: {
      new: {
        himadri_attendee_master : {
          category_id:this.dataModal.category_id,
          attendee_id:this.dataModal.l2_attendee,
          attendee_type:'l2' },
      },},})
.then((resp: any) => {});

     }

    //  DELETE CATEGORY
     deleteCat(){
      this.hs.ajax('UpdateHimadri_category','http://schemas.cordys.com/himadri_srmWSP',
        {
          tuple: {
            old: {
              himadri_category  : {
                cat_id: this.dataModal.category_id,
              },
            },}, })
      .then((resp: any) => {this.toastr.success('Category Deleted Successfully'); 
      this.hs.ajax('GetAllCategoryDetails','http://schemas.cordys.com/himadri_srmWSP',{ })
      .then((resp: any) => {this.category_data = this.hs.xmltojson(resp, 'himadri_category');});
    }
      );
     }
    
     
     showDiv(divName: string) {
      this.selectedDiv = divName;
    }
    

    constructor(private hs: HeroService, private toastr: ToastrService){ }
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

      this.hs.ajax('GetAllCategoryDetails','http://schemas.cordys.com/himadri_srmWSP',{ })
      .then((resp: any) => {this.category_data = this.hs.xmltojson(resp, 'himadri_category');});
      
      this.hs.ajax('GetAllAttendeeDetails','http://schemas.cordys.com/himadri_srmWSP',{ })
      .then((resp: any) => {this.attendee_data = this.hs.xmltojson(resp, 'himadri_attendee');});
  }
  
  CopyData(data: Object | any[]) {
    //throw new Error('Method not implemented.');
  }
  }


