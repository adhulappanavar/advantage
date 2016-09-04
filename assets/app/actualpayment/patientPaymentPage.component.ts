import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router} from 'angular2/router';
import { Actualpatient } from '../actualpatients/actualpatient';
import { Response } from 'angular2/http';
import { ActualpatientsService } from '../actualpatients/actualpatients.service';
import { Med2patient } from '../med2patients/med2patient';
import { Med2patientsService } from '../med2patients/med2patients.service';
import { ActualpatientsFilterPipe } from '../actualpatients/actualpatient-filter.pipe';
import {payment} from '../med2patients/payment';

@Component({
  selector: 'actualpatients-list',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div class="panel panel-primary ">
	  <div class="panel-heading">
        <div class="row">         
            <div class="col-md-6" *ngIf = "med2patient" >
                <b><span style='font-size:large'> Payment Page For :      {{med2patient.name}}</span></b>
            </div>
            <div class="col-md-2 col-md-offset-4 ">
                <a class='btn btn-default' (click)='gotoPeoplesList()' style='width:80px'>
                     <i class='glyphicon glyphicon-chevron-left'></i> Back
                </a>
            </div>
        </div>
	  </div>	  


    <div class="panel panel-body">
        <div *ngIf="med2patient">
            <div  class="row alert alert-info" width="500"> <div class="col-md-4"><h3>Previous Bill Total Was : </h3></div><div class="col-md-4"> </div> </div>            
        </div><br>
        <div class="row">
            <div class="col-md-3">Paid By :</div><div class="col-md-3"> <input type="text" [(ngModel)] = "paidBy"></div>
        </div><br>
        <div class="row">
            <div class="col-md-3">Contact Number : </div><div class="col-md-3"><input type="text" [(ngModel)] = "phoneNo"></div>
        </div><br>
        <div class="row"><div class="col-md-3">Amount : </div><div class="col-md-3"><input type="number" [(ngModel)] = "amountPaid"></div></div><br>
        <div class="row">        
            <div class="col-md-3">Payment Mode :</div>
            <div class="col-md-3">
              <select class="form-control" id="sel1"  [(ngModel)] = "paymentMode" >
                <option value="cheque">cheque</option>
                <option value="cash">cash</option>
                <option value="onlineTransfer">online Transfer</option>                                                                                  
              </select>
            </div>
        </div><br>
        <div class="row" *ngIf="paymentMode=='cheque'">
              <div class="col-md-3">cheque Number :</div> <div class="col-md-3"><input type="text" [(ngModel)] = "chequeNo"></div>
        </div><br>
        <div class="row" *ngIf="paymentMode=='onlineTransfer'">
              <div class="col-md-3">Narration :</div> <div class="col-md-3"><input type="text" [(ngModel)] = "narration"></div>
        </div><br>
        <div class="row" *ngIf="paymentMode=='cash'">
              <div class="col-md-3">Recipt Number :</div> <div class="col-md-3"><input type="text" [(ngModel)] = "reciptno"></div>
        </div><br>
        <div *ngIf="!isSaved"><button class="btn btn-success" (click) = "onSave()">Save Payment Details</button></div>
        <div *ngIf="isSaved">
            <div><button class="btn btn-warning" [routerLink]="['Payment History For Patient', {id: med2patient.id}]">See This Patinets Billing Info</button></div><br>
            <div  class="alert alert-success" width="500"> <h3>Saved</h3> </div>            
        </div>
    </div>
	</div>  
  
  `,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css'],
  pipes : [ActualpatientsFilterPipe]
})
export class PatientPaymentPageComponent implements OnInit{
  med2patient: Med2patient;
  selectedActualpatient: Actualpatient;
  listFilter = "";
  showImage = false;
  imageWidth = 50;
  paymentObj : payment = {};
  isSaved=false;
  paidBy;
  phoneNo;
  amountPaid=0;
  paymentMode="cheque";
  chequeNo;
  reciptno;
  narration;
  imageMArgin = 2; 
  constructor(private actualpatientsService : ActualpatientsService , private med2patientsService : Med2patientsService , private routeParams: RouteParams , private router : Router){ }

  ngOnInit(){   
    
      let id = this.routeParams.get('id');

      this.med2patientsService
      .getMed2patients(id)
      .subscribe(p => this.med2patient = p)

      console.log("changes made");
  }

  selectActualpatient(actualpatient: Actualpatient){
    this.selectedActualpatient = actualpatient;
  }
   
  gotoPeoplesList()
  {
      let link = ['Payment Page'];
        this.router.navigate(link);
  }

  toggleImage() : void
    {
        this.showImage = !this.showImage;
    }

    saveMed2patientDetails(){
     
      this.med2patientsService
          .saveMed2patient(this.med2patient)
          .subscribe(
            (r: Response) => {console.log('success, '+ JSON.stringify(this.med2patient))},
            (error) => {console.log('error: ', error);}  ,
             () => {this.isSaved = true;}   
          );
    }


    onSave()
    {
        this.paymentObj.paidBy = this.paidBy;
        this.paymentObj.phoneNo = this.phoneNo;
        this.paymentObj.amountPaid = this.amountPaid;
        this.paymentObj.modeOfPayment = this.paymentMode;
        this.paymentObj.month =  this.getBillingMonth();
        if(this.paymentMode == "cheque")
        {
          this.paymentObj.chequeNo = this.chequeNo;
        }

        //this.paymentObj.date = this.todaysDate();

        //this.paymentObj.time = this.TimeNow();
       /* if(!this.med2patient.payment)
        {
            this.med2patient.payment=[];
        }*/
        this.med2patient.payment.push(this.paymentObj);
        console.log(this.paymentObj);
        console.log(this.med2patient.payment);

        this.saveMed2patientDetails();
    }
    
    onDelete(id : string) {
        this.actualpatientsService.deleteMessage(id);
    }
    
    stringAsDate(dateStr) {
          return new Date(dateStr);
        }
        
     clacAge(dateStr){
       var m = moment(new Date(dateStr) , "YYYY-MM-DD");
       return m.fromNow(true);
     }

     todaysDate()
     {
       return moment(new Date()).format("DD-MM-YYYY");
     }

     todaysTimeStamp()
     {
       return moment(new Date() , "YYYY-MM-DD").format();
     }

     
     getBillingMonth(){
       var m = moment(new Date() , "YYYY-MM-DD");
      return m.format("MMMM");
     }
     
     TimeNow()
     {
       return moment(new Date() , "YYYY-MM-DD").format('h:mm:ss a'); 
     }

}
