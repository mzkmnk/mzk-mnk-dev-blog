import {Component, inject} from "@angular/core";
import {CardComponent} from "../../components/card/card.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-top',
  imports: [
    CardComponent
  ],
  host: {
    class: 'w-full'
  },
  template: `
    <div class="grid gap-14 grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] justify-center">
      @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track i) {
        <app-card (onClick)="navigateBlog(i)" />
      }
    </div>
  `
})
export class TopComponent {

  private router = inject(Router);

  async navigateBlog(blogId:number): Promise<void>{
    await this.router.navigateByUrl(`/blog/${blogId}`);
  }
}
