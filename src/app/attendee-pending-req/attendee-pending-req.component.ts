import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
declare var $:any;
@Component({
  selector: 'app-attendee-pending-req',
  templateUrl: './attendee-pending-req.component.html',
  styleUrls: ['./attendee-pending-req.component.css']
})
export class AttendeePendingReqComponent implements OnInit{
  
  sr_id: any;
  requester_name: any;
  number: any;
  email: any;
  category: any;
  priority: any;
  issue_with: any;
  l2_attendee: any;
  status: any;
  changed_category:any;
  req_id: any;
  req_id_approval: any;

  dtOptions: DataTables.Settings = {};

  dataModal: any = {
    email: '',
    number: '',
    category: '',
    l1_attendee:'',
    l2_attendee:'',
    remarks:''
  };

  data: any={
    table:[],
  }
  
  submit(){
    console.log("data submitted")
    
  }

  pending(){
    
    console.log("pending request")
    if(this.dataModal.remarks!=""){
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
                l1_remarks: this.dataModal.remarks,
                status : 'InProgress with L1 Attendee',
              },
            },
          },
        }
      )
      .then((resp: any) => {
        this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
      });
    }else{
      console.log("enter remarks")
    }
    
  
  }

    // setting status pending and store remarks of l1
      
     
  resolve_request(){
    console.log("request resolved")
  // show groupbox
  }
  tranfer_request(){
    console.log("request transferred")
    // show transfergroupbox

  }
  cancel_request(){
    console.log("request cancelled")
    if(this.dataModal.remarks!=""){
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
                l1_remarks: this.dataModal.remarks,
                status : 'Rejected',
              },
            },
          },
        }
      )
      .then((resp: any) => {
        this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
      });
    }else{
      console.log("enter remarks")
      // toaster
    }
  }

    constructor(private hs: HeroService){ }

    someClickHandler(info: any): void {
      console.log("heloooooo: ", info )
      this.sr_id = info.sr_id;
      this.issue_with= info.issue_with
      this.category= info.category
      this.priority=info.priority
      this.l2_attendee=info.l2_attendee
      this.status=info.status
     this.req_id_approval=info.request_id
  
      console.log("inofo2", info)
    }

    ngOnInit(): void {

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
            self.someClickHandler(data);
            $('#exampleModal').modal('show');
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




