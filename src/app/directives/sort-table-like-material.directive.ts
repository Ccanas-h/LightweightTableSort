import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTableByCampo',
  pure: false,
  standalone: true
})
export class SortTableLikeMaterialDirective implements PipeTransform {

  transform(value: any[], field: string, direction: string): any[] {
    if (!value || !field || direction === 'null') {
      return value;
    }

    return value.sort((a, b) => {
      let comparison = 0;
      if (this.isDateString(a[field]) && this.isDateString(b[field])) {
        comparison = this.compareDates(a[field], b[field]);
      } else if (typeof a[field] === 'string') {
        comparison = a[field].localeCompare(b[field]);
      } else if (typeof a[field] === 'number') {
        comparison = a[field] - b[field];
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  }

  isDateString(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  compareDates(date1: string, date2: string): number {
    return new Date(date2).getTime() - new Date(date1).getTime();
  }

}
