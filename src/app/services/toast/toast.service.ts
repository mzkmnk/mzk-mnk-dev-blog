import { ToastContainerComponent } from '@/components/toast/toast-container.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
	private readonly cdkOverlay = inject(Overlay);

	openToast(message: string): void {
		const overlay = this.cdkOverlay.create({
			positionStrategy: this.cdkOverlay
				.position()
				.global()
				.top('10px')
				.right('10px'),
		});

		const toast = overlay.attach(new ComponentPortal(ToastContainerComponent));

		toast.setInput('message', message);

		toast.instance.registerOnCompleteExit(() => {
			overlay.dispose();
		});

		setTimeout(() => {
			toast.instance.exit();
		}, 3000);
	}
}
