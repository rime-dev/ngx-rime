import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'rng-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  constructor(private overlay: OverlayContainer) {}
  ngOnInit(): void {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      themeToggleDarkIcon?.classList.remove('hidden');
    } else {
      themeToggleLightIcon?.classList.remove('hidden');
    }
    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn?.addEventListener('click', () => {
      themeToggleDarkIcon?.classList.toggle('hidden');
      themeToggleLightIcon?.classList.toggle('hidden');
      if (localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'dark') {
          document.documentElement.classList.remove('dark');
          this.overlay.getContainerElement().classList.remove('dark');

          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          this.overlay.getContainerElement().classList.add('dark');

          localStorage.setItem('theme', 'dark');
        }
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          this.overlay.getContainerElement().classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          this.overlay.getContainerElement().classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      }
    });
  }
}
