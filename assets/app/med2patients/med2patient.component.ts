import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Med2patient } from './med2patient';
import { Med2patientDetailsComponent } from './med2patient-details.component';
import { Med2patientsService } from './med2patients.service';

@Component({
  selector: 'med2patients-list',
  directives: [Med2patientDetailsComponent, ROUTER_DIRECTIVES],
  template: `
  <!-- this is the new syntax for ng-repeat -->
  <ul class="med2patients">
    <li *ngFor="#med2patient of med2patients" >
      <a href="#" [routerLink]="['Med2patient Details', {id: med2patient.id}]">{{med2patient.patientid}}/{{med2patient.name}}</a>
    </li>
  </ul>
  <h6>Thanks to http://www.barbarianmeetscoding.com/blog/categories/angular2-step-by-step/ </h6>
  `,
  styleUrls: ['html/med2patients/med2patients.component.css']
})
export class Med2patientComponent implements OnInit{
  med2patients: Med2patient[] = [];
  selectedMed2patient: Med2patient;

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
