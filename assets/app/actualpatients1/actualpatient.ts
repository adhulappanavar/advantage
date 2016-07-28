export interface Actualpatient {
    id?: string;
    regitrationNumber : string;    
    name        : string;
    gender      : string;
    DOB         : Date;
    dateOfAdmission : Date;  
    photoUrl    : string;
    PCPContact : {
        name : string; 
        contactNo : string; 
        adress : string;
    }
    comments : string;
    initialPayment : {
        registrationFee : number;
    }
    mongoId? : string;
}
