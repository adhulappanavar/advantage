import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { Med2patientsService } from './med2patients.service';
import { Med2patient } from './med2patient';

import { ActualmedicinesService } from '../actualmedicines/actualmedicines.service';
import { Actualmedicine } from '../actualmedicines/actualmedicine';


@Component({
  selector: 'med2patient-details',
  templateUrl: 'html/med2patients/med2patient-details.component.html',
  styleUrls: ['html/med2patients/med2patient-details.component.css']
})
export class Med2patientDetailsComponent implements OnInit {
    @Input() med2patient : Med2patient;
    actualmedicines: Actualmedicine[] = [];
    isSaving: boolean;
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private med2patientsService: Med2patientsService,
                private actualmedicinesService: ActualmedicinesService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){
//        let id = Number.parseInt(this.routeParams.get('id'));
        let id = this.routeParams.get('id');
        console.log('getting med2patient with id: ', id);

        //Get Current Patient Details and Medical Records
        this.med2patientsService
          .getMed2patients(id)
          .subscribe(p => this.med2patient = p);

        //Get Medicines to show Medicine List
        this.actualmedicinesService
                .getAllActualmedicines()
                .subscribe(p => this.actualmedicines = p)
    }


  
    gotoPeoplesList(){
        let link = ['Med2patients'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveMed2patientDetails(){
      this.isSaving = true;
      this.med2patientsService
          .saveMed2patient(this.med2patient)
          .subscribe(
 //           (r: Response) => {console.log('success, id:'+this.med2patient.id+', Name:'+this.med2patient.name+', Weight:'+this.med2patient.weight)},
            (r: Response) => {console.log('success, '+ JSON.stringify(this.med2patient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }

    onEdit(event : string, med2patient : Med2patient) {
           console.log(event, med2patient);
    }

      addNewMedPatientList(event : string, actualmedicine : Actualmedicine) {
            console.log("Send to Patient List clicked");
           console.log(event, actualmedicine);
           this.med2patient.newmedicines.push(actualmedicine);
           this.saveMed2patientDetails();
    }


     onSaveFromNewMedicine2GivenMedicine(event : string, med2patient : Med2patient)
  {
                console.log("Save from Picked Medicine to Patients Given Medicine");
                console.log("New Medicine to be save to Given medicine ..." , event, med2patient);
                console.log ("New Medicine Length  ", med2patient.newmedicines.length);
                  console.log ("Med2Patient Object before save  ", med2patient;
                for(var i = 0 ; i < med2patient.newmedicines.length ; i++)
                {
                      this.med2patient.medicines.push(med2patient.newmedicines[i]);
                } 
                
              console.log ("Med2Patient Object after save  ", med2patient;

                this.med2patient.newmedicines = [];
                this.saveMed2patientDetails();
    
  }
}
