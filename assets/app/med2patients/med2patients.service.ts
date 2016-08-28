import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Med2patient } from '../med2patients/med2patient';

@Injectable()
export class Med2patientsService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://localhost:3000';

  constructor(private http : Http){}

  getAllMed2patients(): Observable<Med2patient[]>{
    let med2patients$ = this.http
      .get(`${this.baseUrl}/med2patients`)
      .map(mapMed2patients);
      return med2patients$;
  }
  getMed2patients(id: string): Observable<Med2patient> {
    let med2patients$ = this.http
      .get(`${this.baseUrl}/med2patients/${id}`)
      .map(mapMed2patient);
      return med2patients$;
  }
  saveMed2patient(med2patient: Med2patient) : Observable<Response>{
        const body = JSON.stringify(med2patient);
        const headers = new Headers({'Content-Type': 'application/json'});

         return this.http
              .post(`${this.baseUrl}/med2patients/${med2patient.id}`,body, {headers: headers});
  }

  deleteMed2patient(id: string) : Observable<Response>{
      console.log("In delete Med2patient");
        const body = JSON.stringify(id); 
        console.log("body from Delete Med2patient : " , body);
        const headers = new Headers({'Content-Type': 'application/json'});

//         return this.http.post('/actualpatients' , body, {headers: headers});
         return this.http.delete(`${this.baseUrl}/med2patients/${id}`);
  }


}

function mapMed2patients(response:Response): Med2patient[]{
   return response.json().obj.map(toMed2patient)
}

function mapMed2patient(response:Response): Med2patient{
   return toMed2patient(response.json().obj);
}

function toMed2patient(r:any): Med2patient{
  let med2patient = <Med2patient>({
//    id: parseInt(r.url.replace('http://swapi.co/api/med2patients/','').replace('/','')),
    id: r._id,
    url: r.url,
    name: r.name,
    patientid : r.patientid,
    registrationNumber : r.registrationNumber,
    dob : r.dob,
    dateOfAdmission : r.dateOfAdmission,    
    weight: r.weight,
    height: r.height,
    gender : r.gender,
    mongoId : r._id,
    payment : r.payment , 
    bills : r.bills ,
    medicines : r.medicines,
    newmedicines : r.newmedicines,
    medtotalcost : r.medtotalcost,
    newmedtotalcost : r.newmedtotalcost
  });
  console.log('Parsed med2patient:', med2patient);
  return med2patient;
}
