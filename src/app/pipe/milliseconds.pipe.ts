import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "milliseconds",
})
export class MillisecondsPipe implements PipeTransform {
  transform(value: number): string {
    return `${value.toFixed(4)} ms to run (rounded to 4 decimal places).`;
  }
}
