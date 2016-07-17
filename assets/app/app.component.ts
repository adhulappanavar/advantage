import {Component} from 'angular2/core';

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

import { StudentComponent} from './students/student.component';
import { StudentDetailsComponent } from './students/student-details.component';
import { StudentAddComponent } from './students/student-add.component';
import { StudentsService } from './students/students.service';

import { ActualpatientComponent} from './actualpatients/actualpatient.component';
import { ActualpatientsService } from './actualpatients/actualpatients.service';

@Component({
    selector: 'my-app',
    template: ` 
        <div class="container">
            <my-header></my-header>
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, PeopleComponent, PatientComponent, MedicineComponent, Med2patientComponent , StudentComponent , ActualpatientComponent],
    providers: [StarWarsService, PatientsService, MedicinesService, Med2patientsService, ROUTER_PROVIDERS, HTTP_PROVIDERS , StudentsService , ActualpatientsService]
})
@RouteConfig([
    { path: '/patients', name: 'Patients', component: PatientComponent, useAsDefault: true},
    { path: '/patients/:id', name: 'Patient Details', component: PatientDetailsComponent },
    { path: '/medicines', name: 'Medicines', component: MedicineComponent},
    { path: '/medicines/:id', name: 'Medicine Details', component: MedicineDetailsComponent },
   { path: '/med2patients', name: 'Med2patients', component: Med2patientComponent},
    { path: '/med2patients/:id', name: 'Med2patient Details', component: Med2patientDetailsComponent },
    {path: '/auth/...', name: 'Auth', component: AuthenticationComponent},
    { path: '/students', name: 'Students', component: StudentComponent},
    { path: '/students/:id', name: 'Student Details', component: StudentDetailsComponent },
    { path: '/studentsAdd', name: 'Student Add', component: StudentAddComponent },
    { path: '/Actualpatients', name: 'Actualpatients', component: ActualpatientComponent},
])
export class AppComponent {
    
}