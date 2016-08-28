import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Actualmedicine } from '../actualmedicines/actualmedicine';

@Injectable()
export class ActualmedicinesService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://localhost:3000';

  constructor(private http : Http){}

  getAllActualmedicines(): Observable<Actualmedicine[]>{
    let actualmedicines$ = this.http
      .get(`${this.baseUrl}/actualmedicines`)
      .map(mapActualmedicines);
      return actualmedicines$;
  }

deleteActualmedicine(id: string) : Observable<Response>{
      console.log("In delete medicine");
        const body = JSON.stringify(id);
        console.log("body from Delete Patient : " , body);
        const headers = new Headers({'Content-Type': 'application/json'});

//         return this.http.post('/actualpatients' , body, {headers: headers});
         return this.http.delete(`${this.baseUrl}/actualmedicines/${id}`);


  }

  getActualmedicine(id: string): Observable<Actualmedicine> {
    console.log("in service getActualmedicines(id)");
    let actualmedicines$ = this.http
      .get(`${this.baseUrl}/actualmedicines/${id}`)
      .map(mapActualmedicine);
      console.log("mapped");
      console.log(actualmedicines$);
      return actualmedicines$;
  }
  saveActualmedicine(actualmedicine: Actualmedicine) : Observable<Response>{
        const body = JSON.stringify(actualmedicine);
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log("body from saveNewStudent : " , body);
         return this.http
              .post(`${this.baseUrl}/actualmedicines/${actualmedicine.id}`,body, {headers: headers});
  }
  
  
  saveNewActualmedicine(actualmedicine: Actualmedicine) : Observable<Response>{
      console.log("In SaveNewStudent");
        const body = JSON.stringify(actualmedicine);
        console.log("body from saveNewStudent : " , body);
        const headers = new Headers({'Content-Type': 'application/json'});

         return this.http.post('/actualmedicines' , body, {headers: headers});
  }


}

function mapActualmedicines(response:Response): Actualmedicine[]{
  console.log("mapActualmedicines");
   return response.json().obj.map(toActualmedicine)
}

function mapActualmedicine(response:Response): Actualmedicine{
  console.log("mapActualmedicine");
   return toActualmedicine(response.json().obj);
}

function toActualmedicine(r:any): Actualmedicine{
  let actualmedicine = <Actualmedicine>(
    {id : r._id,
      url: r.url , 
      name: r.name,  
      cost: r.cost
    } );
  //console.log('Parsed actualmedicine:', actualmedicine);
  return actualmedicine;
}
