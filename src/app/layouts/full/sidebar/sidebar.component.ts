import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role'); 

    if (role) {
      this.navItems = this.getNavItemsForRole(role);
    }
  }

  getNavItemsForRole(role: string): NavItem[] {
    if (role === 'ADMIN') {
      return navItems.filter(item => item.route === '/productsview' || item.route === '/orderadmins');
    } else if (role === 'USER') {
      return navItems.filter(item => item.route === '/menu' || item.route === '/order'|| item.route==='/restaurant-tables');
    }
    return [];
  }

}
