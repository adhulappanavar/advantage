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
  templateUrl:"html/generateBill/generateBill.html"  ,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css']
  
})
export class ActualBillComponent implements OnInit{
  med2patient : Med2patient;
  editMode = true;
  totalCost = 0;
  thepatient : Actualpatient={};
  billtype="Monthly Bill";
  billmonth=this.getBillingMonth();
  showImage = false;
  imageWidth = 50; 
  imageMArgin = 2;
  slno = 1;
  notfinal=true;
  arrAll = [ { 'id ' : 1 , "name" : "abc" , "phone" : "123" , "isActivated" : true , selected: ""} , { 'id ' : 1 , "name" : "bcd" , "phone" : "123" , "isActivated" : false , selected: ""}]
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
  duecalc=true;
  billentry : billing = { medicines : []} ;
  dontAdd = [] ;
  billDate = this.todaysDate();
  buildtotal = 0;
  billTotal = 0;
  user="ACE/MARSH";
  dueAmount=0;
  totalamountbilled=0;
  totalAmountPaid=0;
  len;
  constructor(private med2patientsService : Med2patientsService,
              private actualpatientsService : ActualpatientsService,
              private routeParams: RouteParams,
              private router: Router){ }


setlen()
{
  if(this.selectedForBill)
  {
    for(var i = 0 ; i< this.selectedForBill.length ; i++)
    {
      this.selectedForBillIndex.push(i);
    }
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

           console.log("foo changes");

     }
     saveMed2patientDetails(){
     
      this.med2patientsService
          .saveMed2patient(this.med2patient)
          .subscribe(
            (r: Response) => {console.log('success, '+ JSON.stringify(this.med2patient))},
            (error) => {console.log('error: ', error);}     
          );
    }

    changeTotalCost()
    {
      this.totalCost = this.totalCost + this.dueAmount; 
    }

    onChangeSelectMedicine(index , classId,flag , id)
    {
      console.log(index+" : "+classId+" : "+flag+" : " + id);
      if(flag == true)
      {
        console.log("selected");        
        this.selectedForBill[index].selected = true;
      }

      else
      {
          console.log("unselected");
          this.selectedForBill[index].selected = false;
      }
    }


    checkIfDues()
    {
      console.log(this.med2patient);
      console.log(this.med2patient.name);
      //console.log(this.med2patient.bills);
      if(this.duecalc)
      {
        this.totalAmountBilled();
        this.totoalAmountPaid();
        this.due();
        this.changeTotalCost();
        this.duecalc = false;
      }
    }

    totalAmountBilled()
    {
        console.log("in totalAmountBilled name");
        this.totalamountbilled=0;
        console.log(this.med2patient);
        console.log(this.med2patient.name);
        //console.log(this.med2patient[0]);
        if(this.med2patient.bills)
        {
          if(this.med2patient.bills)
          for(var i = 0 ; i< this.med2patient.bills.length ; i++)
              this.totalamountbilled=this.totalamountbilled + this.med2patient.bills[i].totalCost;
        }   
        //var temp = this.dues();
        return this.totalamountbilled;
    }   

    totoalAmountPaid()
    {
        this.totalAmountPaid = 0;
        if(this.med2patient.bills)
        {
          if(this.med2patient.payment)
          for(var i=0;i<this.med2patient.payment.length;i++)
              this.totalAmountPaid = this.totalAmountPaid + this.med2patient.payment[i].amountPaid;
        }
            return this.totalAmountPaid;
    }

    due()
    {        
         this.dueAmount = (this.totalamountbilled-this.totalAmountPaid);
    }



     makeFinal()
     {
        this.checkIfDues();
        console.log("in make final"); 
        this.notFinal =!this.notFinal;

        this.billentry.month = this.billmonth;
        console.log("this.billentry : "   , this.billentry ) ;
        this.billentry.year = this.billyear;
        console.log("this.billentry : "   , this.billentry ) ;

        this.billentry.category = this.billtype;
        console.log("this.billentry : "   , this.billentry ) ;
        //this.billentry.date = this.stringAsDate(this.billDate); 
        //console.log("this.billentry : "   , this.billentry ) ;
        this.billentry.preparedBy = this.user;
        console.log("this.billentry : "   , this.billentry ) ;
        console.log("testing1");
        this.billentry.totalCost = this.totalCost;
        console.log("testing12");
        console.log("loop")

        this.med2patient.medicines = [];
        if(this.selectedForBill)
        for(var i= 0 ; i < this.selectedForBill.length ; i++)
        {
          console.log(" i : " , i);
          console.log(this.selectedForBill[i].selected);
          if(!this.selectedForBill[i].selected)
          {
            //var tempMedicine 
            delete this.selectedForBill[i].selected;
            this.med2patient.medicines.push(this.selectedForBill[i]);
          }

          else
          {
              this.billentry.medicines.push(this.selectedForBill[i]);
          }
        }    
        console.log("testing");
        console.log(this.med2patient);
        console.log(this.med2patient.bills);
        if(!this.med2patient.bills)
        {
          this.med2patient.bills=[];
        }
        this.med2patient.bills.push(this.billentry);    
        this.saveMed2patientDetails();

     }
   

   checkbox(recipient) {
        recipient.selected = (recipient.selected) ? false : true;
    }

    foo()
    {
      console.log("foo caleed");
    }

  toggleEditing()
  {

    console.log("toggleEditing");
    this.editMode = !this.editMode;
    
  }

  toggleSelect() 
  {   
      this.selectAll=!this.selectAll;
     console.log("toggleSelect");
     if(!this.selectAll)
     {
       if(this.selectedForBill)
       for(var i = 0 ; i < this.selectedForBill.length ; i++)
        this.selectedForBill[i].selected = true;
     }
  }

  calcTotalAmount(actualmed2patient){
       console.log(this.thepatient);
       var cost=0;
       //if(this.selectedForBill)
       for(var i = 0 ; i<this.selectedForBill.length; i++)
       {
              if(this.selectedForBill[i].selected)
                  cost = cost + ( this.selectedForBill[i].cost * this.selectedForBill[i].qty  );
       }
       this.totalCost = cost;
       return cost;
     }


    stringAsDate(dateStr) {     
          return moment(dateStr , "YYYY-MM-DD").format("DD-MM-YYYY");
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

     getBillingMonth(){
       var m = moment(new Date() , "YYYY-MM-DD");
      return m.format("MMMM");
     }

     getBillingYear()
     {
       var m = moment(new Date() , "YYYY-MM-DD");
       return m.format("YYYY");
     }
    
}
