import { Actualmedicine } from '../actualmedicines/actualmedicine';    




export interface payment { 


   amountPaid? : number , 

        modeOfPayment? : String , 

        paidBy? : String , 

        phoneNo? : number ,

        chequeNo? : number , 

        date ?: Date , 

        time? : Date ,

        month? : String
}
