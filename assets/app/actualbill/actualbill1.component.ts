import { Component, OnInit ,Input } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Actualpatient } from '../actualpatients/actualpatient';
import { ActualpatientsService } from '../actualpatients/actualpatients.service';

import {Med2patientsService} from '../med2patients/med2patients.service'
import { Med2patient } from '../med2patients/med2patient';

import {billing} from '../med2patients/billing';

@Component({
  selector: 'actualpatients-list',
  directives: [ ROUTER_DIRECTIVES],
  template: ` 

  <div class="row">  
      <div class="col-md-6" align="center" *ngIf="notFinal"><strong style="color:grey">{{editMode ? 'Cilck After Editing is Done : ' : 'Click here to Edit : '}}</strong><button class="btn btn-warning" (click) = "toggleEditing()">{{editMode ? 'Done' : 'Edit'}}</button></div>
      <div class="col-md-6" align="center" *ngIf="!editMode && notFinal"><button class="btn btn-success" (click)="makeFinal()">Make Final Bill</button></div>
  </div>
  <br>
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
                <tr><td>Reg No:</td><td>{{med2patient.registrationNumber}}</td></tr>
                <tr><td>DOA :</td><td>{{stringAsDate(med2patient.dateOfAdmission)}}</td></tr>
                <tr><td>Age/Gender</td><td>{{clacAge(med2patient.dob)}}/{{med2patient.gender}}</td></tr>
              </div>
              </div>
            </div>
            <div class="col-md-4" align="center">
              <div class="table-responsive">
                <table class="table">
                  <tbody>                    
                    <tr>
                      <td>Category:</td>
                      <td>{{billtype}}</td>                      
                    </tr>
                    <tr>
                        <td>Month/Year:</td>
                        <td>{{billmonth}} / {{billyear}}</td>                        
                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td>{{billDate}}</td>                        
                    </tr>
                    <tr>
                        <td>Prepared By:</td>
                        <td>{{user}}</td>                        
                    </tr>				
                  </tbody>
                </table>
              </div>
            
            </div>
       </div>
       
     </div>
       <div class="panel-body">
            <div class="table-responsive">
              <table *ngIf="selectedForBill" class="table">
                    <thead>
                        <tr>                            
                            <th>Sl No</th>
                            <th>Particulars</th>
                            <th>Quanty</th>
                            <th>Base Cost</th>
                            <th>Amount</th>
                                                                                                     
                        </tr>
                    </thead>
                    <tbody >
                        <tr *ngFor="#medicine of selectedForBill;var index=index">
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
                    <tr><td>Total Cost : </td><td>{{calcTotalAmount(med2patient.medtotalcost)}}</td></tr>
                  </tbody>
              </table>
           </div>   
       </div>
       
	</div>  
  
  `,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css']
  
})
export class ActualBill1Component implements OnInit{
  med2patient : Med2patient={"mongoId": " " };
  editMode = true;
  thepatient : Actualpatient={};
  billtype="Monthly Bill";
  billmonth=this.getBillingMonth();
  showImage = false;
  imageWidth = 50;
  imageMArgin = 2;
  slno = 1;
  notfinal=true;
  selectAll = true;
  id;
  billid;

  notFinal=true;
  billyear =this.getBillingYear();
  tempbill = [];
  selectedForBill = [];
  billentry : billing = { medicines : []} ;
  dontAdd = [] ;
  billDate = this.todaysDate();
  buildtotal = 0;
  billTotal = 0;
  user="ACE/MARSH";
  billlist;
  constructor(private med2patientsService : Med2patientsService,
              private actualpatientsService : ActualpatientsService,
              private routeParams: RouteParams,
              private router: Router){ }

  ngOnInit(){
     let tempid = this.routeParams.get('id1');
     let splittempid  = tempid.split ("__");
     this.id = splittempid[0];
     this.billid = splittempid[0];
     console.log(this.id);
     console.log(this.billid);
      this.med2patientsService
          .getMed2patients(id)
          .subscribe(p => this.med2patient = p);

      this.med2patientsService
          .getMed2patients(id)
          .subscribe(p => this.selectedForBill = p.medicines);               

          console.log(this.selectedForBill);
          console.log("//foo"); 
         // this.foo();        
     }
     

     foo()
     {
       for(var i = 0 ; i < this.med2patient.bills.length ; i++  )
      {
        console.log("testing : " , this.med2patient.bills[i].month);
      }                
     }

     saveMed2patientDetails(){
     // this.isSaving = true;
      this.med2patientsService
          .saveMed2patient(this.med2patient)
          .subscribe(
            (r: Response) => {console.log('success, '+ JSON.stringify(this.med2patient))},
            (error) => {console.log('error: ', error);}
            //() => {this.isSaving = false;}
          );
    }

     makeFinal()
     {
        this.notFinal =!this.notFinal;
        this.billentry.month = this.billmonth;
        this.billentry.year = this.billyear;
        
        for(var i = 0 ; i < this.selectedForBill.length ; i++)
        {
            this.billentry.medicines.push(this.selectedForBill[i]);
        }

        this.med2patient.bills.push(this.billentry);
        this.billentry.medicines = [];
        this.saveMed2patientDetails();
     }

   onChangeSelectAll(index , classId,flag , id){
        console.log("try1: " , this.selectedForBill);
        console.log(index+" : "+classId+" : "+flag+" : " + id);        
        if(flag==false)  
        {              

            this.tempbill = this.selectedForBill;
            console.log(this.tempbill);
            this.selectedForBill=[];
            console.log(this.tempbill);
            for(var i=0;i<this.tempbill.length;i++)
            {          
              if(!(id == this.tempbill[i]._id))
              {
                  //console.log(this.med2patient.medicines[i].name);
                  this.selectedForBill.push(this.tempbill[i]);
              }
            }

            console.log(this.selectedForBill);
        }

        else
        {
            this.tempbill = this.selectedForBill;
            console.log(this.tempbill);
            //this.selectedForBill=[];
            console.log(this.tempbill);
            for(var i=0;i<this.med2patient.medicines.length;i++)
            {          
              if((id == this.med2patient.medicines[i]._id))
              {
                  console.log(this.med2patient.medicines[i].name);
                  this.selectedForBill.push(this.med2patient.medicines[i]);
              }
            }
            console.log(this.selectedForBill);
        }
   }


   onChangeUnSelectAll(index , classId,flag , id){
        console.log("try1: " , this.selectedForBill);
        console.log(index+" : "+classId+" : "+flag+" : " + id);        
        if(flag==true)  
        {              
            this.tempbill = this.selectedForBill;
            console.log(this.tempbill);
            //this.selectedForBill=[];
            console.log(this.tempbill);
            for(var i=0;i<this.med2patient.medicines.length;i++)
            {          
              if((id == this.med2patient.medicines[i]._id))
              {
                  console.log(this.med2patient.medicines[i].name);
                  this.selectedForBill.push(this.med2patient.medicines[i]);
              }
            }
            console.log(this.selectedForBill);
            
        }

        else
        {            

            this.tempbill = this.selectedForBill;
            console.log(this.tempbill);
            this.selectedForBill=[];
            console.log(this.tempbill);
            for(var i=0;i<this.tempbill.length;i++)
            {          
              if(!(id == this.tempbill[i]._id))
              {
                  //console.log(this.med2patient.medicines[i].name);
                  this.selectedForBill.push(this.tempbill[i]);
              }
            }

            console.log(this.selectedForBill);
        }
   }

  toggleEditing()
  {

    console.log("toggleEditing");
    this.editMode = !this.editMode;
  }

toggleSelect()
{
    console.log("toggleSelect");
    this.selectAll = !this.selectAll;
    console.log(this.selectAll);
    if(this.selectAll)
    {
        this.med2patientsService
          .getMed2patients(this.id)
          .subscribe(p => this.selectedForBill = p.medicines);
    }

    else
    {
        this.selectedForBill=[];
    }

    console.log(this.selectedForBill);
}

  calcTotalAmount(actualmed2patient){
       console.log(this.thepatient);
       
       //console.log("calcTotalAmount::" , actualmed2patient.patientid);
       //var len = this.actualmed2patient.medicines.length;
       /*for(var i=0;i< len ; i++)
       {
          this.buildtotal = this.buildtotal + (this.actualmed2patient.medicines[i].cost * parseInt(this.actualmed2patient.medicines[i].qty));   
       }       
       return this.buildtotal;*/

       var cost=0;
       for(var i = 0 ; i<this.selectedForBill.length; i++)
       {
              cost = cost + ( this.selectedForBill[i].cost * this.selectedForBill[i].qty  );
       }


       return cost;
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

     getBillingYear()
     {
       var m = moment(new Date() , "YYYY-MM-DD");
       return m.format("YYYY");
     }
}
