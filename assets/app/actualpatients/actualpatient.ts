export interface Actualpatient {
    id?: string;
    registrationNumber? : string;    
    name?        : string;
    gender  ?    : string;
    dob    ?    : Date;
    dateOfAdmission? : Date;  
    photoUrl  ?  : string;
    pcpContact? : {
        name : string; 
        contactNo : string; 
        adress : string;
    }
    comments? : string;
    initialPayment? : {
        registrationFee : number;
        cautionDeposit : number;
        advancePayment : number;
        establishmentCharges : number;
        monthlyCharges : number;
        phyisiotherapyCharges: number;
        privateNurseCharges : number;
    }
    mongoId? : string;
}
