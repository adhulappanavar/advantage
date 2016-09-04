import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {Response} from 'angular2/http';
import { Actualpatient } from './actualpatient';
import { ActualpatientDetailsComponent } from './actualpatient-details.component';
import { ActualpatientsEditComponent } from './actualpatient-edit.component';
import { ActualpatientsService } from './actualpatients.service';
import { Med2patientsService } from '../med2patients/med2patients.service';
import { RouteParams, Router} from 'angular2/router';
import { ActualpatientsFilterPipe } from './actualpatient-filter.pipe';
import {AuthService} from "../auth//auth.service";
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
            <div class='col-md-1'>Female No : <span></span></div>
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
          {{genderCount(actualpatient.gender)}}
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
          <td><a>Discharge</a></td>
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
  imageWidth= 50;
  imageMArgin = 2;
  med2patients;
  constructor(private actualpatientsService : ActualpatientsService , private _authService: AuthService , private router: Router , private med2patientsService: Med2patientsService) { }
  femaleNo = 0 ; 
  maleNo = 0;
  ngOnInit(){

    if(!this.isLoggedIn())
      {
        let link = ['Auth'];
        this.router.navigate(link);
      }
 
    //this.actualpatients = this.starWarsService.getAll();
    this.actualpatientsService
      .getAllActualpatients()
      .subscribe(p => this.actualpatients = p);

      this.med2patientsService
          .getAllMed2patients() 
          .subscribe(p => this.med2patients = p);

      
  }

  selectActualpatient(actualpatient: Actualpatient){
    this.selectedActualpatient = actualpatient;
  }
  
  genderCount( gender : string)
  {
    console.log("in gender count");
      if(gender=="Female")
        this.femaleNo=this.femaleNo+1;
      else
        this.maleNo = this.maleNo + 1;

  }

  isLoggedIn() {
        return this._authService.isLoggedIn();
    }
  
  toggleImage() : void
    {
        this.showImage = !this.showImage;
    }
     
    onDelete(id : string) { console.log("logging another change!!!!");

    console.log("patient id : " , id);
//        this.actualpatientsService.deleteMessage(id);
      this.actualpatientsService
          .deleteActualpatient(id)
          .subscribe( 
            (r: Response) => {console.log('success, ')},
            (error) => {console.log('error: ', error);}
          );

          this.actualpatientsService
      .getAllActualpatients()
      .subscribe(p => this.actualpatients = p);
      
      
      var med2patientid; 

      //let id = this.routeParams.get('id');
        console.log("trying to delete med2patient object");
        if(this.med2patients)
        for(var i=0;i<this.med2patients.length;i++)
        {
          console.log(i);
          console.log(this.med2patients[i].patientid == id);
          console.log(id , " : " , this.med2patients[i].patientid);
          if(this.med2patients[i].patientid == id)
          {
              console.log("in IF");
              console.log(this.med2patients[i].id);
              console.log(this.med2patients[i]._id);
              med2patientid = this.med2patients[i].id;
              break;
          }
        } 

         console.log('getting med2patient with id: ',med2patientid);
        
        this.med2patientsService
          .deleteMed2patient(med2patientid)
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
