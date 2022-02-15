import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/users';
import { UsersService } from 'src/app/users.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var $: any

@Component({
  selector: 'app-corporate-details',
  templateUrl: './corporate-details.component.html',
  styleUrls: ['./corporate-details.component.css']
})
export class CorporateDetailsComponent implements OnInit {

  users: any;
  error = '';
  success = '';
  gst_details: any

  states: any;
  banks: any;
  banksByBranch: any

  formVar = new FormGroup({
    gst_number: new FormControl('', Validators.required),
    gst_email: new FormControl('', [Validators.required, Validators.email]),
    gst_state_code: new FormControl('', Validators.required),
    gst_holder_name: new FormControl('', Validators.required),
    gst_phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    gst_address: new FormControl('', Validators.required)
  });

  // this.new_bank_details = {
  //   account_no: d.account_no,
  //   bank_branch: d.bank_branch,
  //   bank_name : d.bank_name,
  //   userid: localStorage.getItem("traversia_id"),
  //   created_by: localStorage.getItem("traversia_email"),
  //   created_date: new Date().toISOString(), 
  //   ifsc_code : d.ifsc_code,
  //   modified_by: '-',
  //   modified_date: new Date().toISOString(), 
  //   swift_code: d.swift_code
  // }

  formBank =  new FormGroup({
    account_no:  new FormControl('', Validators.required),
    bank_branch:  new FormControl('', Validators.required),
    bank_name :  new FormControl('', Validators.required),
    ifsc_code :  new FormControl('', Validators.required),
    swift_code:  new FormControl('', Validators.required)
  });

  resource_email = localStorage.getItem("traversia_email")
  resource_name = localStorage.getItem("traversia_name")

  new_gst_details =  {gst_number: '', gst_email: '', gst_state_code: '', gst_holder_name: '', gst_phone_number: '', gst_address: '', created_date: '', id:localStorage.getItem("traversia_email"), modified_by:'', modified_date:''};
  new_bank_details = {account_no: '', bank_branch: '', bank_name : '', userid: localStorage.getItem("traversia_id"), created_by: localStorage.getItem("traversia_email"), created_date: new Date().toISOString(), ifsc_code : '', modified_by: '-', modified_date: new Date().toISOString(), swift_code: ''}
  
  constructor(
    private UsersService: UsersService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(){   
    $(document).ready(function () {
      $('#verticalTab').easyResponsiveTabs({
      type: 'vertical', 
      });
    });

    this.getUserResources()
    this.getStates()
    this.getBanks()
    this.getBanksByBranch()
  }

  get f(){
    return this.formVar.controls;
  }
  get fr(){
    return this.formBank.controls;
  }

  getStates() {
    this.UsersService.getStates().subscribe((res) => { 
      this.success = 'GST Details Fetched Successfully';
      this.states = res
      // console.log('LISTING STATES: ', this.states)
    },
    (err: { message: string; }) => (this.error = err.message)
    );
  }

getBanks() {
  this.UsersService.getBanks().subscribe((res) => { 
    this.success = 'List of Banks Fetched Successfully';
    this.banks = res
    // console.log('LISTING BANKS: ', this.banks)
  },
  (err: { message: string; }) => (this.error = err.message)
);
}

getBanksByBranch() {
  this.UsersService.getBankByBranchId().subscribe((res) => { 
    this.success = 'List of Banks by Branch Fetched Successfully';
    this.banksByBranch = res
    console.log('LISTING BANKS: ', this.banksByBranch)
  },
  (err: { message: string; }) => (this.error = err.message)
);
}

getUserResources() {
  this.UsersService.getGstDetails(localStorage.getItem("traversia_id")).subscribe((res) => { 
    this.success = 'GST Details Fetched Successfully';
    console.log("GST FETCH RESULT : ", res);
    this.gst_details = res

  },
  (err: { message: string; }) => (this.error = err.message)
);
}

addGst(){
  this.formVar.markAllAsTouched();
  if(this.formVar.valid){
  let d = this.formVar.value    
  this.new_gst_details = {
    gst_number: d.gst_number,
    gst_email: d.gst_email,
    gst_state_code: d.gst_state_code,
    gst_holder_name: d.gst_holder_name,
    gst_phone_number: d.gst_phone_number,
    gst_address: d.gst_address,
    created_date: new Date().toISOString(), 
    id: localStorage.getItem("traversia_id"), 
    modified_by:'-', 
    modified_date:'0'
  }
  console.log(this.new_gst_details)

  this.UsersService.addGstDetails(this.new_gst_details).subscribe((res) => { 
    this.success = 'GST Added Successfully';
    this.toastr.success(this.success, 'Success');
    this.getUserResources()
    console.log(this.success);
  },
  (err: { message: string; }) => (this.error = err.message)
);}
}

  deleteGst(bank_id: any){
      this.UsersService.deleteGstDetails(bank_id).subscribe((res) => { 
      this.success = 'GST Deleted Successfully';
      this.toastr.success(this.success, '');
      this.getUserResources()
      console.log(this.success);
    },
    (err: { message: string; }) => (this.error = err.message)
  );
  }

  addBank(){
    this.formBank.markAllAsTouched();
    if(this.formBank.valid){
    let d = this.formBank.value
    
    this.new_bank_details = {
      account_no: d.account_no,
      bank_branch: d.bank_branch,
      bank_name : d.bank_name,
      userid: localStorage.getItem("traversia_id"),
      created_by: localStorage.getItem("traversia_email"),
      created_date: new Date().toISOString(), 
      ifsc_code : d.ifsc_code,
      modified_by: '-',
      modified_date: new Date().toISOString(), 
      swift_code: d.swift_code
    }
    console.log(this.new_bank_details)

    this.UsersService.addBankDetails(this.new_bank_details).subscribe((res) => { 
      this.success = 'Bank Added Successfully';
      this.toastr.success(this.success, '');
      console.log(this.success);
      this.getBanksByBranch()
    },
    (err: { message: string; }) => (this.error = err.message)
  );
  }
  }

  

}
