
import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = signal<boolean>(true);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('bp-theme');
      this.darkMode.set(saved ? saved === 'dark' : true);
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const dark = this.darkMode();
        document.body.classList.toggle('dark-theme', dark);
        document.body.classList.toggle('light-theme', !dark);
        localStorage.setItem('bp-theme', dark ? 'dark' : 'light');
      }
    });
  }

  toggleTheme() {
    this.darkMode.update(val => !val);
  }
}
