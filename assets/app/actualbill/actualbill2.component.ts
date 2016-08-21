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
                  <h2>HI ADVANTAGE ELDER CARE</h2>
                  <p>Hunasamaranahalli Post, (VIA) Bettahalasuru, Bangalore North - 562 157.</p>
                  <p>Website : www.advantageeldercare.com</p>
                  <p>Email: shajiphilip_advantage@yahoo.co.in</p>
                  <p>Tel : 080 60121222, +91 98443 95515, 78295 92189</p>
            </div>             
    	 </div><br>
       <div class="row" *ngIf="thepatient">
            <div class="col-md-6" align="center">
              <div class="table-responsive">
              <div class="table table-striped">
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
                <table class="table table-striped">
                  <tbody>                    
                    <tr>
                      <td>Category:</td>
                      <td *ngIf="!editMode">{{billtype}}</td>
                      <td *ngIf="editMode">
                        <select class="form-control" id="sel1" [(ngModel)] = "billtype" >
                          <option value="Monthly Bill">Monthly Bill</option>
                          <option value="Check Out">Check Out</option>
                          <option value="Death">Death</option>                          
                        </select>
                      </td>
                    </tr>
                    <tr>
                        <td>Month/Year:</td>
                        <td *ngIf="!editMode">{{billmonth}} / {{billyear}}</td>
                        <td *ngIf="editMode">
                          <select class="form-control" id="sel1" [(ngModel)] = "billmonth" >
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>    
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>    
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>    
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>                          
                          </select>
                              /
                          <select class="form-control" id="sel1" [(ngModel)] = "billyear" >
                            <option [value]="billyear-1">{{billyear-1}}</option>
                            <option [value]="billyear">{{billyear}}</option>
                          </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td *ngIf="!editMode">{{billDate}}</td>
                        <td *ngIf="editMode"><input type="date" [(ngModel)] = "billDate"></td>
                    </tr>
                    <tr>
                        <td>Prepared By:</td>
                        <td *ngIf="!editMode">{{user}}</td>
                        <td *ngIf="editMode"><input type="text" [(ngModel)]="user" /></td>
                    </tr>				
                  </tbody>
                </table>
              </div>
            
            </div>
       </div>
       
     </div>
       <div class="panel-body">
            <div class="table-responsive">
              <table *ngIf="!editMode && selectedForBill" class="table table-striped">
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
			         <table *ngIf="editMode && med2patient" class="table table-striped">
                    <thead>
                        <tr>                            
                            <th>Sl No</th>
                            <th>Particulars</th>
                            <th>Quanty</th>
                            <th>Base Cost</th>
                            <th>Amount</th>
                            <th (click) = "toggleSelect()"><a>{{selectAll ? 'UnSelect all' : 'Select All'}}</a></th>                                                                         
                        </tr>
                    </thead>
                    <tbody >
                        <tr *ngFor="#medicine of med2patient.medicines;var index=index">
                             <td>{{index+1}}</td>
                             <td>{{medicine.name}}</td>
                             <td>{{medicine.qty}}</td>
                             <td>{{medicine.cost}}</td>                             
                             <td>{{medicine.cost * medicine.qty}}</td>
                             <td *ngIf="selectAll">
                                  <span *ngIf="exists(medicine)"><input type="checkbox" value=""  #cv [checked]=true (change)="onChangeSelectAll(index , medicine.name,cv.checked , medicine._id)"></span>
                                  <span *ngIf="!exists(medicine)"><input type="checkbox" value=""  #cv [checked]=false (change)="onChangeSelectAll(index , medicine.name,cv.checked , medicine._id)"></span>
                             </td>
                             <td *ngIf="!selectAll">
                                 <span *ngIf="!exists(medicine)"><input type="checkbox" value="" #cv [checked]=false (change)="onChangeUnSelectAll(index , medicine.name,cv.checked , medicine._id)"></span>
                                 <span *ngIf="exists(medicine)"><input type="checkbox" value="" #cv [checked]=true (change)="onChangeUnSelectAll(index , medicine.name,cv.checked , medicine._id)"></span>
                             </td>                                            
                        </tr>
                    </tbody>
               </table>
            </div>
       </div>		 
	     <div class="panel-footer">
           <div class="table responsive">
              <table class="table table-striped">
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
export class ActualBill2Component implements OnInit{
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
  notFinal=true;
  billyear =this.getBillingYear();
  tempbill = [];
  selectedForBill = [];
  selectedForBillIndex  = [];
  //this.setlen();
  keepInMedicinesBool;
  addingtoBillBool ;
  intilization = true; 
  
  billentry : billing = { medicines : []} ;
  dontAdd = [] ;
  billDate = this.todaysDate();
  buildtotal = 0;
  billTotal = 0;
  user="ACE/MARSH";

  len;
  constructor(private med2patientsService : Med2patientsService,
              private actualpatientsService : ActualpatientsService,
              private routeParams: RouteParams,
              private router: Router){ }


setlen()
{
  for(var i = 0 ; i< this.selectedForBill.length ; i++)
  {
    this.selectedForBillIndex.push(i);
  }
  
}              

  ngOnInit(){
     let id = this.routeParams.get('id');
     this.id = id;
     console.log(id);
      this.med2patientsService
          .getMed2patients(id)
          .subscribe(p => this.med2patient = p);

      this.med2patientsService
          .getMed2patients(id)
          .subscribe(p => this.selectedForBill = p.medicines);               

          console.log(this.selectedForBill);


          this.med2patientsService
          .getMed2patients(this.id)
          .subscribe(p => this.len = p.medicines.length);

          console.log("Len : " , this.len);
      

     } 

     exists(med)
     {
       //console.log("in exists");
       //console.log(this.selectedForBill);
       for(var i=0;i<this.selectedForBill.length;i++)
       {
         //console.log(this.selectedForBill[i]._id+" : " + med._id);
         //console.log(this.selectedForBill[i]._id == med._id);
         if(this.selectedForBill[i]._id == med._id)
            return true;
       }

       return false;
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
        console.log("in make final");
        this.notFinal =!this.notFinal;
        console.log("notFinal : " , this.notFinal );
        this.billentry.month = this.billmonth;
        console.log("this.billentry : "   , this.billentry ) ;
        this.billentry.year = this.billyear;
        console.log("this.billentry : "   , this.billentry ) ;
        for(var i = 0 ; i < this.selectedForBill.length ; i++)
        {
            console.log("hi i : " , i );
            console.log(this.selectedForBill);            
            this.billentry.medicines.push(this.selectedForBill[i]);                   
            
        }

        var copy = this.med2patient.medicines;
        

        console.log(this.selectedForBill);
        this.med2patient.bills.push(this.billentry);        
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
            for(var i=0;i<this.len;i++)
              this.addingtoBillBool[i] = true;
            console.log(this.tempbill);
            for(var i=0;i<this.tempbill.length;i++)
            {     
                  
              if(!(id == this.tempbill[i]._id))
              {
                  //console.log(this.med2patient.medicines[i].name);
                  this.selectedForBill.push(this.tempbill[i]);
                  this.keepInMedicinesBool[i] = false;
              }
            }

            //this.selectedForBill.push(this.med2patient.medicines[index]);
            //this.keepInMedicinesBool[index] = false;
            console.log(this.selectedForBill);
        }

        else
        {
            /*this.tempbill = this.selectedForBill;
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
            console.log(this.selectedForBill);*/


            this.selectedForBill=[];
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
  //var len ; 
    console.log("toggleSelect");
    console.log("Len : " , this.len);
    this.selectAll = !this.selectAll;
    console.log(this.selectAll);
    if(this.selectAll)
    {
        for(var i=0;i<this.len; i++)
        {
            this.keepInMedicinesBool[i] = false;  
        }
        this.med2patientsService
          .getMed2patients(this.id)
          .subscribe(p => this.selectedForBill = p.medicines);

          console.log("testing : " , this.selectedForBill);

           
    }

    else
    {
        for(var i=0;i<this.len; i++)
        {
            this.keepInMedicinesBool[i] = true;  
        }
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
