import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { Users } from 'src/app/users';
import { UsersService } from 'src/app/users.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $:any;
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {


  date: Date = new Date();
  options: DatepickerOptions = {
    inputClass: 'form-control',
    calendarClass: 'datepicker-default',
    scrollBarColor: '#010001',
    placeholder: 'Form Date', 
    format: 'dd LL yyyy',// date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
  };
  date2: Date = new Date();
  options2: DatepickerOptions = {
    inputClass: 'form-control',
    calendarClass: 'datepicker-default',
    scrollBarColor: '#010001',
    placeholder:'To Date',
    format: 'dd LL yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
  };
  date3: Date = new Date();
  options3: DatepickerOptions = {
    inputClass: 'form-control',
    calendarClass: 'datepicker-default',
    scrollBarColor: '#010001'
  };

  data: any;
  resource_name = localStorage.getItem("traversia_name")

  users: any;
  user: Users =  {
    fname:'', user_type:'',phone_number:'', email_id:'', password:this.makeid(10), 
    company_branchid: '0',company_id: '0', status:'', title:'0',gender:'0',residency:'0',nationality:'0',dob:'0',
    travel_arranger_group:'0', htl_approver_group:'0',htl_travel_arranger_group:'0',claim_approver_group:'0',profile_type:'0',
    last_transac_date:'0', last_login_date:'0', activation_date:'0', user_credit:'0',created_date:new Date().toISOString() };
  // user_details: Users =  {userid:'', fname:'', user_type:'',phone_number:'', email_id:'', status:'', approver1:''};
  user_details = {fname:'', user_type:'',phone_number:'', email_id:'', status:''};
  // user_details = {fname:'', user_type:'',phone_number:'', email_id:'', status:'', date:'', date2:''};

  error = '';
  success = '';

  // formVar!: FormGroup;

  formVar = new FormGroup({
    status: new FormControl(''),
    fname: new FormControl(''),
    user_type: new FormControl(''),
    email_id: new FormControl(''),
    phone_number: new FormControl(''),
    date: new FormControl(''),
    date2: new FormControl(''),
  });

  addUserForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    user_type: new FormControl('', Validators.required),
    email_id: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  });
        
  constructor(
    // private ngxLoader: NgxUiLoaderService,
    private UsersService: UsersService,
    private toastr: ToastrService
    ) {
  }
        
  ngOnInit() {
    this.getUsers();
  }
        
  getUsers(): void {
    // this.ngxLoader.startLoader('loader-01');
    this.UsersService.getAllUsers().subscribe((res) => { 
        this.users = res;
        // this.ngxLoader.stopLoader('loader-01');
        this.toastr.success('User List Retrieved Successfully!', '');
        console.log("List of Users: " + this.users);
        let lastElement = this.users[this.users.length - 1];
        console.log("Last Element", lastElement.userid)
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
    
    console.log("this.makeid(10);", this.makeid(10))
  }

  addUser() {
    this.addUserForm.markAllAsTouched();
    if(this.addUserForm.valid){
    this.resetAlerts();
    this.user = {
      fname: this.addUserForm.value.fname,
      user_type: this.addUserForm.value.user_type,
      email_id: this.addUserForm.value.email_id,
      phone_number: this.addUserForm.value.phone_number,
      password: this.makeid(10),
      company_id: '0'
      
    }
    this.UsersService.PostData(this.user).subscribe((res) => { 
      this.addUserForm.reset();
      $('#adduser').modal('hide'); 
        this.success = 'Created successfully';
        this.toastr.success('User Added Successfully!', 'Success');
        this.getUsers()        
        this.AddUserRole()
      },
      (err) => (this.toastr.error('Some error occured', err.error))
    );
    }
  }

  AddUserRole(){
    let lastElement = this.users[this.users.length - 1];

    this.UsersService.adduserRolebyid({userid: lastElement.userid, roleid: 3}).subscribe((res) => { 
        // this.success = 'Created successfully';
        // this.toastr.success('User Added Successfully!', 'Success');
        // this.getUsers()
      },
      // (err) => (this.toastr.error('Some error occured', err.error))
    );    
  }

  get f(){
    return this.addUserForm.controls;
  }

  searchUser() {
    let d = this.formVar
    this.user_details = {
      status: d.value.status,
      user_type: d.value.user_type,
      fname: d.value.fname,
      email_id: d.value.email_id,
      phone_number: d.value.phone_number,
      // date: d.value.date,
      // date2: d.value.date2
    }
    this.clean(this.user_details)
    
    console.log("After cleaning", this.user_details);
    this.UsersService.searchData(this.user_details).subscribe((res) => { 
        this.success = 'Search Executed Successfully';
        let my_object = res;
        this.users = []; 
        this.users.push(my_object)
        console.log("SEARCH RESULT : ", res);
      },
      (err: { message: string; }) => (this.error = err.message)
    );
  }
   
  clean(obj: any) {
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (obj[propName] === null || obj[propName] === undefined  || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj
  }


  Login(s: NgForm) {
    this.resetAlerts();

    this.UsersService.LoginData(this.user).subscribe((res) => { 
        this.success = 'Created successfully';
        this.getUsers()
        s.reset();
      },
      (err: { message: string; }) => (this.error = err.message)
    );
 
  }

  resetAlerts() { this.error = '';  this.success = '';  }

  makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }   
   return result;
   
  }



}

///////////////////  Referred this example for deleting null or empty values from search object ///////////////////

  // var test = {
  //   test1: null,
  //   test2: 'somestring',
  //   test3: 3,
  // }
  
  // function clean(obj) {
  //   var propNames = Object.getOwnPropertyNames(obj);
  //   for (var i = 0; i < propNames.length; i++) {
  //     var propName = propNames[i];
  //     if (obj[propName] === null || obj[propName] === undefined) {
  //       delete obj[propName];
  //     }
  //   }
  //   return obj
  // }
  
  // console.log(test);
  // console.log(clean(test));