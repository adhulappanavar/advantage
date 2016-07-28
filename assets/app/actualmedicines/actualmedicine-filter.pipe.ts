import { Pipe , PipeTransform } from 'angular2/core';
import { Actualmedicine } from './actualmedicine';

@Pipe({
	name : 'actualmedicinesFilter'
})

export class ActualmedicinesFilterPipe implements PipeTransform{
	transform(value: Actualmedicine[] , args : string[]) : Actualmedicine[] {
		let filter : string = args[0] ? args[0].toLocaleLowerCase() : null;
		return filter  ? value.filter((actualmedicines : Actualmedicine) => actualmedicines.name.toLowerCase().indexOf(filter) != -1) : value ; 
	}	
}