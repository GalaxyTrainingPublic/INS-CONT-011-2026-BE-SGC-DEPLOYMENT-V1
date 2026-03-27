import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from '../../shared/components/layout/navbar/navbar';
import { SidebarComponent } from '../../shared/components/layout/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Navbar, SidebarComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit{
  sidebarOpen = false;
  onToggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    localStorage.setItem('sidebar', JSON.stringify(this.sidebarOpen));
  }
  ngOnInit() {
    this.sidebarOpen = JSON.parse(localStorage.getItem('sidebar') || 'true');
  }
}
