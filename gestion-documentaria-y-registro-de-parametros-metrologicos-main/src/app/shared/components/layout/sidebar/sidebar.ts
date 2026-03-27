import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { menu } from './menu';

interface MenuParent {
  label: string;
  abrev?: string;
  icon?: string;
  items?: MenuOption[];
  path?: string;
}

interface MenuOption {
  label: string;
  path?: string;
  children?: MenuOption[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent implements OnInit {

  @Input() sidebarOpen: boolean = true;
  logo = 'assets/img/ins_0.jpg';
  logoDocMetrix = 'assets/img/docmetrix_logo.png';

  openParents: { [key: string]: boolean } = {};
  openMenus: { [key: string]: boolean } = {};

  menu: MenuParent[] = menu;

  constructor(private router: Router) {}

  ngOnInit() {
    const currentUrl = this.router.url;

    this.menu.forEach(parent => {
      // 1. NUEVO: Verificar si el padre tiene un path directo (Ej: 'Inicio')
      if (parent.path && currentUrl.includes(parent.path)) {
        this.openParents[parent.label] = true;
      }

      parent.items?.forEach(item => {
        if (item.children && item.children.length > 0) {
          const isActive = item.children.some(sub => sub.path && currentUrl.includes(sub.path));
          if (isActive) {
            this.openMenus[item.label] = true;
            this.openParents[parent.label] = true;
          }
        }

        if (item.path && currentUrl.includes(item.path)) {
          this.openParents[parent.label] = true;
        }
      });
    });
  }

  toggleParent(label: string) {
    const clickedParent = this.menu.find(p => p.label === label);

    Object.keys(this.openParents).forEach(key => this.openParents[key] = false);

    this.openParents[label] = true;
    if (clickedParent?.items) {
      // lógica extra si fuera necesaria
    }
  }

  toggleMenu(label: string) {
    this.openMenus[label] = !this.openMenus[label];
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
