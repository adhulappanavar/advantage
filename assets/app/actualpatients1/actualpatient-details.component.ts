import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { ActualpatientsService } from './actualpatients.service';
import { Actualpatient } from './actualpatient';

@Component({
  selector: 'actualpatient-details',
  templateUrl: 'html/actualpatients/actualpatient-details.component.html',
  styleUrls: ['html/actualpatients/actualpatient-details.component.css']
})
export class ActualpatientDetailsComponent implements OnInit {
    @Input() actualpatient : Actualpatient;
    isSaving: boolean;
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private actualpatientsService: ActualpatientsService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){
//        let id = Number.parseInt(this.routeParams.get('id'));
        let id = this.routeParams.get('id');
        console.log('getting actualpatient with id: ', id);
        this.actualpatientsService
          .getActualpatients(id)
          .subscribe(p => this.actualpatient = p);
    }

    gotoPeoplesList(){
        let link = ['Actualpatients'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveActualpatientDetails(){
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
}
