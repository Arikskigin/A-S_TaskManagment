import { PipeTransform, Pipe } from '@angular/core';
import { Task } from 'src/app/models/Task.model';

@Pipe({
    name:'taskFilter'
})
export class taskFilterPipe implements PipeTransform
{
    transform(task:Task[],searchTerm:string):Task[] {
        if(!task ||!searchTerm)
        {
            return task
        }
        return task.filter(task => task.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase())!==-1);
    }
} 
