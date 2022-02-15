import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/users';
import { UsersService } from 'src/app/users.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent implements OnInit {

  error = '';
  success = '';

  users: any;
  user: Users =  {email_id:'',password:''};

  logout_user = {
    email_id: '',
    last_login_date: new Date().toISOString()};

  loggged_user_name: any
  loggged_user_email: any
  is_logged_in: any

  // formVar!: FormGroup;

  formVar = new FormGroup({
    email_id: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private UsersService: UsersService,
    private fb: FormBuilder,
    public router:Router
  ) { }

  ngOnInit() {

    if(localStorage.getItem("traversia_name")){
      this.loggged_user_name = localStorage.getItem("traversia_name")
      this.loggged_user_email = localStorage.getItem("traversia_email")
      this.is_logged_in = true
      console.log(this.loggged_user_name, "LOGGED IN")
    }
    else{
      this.is_logged_in = false
    }
  }

  // @ViewChild('completeModal') completeModal: ElementRef;
  // $(this.completeModal.nativeElement).modal('hide');
 

login_error: any
  Login() {
    this.formVar.markAllAsTouched();
    if(this.formVar.valid){
    this.user = {
      email_id: this.formVar.value.email_id,
      password: this.formVar.value.password
    }
  
    this.UsersService.LoginData(this.user).subscribe((res) => { 
      
      if(res != null){
        this.is_logged_in = true
        this.success = 'Login Successfully';
      let my_object = res;
      this.users = []; 
      this.users.push(my_object)
      console.log('User Logged In : ',this.users)
      $('#login_signup').modal('hide'); 
      console.log("LOGIN RESULT : ", this.users);
      localStorage.setItem("traversia_id",this.users[0].userid);
      localStorage.setItem("traversia_branch_id",this.users[0].company_branchid);
      localStorage.setItem("traversia_email",this.users[0].email_id);
      localStorage.setItem("traversia_company_id",this.users[0].company_id);
      if(this.users[0].last_name !=null){
      localStorage.setItem("traversia_name",this.users[0].fname+' '+this.users[0].last_name);}
      if(this.users[0].last_name ==null){
        localStorage.setItem("traversia_name",this.users[0].fname);}
      this.router.navigate(['corporate-details']);
      }
      // else if(res == null){
      //   this.login_error == 'Email ID or Password incorrect! Please try again.'
      // }
    },
    (err: { message: string; }) => (this.error = err.message)
    );
  }
  }

  logout(){
    this.is_logged_in = false
    this.UsersService.LogOutData(this.loggged_user_email).subscribe((res) => { 
      this.success = 'Logged Out Successfully';
      localStorage.removeItem("traversia_id");
      localStorage.removeItem("traversia_branch_id");
      localStorage.removeItem("traversia_email");
      localStorage.removeItem("traversia_name");
    },
    (err: { message: string; }) => (this.error = err.message)
    );
    
    this.router.navigate(['/']);
  }

  get f(){
    return this.formVar.controls;
  }

  resetAlerts() { this.error = '';  this.success = '';  }

}


