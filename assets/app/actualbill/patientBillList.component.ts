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
						<table class="table">
							<thead>
								<tr>                    
								<th>Month</th>                        
								</tr>
							</thead>
							<tbody *ngIf="actualpatient">
								<tr *ngFor="#billitem of actualpatient.bills">					
									<td><a [routerLink] = "['Bill For Patient1'  , {id1: actualpatient.id+'__'+billitem._id}]" >{{billitem.month}} / {{billitem._id}}</a></td>									          
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
export class PatientBillListComponent implements OnInit{
  actualpatients: Med2patient[] = [];
  showmeds = false;
  actualpatient: Med2patient = {};
  selectedActualpatient: Actualpatient;
  listFilter = "";
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

     toggleshowmeds()
     {
       this.showmeds = !this.showmeds;
     }
}

