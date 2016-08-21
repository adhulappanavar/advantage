import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Med2patient } from './med2patient';
import { Med2patientDetailsComponent } from './med2patient-details.component';
import { Med2patientsService } from './med2patients.service';

import {ActualpatientsFilterPipe} from './actualpatient-filter.pipe';

@Component({
  selector: 'med2patients-list',
  directives: [Med2patientDetailsComponent, ROUTER_DIRECTIVES],
  pipes : [ActualpatientsFilterPipe] , 
  template: `
  <!-- this is the new syntax for ng-repeat 
  <ul class="med2patients">
    <li *ngFor="#med2patient of med2patients" >
      <a href="#" [routerLink]="['Med2patient Details', {id: med2patient.id}]">{{med2patient.patientid}}/{{med2patient.name}}</a>
    </li>
  </ul>
  <h6>Thanks to http://www.barbarianmeetscoding.com/blog/categories/angular2-step-by-step/ </h6>
  -->
<div class="panel panel-primary ">
	  <div class="panel-heading">
    <div class='row'>            
            <div class='col-md-2'><span style='font-size:large'>Patient List</span></div>
            <div class='col-md-6'>
                <span style='font-size:large'>Filter by:</span ><input style="color:black" type='text' [(ngModel)]='listFilter'/>
            </div>           
     </div>	<br>
	 <div style='font-size:large'> Click on Patient Name to Add Items to that Patient</div>	 
	  </div>
	  <div class="panel-body">
		<div class="table-responsive">
		<table class="table table-striped">
        <thead>
                    <tr>
                        <th>Patient Name</th>
                    </tr>
         </thead>
         <tbody>
              <tr *ngFor="#med2patient of med2patients | actualpatientsFilter : listFilter">     
                      <td>
                      <a href="#" [routerLink]="['Med2patient Details', {id: med2patient.id}]">{{med2patient.name}}</a>
                      </td>		
              </tr>         
         </tbody>
		  </table>	  
		  </div>
		</div>
	</div>  

  `,
  styleUrls: ['html/med2patients/med2patients.component.css']
})
export class Med2patientComponent implements OnInit{
  med2patients: Med2patient[] = [];
  selectedMed2patient: Med2patient;
  listfilter= "";
  constructor(private med2patientsService : Med2patientsService){ }

  ngOnInit(){
    //this.med2patients = this.starWarsService.getAll();
    this.med2patientsService
      .getAllMed2patients()
      .subscribe(p => this.med2patients = p)
  }

  selectMed2patient(med2patient: Med2patient){
    this.selectedMed2patient = med2patient;
  }
}
