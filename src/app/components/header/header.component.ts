import {Component} from '@angular/core';
import {NavItemComponent} from './nav-item.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import { tablerSearch } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-header',
  imports: [
    NavItemComponent,
    NgIcon,
  ],
  providers: [
    provideIcons({tablerSearch})
  ],
  template: `
    <header class="h-20">
      <div class="flex h-full items-center justify-between px-6">
        <h3 class="font-semibold">MZK.MNK.DEV</h3>
        <ul class="flex gap-10 items-center">
          <app-nav-item item="Home" (onClickNavItem)="clickNavItem('home')" />
          <app-nav-item item="About me" (onClickNavItem)="clickNavItem('aboutMe')" />
          <ng-icon class="cursor-pointer" name="tablerSearch" />
        </ul>
      </div>
    </header>
  `
})
export class HeaderComponent {

  clickNavItem(item: 'home'|'articles'|'aboutMe'): void {
    console.log(`Clicked on ${item}`);
  }
}
