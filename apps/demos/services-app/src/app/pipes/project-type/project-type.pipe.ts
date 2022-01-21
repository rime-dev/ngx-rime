import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'projectTypePipe',
})
export class ProjectTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === 'paint') {
      return 'format_paint';
    }
    return value;
  }
}
