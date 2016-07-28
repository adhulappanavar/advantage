import { Pipe , PipeTransform } from 'angular2/core';
import { Actualpatients } from './actualpatients';

@Pipe({
	name : 'actualpatientsFilter'
})

export class ActualpatientsFilterPipe implements PipeTransform{
	transform(value: Actualpatients[] , args : string[]) : Actualpatients[] {
		let filter : string = args[0] ? args[0].toLocaleLowerCase() : null;
		return filter  ? value.filter((actualpatients : Actualpatients) => actualpatients.name.toLowerCase().indexOf(filter) != -1) : value ; 
	}	
}