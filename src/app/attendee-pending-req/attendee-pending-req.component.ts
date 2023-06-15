import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
declare var $: any;
@Component({
  selector: 'app-attendee-pending-req',
  templateUrl: './attendee-pending-req.component.html',
  styleUrls: ['./attendee-pending-req.component.css'],
})
export class AttendeePendingReqComponent implements OnInit {
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

  submitReq() {
    console.log('data submitted');
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
  submit() {
    console.log('data submitted');

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
          this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
        });

        this.hs
        .ajax(
          'l1_sla_over',
          'http://schemas.cordys.com/default',
          {sr_id:this.sr_id}
        )
        .then((resp: any) => {console.log("SLA time started")});

        
      // $('#attendee-table').DataTable().ajax.reload();
    } else {
      console.log('enter remarks');
    }
  }

  // setting status pending and store remarks of l1

  resolve_request() {
    if (this.dataModal.remarks != '') {
    console.log('request resolved');
    $('#exampleModal').modal('hide');
    $('#resolveModal').modal('show');

  } else {
    console.log('enter remarks');
  }
    // show groupbox
  }
  tranfer_request() {
    console.log('request transferred');
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
          { TaskId: '768CC214-295A-A1EE-8273-D3B13F3BB843', Action: 'COMPLETE' }
        )
        .then((resp) => {
          console.log('resp : ', resp);
          console.log('task_id', this.task_id);
        });
    } else {
      console.log('enter remarks');
    }
  }

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
    this.hs
      .ajax(
        'GetUserDetails',
        'http://schemas.cordys.com/UserManagement/1.0/User',
        {}
      )
      .then((resp: any) => {
        this.userDetails = this.hs.xmltojson(resp, 'User');
        console.log('userDetails', this.userDetails);
        this.a = this.userDetails.UserName;
        console.log('a', this.a);
      });



      
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
            { l1_attendee: 'nisha', l2_attendee: 'nisha' }
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
          $('#exampleModal').modal('show');
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
            return `<button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit icon"></i></button>`;
          },
        },
      ],
    };
  }
  CopyData(data: Object | any[]) {
    //throw new Error('Method not implemented.');
  }
}
