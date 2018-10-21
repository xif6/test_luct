import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsType'
})
export class ProductsTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value.filter((product) => product.type == args).sort((p1, p2) => p1.name > p2.name);
    }
    return value;
  }

}
