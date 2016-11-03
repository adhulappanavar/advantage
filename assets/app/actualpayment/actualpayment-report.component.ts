 import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Actualpatient } from '../actualpatients/actualpatient';
import { ActualpatientsService } from '../actualpatients/actualpatients.service';
import { Med2patient } from '../med2patients/med2patient';
import { Med2patientsService } from '../med2patients/med2patients.service';
import { ActualpatientsFilterPipe } from '../actualpatients/actualpatient-filter.pipe';

@Component({
  selector: 'actualpatients-list',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div class="panel panel-primary ">	  
	  <div class="panel-body">
		<div class="table-responsive">
		<table class="table table-striped">
        <thead>
                    <tr>                        
                        <th>Reg No</th>
                        <th>Patient Name</th>
                        <th>Gender</th>
                        <th>Age</th>   
                        <th>totalamountbilled</th>
                        <th>totalAmountPaid</th>
                        <th>DUEs or Credit</th>
                        <th>Last billed amount</th>
                        <th>Last paid amount</th>                        
                    </tr>
         </thead>
         <tbody>
				<tr *ngFor="#actualpatient of actualpatients | actualpatientsFilter:listFilter">					
					<td>{{actualpatient.registrationNumber}}</td>          
					<td>{{actualpatient.name}}</td>		
					<td>{{actualpatient.gender}}</td>
					<td>{{clacAge(actualpatient.dob)}}</td>
                    <td>{{totalAmountBilled(actualpatient)}}</td>    
                    <td>{{totoalAmountPaid(actualpatient)}}</td>
                    <td><strong *ngIf="dues()[0]=='C'" style="color:green">{{dues()}}</strong><strong *ngIf="dues()[0]==''" style="color:red">{{dues()}}</strong></td> 
                    <td>{{actualpatient.bills && actualpatient.bills.length>0? actualpatient.bills[actualpatient.bills.length-1].totalCost : "no bills"}}</td>
                    <td>{{actualpatient.payment && actualpatient.payment.length>0 ? actualpatient.payment[actualpatient.payment.length-1].amountPaid : "not paid"}}</td>          
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


export class PaymentInfoReportComponent implements OnInit{
  actualpatients: Med2patient[] = [];
  selectedActualpatient: Actualpatient; 
  listFilter = "";
  showImage = false;
  imageWidth = 50;
  totalamountbilled=0;
  totalAmountPaid=0;
  imageMArgin = 2;
  constructor(private actualpatientsService : ActualpatientsService , private med2patientsService : Med2patientsService){ }

  ngOnInit(){
    //this.actualpatients = this.starWarsService.getAll();
    /*this.actualpatientsService
      .getAllActualpatients()
      .subscribe(p => this.actualpatients = p)
      var m = moment("Mar 26th, 1989", "MMM-DD-YYYY");
      console.log(moment().format('HH:mm:ss'));
      console.log('You are '+m.fromNow(true) + ' old'); // You are 23 years old
      */
      this.med2patientsService
      .getAllMed2patients()
      .subscribe(p => this.actualpatients = p)

      console.log("changes made");
  }


  latestBilledAmount(med2patient)
  {
      if(med2patient.bills && med2patient.bills.length>0)
        return med2patient.bills[med2patient.bills.length-1].totalCost;

        return 0;
  }


  totalAmountBilled(med2patient)
    {
        console.log(med2patient);
        console.log(med2patient.bills);
        console.log(med2patient.bills[0]);
        this.totalamountbilled=0;
        if(med2patient.bills)
        for(var i = 0 ; i< med2patient.bills.length ; i++)
            this.totalamountbilled=this.totalamountbilled + med2patient.bills[i].totalCost;
            
        //var temp = this.dues();
        return this.totalamountbilled;
    }   

  totoalAmountPaid(med2patient)
    {
        this.totalAmountPaid =0;
        if(med2patient.payment)
        for(var i=0;i<med2patient.payment.length;i++)
            this.totalAmountPaid = this.totalAmountPaid + med2patient.payment[i].amountPaid;

            return this.totalAmountPaid;
    }


    dues()
    {
        if(this.totalamountbilled > this.totalAmountPaid)
            return "DUE :" + (this.totalamountbilled-this.totalAmountPaid);

        else
            return "Credit Balance :" + (this.totalAmountPaid -this.totalamountbilled );
    }




  selectActualpatient(actualpatient: Actualpatient){
    this.selectedActualpatient = actualpatient;
  }
  
  toggleImage() : void
    {
        this.showImage = !this.showImage;
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
}
