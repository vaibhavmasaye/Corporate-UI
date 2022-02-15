import { Component, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-rail-travel',
  templateUrl: './rail-travel.component.html',
  styleUrls: ['./rail-travel.component.css']
})
export class RailTravelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // multicity
$(function() {

	$('select[multiple].active.3col').multiselect({
	  columns: 3,
	  placeholder: 'Eligible class',
	  search: true,
	  searchOptions: {
	      'default': 'Search States'
	  },
	  selectAll: true
	});
});
  }

}
