import { Component, OnInit ,Input } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Actualpatient } from '../actualpatients/actualpatient';
import { ActualpatientsService } from '../actualpatients/actualpatients.service';

import {Med2patientsService} from '../med2patients/med2patients.service'
import { Med2patient } from '../med2patients/med2patient';

@Component({
  selector: 'actualpatients-list',
  directives: [ ROUTER_DIRECTIVES],
  template: `
  <div align="center" *ngIf="editMode"><button class="btn btn-success">Create Bill</button></div>
  <div class="panel panel-default ">
	  <div class="panel-heading">
	    <div class='row'>     
            <div class="col-md-4"><img  src="images/advantagelogo.png" width="250" height="170"></div>     
            <div class="col-md-8" align="center">
                  <h2>ADVANTAGE ELDER CARE</h2>
                  <p>Hunasamaranahalli Post, (VIA) Bettahalasuru, Bangalore North - 562 157.</p>
                  <p>Website : www.advantageeldercare.com</p>
                  <p>Email: shajiphilip_advantage@yahoo.co.in</p>
                  <p>Tel : 080 60121222, +91 98443 95515, 78295 92189</p>
            </div>             
    	 </div><br>
       <div class="row" *ngIf="thepatient">
            <div class="col-md-6" align="center">
              <div class="table-responsive">
              <div class="table">
                <tbody>
                <tr><td>Patient Name:</td><td>{{med2patient.name}}</td></tr>
                <tr><td>Patient Name:</td><td>{{thepatient.name}}</td></tr>
                <tr><td>Reg No:</td><td>{{thepatient.registrationNumber}}</td></tr>
                <tr><td>DOA :</td><td>{{stringAsDate(thepatient.dateOfAdmission)}}</td></tr>
                <tr><td>Age/Gender</td><td>{{clacAge(thepatient.dob)}}/{{thepatient.gender}}</td></tr>
              </div>
              </div>
            </div>
            <div class="col-md-4" align="center">
              <div class="table-responsive">
                <table class="table">
                  <tbody>
                    <tr><td>Category:</td><td>Monthly Bill</td></tr>
                    <tr><td>Category:</td><td>Monthly Bill</td></tr>
                    <tr><td>Month:</td><td>{{getBillingMonth()}}</td></tr>
                    <tr><td>Date:</td><td>{{todaysDate()}}</td></tr>
                    <tr><td>Prepared By:</td><td>{{user}}</td></tr>				
                  </tbody>
                </table>
              </div>
            
            </div>
       </div>
       
     </div>
       <div class="panel-body">
            <div class="table-responsive">
			         <table class="table">
                    <thead>
                        <tr>                            
                            <th>Sl No</th>
                            <th>Particulars</th>
                            <th>Quanty</th>
                            <th>Base Cost</th>
                            <th>Amount</th>                                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="#medicine of med2patient.medicines;var index=index">
                             <td>{{index+1}}</td>
                             <td>{{medicine.name}}</td>
                             <td>{{medicine.qty}}</td>
                             <td>{{medicine.cost}}</td>                             
                             <td>{{medicine.cost * medicine.qty}}</td>
                        </tr>
                    </tbody>
               </table>
            </div>
       </div>		 
	     <div class="panel-footer">
           <div class="table responsive">
              <table class="table">
                  <tbody>
                    <tr><td>Total Cost : </td><td>{{med2patient.medtotalcost}}</td></tr>
                  </tbody>
              </table>
           </div>   
       </div>
       
	</div>  
  
  `,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css']
  
})
export class ActualBillComponent implements OnInit{
  med2patient : Med2patient={"mongoId": " " };
  editMode = true;
  thepatient : Actualpatient={};
  showImage = false;
  imageWidth = 50;
  imageMArgin = 2;
  slno = 1;
  buildtotal = 0;
  user="ACE/MARSH";
  constructor(private med2patientsService : Med2patientsService,
              private actualpatientsService : ActualpatientsService,
              private routeParams: RouteParams,
              private router: Router){ }

  ngOnInit(){
     let id = this.routeParams.get('id');
     console.log(id);
    //this.actualpatients = this.starWarsService.getAll();
    /*this.actualmed2patientsService
         .getMed2PatientIdFromPatientId(id)
          .subscribe(p => this.actualmed2patient = p);
 //   */   //   console.log('getting med2patientObj : ', this.actualmed2patient);
          
    /* this.actualpatientsService
      .getActualpatient(id)
      .subscribe(p => this.thepatient = p)    

*/
      this.med2patientsService
          .getMed2patients(id)
          .subscribe(p => this.med2patient = p);


      //  this.calcTotalAmount(this.actualmed2patient);
  } 
  calcTotalAmount(actualmed2patient){
       console.log(this.thepatient.name);
       
       console.log("calcTotalAmount::" , actualmed2patient.patientid);
       //var len = this.actualmed2patient.medicines.length;
       /*for(var i=0;i< len ; i++)
       {
          this.buildtotal = this.buildtotal + (this.actualmed2patient.medicines[i].cost * parseInt(this.actualmed2patient.medicines[i].qty));   
       }       
       return this.buildtotal;*/
     }
    stringAsDate(dateStr) {
          //return new Date(dateStr);
          return moment(dateStr , "YYYY-MM-DD").format("DD-MM-YYYY");
        }
        
     clacAge(dateStr){
       var m = moment(new Date(dateStr) , "YYYY-MM-DD");
       return m.fromNow(true);
     }
     todaysDate()
     {
       return moment(new Date() , "YYYY-MM-DD").format("DD-MM-YYYY");
     }
     
     getBillingMonth(){
       var m = moment(new Date() , "YYYY-MM-DD");
       //var monthNames = ["January", "February", "March", "April", "May", "June",
       //                   "July", "August", "September", "October", "November", "December"
       //                   ];
      // return monthNames[m.getMonth()];
      //  console.log(moment(m).month());
      //  console.log(m.format("MMMM"));
      
      return m.format("MMMM");
     }
}
