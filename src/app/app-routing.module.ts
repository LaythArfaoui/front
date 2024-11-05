import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FoodSelectionModalComponent } from './pages/menu/food-selection-modal/food-selection-modal.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductsViewComponent } from './pages/products/products-view/products-view.component';
import { ProductsAddComponent } from './pages/products/products-add/products-add.component';
import { ProductsUpdateComponent } from './pages/products/products-update/products-update.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
import { OrderadminsComponent } from './pages/orderadmins/orderadmins.component';
import { OrderDetailsComponent } from './pages/orderadmins/order-details/order-details.component';
import { AdminGuard } from './pages/authentication/admin.guard';
import { UserGuard } from './pages/authentication/user.guard';
import { AppSideLoginComponent } from './pages/authentication/login/login.component';
const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      
      
      { path: 'menu', component: MenuComponent }, 
      { path: 'modal', component: FoodSelectionModalComponent }, 
      { path: 'order', component: OrderComponent },
      { path: 'productsview', component: ProductsViewComponent },
      { path: 'productsadd', component: ProductsAddComponent }, 
      { path: 'productsupdate', component: ProductsUpdateComponent  },
      { path: 'orderstatus', component: OrderStatusComponent  },
      { path: 'orderadmins', component: OrderadminsComponent  },
      { path: 'order-details/:id', component: OrderDetailsComponent  },
   
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
