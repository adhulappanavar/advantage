import {Component} from "angular2/core";
import {PatientInputComponent} from "./patient-input.component";
import {PatientListComponent} from "./patient-list.component";
@Component({
    selector: 'my-patients',
    template: `
 

        <div class="row spacing">
            <my-patient-list></my-patient-list>
        </div> 
        <div class="row spacing">
            <my-patient-input></my-patient-input>
        </div>

    `,
    directives: [PatientListComponent, PatientInputComponent]
})
export class PatientsComponent {
     pageTitle: string = 'Patients Component includes Input and List Component';
}