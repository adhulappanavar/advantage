import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    selector: 'my-header',
    template: `
      <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                   <li>HELLO</li>
                    <li><a [routerLink]="['Med2patients']">Med2Patients</a></li>
                    <li><a [routerLink]="['Auth']">User Management</a></li>
                    <li><a [routerLink]="['Actualpatients']">Patients</a></li>
                    <li><a [routerLink]="['Actualmedicines']">Items</a></li>
                    
                </ul>
            </nav>
        </header>
    `,
    directives: [ROUTER_DIRECTIVES],
    styles: [`
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
            background-color: #337ab7;
            color: white;
        }
    `]
})
export class HeaderComponent {
    
}