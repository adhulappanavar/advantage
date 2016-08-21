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
	  <div class="panel-heading">
    <div class='row'>            
            <div class='col-md-2'><span style='font-size:large'>Patient List</span></div>
            <div class='col-md-6'>
                <span style='font-size:large'>Filter by:</span ><input style="color:black" type='text' [(ngModel)]='listFilter'/>
            </div>           
     </div>	
	 	 
	  </div>
	  <div class="panel-body">
		<div class="table-responsive">
		<table class="table table-striped">
        <thead>
                    <tr>
                        <th>
                            <button class='btn btn-primary' (click) = "toggleImage()">
                                {{showImage ? 'Hide' : 'Show'}} Image
                            </button>
                        </th>
                        <th>Reg No</th>
                        <th>Patient Name</th>
                        <th>Gender</th>
                        <th>Age</th>   
                        <th></th>
                    </tr>
         </thead>
         <tbody>
				<tr *ngFor="#actualpatient of actualpatients | actualpatientsFilter:listFilter">
					<td>
							<img *ngIf='showImage' [src]='actualpatient.photoUrl' [title]='actualpatient.name' [style.width.px]='imageWidth' [style.margin.px]= 'imageMargin'/>
					</td>
					<td>{{actualpatient.registrationNumber}}</td>          
								<td>{{actualpatient.name}}</td>		
					<td>{{actualpatient.gender}}</td>
					<td>{{clacAge(actualpatient.dob)}}</td>
          <td><a [routerLink]="['Payment Page Patient', {id: actualpatient.id}]">Payment Page</a></td>          
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
export class PaymentPageComponent implements OnInit{
  actualpatients: Med2patient[] = [];
  selectedActualpatient: Actualpatient;
  listFilter = "";
  showImage = false;
  imageWidth = 50;
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

  selectActualpatient(actualpatient: Actualpatient){
    this.selectedActualpatient = actualpatient;
  }

  gotoPeoplesList(){
        let link = ['Payment Page'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
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
