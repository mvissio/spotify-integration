import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styles: []
})
export class SingerComponent {

  constructor(private router: ActivatedRoute) {
    router.params.subscribe(params => {
      console.log(`ID:` + params['id']);
    });
  }


}
