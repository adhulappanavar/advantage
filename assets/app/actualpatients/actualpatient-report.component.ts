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
	   <div align="center" class="row"><h2><span class="col-md-6">Female Patients : {{actualpatients.length-maleNo}} </span><span>Male Patients : {{maleNo}} </span></h2></div>
	  <div class="panel-body">
			<div class="table-responsive">
			  <table class="table table-striped">
        <thead>
                    <tr>                        
                        <th>Reg No</th>
                        <th>Patient Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>DOA</th>
                        <th>Duration</th>   
                        <th>PCG Contact Name</th>
                        <th>PCG Contact Number</th>
                        <th>PCG Contact Email-ID</th>
                    </tr>
         </thead>
         <tbody>
				<tr *ngFor="#actualpatient of actualpatients | actualpatientsFilter:listFilter">
          {{genderCount(actualpatient.gender)}}         
          <td>{{actualpatient.registrationNumber}}</td>          
					<td>	  {{actualpatient.name}}					</td>		
          <td>{{actualpatient.gender}}</td>
          <td>{{clacAge(actualpatient.dob)}}</td>
          <td>{{stringAsDate(actualpatient.dateOfAdmission)|date }}</td>
          <td>{{clacAge(actualpatient.dateOfAdmission)}}</td>
          <td>{{actualpatient.pcpContact.name}}</td>
          <td><span *ngIf="actualpatient.pcpContact.contactNo">{{actualpatient.pcpContact.contactNo}}</span><span *ngIf="!actualpatient.pcpContact.contactNo">No contact no</span></td>                              
          <td><span *ngIf="actualpatient.pcpContact.emailId">{{actualpatient.pcpContact.emailId}}</span><span *ngIf="!actualpatient.pcpContact.emailId">NO Email ID</span></td> 
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
export class ActualpatientReportComponent implements OnInit{
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


            this.actualpatientsService
      .getAllActualpatients()
      .subscribe(p => this.maleNo = this.countfemale(p));
      
  }
  countfemale(list)
  {
    var mn =0;
    for(var i=0;i<list.length;i++)
    {
      if(list[i].gender.localeCompare("Female"))
        mn=mn+1;
    }
    return mn;
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
