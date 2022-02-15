import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ToastrModule } from 'ngx-toastr';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

import appRoutes from './routerConfig';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { NewfooterComponent } from './newfooter/newfooter.component';

import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CorporateDetailsComponent } from './corporate-details/corporate-details.component';

// import { AccomodationBookingComponent } from './accomodation-booking/accomodation-booking.component';
import { CarBookingComponent } from './car-booking/car-booking.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { ForexComponent } from './forex/forex.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { MiscComponent } from './misc/misc.component';
import { RailTravelComponent } from './rail-travel/rail-travel.component';
import { VisaComponent } from './visa/visa.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    ManageUsersComponent,
    CorporateDetailsComponent,
    NewfooterComponent,
    // AccomodationBookingComponent,
    CarBookingComponent,
    EmployeeProfileComponent,
    ForexComponent,
    InsuranceComponent,
    MiscComponent,
    RailTravelComponent,
    VisaComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Ng2SearchPipeModule,
    DatepickerModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
    RouterModule.forRoot(appRoutes),
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

