import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Student } from './student';
import { StudentDetailsComponent } from './student-details.component';
import { StudentsService } from './students.service';
import { StudentFilterPipe } from './student-filter.pipe';


@Component({
  selector: 'students-list',
  directives: [StudentDetailsComponent, ROUTER_DIRECTIVES],
  template: `    
  <div class="panel panel-primary ">
	  <div class="panel-heading">
    <div class='row'>
            <div class='col-md-2'>Filter by:</div>
            <div class='col-md-4' style="color:black">
                <input type='text' [(ngModel)]='listFilter'/>
            </div>
     </div>
		 <a href="#" [routerLink] = "['Student Add']">ADD</a>
	  </div>
	  <div class="panel-body">
			<div class="table-responsive">
			  <table class="table table-striped">
				<tr *ngFor="#student of students | studentFilter:listFilter">
					<td>
					  <a href="#" [routerLink]="['Student Details', {id: student.id}]">{{student.name}}</a>
					</td>		
				</tr>
			  </table>	  
			</div>
		</div>
	</div>
  <h6>Thanks to http://www.barbarianmeetscoding.com/blog/categories/angular2-step-by-step/ </h6>
  `,
  styleUrls: ['html/students/students.component.css'] , 
  pipes : [StudentFilterPipe]
})
export class StudentComponent implements OnInit{
  students: Student[] = [];
  selectedStudent: Student;
  listFilter = "";
  constructor(private studentsService : StudentsService){ }

  ngOnInit(){
    //this.students = this.starWarsService.getAll();
    this.studentsService
      .getAllStudents()
      .subscribe(p => this.students = p)
  }

  selectStudent(student: Student){
    this.selectedStudent = student;
  }
}
