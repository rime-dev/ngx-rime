import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'projectTypePipe',
})
export class ProjectTypePipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (value === 'painting') {
      return 'format_paint';
    }
    return value;
  }
}
