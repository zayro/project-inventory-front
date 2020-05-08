import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilter'
})
export class MultiFilterPipe implements PipeTransform {

  transform(arr: any[], filters: Object) {


    if (!arr) { return []; }
    if (!filters) { return arr; }


      console.log(filters);
      const filterKeys = Object.keys(filters);

      return arr.filter(eachObj => {
        return filterKeys.every(eachKey => {
          if (!filters[eachKey].length) {
            return true; // passing an empty filter means that filter is ignored.
          }
          return filters[eachKey].includes(eachObj[eachKey]);
        });
      });

  }

}
