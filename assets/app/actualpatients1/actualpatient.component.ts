import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Actualpatient } from './actualpatient';
//import { ActualpatientDetailsComponent } from './actualpatient-details.component';
import { ActualpatientsService } from './actualpatients.service';

import { ActualpatientsFilterPipe } from './actualpatient-filter.pipe';

@Component({
  selector: 'actualpatients-list',
  directives: [/*ActualpatientDetailsComponent,*/ ROUTER_DIRECTIVES],
  template: `
  <div class="panel panel-primary ">
	  <div class="panel-heading">
    <div class='row'>
            <div class='col-md-2'>Filter by:</div>
            <div class='col-md-4' style="color:black">
                <input type='text' [(ngModel)]='listFilter'/>
            </div>
     </div>
		 <a href="#">ADD</a>
	  </div>
	  <div class="panel-body">
			<div class="table-responsive">
			  <table class="table">
				<tr *ngFor="#actualpatient of actualpatients | actualpatientsFilter:listFilter">
					<td>
					  <a href="#">{{actualpatient.name}}</a>
					</td>		
				</tr>
			  </table>	  
			</div>
		</div>
	</div>
  <h6>Thanks to http://www.barbarianmeetscoding.com/blog/categories/angular2-step-by-step/ </h6>
  `,
  styleUrls: ['html/actualpatients/actualpatients.component.css'],
  pipes : [ActualpatientsFilterPipe]
})
export class ActualpatientComponent implements OnInit{
  actualpatients: Actualpatient[] = [];
  selectedActualpatient: Actualpatient;
  listFilter = "";
  constructor(private actualpatientsService : ActualpatientsService){ }

  ngOnInit(){
    //this.actualpatients = this.starWarsService.getAll();
    this.actualpatientsService
      .getAllActualpatients()
      .subscribe(p => this.actualpatients = p)
  }

  selectActualpatient(actualpatient: Actualpatient){
    this.selectedActualpatient = actualpatient;
  }
}
