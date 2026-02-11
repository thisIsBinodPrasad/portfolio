
import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = signal<boolean>(true); // Default to dark
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      // Guard against running on server
      if (isPlatformBrowser(this.platformId)) {
        if (this.darkMode()) {
          document.body.classList.add('dark-theme');
          document.body.classList.remove('light-theme');
        } else {
          document.body.classList.add('light-theme');
          document.body.classList.remove('dark-theme');
        }
      }
    });
  }

  toggleTheme() {
    this.darkMode.update(val => !val);
  }
}
