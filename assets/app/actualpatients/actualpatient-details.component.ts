import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { ActualpatientsService } from './actualpatients.service';
import { Actualpatient } from './actualpatient';

import { ActualpatientsEditComponent } from './actualpatient-edit.component';

@Component({
  selector: 'actualpatient-details',
  directives: [ActualpatientsEditComponent, ROUTER_DIRECTIVES],
  templateUrl: 'html/actualpatients/actualpatient-details.component.html',
  styleUrls: ['html/actualpatients/actualpatient-details.component.css']
})
export class ActualpatientDetailsComponent implements OnInit {
    @Input() actualpatient : Actualpatient={
      "registrationNumber" : "" ,    
    "name"        : "",
    "gender"      : "",
    "dob"         : new Date(),
    "dateOfAdmission" : new Date(),  
    "photoUrl"    : "",
    "pcpContact" : {
		"name" : "" , 
		"contactNo" : "" , 
		"adress" : "",
    "emailId" : ""
	},
    "comments" : "",
    "initialPayment" : {
		"registrationFee" : 8000,
        "cautionDeposit" : 75000,
        "advancePayment" : 20000,
        "establishmentCharges" : 37500,
        "monthlyCharges" : 20000,
        "phyisiotherapyCharges": 4000,
        "privateNurseCharges" : 7000
	}
    };
    isSaving: boolean;
    listFilter="";
    constructor(private actualpatientsService: ActualpatientsService,
               private routeParams: RouteParams,
               private router: Router){
    }

       ngOnInit(){
//        let id = Number.parseInt(this.routeParams.get('id'));
        let id = this.routeParams.get('id');
        console.log('getting student with id: ', id);
        this.actualpatientsService
         .getActualpatient(id)
          .subscribe(p => this.actualpatient = p);
          console.log('getting student : ', this.actualpatient);
    }

    gotoPeoplesList(){
        let link = ['Actualpatients'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveActualpatient(){
      this.isSaving = true;
      this.actualpatientsService
          .saveActualpatient(this.actualpatient)
          .subscribe(
 //           (r: Response) => {console.log('success, id:'+this.actualpatient.id+', Name:'+this.actualpatient.name+', Weight:'+this.actualpatient.weight)},
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualpatient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
    
    stringAsDate(dateStr) {
          return new Date(dateStr);
        }
}
