import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/users';
import { UsersService } from 'src/app/users.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  users: any;
  org_details: any;
  error = '';
  success = '';
  c_address:any

  resource_name = localStorage.getItem("traversia_name")

  email: any;
  states: any
  gst_details: any
  gender: any
  titles: any
  roles: any
  department: any
  profile_types: any
  addr_types: any
  old_password:any
  old_password_success: any
  passport: any

  match_password: any;
  role_id: any
  passport_exists: any
  visa: any
  visa_exists: any
  
  formVar = new FormGroup({
    gst_number: new FormControl('', Validators.required),
    gst_email: new FormControl('', [Validators.required, Validators.email]),
    gst_state_code: new FormControl('', Validators.required),
    gst_holder_name: new FormControl('', Validators.required),
    gst_phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    gst_address: new FormControl('', Validators.required)
  });

  password_form = new FormGroup({
    old_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    new_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)])
  },
  // Validators: ComparePassword("new_password", "confirm_password")
  );
  

  RoleUpdate = new FormGroup({
    role: new FormControl('')
  });

  userInfoUpdate = new FormGroup({
    fname: new FormControl('', Validators.required),
    email_id: new FormControl('', [Validators.required, Validators.email]),
    phone_number:new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    is_meal: new FormControl(''),
    is_baggage: new FormControl(''),
    is_hold_booking: new FormControl(''),
    is_approver: new FormControl(''),
    is_travel_arranger: new FormControl(''),
    is_trip_claim_approver: new FormControl(''),
  });

  personalInfoUpdate = new FormGroup({
    title: new FormControl(''),
    fname: new FormControl('', Validators.required),
    last_name: new FormControl(''),
    gender: new FormControl('', Validators.required),
    residency: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    profile_type: new FormControl('', Validators.required),
    htl_approver_group: new FormControl('', Validators.required),
    htl_travel_arranger_group: new FormControl('', Validators.required),
    is_flight_arranger_group: new FormControl('', Validators.required),
    is_flight_approver_group: new FormControl('', Validators.required),
    claim_approver_group: new FormControl('', Validators.required),
  });

  orgDetailsUpdate = new FormGroup({
    employee_code: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    band: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    cost_center: new FormControl('', Validators.required),
    project_code: new FormControl('', Validators.required),
    domestic_eligibility: new FormControl('', Validators.required),
    international_eligibility: new FormControl('', Validators.required),
    date_of_joining: new FormControl('', Validators.required),
    date_of_termination: new FormControl('', Validators.required),
  });

  CrspAddrForm = new FormGroup({
    address1: new FormControl('', Validators.required),
    address2: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    user_email: new FormControl('', [Validators.required, Validators.email]),
  });

  PrmtAddrForm = new FormGroup({
    address1: new FormControl('', Validators.required),
    address2: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    user_email: new FormControl('', [Validators.required, Validators.email]),
  });

  passportForm = new FormGroup({
    issuing_country: new FormControl('', Validators.required),
    passport_number: new FormControl('', Validators.required),
    birth_date: new FormControl('', Validators.required),
    issue_date: new FormControl('', Validators.required),
    expiry_date: new FormControl('', Validators.required),
    issuance_Place	: new FormControl('', Validators.required),
    // created_date: new FormControl(new Date().toISOString())
  });

  visaForm = new FormGroup({
    visa_number: new FormControl('', Validators.required),
    issuing_country: new FormControl('', Validators.required),
    type_of_visa: new FormControl('', Validators.required),
    issue_date: new FormControl('', Validators.required),
    expiry_date: new FormControl('', Validators.required),
    // created_date: new FormControl(new Date().toISOString())
  }); 

  insuranceForm = new FormGroup({
    insurer: new FormControl('', Validators.required),
    nominee: new FormControl('', Validators.required),
    policy_no: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    // created_date: new FormControl(new Date().toISOString())
  });  

  address = {
    userid:localStorage.getItem("traversia_id"),
    address_1: '',
    address_2: '',
    postal: '',
    city: '',
    state: '',
    country: '',
    address_type: '',
    phone_type: '',
    phone_number: '',
    user_email: '',
    created_date:new Date().toISOString().slice(0,10)
  }

  new_gst_details =  {
      gst_number: '', 
      gst_email: '', 
      gst_state_code: '', 
      gst_holder_name: '', 
      gst_phone_number: '', 
      gst_address: '', 
      created_date: '', 
      id:localStorage.getItem("traversia_id"), 
      modified_by:localStorage.getItem("traversia_email"),  
      modified_date: new Date().toISOString(), 
  };

  user_info_update = {
      fname: '',
      email_id: '',
      phone_number:'',
      is_meal: '',
      is_baggage: '',
      is_hold_booking: '',
      is_approver: '',
      is_travel_arranger: '',
      is_trip_claim_approver: '',
    }
    
  org_info_update = {
    employee_code: '',
    designation: '',
    band: '',
    location: '',
    department: '',
    cost_center: '',
    project_code: '',
    domestic_eligibility: '',
    international_eligibility: '',
    date_of_joining: '',
    date_of_termination: '',
    id: localStorage.getItem("traversia_id"),
    modified_by:localStorage.getItem("traversia_id"),  
    modified_date: new Date().toISOString(), 
  }

  passport_info_update = {
    issuing_country: '',
    passport_number: '',
    birth_date: '',
    issue_date: '',
    expiry_date: '',
    issuance_Place: '',
    created_date: new Date().toISOString(),
    userid: localStorage.getItem("traversia_id")
  }

  visa_info_update = {
    issuing_country: '',
    visa_number: '',
    type_of_visa: '',
    issue_date: '',
    expiry_date: '',
    userid: localStorage.getItem("traversia_id"), 
    created_date: new Date().toISOString().slice(0,10), 
  }

  insurance_info_update = {
    insurer: '',
    nominee: '',
    policy_no: '',
    region: '',
    start_date: '',
    end_date: '',
    userid: localStorage.getItem("traversia_id"),
  }

  constructor(
    private UsersService: UsersService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {  
     
    $(document).ready(function () {
      $('#verticalTab').easyResponsiveTabs({
      type: 'vertical', //Types: default, vertical, accordion
      });

      $("ul.nav-tabs a").click(function (e: Event) {
        e.preventDefault();  
          $(event?.target).tab('show');
      });
      
    });

    this.email =  localStorage.getItem("traversia_email")
    this.getStates();
    this.getGender();
    this.getRoles();
    this.getAddress();
    
    this.getuserRolebyid(localStorage.getItem("traversia_id"));
    this.getpassportbyid();
    this.getuserinsurancebyUid();
    this.getVisabyid();
    this.getProfileTypes();
    this.getTitles();
    this.getDepartments()
    this.getUserDetails();
    this.getGstDetails();
    this.getOrgDetails(localStorage.getItem("traversia_id"));
  }

  get f(){
    return this.formVar.controls;
  }
  get fpswd(){
    return this.password_form.controls;
  }
  get p(){
    return this.passportForm.controls;
  }
  get v(){
    return this.visaForm.controls;
  }
  get i(){
    return this.insuranceForm.controls;
  }
  get c(){
    return this.CrspAddrForm.controls;
  }
  get prm(){
    return this.PrmtAddrForm.controls;
  }
  get u(){
    return this.userInfoUpdate.controls;
  }
  get o(){
    return this.orgDetailsUpdate.controls;
  }
  get pr(){
    return this.personalInfoUpdate.controls;
  }

  getUserDetails(){    
    this.UsersService.searchDataById(localStorage.getItem("traversia_id")).subscribe((res) => { 
        this.success = 'User Details Fetched';
        this.toastr.success(this.success, 'Success');
        let my_object = res;
        this.users = []; 
        this.users.push(my_object)
        console.log("Getting Employee Profile :", this.users)
        this.userInfoUpdate.get("fname")?.setValue(this.users[0][0].fname);
        this.userInfoUpdate.get("email_id")?.setValue(this.users[0][0].email_id);
        this.userInfoUpdate.get("phone_number")?.setValue(this.users[0][0].phone_number);
        this.userInfoUpdate.get("is_meal")?.setValue(this.users[0][0].is_meal);
        this.userInfoUpdate.get("is_baggage")?.setValue(this.users[0][0].is_baggage);
        this.userInfoUpdate.get("is_hold_booking")?.setValue(this.users[0][0].is_hold_booking);
        this.userInfoUpdate.get("is_approver")?.setValue(this.users[0][0].is_approver);
        // this.userInfoUpdate.get("user_type")?.setValue(this.users[0].user_type);
        this.userInfoUpdate.get("is_travel_arranger")?.setValue(this.users[0][0].is_travel_arranger);
        this.userInfoUpdate.get("is_trip_claim_approver")?.setValue(this.users[0][0].is_trip_claim_approver);

        this.personalInfoUpdate.get("title")?.setValue(this.users[0][0].title);
        this.personalInfoUpdate.get("fname")?.setValue(this.users[0][0].fname);
        this.personalInfoUpdate.get("last_name")?.setValue(this.users[0][0].last_name);
        this.personalInfoUpdate.get("gender")?.setValue(this.users[0][0].gender);
        this.personalInfoUpdate.get("residency")?.setValue(this.users[0][0].residency);
        this.personalInfoUpdate.get("nationality")?.setValue(this.users[0][0].nationality);
        this.personalInfoUpdate.get("dob")?.setValue(this.users[0][0].dob);
        this.personalInfoUpdate.get("profile_type")?.setValue(this.users[0][0].profile_type);
        this.personalInfoUpdate.get("htl_approver_group")?.setValue(this.users[0][0].htl_approver_group);
        this.personalInfoUpdate.get("htl_travel_arranger_group")?.setValue(this.users[0][0].htl_travel_arranger_group);
        this.personalInfoUpdate.get("is_flight_arranger_group")?.setValue(this.users[0][0].is_flight_arranger_group);
        this.personalInfoUpdate.get("is_flight_approver_group")?.setValue(this.users[0][0].is_flight_approver_group);
        this.personalInfoUpdate.get("claim_approver_group")?.setValue(this.users[0][0].claim_approver_group);

        console.table("USER FETCHED : ", this.users);
      },
      (err: { message: string; }) => (this.error = err.message)      
    );

  }

  getGstDetails() {
    this.UsersService.getGstDetails(localStorage.getItem("traversia_id")).subscribe((res) => { 
      this.success = 'GST Details Fetched Successfully';
      console.log("GST FETCH RESULT : ", res);
      this.gst_details = res
  
    },
    (err: { message: string; }) => (this.error = err.message)
  );
  }

  getAddress() {
    this.UsersService.getAddress().subscribe((res) => { 
      let my_object = res;
      this.c_address = []; 
      this.c_address.push(my_object)
      for (let x of this.c_address[0]){
        // console.log("Address TYpe:", x.address_type )
        if(x.address_type === '1'){
          this.CrspAddrForm.get("address1")?.setValue(this.c_address[0][0].address_1);
          this.CrspAddrForm.get("address2")?.setValue(this.c_address[0][0].address_2);
          this.CrspAddrForm.get("pincode")?.setValue(this.c_address[0][0].postal);
          this.CrspAddrForm.get("city")?.setValue(this.c_address[0][0].city);
          this.CrspAddrForm.get("state")?.setValue(this.c_address[0][0].state);
          this.CrspAddrForm.get("country")?.setValue(this.c_address[0][0].country);
          this.CrspAddrForm.get("phone_number")?.setValue(this.c_address[0][0].phone_number);
          this.CrspAddrForm.get("user_email")?.setValue(this.c_address[0][0].user_email);  
        }

        if(x.address_type === '2'){
          this.PrmtAddrForm.get("address1")?.setValue(this.c_address[0][1].address_1);
          this.PrmtAddrForm.get("address2")?.setValue(this.c_address[0][1].address_2);
          this.PrmtAddrForm.get("pincode")?.setValue(this.c_address[0][1].postal);
          this.PrmtAddrForm.get("city")?.setValue(this.c_address[0][1].city);
          this.PrmtAddrForm.get("state")?.setValue(this.c_address[0][1].state);
          this.PrmtAddrForm.get("country")?.setValue(this.c_address[0][1].country);
          this.PrmtAddrForm.get("phone_number")?.setValue(this.c_address[0][1].phone_number);
          this.PrmtAddrForm.get("user_email")?.setValue(this.c_address[0][1].user_email);  
        }
      }
      
    
      this.success = 'Employee Address Fetched Successfully';
      this.toastr.success(this.success, 'Success');
      console.log("Employee Address : ", res);           
    },
    (err: { message: string; }) => (this.error = err.message));
  }

  addAddress(form_type:any){
    console.log(form_type)
    if(form_type === 'Correspondence'){
      this.CrspAddrForm.markAllAsTouched();
     if(this.CrspAddrForm.valid){
    let c = this.CrspAddrForm.value    
    this.address = {
      userid:localStorage.getItem("traversia_id"),
      address_1: c.address1,
      address_2: c.address2,
      postal: c.pincode,
      city: c.city,
      state: c.state,
      country: c.country,
      address_type:'1',
      phone_type:'1',
      phone_number: c.phone_number,
      user_email: c.user_email,
      created_date:new Date().toISOString().slice(0,10)
      }
      this.UsersService.addAddress(this.address).subscribe((res) => { 
        this.success = form_type +" Address Updated Successfully";
        this.toastr.success(this.success, 'Success');
        this.getUserDetails()
      },
      (err: { message: string; }) => (this.error = err.message)
    );
    }   
  }

    if(form_type === 'Permanent'){
      this.PrmtAddrForm.markAllAsTouched();
     if(this.PrmtAddrForm.valid){
    let d = this.PrmtAddrForm.value    
    this.address = {
      userid:localStorage.getItem("traversia_id"),
      address_1: d.address1,
      address_2: d.address2,
      postal: d.pincode,
      city: d.city,
      state: d.state,
      country: d.country,
      address_type:'2',
      phone_type:'2',
      phone_number: d.phone_number,
      user_email: d.user_email,
      created_date:new Date().toISOString().slice(0,10)
    }
    this.UsersService.addAddress(this.address).subscribe((res) => { 
      this.success = form_type +" Address Updated Successfully";
      this.toastr.success(this.success, 'Success');
      this.getUserDetails()
    },
    (err: { message: string; }) => (this.error = err.message)
  );
  }  
  }
    console.log(this.address)


  }
  
  deleteGst(bank_id: any){
      this.UsersService.deleteGstDetails(bank_id).subscribe((res) => { 
      this.success = 'GST Deleted Successfully';
      this.toastr.success(this.success, 'Success');
      this.getGstDetails()
      console.log(this.success);
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
      this.getGstDetails()
      console.log(this.success);
    },
    (err: { message: string; }) => (this.error = err.message)
  );}
  }

  getOrgDetails(traversia_id: any) {
    this.UsersService.getOrganizationDetails(traversia_id).subscribe((res) => { 
      this.success = 'Organization Details Fetched Successfully';
      this.toastr.success(this.success, 'Success');
      let my_object = res;
      this.org_details = []; 
      this.org_details.push(my_object)
      if (this.org_details[0].length == 1 && this.org_details[0][0] != null){
      this.orgDetailsUpdate.get("employee_code")?.setValue(this.org_details[0][0].employee_code);
      this.orgDetailsUpdate.get("designation")?.setValue(this.org_details[0][0].designation);
      this.orgDetailsUpdate.get("band")?.setValue(this.org_details[0][0].band);
      this.orgDetailsUpdate.get("location")?.setValue(this.org_details[0][0].location);
      this.orgDetailsUpdate.get("department")?.setValue(this.org_details[0][0].department);
      this.orgDetailsUpdate.get("cost_center")?.setValue(this.org_details[0][0].cost_center);
      this.orgDetailsUpdate.get("project_code")?.setValue(this.org_details[0][0].project_code);
      this.orgDetailsUpdate.get("domestic_eligibility")?.setValue(this.org_details[0][0].domestic_eligibility);
      this.orgDetailsUpdate.get("international_eligibility")?.setValue(this.org_details[0][0].international_eligibility);
      this.orgDetailsUpdate.get("date_of_joining")?.setValue(this.org_details[0][0].date_of_joining);
      this.orgDetailsUpdate.get("date_of_termination")?.setValue(this.org_details[0][0].date_of_termination);
      }
      console.table("ORG DETAILS FETCHED : ", this.org_details);
      console.table("ORG Table : ", this.orgDetailsUpdate.value);
    },
    (err: { message: string; }) => (this.error = err.message)
  );
  }

  updateUserInfo(){
    this.userInfoUpdate.markAllAsTouched();
    if(this.userInfoUpdate.valid){
    let d = this.userInfoUpdate.value 
    this.UsersService.updateUserInfo(d.phone_number,d.email_id,d.is_meal,d.is_baggage,d.is_hold_booking,d.is_approver,d.is_travel_arranger,d.is_trip_claim_approver).subscribe((res) => { 
      this.success = 'User Info Updated Successfully';
      this.toastr.success(this.success, 'Success');
      this.getUserDetails()
    },
    (err: { message: string; }) => (this.error = err.message)
  );
    }
  }

  updatePersonalInfo(){
    this.personalInfoUpdate.markAllAsTouched();
    if(this.personalInfoUpdate.valid){
    let d = this.personalInfoUpdate.value    
    // this.user_info_update = {
    //   fname: d.fname,
    //   email_id: d.email_id,
    //   phone_number: d.phone_number,
    //   is_meal: d.is_meal,
    //   is_baggage: d.is_baggage,
    //   is_hold_booking: d.is_hold_booking,
    //   is_approver: d.is_approver,
    //   is_travel_arranger: d.is_travel_arranger,
    //   is_trip_claim_approver: d.is_trip_claim_approver
    // }
    // console.log(this.user_info_update)

    this.UsersService.updatePersonalInfo(d.title,d.fname,d.last_name,d.gender,d.residency,d.nationality,d.dob,d.is_flight_arranger_group,d.is_flight_approver_group,d.profile_type,d.htl_travel_arranger_group,d.htl_approver_group,d.claim_approver_group).subscribe((res) => { 
      this.success = 'Personal Info Updated Successfully';
      this.toastr.success(this.success, 'Success');
      this.getUserDetails()
    },
    (err: { message: string; }) => (this.error = err.message)
  );
    }
  }

  updateOrgDetails(){
    this.orgDetailsUpdate.markAllAsTouched();
     if(this.orgDetailsUpdate.valid){
    let d = this.orgDetailsUpdate.value    
    this.org_info_update = {
      employee_code: d.employee_code,
      designation: d.designation,
      band: d.band,
      location: d.location,
      department: d.department,
      cost_center: d.cost_center,
      project_code: d.project_code,
      domestic_eligibility: d.domestic_eligibility,
      international_eligibility: d.international_eligibility,
      date_of_joining: d.date_of_joining,
      date_of_termination: d.date_of_joining, 
      id: localStorage.getItem("traversia_id"), 
      modified_by:localStorage.getItem("traversia_id"),  
      modified_date: new Date().toISOString(), 
    }
    console.log(this.org_info_update)

    this.UsersService.updateOrgDetails(d.employee_code,d.designation,d.band,d.location,d.department,d.cost_center,d.project_code,d.domestic_eligibility,d.international_eligibility,d.date_of_joining,d.date_of_termination).subscribe((res) => { 
      this.success = 'Organization Updated Successfully';
      this.toastr.success(this.success, 'Success');
      console.log(this.success);
    },
    (err: { message: string; }) => (this.error = err.message)
  );
     }
  }

  checkpassword(){
    let d = this.password_form.value 
    this.UsersService.checkOldPassword({email: this.email, password:d.old_password}).subscribe((res) => { 
      this.success = 'Old password validation successful!';
      this.toastr.success(this.success, 'Success');
      this.old_password_success = true
      console.log("Old Password Validated: ", this.success);
    },
    (err: { message: string; }) => (this.error = err.message));
    // (err: { message: string; }) => (this.error = err.message, this.toastr.error('Please re-enter your old password', 'Error')));
    // this.toastr.error('Please re-enter your old password', 'Error');
  }

  changingPassword(){
    this.password_form.markAllAsTouched();
    if(this.password_form.valid){
    let d = this.password_form.value 
    this.UsersService.checkOldPassword({email: this.email, password:d.old_password}).subscribe((res) => { 
      this.success = 'Old password validation successful!';
      this.toastr.success(this.success, 'Success');
      this.old_password_success = true
      this.toastr.warning('Changing your password', 'Please Wait!');
      if(d.new_password === d.confirm_password){
        this.match_password === "Passwords match!"
        // console.log("Password Matches!")
        this.UsersService.changePassword(d.old_password,this.email,new Date().toISOString(),this.email,d.new_password).subscribe((res) => { 
          this.success = 'Password Changed';
          this.toastr.success(this.success, 'Success');
          this.password_form.reset()
          this.old_password_success = true
          console.log("Matching Password : ", this.success);
        },
        (err: { message: string; }) => (this.error = err.message));
      }
      else{
        this.match_password === "Passwords don't match\! Please enter password again."
        console.log("Passwords dont match!")
      }

    },
    (err: { message: string; }) => (this.error = err.message));
  }
  }

  changePassword(){
    let d = this.password_form.value 
    if(d.new_password === d.confirm_password){
      this.match_password === "Passwords match!"
      // console.log("Password Matches!")
      this.UsersService.changePassword(d.old_password,this.email,new Date().toISOString(),this.email,d.new_password).subscribe((res) => { 
        this.success = 'Password Changed';
        this.toastr.success(this.success, 'Success');
        this.password_form.reset()
        this.old_password_success = true
        console.log("Matching Password : ", this.success);
      },
      (err: { message: string; }) => (this.error = err.message));
      this.toastr.error('Some error occured. Please try again.', 'Error!');
    }
    else{
      this.match_password === "Passwords don't match\! Please enter password again."
      console.log("Passwords dont match!")
    }
  }

  getpassportbyid(){
    this.UsersService.getpassportbyid().subscribe((res) => { 
      let my_object = res;
      this.passport = []; 
      this.passport.push(my_object) 
      console.log("Passport Details : ", this.passport);    
      if (this.passport[0].length == 1 && this.passport[0][0] != null){
        this.passport_exists = true
        this.passportForm.get("issuing_country")?.setValue(this.passport[0][0].issuing_country);
        this.passportForm.get("passport_number")?.setValue(this.passport[0][0].passport_number);
        this.passportForm.get("birth_date")?.setValue(new Date(this.passport[0][0].birth_date).toISOString().slice(0,10));
        this.passportForm.get("issue_date")?.setValue(new Date(this.passport[0][0].issue_date).toISOString().slice(0,10));
        this.passportForm.get("expiry_date")?.setValue(new Date(this.passport[0][0].expiry_date).toISOString().slice(0,10));
        this.passportForm.get("issuance_Place")?.setValue(this.passport[0][0].issuance_Place);
      }
     if(this.passport[0].length == 1 && this.passport[0][0] == null){
        this.passport_exists = false
      }
      this.success = 'Passport Details Fetched Successfully';
      this.toastr.success(this.success, 'Success');
             
    },
    (err: { message: string; }) => (this.error = err.message));
  }

  getVisabyid(){
  this.UsersService.getvisabyid().subscribe((res) => { 
    let my_object = res;
    this.visa = []; 
    this.visa.push(my_object) 
    console.log("Visa Details : ", this.visa);    
    if (this.visa[0].length == 1 && this.visa[0][0] != null){
      this.visa_exists = true

      this.visaForm.get("issuing_country")?.setValue(this.visa[0][0].issuing_country);
      this.visaForm.get("visa_number")?.setValue(this.visa[0][0].visa_number);
      this.visaForm.get("type_of_visa")?.setValue(this.visa[0][0].type_of_visa);
      this.visaForm.get("issue_date")?.setValue(this.visa[0][0].issue_date);
      this.visaForm.get("expiry_date")?.setValue(this.visa[0][0].expiry_date);
    }
    if(this.visa[0].length == 1 && this.visa[0][0] == null){
      this.visa_exists = false
    }
    this.success = 'Visa Details Fetched Successfully';
    this.toastr.success(this.success, 'Success');
    console.log("Visa Fecthed: ", this.visa)
            
  },
  (err: { message: string; }) => (this.error = err.message));
  }

  insurance:any
  insurance_exists:any

  getuserinsurancebyUid(){
  this.UsersService.getuserinsurancebyUid().subscribe((res) => { 
    let my_object = res;
    this.insurance = []; 
    this.insurance.push(my_object) 
    console.log("Insurance Details : ", this.insurance);    
    if (this.insurance[0].length == 1 && this.insurance[0][0] != null){
      this.insurance_exists = true

      this.insuranceForm.get("insurer")?.setValue(this.insurance[0][0].insurer);
      this.insuranceForm.get("nominee")?.setValue(this.insurance[0][0].nominee);
      this.insuranceForm.get("policy_no")?.setValue(this.insurance[0][0].policy_no);
      this.insuranceForm.get("region")?.setValue(this.insurance[0][0].region);
      this.insuranceForm.get("start_date")?.setValue(this.insurance[0][0].start_date);
      this.insuranceForm.get("end_date")?.setValue(this.insurance[0][0].end_date);
    }
    if(this.insurance[0].length == 1 && this.insurance[0][0] == null){
      this.insurance_exists = false
    }
    this.success = 'Insurance Details Fetched Successfully';
    this.toastr.success(this.success, 'Success');
            
  },
  (err: { message: string; }) => (this.error = err.message));
  }

  updateVisaDetails(action:any){
    this.visaForm.markAllAsTouched();
    if(this.visaForm.valid){
    if(action==='Add'){
    let d = this.visaForm.value    
    this.visa_info_update = {
      issuing_country: d.issuing_country,
      visa_number: d.visa_number,
      type_of_visa: d.type_of_visa,
      issue_date: d.issue_date,
      expiry_date: d.expiry_date,
      userid: localStorage.getItem("traversia_id"), 
      created_date: new Date().toISOString().slice(0,10), 
    }
    console.log(this.visa_info_update)
    this.UsersService.AddvisaDetails(this.visa_info_update).subscribe((res) => { 
      this.success = 'Visa Added Successfully';
      this.toastr.success(this.success, 'Success');
      this.getVisabyid()
      console.log(this.success);
    },
    (err: { message: string; }) => (this.error = err.message)
    );
    }

    if(action==='Update'){
      let d = this.visaForm.value      
      this.UsersService.updateVisaDetails(d.expiry_date).subscribe((res) => { 
        this.success = 'Visa Updated Successfully';
        this.toastr.success(this.success, 'Success');
        this.getVisabyid()
        console.log(this.success);
      },
      (err: { message: string; }) => (this.error = err.message)
      );
      }
    }
  }

  updateInsuranceDetails(action:any){
  this.insuranceForm.markAllAsTouched();
  if(this.insuranceForm.valid){
  
    if(action==='Add'){
    let d = this.insuranceForm.value    
    this.insurance_info_update = {
      insurer: d.insurer,
      nominee: d.nominee,
      policy_no: d.policy_no,
      region: d.region,
      start_date: d.start_date,
      end_date: d.end_date,
      userid: localStorage.getItem("traversia_id")
    }
    console.log(this.insurance_info_update)
    this.UsersService.Addinsurance(this.insurance_info_update).subscribe((res) => { 
      this.success = 'Insurance Added Successfully';
      this.toastr.success(this.success, 'Success');
      this.getuserinsurancebyUid()
      console.log(this.success);
    },
    (err: { message: string; }) => (this.error = err.message)
    );
    }

    if(action==='Update'){
      let d = this.insuranceForm.value      
      this.UsersService.updateinsurancebybyUid(d.insurer,d.region,d.policy_no,d.start_date,d.end_date,d.nominee).subscribe((res) => { 
        this.success = 'Insurance Updated Successfully';
        this.toastr.success(this.success, 'Success');
        this.getuserinsurancebyUid()
        console.log(this.success);
      },
      (err: { message: string; }) => (this.error = err.message)
      );
      }
    }
  }

  updatePassportDetails(action:any){
    this.passportForm.markAllAsTouched();
    if(this.passportForm.valid){
    if(action==='Add'){
    let d = this.passportForm.value    
    this.passport_info_update = {
      issuing_country: d.issuing_country,
      passport_number: d.passport_number,
      birth_date: d.birth_date,
      issue_date: d.issue_date,
      expiry_date: d.expiry_date,
      issuance_Place: d.issuance_Place,
      userid: localStorage.getItem("traversia_id"), 
      created_date: new Date().toISOString().slice(0,10), 
    }
    console.log(this.passport_info_update)
    this.UsersService.AddPassportDetails(this.passport_info_update).subscribe((res) => { 
      this.success = 'Passport Added Successfully';
      this.toastr.success(this.success, 'Success');
      this.getpassportbyid()
      console.log(this.success);
    },
    (err: { message: string; }) => (this.error = err.message)
    );
    }

    if(action==='Update'){
      let d = this.passportForm.value      
      this.UsersService.updatePassportDetails(d.expiry_date).subscribe((res) => { 
        this.success = 'Passport Updated Successfully';
        this.toastr.success(this.success, 'Success');
        console.log(this.success);
      },
      (err: { message: string; }) => (this.error = err.message)
      );
      }
    }
  }

  getAddressTypes(){
    this.UsersService.getAddressTypes().subscribe((res) => { 
      this.addr_types = res
      // console.log('LISTING STATES: ', this.states)
    },
    (err: { message: string; }) => (this.error = err.message)
    ); 
  }

  getGender(){
    this.UsersService.getGender().subscribe((res) => { 
      this.gender = res
      // console.log('LISTING STATES: ', this.states)
    },
    (err: { message: string; }) => (this.error = err.message)
    ); 
  }

  getRoles(){
    this.UsersService.getRoles().subscribe((res) => { 
      this.roles = res
      // console.log('LISTING STATES: ', this.states)
    },
    (err: { message: string; }) => (this.error = err.message)
    ); 
  }		 

  getuserRolebyid(id:any){
    this.UsersService.getuserRolebyid(id).subscribe((res) => { 
      this.role_id = res
      console.log("USER ROLES : ", this.role_id)
      if(this.role_id.length == 1 ){
      this.RoleUpdate.get("role")?.setValue(this.role_id[0].roleid);}
    },
    (err: { message: string; }) => (this.error = err.message)
    );
  }

  updateRole(){
    let d = this.RoleUpdate.value    
    this.UsersService.updateuserRolebyid(d.role).subscribe((res) => { 
      this.success = 'User Role Updated Successfully';
      this.toastr.success(this.success, 'Success');
      console.log("Change ORle ", d.role);
    },
    (err: { message: string; }) => (this.error = err.message)
  );
  }

  getProfileTypes(){
    this.UsersService.getProfileTypes().subscribe((res) => { 
      this.profile_types = res
      // console.log('LISTING STATES: ', this.states)
    },
    (err: { message: string; }) => (this.error = err.message)
    ); 
  }

  getTitles(){
    this.UsersService.getTitles().subscribe((res) => { 
      this.titles = res
      // console.log('LISTING STATES: ', this.states)
    },
    (err: { message: string; }) => (this.error = err.message)
    ); 
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

  getDepartments() {
    this.UsersService.getDepartments().subscribe((res) => { 
      this.success = 'Departments Fetched Successfully';
      this.department = res
      // console.log('LISTING DEPARTMENTS: ', this.department)
    },
    (err: { message: string; }) => (this.error = err.message)
    );
  }

  updateUser(){ console.table(this.userInfoUpdate.value) }

}

