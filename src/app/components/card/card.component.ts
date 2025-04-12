import {Component, output} from "@angular/core";

@Component({
  selector: 'app-card',
  template: `
    <button class="relative overflow-hidden flex justify-center items-center h-100 min-w-96 bg-white rounded-2xl shadow-xs cursor-pointer animate-border" (click)="navigateBlog()"></button>
  `,
  styles: [
    `
      .animate-border:hover::before {
        content: "";
        position: absolute;
        width: 10rem;
        height: 140%;
        background: linear-gradient(#00ccff, #d500f9);
        animation: rotate 3.5s linear infinite;
      }

      .animate-border:hover::after {
        content: "";
        position: absolute;
        background: var(--color-white);
        inset: 2px;
        border-radius: calc(var(--radius-2xl) - 0.1rem);
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to{
          transform: rotate(360deg);
        }
      }
    `
  ]
})
export class CardComponent {

  onClick = output<void>();

  navigateBlog():void{
    this.onClick.emit();
  }
}
