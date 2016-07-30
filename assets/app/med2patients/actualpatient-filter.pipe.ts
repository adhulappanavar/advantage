import { Pipe , PipeTransform } from 'angular2/core';
import { Med2patient } from './med2patient';

@Pipe({
	name : 'actualpatientsFilter'
})

export class ActualpatientsFilterPipe implements PipeTransform{
	transform(value: Med2patient[] , args : string[]) : Med2patient[] {
		let filter : string = args[0] ? args[0].toLocaleLowerCase() : null;
		return filter  ? value.filter((actualpatients : Med2patient) => actualpatients.name.toLowerCase().indexOf(filter) != -1) : value ; 
	}	
}