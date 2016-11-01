import { Component, OnInit } from 'angular2/core';
import { Response } from 'angular2/http';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router} from 'angular2/router';
import { Actualpatient } from '../actualpatients/actualpatient';
import { ActualpatientsService } from '../actualpatients/actualpatients.service';
import { Med2patient } from '../med2patients/med2patient';
import { Med2patientsService } from '../med2patients/med2patients.service';
import { ActualpatientsFilterPipe } from '../actualpatients/actualpatient-filter.pipe';

@Component({
  selector: 'actualpatients-list',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div *ngIf="!showmeds">  
			<div class="panel panel-primary ">
				<div class="panel-heading">
					<div class='row'>            
						<div class='col-xs-2'><span style='font-size:large'>Bill List For : {{actualpatient.name}}</span></div>
						<div class='col-xs-4'>
							<span style='font-size:large'>Filter by:</span ><input style="color:black" type='text' [(ngModel)]='listFilter'/>
						</div>       
            <div class="col-xs-2 col-xs-offset-4 ">
                <a class='btn btn-default' (click)='gotoPeoplesList()' style='width:80px'>
                     <i class='glyphicon glyphicon-chevron-left'></i> Back
                </a>
            </div>    
					</div>	
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped">
							<thead>
								<tr>                    
								<th>Month</th>                        
								</tr>
							</thead>
							<tbody *ngIf="actualpatient">
								<tr *ngFor="#billitem of actualpatient.bills; var index=index ">					
									<td><a (click) = "toggleshowmeds(billitem._id , index)" >{{billitem.month}}/{{billitem.year}}</a></td>	
                  <td><a (click) = "deleteTheBill(billitem._id)">Delete</a></td>								          
								</tr>
							</tbody>
						</table>	  
					</div>
				</div>
			</div>
    </div>  
    <div *ngIf="showmeds" class="row">
    <div class="col-xs-10 col-xs-offset-1">
        <div class="panel panel-default">
	  <div class="panel-heading">
	    <div class='row'>     
            <div class="col-xs-3"><img  src="images/advantagelogo.png" width="200" height="150"></div>     
            <div class="col-xs-7" align="center">
                  <h2>ADVANTAGE ELDER CARE</h2>
                  <p>Hunasamaranahalli Post, (VIA) Bettahalasuru, Bangalore North - 562 157.</p>
                  <p>Website : www.advantageeldercare.com</p>
                  <p>Email: shajiphilip_advantage@yahoo.co.in</p>
                  <p>Tel : 080 60121222, +91 98443 95515, 78295 92189</p>
            </div>             
    	 </div><br>
       <div class="row" *ngIf="actualpatient">
            <div class="col-xs-6" align="center">
              <div class="table-responsive">
              <div class="table table-striped">
                <tbody>
                <tr><td>Patient Name:</td><td>{{actualpatient.name}}</td></tr>                
                <tr><td>Reg No:</td><td>{{actualpatient.registrationNumber}}</td></tr>
                <tr><td>DOA :</td><td>{{stringAsDate(actualpatient.dateOfAdmission)}}</td></tr>
                <tr><td>Age/Gender</td><td>{{clacAge(actualpatient.dob)}}/{{actualpatient.gender}}</td></tr>
              </div>
              </div>
            </div>
            <div class="col-xs-4" align="center">
              <div class="table-responsive">
                <table class="table table-striped">
                  <tbody>                    
                    <tr>
                      <td>Category:</td>
                      <td>{{actualpatient.bills[billIndex].category}}</td>                      
                    </tr>
                    <tr>
                        <td>Month/Year:</td>
                        <td *ngIf="actualpatient">{{actualpatient.bills[billIndex].month}} / {{actualpatient.bills[billIndex].year}}</td>                        
                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td *ngIf="actualpatient.bills[billIndex].date">{{stringAsDate(actualpatient.bills[billIndex].date)}}</td>                        
                    </tr>
                    <tr>
                        <td>Prepared By:</td>
                        <td>{{actualpatient.bills[billIndex].preparedBy}}</td>                        
                    </tr>				
                  </tbody>
                </table>
              </div>
            
            </div>
       </div>
       
     </div>
       <div class="panel-body">
            <div class="table-responsive">
              <table *ngIf="selectedForBill" class="table table-striped">
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
              <table class="table table-striped">
                  <tbody>                    {{checkIfDues()}}
                    <tr *ngIf="actualpatient"><td>Total Cost : </td><td>{{calcTotalAmount(actualpatient.medtotalcost)}}</td></tr>
                    <tr *ngIf="dueAmount>0"><td>DUE : </td><td>{{dueAmount}} </td></tr>
                    <tr *ngIf="dueAmount<0"><td>CREDIT BALANCE : </td><td>{{-1*dueAmount}} </td></tr>
                   
                  </tbody>
                  
              </table>
           </div>   
       </div>		 
	     </div>
           
       
	</div>  
    </div>
		`,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css'],
  pipes : [ActualpatientsFilterPipe]
})
export class PatientBillListComponent implements OnInit{
  actualpatients: Med2patient[] = [];
  showmeds = false;
  actualpatient: Med2patient = {};
  selectedActualpatient: Actualpatient;
  listFilter = "";
  selectedForBill;
  medList =[];
  totalamountbilled;
  thepatient : Actualpatient={};
  duecalc = true;
  showImage = false;
  billIndex=0;
  imageWidth = 50;
  totalAmountPaid;
  totalCost;
  dueAmount;
  imageMArgin = 2;
  constructor(private actualpatientsService : ActualpatientsService , private med2patientsService : Med2patientsService,
  private routeParams: RouteParams, private router: Router){ }

  ngOnInit(){
   
       let id = this.routeParams.get('id');

      this.med2patientsService
      .getMed2patients(id)
      .subscribe(p => this.actualpatient = p)
      

      console.log("changes made");
  }
  
  checkIfDues()
    {
      console.log(this.actualpatient);
      console.log(this.actualpatient.name);
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

    changeTotalCost()
    {
      this.totalCost = this.totalCost + this.dueAmount; 
    }

    calcTotalAmount(actualmed2patient){
       console.log(this.thepatient);
       var cost=0;
       //if(this.selectedForBill)
       for(var i = 0 ; i<this.selectedForBill.length; i++)
       {
              
                  cost = cost + ( this.selectedForBill[i].cost * this.selectedForBill[i].qty  );
       }
       this.totalCost = cost;
       return cost;
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

    totalAmountBilled()
    {
        console.log("in totalAmountBilled name");
        this.totalamountbilled=0;
        console.log(this.actualpatient);
        console.log(this.actualpatient.name);
        //console.log(this.med2patient[0]);
        if(this.actualpatient.bills)
        {
          if(this.actualpatient.bills)
          for(var i = 0 ; i< this.actualpatient.bills.length ; i++)
              this.totalamountbilled=this.totalamountbilled + this.actualpatient.bills[i].totalCost;
        }   
        //var temp = this.dues();
        return this.totalamountbilled;
    }   

    totoalAmountPaid()
    {
        this.totalAmountPaid = 0;
        if(this.actualpatient.bills)
        {
          if(this.actualpatient.payment)
          for(var i=0;i<this.actualpatient.payment.length;i++)
              this.totalAmountPaid = this.totalAmountPaid + this.actualpatient.payment[i].amountPaid;
        }
            return this.totalAmountPaid;
    }

    due()
    {        
         this.dueAmount = (this.totalamountbilled-this.totalAmountPaid);
    }


  gotoPeoplesList()
  {
      let link = ['Bill List'];
        this.router.navigate(link);
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
    
    
     clacAge(dateStr){
       var m = moment(new Date(dateStr) , "YYYY-MM-DD");
       return m.fromNow(true);
     }

     stringAsDate(dateStr) {     
          return moment(dateStr).format("DD-MM-YYYY");
        }

        saveMed2patientDetails(){
     
      this.med2patientsService
          .saveMed2patient(this.actualpatient)
          .subscribe(
            (r: Response) => {console.log('success, '+ JSON.stringify(this.med2patient))},
            (error) => {console.log('error: ', error);}     
          );
    }

     deleteTheBill(billid)
     {
       console.log("deleteTheBill");
        var delbillitem;       
        for(var i=0;i<this.actualpatient.bills.length;i++)
       {
         if(this.actualpatient.bills[i]._id == billid)
         {
           delbillitem = i;
           break;
         }
       }
      console.log("hi");
      var temp = this.actualpatient.bills;
      this.actualpatient.bills=[];
      for(var i=0;i<temp.length;i++)
      {
        if(i!=delbillitem)
          this.actualpatient.bills.push(temp[i]);
      }

      this.saveMed2patientDetails();

     }        


     toggleshowmeds( billId , index)
     {
       this.showmeds = !this.showmeds;
       console.log("billid : " , billId);
       console.log("showmeds  :  " , this.showmeds);
       this.billIndex = index;
       for(var i=0;i<this.actualpatient.bills.length;i++)
       {
         if(this.actualpatient.bills[i]._id == billId)
         {
           this.billIndex = i;
           break;
         }
       }
       if(this.showmeds == true)
       {         
          if(this.actualpatient.bills)
          for(var i=0; i< this.actualpatient.bills.length ; i++)
          {            
              console.log("i " , i  , " " , this.actualpatient.bills[i]._id);
              console.log(this.actualpatient.bills[i].medicines);
              console.log(this.actualpatient.bills[i]);
              console.log(this.actualpatient.bills[i].medicines);
              if(this.actualpatient.bills[i]._id == billId)
              {
                  this.selectedForBill = this.actualpatient.bills[i].medicines;                  
                  break;
              }
          }

          console.log(this.selectedForBill);
       }
     }
}


