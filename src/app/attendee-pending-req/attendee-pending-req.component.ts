import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
declare var $: any;
@Component({
  selector: 'app-attendee-pending-req',
  templateUrl: './attendee-pending-req.component.html',
  styleUrls: ['./attendee-pending-req.component.css'],
})
export class AttendeePendingReqComponent implements OnInit {
  visible:boolean = false
  visibleTranferForm:boolean=false
  sr_id: any;
  requester_name: any;
  number: any;
  email: any;
  category: any;
  priority: any;
  issue_with: any;
  l2_attendee: any;
  status: any;
  changed_category: any;
  req_id: any;
  req_id_approval: any;
  task_id: any;
  dtOptions: DataTables.Settings = {};
  l2:any = [];
  l1_attendee_data: any=[];
  priority_data: any=[];

flag:any="";
  dataModal: any = {
    email: '',
    number: '',
    category: '',
    l1_attendee: '',
    l2_attendee: '',
    remarks: '',
    resolution_description:'',
    issue_resolution:''
  };

  data: any = {
    table: [],
  };
  Copy_Data: any;
  l1_attendee: any;
  userDetails: any;
  a: any;
  category_data: any;
  data1: any={};

  saveChanges() {

    if(this.flag=='resolve'){
      console.log('changes saved');
      this.hs
      .ajax(
        'UpdateHimadri_request_approval',
        'http://schemas.cordys.com/himadri_srmWSP',
        {
          tuple: {
            old:{ himadri_request_approval :{
              request_id:this.req_id_approval
            }
            },
            new: {
              himadri_request_approval : {
                status : 'Pending with L2 Attendee',
                resolution_description: this.dataModal.resolution_description,
                issue_resolution:this.dataModal.issue_resolution,
              },
            },
          },
        }
      )
      .then((resp: any) => {
        this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
      }); 
    }
    else if(this.flag=='transfer')
  {
    this.hs
    .ajax(
      'UpdateHimadri_request_approval',
      'http://schemas.cordys.com/himadri_srmWSP',
      {
        tuple: {
          old: {
            himadri_request_approval: {
              request_id: this.req_id_approval,
            },
          },
          new: {
            himadri_request_approval: {
              l1_remarks: this.dataModal.remarks,
              status: 'Initiated',
              category:this.dataModal.category,
              l1_attendee:this.dataModal.l1_attendee,
              l2_attendee:this.dataModal.l2_attendee
            },
          },
        },
      }
    )
    .then((resp: any) => {
      this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
    });
  }  

    this.hs
    .ajax(
      'PerformTaskAction',
      'http://schemas.cordys.com/notification/workflow/1.0',
      { TaskId: this.task_id, Action: 'COMPLETE' }
    )
    .then((resp) => {
      console.log('resp : ', resp);
      console.log('task_id', this.task_id);
    });
    $('#exampleModal').modal('hide');

}     


  pending() {
    console.log('pending request');
    if (this.dataModal.remarks != '') {
      
      this.hs
        .ajax(
          'UpdateHimadri_request_approval',
          'http://schemas.cordys.com/himadri_srmWSP',
          {
            tuple: {
              old: {
                himadri_request_approval: {
                  request_id: this.req_id_approval,
                },
              },
              new: {
                himadri_request_approval: {
                  l1_remarks: this.dataModal.remarks,
                  status: 'InProgress with L1 Attendee',
                },
              },
            },
          }
        )
        .then((resp: any) => {
          // this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
        });

        this.hs
        .ajax(
          'l1_sla_over',
          'http://schemas.cordys.com/default',
          {sr_id:this.sr_id}
        )
        .then((resp: any) => {console.log("SLA time started")});

        (<HTMLInputElement> document.getElementById("transferbtn")).disabled = true;
        (<HTMLInputElement> document.getElementById("cancelbtn")).disabled = true;
        (<HTMLInputElement> document.getElementById("pendingbtn")).disabled = true;
        // (<HTMLInputElement> document.getElementById("reso")).visibility = true;
      // $('#attendee-table').DataTable().ajax.reload();
    } else {
      console.log('enter remarks');
    }
  }

  // setting status pending and store remarks of l1

  resolve_request() {
    if (this.dataModal.remarks != '') {
      this.flag="resolve";
    console.log('request resolved');

    // $('#exampleModal').modal('hide');
    // $('#resolveModal').modal('show');
  } else {
    console.log('enter remarks');
  } 
  this.visible = !this.visible;
  (<HTMLInputElement> document.getElementById("transferbtn")).disabled = true;
  (<HTMLInputElement> document.getElementById("cancelbtn")).disabled = true;
  (<HTMLInputElement> document.getElementById("pendingbtn")).disabled = true;
  //
    // show groupbox
  }


  tranfer_request() {
    if (this.dataModal.remarks != '') {
      this.visibleTranferForm = !this.visibleTranferForm;
      this.flag='transfer';
      // hide the btn save changes and replace transefersaveChanges
        (<HTMLInputElement> document.getElementById("resolveBtn")).disabled = true;
        (<HTMLInputElement> document.getElementById("cancelbtn")).disabled = true;
        (<HTMLInputElement> document.getElementById("pendingbtn")).disabled = true;
    } else {
      console.log('enter remarks');
    }
    // show transfergroupbox
  }

  cancel_request() {
    console.log('request cancelled');
    if (this.dataModal.remarks != '') {
      this.hs
        .ajax(
          'UpdateHimadri_request_approval',
          'http://schemas.cordys.com/himadri_srmWSP',
          {
            tuple: {
              old: {
                himadri_request_approval: {
                  request_id: this.req_id_approval,
                },
              },
              new: {
                himadri_request_approval: {
                  l1_remarks: this.dataModal.remarks,
                  status: 'Rejected',
                },
              },
            },
          }
        )
        .then((resp: any) => {
          this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
        });

      this.hs
        .ajax(
          'PerformTaskAction',
          'http://schemas.cordys.com/notification/workflow/1.0',
          { TaskId: this.task_id, Action: 'COMPLETE' }
        )
        .then((resp) => {
          console.log('resp : ', resp);
          console.log('task_id', this.task_id);
        });
    } else {

      console.log('enter remarks');
    }
  }


  resolved_request(){
    if (this.dataModal.remarks != '') {
      this.hs
        .ajax(
          'UpdateHimadri_request_approval',
          'http://schemas.cordys.com/himadri_srmWSP',
          {
            tuple: {
              old: {
                himadri_request_approval: {
                  request_id: this.req_id_approval,
                },
              },
              new: {
                himadri_request_approval: {
                  l2_remarks: this.dataModal.remarks,
                  status: 'Resolved',
                },
              },
            },
          }
        )
        .then((resp: any) => {
          this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
        });
    
  } else {
    console.log('enter remarks');
  } 

  this.hs
  .ajax(
    'PerformTaskAction',
    'http://schemas.cordys.com/notification/workflow/1.0',
    { TaskId: this.task_id, Action: 'COMPLETE' }
  )
  .then((resp) => {
    console.log('resp : ', resp);
    console.log('task_id', this.task_id);
  });
  $('#l2_modal').modal('hide');
  }

  resend(){
    if (this.dataModal.remarks != '') {
      this.hs
        .ajax(
          'UpdateHimadri_request_approval',
          'http://schemas.cordys.com/himadri_srmWSP',
          {
            tuple: {
              old: {
                himadri_request_approval: {
                  request_id: this.req_id_approval,
                },
              },
              new: {
                himadri_request_approval: {
                  l2_remarks: this.dataModal.remarks,
                  status: 'Initiated',
                },
              },
            },
          }
        )
        .then((resp: any) => {
          this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
        });
    
  } else {
    console.log('enter remarks');
  } 

  this.hs
  .ajax(
    'PerformTaskAction',
    'http://schemas.cordys.com/notification/workflow/1.0',
    { TaskId: this.task_id, Action: 'COMPLETE' }
  )
  .then((resp) => {
    console.log('resp : ', resp);
    console.log('task_id', this.task_id);
  });
  $('#l2_modal').modal('hide');

}

   reject_request(){
    if (this.dataModal.remarks != '') {
      this.hs
        .ajax(
          'UpdateHimadri_request_approval',
          'http://schemas.cordys.com/himadri_srmWSP',
          {
            tuple: {
              old: {
                himadri_request_approval: {
                  request_id: this.req_id_approval,
                },
              },
              new: {
                himadri_request_approval: {
                  l2_remarks: this.dataModal.remarks,
                  status: 'Rejected',
                },
              },
            },
          }
        )
        .then((resp: any) => {
          this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
        });
    
  } else {
    console.log('enter remarks');
  } 

  this.hs
  .ajax(
    'PerformTaskAction',
    'http://schemas.cordys.com/notification/workflow/1.0',
    { TaskId: this.task_id, Action: 'COMPLETE' }
  )
  .then((resp) => {
    console.log('resp : ', resp);
    console.log('task_id', this.task_id);
  });
  $('#l2_modal').modal('hide');

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
// getUserData(){
//   this.hs
//   .ajax(
//     'GetUserDetails',
//     'http://schemas.cordys.com/UserManagement/1.0/User',
//     {}
//   )
//   .then((resp: any) => {
//     this.userDetails = this.hs.xmltojson(resp, 'User');
//     console.log('userDetails', this.userDetails);
//     this.a = this.userDetails.UserName;
//     console.log('a', this.a);
//   });
// }


  constructor(private hs: HeroService) {}

  someClickHandler(info: any): void {
    console.log('heloooooo: ', info);
    this.sr_id = info.sr_id;
    this.issue_with = info.issue_with;
    this.category = info.category;
    this.priority = info.priority;
    this.l2_attendee = info.l2_attendee;
    this.l1_attendee = info.l1_attendee;
    this.status = info.status;
    this.req_id_approval = info.request_id;
    this.task_id = info.task_id;

    console.log('sr_id', info.sr_id);
    console.log('task_id', info.task_id);
  }

  ngOnInit(): void {
    // this.getUserData();
    
    // this.hs
    // .ajax(
    //   'GetUserDetails',
    //   'http://schemas.cordys.com/UserManagement/1.0/User',
    //   {}
    // )
    // .then((resp: any) => {
    //   this.userDetails = this.hs.xmltojson(resp, 'User');
    //   console.log('userDetails', this.userDetails);
    //   // this.a = this.userDetails.UserName;
    //   console.log('a', this.a);
    // })
   
      this.data1=this.hs._get('loggedInuser')
      // console.log('loggedInuser',this.a)
   
        let that = this;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          lengthMenu: [5, 8, 15],
          processing: true,
         
          ajax: (dataTablesParameters: any, callback) => {
            that.hs
              .ajax(
                'GetAttendeeRequests',
                'http://schemas.cordys.com/himadri_srmWSP',
                // { l1_attendee: this.userDetails.UserName, l2_attendee: this.userDetails.UserName }
                // { l1_attendee: 'nisha', l2_attendee: 'nisha'}
                // { l1_attendee: this.a, l2_attendee: this.a }
                { l1_attendee: this.data1, l2_attendee: this.data1}
              )
              .then((resp: any) => {
                that.data = that.hs.xmltojson(resp, 'himadri_request_approval');
                that.data = Array.isArray(that.data) ? that.data : [that.data];
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
              self.someClickHandler(data);
             
              console.log('l1 :',this.l1_attendee)
              console.log('l2 :',this.l2_attendee)
              if(this.l1_attendee==this.data1){
                $('#exampleModal').modal('show');
                console.log("l1 attendee modal");
              }
              else if(this.l2_attendee==this.data1){$('#l2_modal').modal('show');
            console.log("l2 attendee Modal")}
            });
            return row;
          },
          columns: [
            {
              title: 'Request Id',
              data: 'sr_id',
            },
            {
              title: 'L1 Attendee',
              data: 'l1_attendee',
            },
    
            {
              title: 'L2 Attendee',
              data: 'l2_attendee',
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
              data: 'status',
            },
            {
              title: 'Action',
              render: function () {
                return `<button type="button" class="btn btn-link p-0" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit icon"></i></button>`;
              },
            },
          ],
        };
      
   

    // DROPDOWN FOR CATEGORY
this.hs.ajax('GetAllCategoryDetails','http://schemas.cordys.com/himadri_srmWSP',{ })
.then((resp: any) => {this.category_data = this.hs.xmltojson(resp, 'himadri_category');});
this.hs
.ajax(
  'GetAllPriorities',
  'http://schemas.cordys.com/himadri_srmWSP',
  {
  }
)
.then((resp: any) => {
   this.priority_data = this.hs.xmltojson(resp, 'himadri_priority_table');
});
  }
  CopyData(data: Object | any[]) {
    //throw new Error('Method not implemented.');
  }
}
