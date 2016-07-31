import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Router} from "angular2/router"; 
import {AuthService} from "./auth//auth.service";


@Component({
    selector: 'my-header',
    template: `                
                 <div>
						<nav class="navbar navbar-default">
							<div class="container-fluid">
								<a class="navbar-brand">{{pageTitle}}</a>
								<ul class="nav navbar-nav" >
                                    <li><a [routerLink]="['Actualpatients']" *ngIf="isLoggedIn()">Patients</a></li>
                                    <li><a [routerLink]="['Actualmedicines']" *ngIf="isLoggedIn()">Items</a></li>
                                    <li><a  [routerLink]="['Med2patients']" *ngIf="isLoggedIn()">AddItemToBill</a></li>
                                    <li><a  [routerLink]="['Payment Patient List']" *ngIf="isLoggedIn()">Payment Patient List</a></li>
                                    <li *ngIf="!isLoggedIn()"><a [routerLink]="['Auth']" >User Management</a></li>									
								</ul>
                                <ul class="nav navbar-nav navbar-right">
                                    
                                        <li *ngIf="isLoggedIn()" class="dropdown">
                                            <a class="dropdown-toggle" data-toggle="dropdown"><strong style="color:#337ab7;font-size:large">Welcome {{getUserName()}}
                                            <span class="caret"></span></strong></a>
                                            <ul class="dropdown-menu">
                                            <li align="center"><a (click) ="onLogout()">Logout</a></li>                                            
                                            </ul>
                                         </li>                                    
                                    
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

    constructor (private _authService: AuthService , private router : Router) {}

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    getUserName(){
            return localStorage.getItem('firstname') + " " + localStorage.getItem('lastname') ;
    }

     onLogout() {
        this._authService.logout();
        this.router.navigate(['Auth']);
    }
}