import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiff'
})
export class TimeDiffPipe implements PipeTransform {

  transform(value: any,): any {
    const now = new Date()
    const datPost = new Date(value);
    const diffSeconds = Math.floor((now.getTime() - datPost.getTime()) / 1000)

    console.log(diffSeconds)

    if(diffSeconds < 15) {
      return 'à l\'istant';
    }
    if(diffSeconds < 60) {
      return diffSeconds + ' sec'
    }

    const diffMinutes = Math.floor(diffSeconds / 60);

    if(diffMinutes < 60) {
      return diffMinutes + ' min'
    }

    const diffHeures = Math.floor(diffMinutes / 60);

    if(diffHeures < 24) {
      return diffHeures + ' h'
    }

    const diffJours = Math.floor(diffHeures / 60);

    if(diffJours === 1) {
      return `hier ${datPost.getHours()}:${datPost.getMinutes()}`
    }

    const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre',
      'Décembre'];

    return `le ${datPost.getDate()} ${mois[datPost.getMonth()]} ${datPost.getFullYear()} à ${datPost.getHours()}:${datPost.getMinutes()}`
  }



}
