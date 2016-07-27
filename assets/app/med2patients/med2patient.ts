import { Medicine } from '../medicines/medicine';

export interface Med2patient {
  id?: string;
  url?: string;
  name: string;
  patientid : string;
  height: number;
  weight: number;
  profession?: string;
  mongoId : string;
  medicines : Medicine[];
  newmedicines : Medicine[];
}
