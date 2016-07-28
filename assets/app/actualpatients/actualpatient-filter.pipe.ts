import { Pipe , PipeTransform } from 'angular2/core';
import { Actualpatient } from './actualpatient';

@Pipe({
	name : 'actualpatientsFilter'
})

export class ActualpatientsFilterPipe implements PipeTransform{
	transform(value: Actualpatient[] , args : string[]) : Actualpatient[] {
		let filter : string = args[0] ? args[0].toLocaleLowerCase() : null;
		return filter  ? value.filter((actualpatients : Actualpatient) => actualpatients.name.toLowerCase().indexOf(filter) != -1) : value ; 
	}	
}