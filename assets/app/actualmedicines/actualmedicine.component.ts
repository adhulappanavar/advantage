import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {Response} from 'angular2/http';
import { Actualmedicine } from './actualmedicine';
import { ActualmedicineDetailsComponent } from './actualmedicine-details.component';
import { ActualmedicinesEditComponent } from './actualmedicine-edit.component';
import { ActualmedicinesService } from './actualmedicines.service';

import { ActualmedicinesFilterPipe } from './actualmedicine-filter.pipe';

@Component({
  selector: 'actualmedicines-list',
  directives: [ActualmedicineDetailsComponent, ROUTER_DIRECTIVES],
  template: `
  <div class="panel panel-primary ">
	  <div class="panel-heading">
    <div class='row'>
            <div class='col-md-2'><span style='font-size:large'>Items List</span></div>
            <div class='col-md-6'>
                <span style='font-size:large'>Filter by: </span ><input type='text' [(ngModel)]='listFilter' style="color:black"/>
            </div>
            <div class='col-md-1 col-md-offset-1'><button class="btn btn-danger" [routerLink] = "['Actualmedicines Add']" >ADD</button></div>
     </div>		 
	  </div>
	  <div class="panel-body">
			<div class="table-responsive">
			  <table class="table table-striped">
        <thead>
                    <tr>
                        <th>
                            <button class='btn btn-primary' (click) = "toggleImage()">
                                {{showImage ? 'Hide' : 'Show'}} Image
                            </button>
                        </th>
                        <th>Item Name</th>
                        <th>Cost</th>
                        <th></th>         
                        <th></th>               
                    </tr>
         </thead>
         <tbody>
				<tr *ngFor="#actualmedicine of actualmedicines | actualmedicinesFilter:listFilter">
          <td>
                <img *ngIf='showImage' [src]='actualmedicine.url' [title]='actualmedicine.name' [style.width.px]='imageWidth' [style.margin.px]= 'imageMargin'/>
          </td>
					<td>
					  <a href="#" [routerLink]="['Actualmedicines Details', {id: actualmedicine.id}]">{{actualmedicine.name}}</a>
					</td>		
          <td>{{actualmedicine.cost}}</td>
          <td>
            <a [routerLink] = "[ 'Actualmedicines Edit' , {id: actualmedicine.id} ]">Edit</a>
          </td>
          <td>
            <a (click) = "onDelete(actualmedicine.id)">Delete</a>
          </td>
				</tr>
        </tbody>
			  </table>	  
			</div>
		</div>
	</div>  
  
  `,
  styleUrls: ['html/actualmedicines/actualmedicines-list.component.css'],
  pipes : [ActualmedicinesFilterPipe]
})
export class ActualmedicineComponent implements OnInit{
  actualmedicines: Actualmedicine[] = [];
  selectedActualmedicine: Actualmedicine;
  listFilter = "";
  showImage = false;
  imageWidth = 50;
  imageMArgin = 2;
  constructor(private actualmedicinesService : ActualmedicinesService){ }

  ngOnInit(){
    //this.actualmedicines = this.starWarsService.getAll();
    this.actualmedicinesService
      .getAllActualmedicines()
      .subscribe(p => this.actualmedicines = p)
  }

  onDelete(id : string) { console.log("logging another change!!!!");
//        this.actualpatientsService.deleteMessage(id);
      this.actualmedicinesService
          .deleteActualmedicine(id)
          .subscribe( 
            (r: Response) => {console.log('success, ')},
            (error) => {console.log('error: ', error);}
          );

        this.actualmedicinesService
      .getAllActualmedicines()
      .subscribe(p => this.actualmedicines = p)

    }

  selectActualmedicine(actualmedicine: Actualmedicine){
    this.selectedActualmedicine = actualmedicine;
  }
  
  toggleImage() : void
    {
        this.showImage = !this.showImage;
    }
}
