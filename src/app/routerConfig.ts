import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CorporateDetailsComponent } from './corporate-details/corporate-details.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

const appRoutes: Routes = [
   { path: '', 
    component: HomeComponent 
  },
  { path: 'home', 
    component: HomeComponent 
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent
  },
  { path: 'corporate-details',
    component: CorporateDetailsComponent
  },
  { path: 'employee-profile',
    component: EmployeeProfileComponent
  }
];
export default appRoutes;