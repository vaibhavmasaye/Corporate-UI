import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  baseUrl = 'http://localhost/traversia';
  Url = 'http://localhost:9090/cds';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/users_list.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  PostData(data: Users) {
    return this.http.post(this.Url+'/add', data);
  }

  searchDataById(userid:any) {
    return this.http.get(this.Url+'/search/'+userid+'/0/0/0/0/0');
  }

  searchData(data:any) {
    return this.http.post(this.Url+'/search',data);
  }

  LoginData(user: Users) {
    return this.http.post(this.Url+'/login', user);
  }

  LogOutData(email_id: any) {
    return this.http.get(this.Url+'/logout/'+email_id+'/'+new Date().toISOString());
  }

  //////// GET STATE APIS ///////

  getStates() {
    return this.http.get(this.Url+'/listAllgststate');
  }

  //////// BANK APIS ///////

  getBanks() {
    return this.http.get(this.Url+'/listAllbankmst');
  }  

  getBankByBranchId() {
    return this.http.get(this.Url+'/getbankIdDetails/'+localStorage.getItem("traversia_id"));
  }  

  //////// GST APIS ///////

  getGstDetails(id: any) {
    return this.http.get(this.Url+'/gstDetails/'+id);
  }

  addGstDetails(gst_Details: any) {
    return this.http.post(this.Url+'/gstadd/',gst_Details);
  }

  deleteGstDetails(gst_id: any) {
    return this.http.delete(this.Url+'/gst/'+gst_id);
  }

  addBankDetails(bank_Details: any) {
    return this.http.post(this.Url+'/addbankD/',bank_Details);
  }

  ///////// EMPLOYEE PROFILE APIS ////////

  getAllUsers() {
    return this.http.get(this.Url+'/getalluser/0');
  }

  getuserRolebyid(id:any) {
    return this.http.get(this.Url+'/getuserRolebyid/'+id);
  }

  adduserRolebyid(id:any) {
    return this.http.post(this.Url+'/lnkuserrole',id);
  }
  
  updateuserRolebyid(id:any) {
    return this.http.get(this.Url+'/updateuserRolebyid/'+localStorage.getItem("traversia_id")+'/'+id+'/'+new Date().toISOString()+'/'+localStorage.getItem("traversia_email"));
  }
  
  getTitles() {
    return this.http.get(this.Url+'/listAllTitle');
  }

  getGender() {
    return this.http.get(this.Url+'/listAllgender');
  }

  getRoles() {
    return this.http.get(this.Url+'/listAllRoles');
  }

  getProfileTypes() {
    return this.http.get(this.Url+'/listAllProfiletype');
  }

  getAddressTypes() {
    return this.http.get(this.Url+'/listAllAddtmst');
  }

  getAddress() {
    return this.http.get(this.Url+'/getAddress/'+localStorage.getItem("traversia_id"));
  }

  addAddress(address:any) {
    return this.http.post(this.Url+'/addressadd',address);
  }

  getDepartments() {
    return this.http.get(this.Url+'/listAlldepartmentmst');
  }

  getpassportbyid() {
    return this.http.get(this.Url+'/getpassportbyid/'+localStorage.getItem("traversia_id"));
  }  

  updatePassportDetails(expiry_date: any) {
    return this.http.get(this.Url+'/updatepassportbybyid/'+localStorage.getItem("traversia_id")+'/'+expiry_date+'/'+new Date().toISOString().slice(0,10)+'/'+localStorage.getItem("traversia_email"));
  }

  AddPassportDetails(passport_details: any) {
    return this.http.post(this.Url+'/AddPassport/',passport_details);
  }

  getvisabyid() {
    return this.http.get(this.Url+'/getuservisabyUid/'+localStorage.getItem("traversia_id"));
  }  

  updateVisaDetails(expiry_date: any) {
    return this.http.get(this.Url+'/updatevisabybyUid/'+localStorage.getItem("traversia_id")+'/'+expiry_date+'/'+new Date().toISOString().slice(0,10)+'/'+localStorage.getItem("traversia_email"));
  }

  AddvisaDetails(visa_details: any) {
    return this.http.post(this.Url+'/Addvisa/',visa_details);
  }

  getuserinsurancebyUid() {
    return this.http.get(this.Url+'/getuserinsurancebyUid/'+localStorage.getItem("traversia_id"));
  }  

  updateinsurancebybyUid(insurer:any,region:any,policy_no:any,start_date:any,end_date:any,nominee:any) {
    return this.http.get(this.Url+'/updateinsurancebybyUid/'+localStorage.getItem("traversia_id")+'/'+insurer+'/'+region+'/'+policy_no+'/'+start_date+'/'+end_date+'/'+nominee);
  }

  Addinsurance(visa_details: any) {
    return this.http.post(this.Url+'/Addinsurance/',visa_details);
  }

  checkOldPassword(user: any) {
    return this.http.post(this.Url+'/checkpassword/',user);
  }

  changePassword(password:any,email_id:any,last_modified_date:any,modified_by:any,new_password:any){
    return this.http.get(this.Url+'/forgot/'+password+'/'+email_id+'/'+last_modified_date+'/'+modified_by+'/'+new_password);
  }

  updateUserInfo(phone_number:any,email_id:any,is_meal:any,is_baggage:any,is_hold_booking:any,is_approver:any,is_travel_arranger:any,is_trip_claim_approver:any){
    return this.http.get(this.Url+'/updateUserInfo/'+email_id+'/'+phone_number+'/'+is_meal+'/'+is_baggage+'/'+is_hold_booking+'/'+is_approver+'/'+is_travel_arranger+'/'+is_trip_claim_approver);
  }

  updatePersonalInfo(title:any,fname:any,last_name:any,gender:any,residency:any,nationality:any,dob:any,is_flight_arranger_group:any,is_flight_approver_group:any,profile_type:any,htl_travel_arranger_group:any,htl_approver_group:any,claim_approver_group:any){
    return this.http.get(this.Url+'/updatePersonalInfo/'+localStorage.getItem("traversia_email")+'/'+title+'/'+fname+'/'+last_name+'/'+gender+'/'+residency+'/'+nationality+'/'+dob+'/'+is_flight_arranger_group+'/'+is_flight_approver_group+'/'+profile_type+'/'+htl_travel_arranger_group+'/'+htl_approver_group+'/'+claim_approver_group);
  }

  // {email_id}/{title}/{fname}/{last_name}/{gender}/{residency}/{nationality}/{dob}/{is_flight_arranger_group}/"
	// 		+ "{is_flight_approver_group}/{profile_type}/{htl_travel_arranger_group}/{htl_approver_group}/{claim_approver_group}

  ///////// ORGANIZATION APIS ////////

  updateOrgDetails(employee_code: any,designation: any,band: any,location: any,department: any,cost_center: any,project_code: any,domestic_eligibility: any,international_eligibility: any,date_of_joining: any,date_of_termination: any) {
    return this.http.get(this.Url+'/updateOrgDetails/'+localStorage.getItem("traversia_id")+'/'+employee_code+'/'+designation+'/'+band+'/'+location+'/'+department+'/'+cost_center+'/'+project_code+'/'+domestic_eligibility+'/'+international_eligibility+'/'+date_of_joining+'/'+date_of_termination);
  }


  getOrganizationDetails(traversia_id: any) {
    return this.http.get(this.Url+'/getorgIdDetails/'+traversia_id);
  }
}

