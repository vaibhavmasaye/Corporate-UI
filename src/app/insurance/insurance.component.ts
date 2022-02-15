import { Component, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

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
    
    $(document).ready(function () {
      $('#editor').wysiwyg({
        highlight: true,
        debug: true
      });
    });
  }

}
