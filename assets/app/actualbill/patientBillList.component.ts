import { Component, OnInit } from 'angular2/core';
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
									<td><a (click) = "toggleshowmeds(billitem._id)" >{{billitem.month}}</a></td>	
                  <td><a>Delete</a></td>								          
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
                      <td>Monthly Bill</td>                      
                    </tr>
                    <tr>
                        <td>Month/Year:</td>
                        <td>{{actualpatient.bills.month}} / {{actualpatient.bills.year}}</td>                        
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
  showImage = false;
  imageWidth = 50;
  imageMArgin = 2;
  constructor(private actualpatientsService : ActualpatientsService , private med2patientsService : Med2patientsService,
  private routeParams: RouteParams){ }

  ngOnInit(){
    //this.actualpatients = this.starWarsService.getAll();
    /*this.actualpatientsService
      .getAllActualpatients()
      .subscribe(p => this.actualpatients = p)
      var m = moment("Mar 26th, 1989", "MMM-DD-YYYY");
      console.log(moment().format('HH:mm:ss'));
      console.log('You are '+m.fromNow(true) + ' old'); // You are 23 years old
      */

       let id = this.routeParams.get('id');

      this.med2patientsService
      .getMed2patients(id)
      .subscribe(p => this.actualpatient = p)
      

      console.log("changes made");
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
    
    stringAsDate(dateStr) {
          return new Date(dateStr);
        }
        
     clacAge(dateStr){
       var m = moment(new Date(dateStr) , "YYYY-MM-DD");
       return m.fromNow(true);
     }

     toggleshowmeds( billId)
     {
       this.showmeds = !this.showmeds;
       console.log("billid : " , billId);
       console.log("showmeds  :  " , this.showmeds);
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


