import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Actualpatient } from '../actualpatients/actualpatient';

@Injectable()
export class ActualpatientsService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://localhost:3000';

  constructor(private http : Http){}

  getAllActualpatients(): Observable<Actualpatient[]>{
    let actualpatients$ = this.http
      .get(`${this.baseUrl}/actualpatients`)
      .map(mapActualpatients);
      return actualpatients$;
  }
  getActualpatients(id: string): Observable<Actualpatient> {
    let actualpatients$ = this.http
      .get(`${this.baseUrl}/actualpatients/${id}`)
      .map(mapActualpatient);
      return actualpatients$;
  }
  saveActualpatient(actualpatient: Actualpatient) : Observable<Response>{
        const body = JSON.stringify(actualpatient);
        const headers = new Headers({'Content-Type': 'application/json'});

         return this.http
              .post(`${this.baseUrl}/actualpatients/${actualpatient.id}`,body, {headers: headers});
  }


}

function mapActualpatients(response:Response): Actualpatient[]{
   return response.json().obj.map(toActualpatient)
}

function mapActualpatient(response:Response): Actualpatient{
   return toActualpatient(response.json().obj);
}

function toActualpatient(r:any): Actualpatient{
  let actualpatient = <Actualpatient>({
//    id: parseInt(r.url.replace('http://swapi.co/api/actualpatients/','').replace('/','')),
    regitrationNumber : r._regitrationNumber ,    
    name        : r.name,
    gender      : r.gender,
    DOB         : r.DOB,
    dateOfAdmission : r.dateOfAdmission,  
    photoUrl    : r.photoUrl,
    PCPContact : r.PCPContact,
    comments : r.comments,
    initialPayment : r.initialPayment,
    mongoId : r._id    
  });
  console.log('Parsed actualpatient:', actualpatient);
  return actualpatient;
}
