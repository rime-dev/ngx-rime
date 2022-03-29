import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'rng-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  public isDark = false;
  constructor(private overlay: OverlayContainer) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
  }
  changeTheme() {
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
    this.isDark = !this.isDark;
  }
}
