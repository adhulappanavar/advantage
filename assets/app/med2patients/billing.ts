import { Actualmedicine } from '../actualmedicines/actualmedicine';    




export interface billing {
  month? : String , 
   year? : String , 
  medicines? : Actualmedicine[],   
  date? : Date , 
  category? : String , 
  preparedBy? : String ,
  totalCost? : number
}
