import {Component} from "@angular/core";
import {CardComponent} from "../../components/card/card.component";

@Component({
  selector: 'app-top',
  imports: [
    CardComponent
  ],
  template: `
    <div class="flex gap-10 flex-wrap items-center justify-center">
      @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track i) {
        <app-card/>
      }
    </div>
  `
})
export class TopComponent {

}