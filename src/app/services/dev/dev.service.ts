import { ToastService } from '@/services/toast/toast.service';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DevService {
	private readonly toastService = inject(ToastService);

	inDevelopment(): void {
		this.toastService.openToast('開発中です！');
	}
}
