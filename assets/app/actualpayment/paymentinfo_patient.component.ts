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

import {enableProdMode} from 'angular2/core';
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
        <div  class="row" *ngIf="med2patient" style="color:#337ab7;font-size:20px">
                    <div class="col-md-4"><span style="font-size:20px">Total Billed Amout : {{totalAmountBilled()}}</span></div>
                    <div class="col-md-4">Total Amount Paid : {{totoalAmountPaid()}}</div>
                    <div class="col-md-4">{{dues()}}</div>
            </div>
            <br>
            <div  class="row" *ngIf="med2patient" style="color:#337ab7;font-size:20px">
                    <div class="col-md-4"><span style="font-size:20px">Last Billed Amout : {{med2patient.bills && med2patient.bills.length>0? med2patient.bills[med2patient.bills.length-1].totalCost : 0}}</span></div>
                    <div class="col-md-4">Last Amount Paid : {{med2patient.payment && med2patient.payment.length>0 ? med2patient.payment[med2patient.payment.length-1].amountPaid : 0}}</div>
                    <div class="col-md-4">{{lastDue()}}</div>
            </div>
            <br> 
        <div class="row"> 
        <div class="table-responsive col-md-6">
                <div><b><span style="color:#337ab7;font-size:20px">Billed List</span></b></div>
						<table class="table table-striped">
							<thead>
								<tr>                    
								<th>Month</th>
                                <th>Total Cost</th>                        
								</tr>
							</thead>
							<tbody *ngIf="med2patient">

								<tr *ngFor="#billitem of med2patient.bills ">					
									<td>{{billitem.month}}</td>
                                    <td>{{billitem.totalCost}}</td>									          
								</tr>
							</tbody>
						</table>	  
					</div>
				
	    

        <div class="table-responsive col-md-6">
                <div><b><span style="color:#337ab7;font-size:20px">Payed List</span></b></div>
						<table class="table table-striped">
							<thead>
								<tr>                    
								<th>Month</th>
                                <th>Total Cost</th>                        
								</tr>
							</thead>
							<tbody *ngIf="med2patient">

								<tr *ngFor="#billitem of med2patient.payment ">					
									<td>{{billitem.month}}</td>
                                    <td>{{billitem.amountPaid}}</td>									          
								</tr>
							</tbody>
						</table>	  
					</div>
				</div>
            </div>            
	    </div>  
  
  `,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css'],
  pipes : [ActualpatientsFilterPipe]
})

export class PaymentInfoPatientComponent implements OnInit{
  med2patient: Med2patient;
  selectedActualpatient: Actualpatient;
  listFilter = "";
  showImage = false;
  imageWidth = 50;
  paymentObj : payment = [];
  totalamountbilled=0;
  isSaved=false;
  totalAmountPaid=0;
  paidBy;
  phoneNo;
  amountPaid;
  paymentMode="cheque";
  chequeNo;
  reciptNo;
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
  lastDue()
  {    
      var lastbilledamt =0;
      if(this.med2patient.bills)
      if(this.med2patient.bills.length-1>0)
        lastbilledamt =this.med2patient.bills[this.med2patient.bills.length-1].totalCost;
      
      var lastpayedamt =0 ; 
      if(this.med2patient.payment)
      if(this.med2patient.payment.length-1>0)
        lastpayedamt = this.med2patient.payment[this.med2patient.payment.length-1].amountPaid;

        if(lastbilledamt > lastpayedamt )
            return "Due : " + (lastbilledamt-lastpayedamt);
        else
            return "Credit Amount : " + (lastpayedamt - lastbilledamt);
  }
  latestBilledAmount()
  {
      if(this.med2patient.bills && this.med2patient.bills.length>0)
        return this.med2patient.bills[this.med2patient.bills.length-1].totalCost;

        return 0;
  }

  selectActualpatient(actualpatient: Actualpatient){
    this.selectedActualpatient = actualpatient;
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

    totalAmountBilled()
    {
        console.log(this.med2patient);
        console.log(this.med2patient.bills);
        console.log(this.med2patient.bills[0]);
        this.totalamountbilled=0;
        if(this.med2patient.bills)
        for(var i = 0 ; i< this.med2patient.bills.length ; i++)
            this.totalamountbilled=this.totalamountbilled + this.med2patient.bills[i].totalCost;
            
        //var temp = this.dues();
        return this.totalamountbilled;
    }   

    totoalAmountPaid()
    {
        this.totalAmountPaid =0;
        if(this.med2patient.payment)
        for(var i=0;i<this.med2patient.payment.length;i++)
            this.totalAmountPaid = this.totalAmountPaid + this.med2patient.payment[i].amountPaid;

            return this.totalAmountPaid;
    }

    
    dues()
    {
        if(this.totalamountbilled > this.totalAmountPaid)
            return "DUE : " + (this.totalamountbilled-this.totalAmountPaid);

        else
            return "Credit Balance : " + (this.totalAmountPaid -this.totalamountbilled );
    }

    gotoPeoplesList(){
        let link = ['Payment History List'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }

    onSave()
    {
        this.paymentObj.paidBy = this.paidBy;
        this.paymentObj.phoneNo = this.phoneNo;
        this.paymentObj.amountPaid = this.amountPaid;
        this.paymentObj.modeOfPayment = this.paymentMode;
        if(this.paymentMode == "cheque")
        {
          this.paymentObj.chequeNo = this.chequeNo;
        }

        this.paymentObj.date = this.todaysDate();

        this.paymentObj.time = this.TimeNow();
        if(!this.med2patient.payment)
        {
            this.med2patient.payment=[];
        }
        this.med2patient.payment.push(this.paymentObj);

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
     
     TimeNow()
     {
       return moment(new Date() , "YYYY-MM-DD").format('h:mm:ss a'); 
     }

}
