import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";

import {AuthService} from "./auth//auth.service";


@Component({
    selector: 'my-header',
    template: `
                <div *ngIf="isLoggedIn()">
                        Welcome {{getUserName()}}
                </div>
                 <div>
						<nav class="navbar navbar-default">
							<div class="container-fluid">
								<a class="navbar-brand">{{pageTitle}}</a>
								<ul class="nav navbar-nav" >
                                    <li><a [routerLink]="['Actualpatients']" *ngIf="isLoggedIn()">Patients</a></li>
                                    <li><a [routerLink]="['Actualmedicines']" *ngIf="isLoggedIn()">Items</a></li>
                                    <li><a  [routerLink]="['Med2patients']" *ngIf="isLoggedIn()">AddItemToBill</a></li>
                                    <li><a  [routerLink]="['Payment Patient List']" *ngIf="isLoggedIn()">Payment Patient List</a></li>
                                    <li><a [routerLink]="['Auth']">User Management</a></li>									
								</ul>
							</div>
						</nav>
					</div>
    `,
    directives: [ROUTER_DIRECTIVES]
   /* styles: [`
        header {
            margin-bottom: 20px;
        }
    
        ul {
          text-align: center;  
        }
        
        li {
            float: none;
            display: inline-block;
        }
        
        .router-link-active {
            background-color: #e7e7e7;
            color: white;
        }
    `]*/
})
export class HeaderComponent {
    pageTitle = "Advantage Elder care";

    constructor (private _authService: AuthService) {}

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    getUserName(){
            return localStorage.getItem('firstname') + " " + localStorage.getItem('lastname') ;
    }


}