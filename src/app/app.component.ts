import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent],
	template: `
    <app-header class="sticky top-0 left-0 z-50"/>
    <div class="flex items-center sm:px-6 w-full mt-3 px-3">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {}
