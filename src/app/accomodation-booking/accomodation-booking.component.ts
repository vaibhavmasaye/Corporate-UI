import { Component, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-accomodation-booking',
  templateUrl: './accomodation-booking.component.html',
  styleUrls: ['./accomodation-booking.component.css']
})
export class AccomodationBookingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // multicity
$(function() {

	$('select[multiple].active.3col').multiselect({
	  columns: 3,
	  placeholder: 'Select States',
	  search: true,
	  searchOptions: {
	      'default': 'Search States'
	  },
	  selectAll: true
	});
});
    
  }

}
