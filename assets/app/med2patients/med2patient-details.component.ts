import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { Med2patientsService } from './med2patients.service';
import { Med2patient } from './med2patient';

import { ActualmedicinesService } from '../actualmedicines/actualmedicines.service';
import { Actualmedicine } from '../actualmedicines/actualmedicine';
import { ActualmedicinesFilterPipe } from '../actualmedicines/actualmedicine-filter.pipe';

@Component({
  selector: 'med2patient-details',
  templateUrl: 'html/med2patients/med2patient-details.component.html',
  styleUrls: ['html/med2patients/med2patient-details.component.css'],
  pipes : [ActualmedicinesFilterPipe]
})
export class Med2patientDetailsComponent implements OnInit {
    @Input() med2patient : Med2patient;
    actualmedicines: Actualmedicine[] = [];
    isSaving: boolean;
    listFilter = "";

    constructor(private med2patientsService: Med2patientsService,
                private actualmedicinesService: ActualmedicinesService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){

        let id = this.routeParams.get('id');
        console.log('getting med2patient with id: ', id); 


        this.med2patientsService
          .getMed2patients(id) 
          .subscribe(p => this.med2patient = p);


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
           actualmedicine.qty = 1;
           this.med2patient.newmedicines.push(actualmedicine);
           this.saveMed2patientDetails();
    }

    deletefromNewMeds(index)
    {  
        console.log(index);
        var temp = this.med2patient.newmedicines;
        this.med2patient.newmedicines = [];
        console.log(temp);
        if(temp)
        for(var i=0;i<temp.length;i++)
        {
            if(!(i==index))
            {
              this.med2patient.newmedicines.push(temp[i]);
            }
        }
        this.saveMed2patientDetails();
    }

    deletefromMeds( index )
    {
        console.log(index);
        var temp = this.med2patient.medicines;
        this.med2patient.medicines = [];
        if(temp)
        for(var i=0;i<temp.length;i++)
        {
            if(!(i==index))
            {
              this.med2patient.medicines.push(temp[i]);
            }
        }
        this.saveMed2patientDetails();
    }


     onSaveFromNewMedicine2GivenMedicine(event : string, med2patient : Med2patient)
  {
                console.log("Save from Picked Medicine to Patients Given Medicine");
                console.log("New Medicine to be save to Given medicine ..." , event, med2patient);
                console.log ("New Medicine Length  ", med2patient.newmedicines.length);
                  console.log ("Med2Patient Object before save  ", med2patient);
                  if(med2patient.newmedicines)
                for(var i = 0 ; i < med2patient.newmedicines.length ; i++)
                {
                      this.med2patient.medicines.push(med2patient.newmedicines[i]);
                } 
                
              console.log ("Med2Patient Object after save  ", med2patient);

                this.med2patient.newmedicines = [];
                this.saveMed2patientDetails();
    
  }
}
