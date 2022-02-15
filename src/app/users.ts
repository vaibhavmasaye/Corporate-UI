export interface Users {
    userid?: string;
    title?: string;
    fname?: string;
    last_name?: string;
    gender?:string;
    residency?:string;
    nationality?:string;
    dob?:string;
    travel_arranger_group?:string;
    htl_approver_group?:string;
    htl_travel_arranger_group?:string;
    claim_approver_group?:string;
    company_branchid?: string;
    profile_type?:string;
    user_type?: string;
    status?: string;
    last_transac_date?: string;
    last_login_date?: string;
    phone_number?: string;
    activation_date?: string;
    password?: string;
    email_id?: string;
    company_id?:string;
    user_credit?:string;
    is_meal?: string;
    is_baggage?: string;
    is_hold_booking?: string;
    created_date?:string
  }