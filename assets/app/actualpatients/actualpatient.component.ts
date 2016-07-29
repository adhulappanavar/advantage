import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Actualpatient } from './actualpatient';
import { ActualpatientDetailsComponent } from './actualpatient-details.component';
import { ActualpatientsEditComponent } from './actualpatient-edit.component';
import { ActualpatientsService } from './actualpatients.service';

import { ActualpatientsFilterPipe } from './actualpatient-filter.pipe';

@Component({
  selector: 'actualpatients-list',
  directives: [ActualpatientDetailsComponent, ROUTER_DIRECTIVES],
  template: `
  <div class="panel panel-primary ">
	  <div class="panel-heading">
    <div class='row'>            
            <div class='col-md-2'><span style='font-size:large'>Patient List</span></div>
            <div class='col-md-6'>
                <span style='font-size:large'>Filter by:</span ><input style="color:black" type='text' [(ngModel)]='listFilter'/>
            </div>
            <div class='col-md-1 col-md-offset-1'><button class="btn btn-danger" [routerLink] = "['Actualpatients Add']" >ADD</button></div>
     </div>		 
	  </div>
	  <div class="panel-body">
			<div class="table-responsive">
			  <table class="table">
        <thead>
                    <tr>
                        <th>
                            <button class='btn btn-primary' (click) = "toggleImage()">
                                {{showImage ? 'Hide' : 'Show'}} Image
                            </button>
                        </th>
                        <th>Reg No</th>
                        <th>Patient Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>DOA</th>                        
                        <th></th>         
                        <th></th>               
                    </tr>
         </thead>
         <tbody>
				<tr *ngFor="#actualpatient of actualpatients | actualpatientsFilter:listFilter">
          <td>
                <img *ngIf='showImage' [src]='actualpatient.photoUrl' [title]='actualpatient.name' [style.width.px]='imageWidth' [style.margin.px]= 'imageMargin'/>
          </td>
          <td>{{actualpatient.registrationNumber}}</td>          
					<td>
					  <a href="#" [routerLink]="['Actualpatients Details', {id: actualpatient.id}]">{{actualpatient.name}}</a>
					</td>		
          <td>{{actualpatient.gender}}</td>
          <td>{{clacAge(actualpatient.dob)}}</td>
          <td>{{stringAsDate(actualpatient.dateOfAdmission)|date }}</td>
          <td>
            <a [routerLink] = "[ 'Actualpatients Edit' , {id: actualpatient.id} ]">Edit</a>
          </td>
          <td>
            <a (click) = "onDelete(actualpatient.id)">Delete</a>
          </td>
				</tr>
        </tbody>
			  </table>	  
			</div>
		</div>
	</div>  
  
  `,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css'],
  pipes : [ActualpatientsFilterPipe]
})
export class ActualpatientComponent implements OnInit{
  actualpatients: Actualpatient[] = [];
  selectedActualpatient: Actualpatient;
  listFilter = "";
  showImage = false;
  imageWidth = 50;
  imageMArgin = 2;
  constructor(private actualpatientsService : ActualpatientsService){ }

  ngOnInit(){
    //this.actualpatients = this.starWarsService.getAll();
    this.actualpatientsService
      .getAllActualpatients()
      .subscribe(p => this.actualpatients = p);
  }

  selectActualpatient(actualpatient: Actualpatient){
    this.selectedActualpatient = actualpatient;
  }
  
  
  toggleImage() : void
    {
        this.showImage = !this.showImage;
    }
    
    onDelete(id : string) {
//        this.actualpatientsService.deleteMessage(id);
      this.actualpatientsService
          .deleteActualpatient(id)
          .subscribe( 
            (r: Response) => {console.log('success, ')},
            (error) => {console.log('error: ', error);}
          );

    }

    
    stringAsDate(dateStr) {
          return new Date(dateStr);
        }
        
     clacAge(dateStr){
       var m = moment(new Date(dateStr) , "YYYY-MM-DD");
       return m.fromNow(true);
     }
}
