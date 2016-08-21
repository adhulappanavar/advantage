import {Component} from 'angular2/core';
import {enableProdMode} from 'angular2/core';
enableProdMode();
// HTTP_PROVIDERS =. let's you inject http service
import { HTTP_PROVIDERS } from 'angular2/http';

import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";
import { PeopleComponent} from './people/people.component';
import { PersonDetailsComponent } from './people/person-details.component';

import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import { StarWarsService } from './people/starwars.service';

import { PatientComponent} from './patients/patient.component';
import { PatientDetailsComponent } from './patients/patient-details.component';
import { PatientsService } from './patients/patients.service';

import { MedicineComponent} from './medicines/medicine.component';
import { MedicineDetailsComponent } from './medicines/medicine-details.component';
import { MedicinesService } from './medicines/medicines.service';

import { Med2patientComponent} from './med2patients/med2patient.component';
import { Med2patientDetailsComponent } from './med2patients/med2patient-details.component';
import { Med2patientsService } from './med2patients/med2patients.service';

import { ActualpatientComponent} from './actualpatients/actualpatient.component';
import { ActualpatientsAddComponent} from './actualpatients/actualpatient-add.component';
import { ActualpatientDetailsComponent} from './actualpatients/actualpatient-details.component';
import { ActualpatientsEditComponent} from './actualpatients/actualpatient-edit.component';
import { ActualpatientsService } from './actualpatients/actualpatients.service';

import { ActualmedicineComponent} from './actualmedicines/actualmedicine.component';
import { ActualmedicinesAddComponent} from './actualmedicines/actualmedicine-add.component';
import { ActualmedicineDetailsComponent} from './actualmedicines/actualmedicine-details.component';
import { ActualmedicinesEditComponent} from './actualmedicines/actualmedicine-edit.component';
import { ActualmedicinesService } from './actualmedicines/actualmedicines.service';

import {ActualpatientListPaymentComponent} from './actualpayment/actualpateintlist-payment.component';
import{ActualBillComponent} from './actualbill/actualbill.component';
import{ActualBill1Component} from './actualbill/actualbill1.component';

import {BillListComponent} from './actualbill/billList.component';
import {PatientBillListComponent} from './actualbill/patientbillList.component';
import { PaymentPageComponent } from './actualpayment/paymentpage.component';
import {PatientPaymentPageComponent} from './actualpayment/patientPaymentPage.component';


import { PaymentInfoPatientListComponent } from './actualpayment/paymentinfo_patientlist.component';
import {PaymentInfoPatientComponent} from './actualpayment/paymentinfo_patient.component';

@Component({
    selector: 'my-app',
    
    template: `
    <my-header></my-header> 
        <div class="container">            
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, PeopleComponent, PatientComponent, MedicineComponent, Med2patientComponent, ActualpatientComponent , ActualmedicineComponent ,  ActualpatientListPaymentComponent , ActualBillComponent , BillListComponent , PaymentPageComponent , PaymentInfoPatientListComponent] ,
    providers: [StarWarsService, PatientsService, MedicinesService, Med2patientsService, ActualpatientsService , ActualmedicinesService  ,ROUTER_PROVIDERS, HTTP_PROVIDERS]
    
})

//var test = true;
//var test1=false;
@RouteConfig([
   { path: '/med2patients', name: 'Med2patients', component: Med2patientComponent},
    { path: '/med2patients/:id', name: 'Med2patient Details', component: Med2patientDetailsComponent },
    {path: '/auth/...', name: 'Auth', component: AuthenticationComponent},
    
    { path: '/Actualpatients', name: 'Actualpatients', component: ActualpatientComponent , useAsDefault: true },
    { path: '/ActualpatientsAdd', name: 'Actualpatients Add', component: ActualpatientsAddComponent },
    { path: '/ActualpatientsDetails', name: 'Actualpatients Details', component: ActualpatientDetailsComponent}, 
    { path: '/ActualpatientsEdit', name: 'Actualpatients Edit', component: ActualpatientsEditComponent},
    
    { path: '/Actualmedicines', name: 'Actualmedicines', component: ActualmedicineComponent},
    { path: '/ActualmedicinesAdd', name: 'Actualmedicines Add', component: ActualmedicinesAddComponent},
    { path: '/ActualmedicinesDetails', name: 'Actualmedicines Details', component: ActualmedicineDetailsComponent}, 
    { path: '/ActualmedicinesEdit', name: 'Actualmedicines Edit', component: ActualmedicinesEditComponent},
    
    { path: '/BillForPatient', name: 'Bill For Patient', component: ActualBillComponent},
    { path: '/BillForPatient1', name: 'Bill For Patient1', component: ActualBill1Component},
    { path: '/PaymentPatientList', name: 'Payment Patient List', component: ActualpatientListPaymentComponent},

    { path : '/billlist' , name : 'Bill List' , component : BillListComponent },
    { path : '/patientbilllist/:id' , name : 'Patient Bill List' , component : PatientBillListComponent } , 

    { path : '/paymentpage' , name : 'Payment Page' , component : PaymentPageComponent }, 
    { path : '/paymentpageForPatient/:id' , name : 'Payment Page Patient' , component : PatientPaymentPageComponent },

    { path : '/paymenthistorylist' , name : 'Payment History List' , component : PaymentInfoPatientListComponent }, 
    { path : '/paymenthistoryeForPatient/:id' , name : 'Payment History For Patient' , component : PaymentInfoPatientComponent }

])

export class AppComponent {
   // test = true;
    test1=false;

    foo(){ return false;}
}

