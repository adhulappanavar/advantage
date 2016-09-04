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
								<a class="navbar-brand"><B style="color:#337ab7;font-size:large">{{pageTitle}}</B></a>
								<ul class="nav navbar-nav" >
                                    <li (click)="makeactive(0)"><a  [routerLink]="['Actualpatients']" *ngIf="isLoggedIn()"><strong style="font-size:large"><span [style] = "active[0]? 'color:#337ab7' : '' " >Patients</span></strong></a></li>
                                    <li (click)="makeactive(1)"><a [routerLink]="['Actualmedicines']" *ngIf="isLoggedIn()"><strong style="font-size:large"><span [style] = "active[1]? 'color:#337ab7' : '' " >Items</span></strong></a></li>
                                    <li (click)="makeactive(2)"><a  [routerLink]="['Med2patients']" *ngIf="isLoggedIn()"><strong style="font-size:large"><span [style] = "active[2]? 'color:#337ab7' : '' " >Put Item To Bill</span></strong></a></li>
                                    <li (click)="makeactive(3)"><a  [routerLink]="['Payment Patient List']" *ngIf="isLoggedIn()"><strong style="font-size:large"><span [style] = "active[3]? 'color:#337ab7' : '' " >Generate Bills</span></strong></a></li>
                                    <li (click)="makeactive(4)"><a [routerLink] = "['Bill List']" *ngIf="isLoggedIn()"><strong style="font-size:large"><span [style] = "active[4]? 'color:#337ab7' : '' " >Patient Bill History</span></strong></a></li>
                                    <li (click)="makeactive(5)"><a [routerLink] = "['Payment Page']" *ngIf="isLoggedIn()"><strong style="font-size:large"><span [style] = "active[5]? 'color:#337ab7' : '' " >Payment procedure</span></strong></a></li>
                                    <li (click)="makeactive(6)"><a [routerLink] = "['Payment History List']" *ngIf="isLoggedIn()"><strong style="font-size:large"><span [style] = "active[6]? 'color:#337ab7' : '' " >Payment History</span></strong></a></li>
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

    active = [true , false , false , false , false , false , false]

    constructor (private _authService: AuthService , private router : Router) {}

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    makeactive(index)
    {
        
        for(var i = 0 ; i<this.active.length ; i++)
        {
            this.active[i] = false;
            if(i==index)
                this.active[i] = true;
        }

        //console.log()
    }

    getUserName(){
            return localStorage.getItem('firstname') + " " + localStorage.getItem('lastname') ;
    }

     onLogout() {
        this._authService.logout();
        this.router.navigate(['Auth']);
    }
}