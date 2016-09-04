import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Actualpatient } from '../actualpatients/actualpatient';

@Injectable()
export class ActualpatientsService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://localhost:3000';
//    private baseUrl: string = 'http://192.168.1.104:3000';

  med2patient;
  constructor(private http : Http ){}

  getAllActualpatients(): Observable<Actualpatient[]>{
    let actualpatients$ = this.http
      .get(`${this.baseUrl}/actualpatients`)
      .map(mapActualpatients);
      return actualpatients$;
  }
  getActualpatient(id: string): Observable<Actualpatient> {
    console.log("in service getActualpatients(id)");
    let actualpatients$ = this.http
      .get(`${this.baseUrl}/actualpatients/${id}`)
      .map(mapActualpatient);
      console.log("mapped");
      console.log(actualpatients$);
      return actualpatients$;
  }
  saveActualpatient(actualpatient: Actualpatient) : Observable<Response>{
        const body = JSON.stringify(actualpatient);
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log("body from saveNewStudent : " , body);
         return this.http
              .post(`${this.baseUrl}/actualpatients/${actualpatient.id}`,body, {headers: headers});
  }
  
  
  saveNewActualpatient(actualpatient: Actualpatient) : Observable<Response>{
      console.log("In SaveNewStudent");
        const body = JSON.stringify(actualpatient);
        console.log("body from saveNewStudent : " , body);
        const headers = new Headers({'Content-Type': 'application/json'});

         return this.http.post('/actualpatients' , body, {headers: headers});
  } 

deleteActualpatient(id: string) : Observable<Response>{
      console.log("In deleteStudent");
        const body = JSON.stringify(id);
        console.log("body from Delete Patient : " , body);
        const headers = new Headers({'Content-Type': 'application/json'});

//         return this.http.post('/actualpatients' , body, {headers: headers});
         return this.http.delete(`${this.baseUrl}/actualpatients/${id}`);
  } 


  deleteMessage(id: string) : Observable<Response>{
      const body = JSON.stringify({"_id" : id});
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.get(`${this.baseUrl}/actualpatients/${id}`)
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
  
    }


}

function mapActualpatients(response:Response): Actualpatient[]{
  console.log("mapActualpatients");
   return response.json().obj.map(toActualpatient)
}

function mapActualpatient(response:Response): Actualpatient{
  console.log("mapActualpatient");
   return toActualpatient(response.json().obj);
}

function toActualpatient(r:any): Actualpatient{
  let actualpatient = <Actualpatient>({
    id : r._id , 
    registrationNumber : r.registrationNumber ,     
    name        : r.name,
    gender      : r.gender,
    dob         : r.dob,
    dateOfAdmission : r.dateOfAdmission,  
    photoUrl    : r.photoUrl,
    pcpContact : r.pcpContact,
    comments : r.comments,
    initialPayment : r.initialPayment,
    mongoId : r._id    
  });
  console.log('Parsed actualpatient:', actualpatient);
  return actualpatient;
}
