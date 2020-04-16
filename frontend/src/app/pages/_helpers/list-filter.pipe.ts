import { PipeTransform, Pipe } from '@angular/core';
import { List } from 'src/app/models/list.model';

@Pipe({
    name:'listFilter'
})
export class listFilterPipe implements PipeTransform
{
    transform(list:List[],searchTerm:string):List[] {
        if(!list ||!searchTerm)
        {
            return list
        }
        return list.filter(list => list.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase())!==-1);
    }
} 
