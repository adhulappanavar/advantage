import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { ActualmedicinesService } from './actualmedicines.service';
import { Actualmedicine } from './actualmedicine';

@Component({
  selector: 'actualmedicines-details',
  templateUrl: 'html/actualmedicines/actualmedicine-edit.component.html',
  styleUrls: ['html/actualmedicines/actualmedicine-edit.component.css']
})
export class ActualmedicinesEditComponent implements OnInit {
    actualmedicine : Actualmedicine = {"url": "",
            "name": "",  
             "cost": 0
      };
    
    
    isSaved: boolean = false; 
    

    constructor(private actualmedicinesService: ActualmedicinesService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){       
        let id = this.routeParams.get('id');
        console.log('getting patient with id: ', id);
        this.actualmedicinesService
          .getActualmedicine(id)
          .subscribe(p => this.actualmedicine = p);
        
    }

    gotoPeoplesList(){
        let link = ['Actualmedicines'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveActualmedicineDetails(){
     // this.isSaved = true;
      this.actualmedicinesService
          .saveActualmedicine(this.actualmedicine)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualmedicine))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaved = true;}
          );
          
  //        this.isSaved = true;
    }
}