import { Actualmedicine } from '../actualmedicines/actualmedicine';

export interface Med2patient {
  id?: string;
  url?: string;
  name: string;
  patientid : string,
  registrationNumber : string,
  dob : Date,
  dateOfAdmission : string,
  height: number;
  weight: number;
  profession?: string;
  mongoId : string;
  medicines : Actualmedicine[];
  newmedicines : Actualmedicine[];
}
