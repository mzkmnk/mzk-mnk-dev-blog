import type { Agenda } from '@/models/agenda.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogDetailService {
	private readonly http = inject(HttpClient);

	private readonly _agenda = signal<Agenda[]>([]);

	agenda = computed(() => this._agenda());

	async getBlog(filePath: string): Promise<string> {
		return await firstValueFrom(
			this.http.get(filePath, { responseType: 'text' }),
		);
	}

	setAgenda(agenda: Agenda[]): void {
		this._agenda.set(agenda);
	}
}
