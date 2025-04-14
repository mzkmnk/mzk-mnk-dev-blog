import type { Agenda } from '@/models/agenda.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogDetailService {
	private readonly http = inject(HttpClient);

	private readonly _agenda = signal<Agenda[]>([]);

	agenda = computed(() => this._agenda());

	async getBlog(id: number): Promise<string> {
		return await firstValueFrom(
			this.http.get('blogs/signal.md', { responseType: 'text' }),
		);
	}

	setAgenda(agenda: Agenda[]): void {
		this._agenda.set(agenda);
	}
}
