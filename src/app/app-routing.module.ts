import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LoginComponent,
  RegisterComponent,
  DashboardComponent,
  SalesComponent,
  ClientsComponent,
  LstClientComponent,
  NewClientComponent,
  UpdClientComponent,
  CashiersComponent,
  NewCashierComponent,
  CategoriesComponent,
  LstCategoryComponent,
  UpdCategoryComponent,
  ProductsComponent,
  LstProductComponent,
  NewProductComponent,
  UpdProductComponent,
  ServicesComponent,
  LstServiceComponent,
  NewServiceComponent,
  UpdServiceComponent,
  ProvidersComponent,
  LstProviderComponent,
  NewProviderComponent,
  UpdProviderComponent,
  StatisticsComponent,
  LstSalesComponent,
  UpdSalesComponent,
  NewSalesComponent
} from './modules/index';
import { LayoutComponent } from './shared/layout/layout.component';
import { OrderComponent } from './modules/order/order.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '!', component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      
      { path: 'clients', component: ClientsComponent, children: [
        { path: '', component: LstClientComponent },
        { path: 'new', component: NewClientComponent },
        { path: 'update/:clientId', component: UpdClientComponent }
      ] },
      { path: 'boxs', component: CashiersComponent },
      { path: 'boxs/new', component: NewCashierComponent },
      { path: 'categories', component: CategoriesComponent, children: [
        { path: '', component: LstCategoryComponent },
        { path: 'update/:categoryId', component: UpdCategoryComponent },
      ] },
      { path: 'products', component: ProductsComponent, children: [
        { path: '', component: LstProductComponent },
        { path: 'new', component: NewProductComponent },
        { path: 'update/:productId', component: UpdProductComponent },
      ] },
      { path: 'services', component: ServicesComponent, children: [
        { path: '', component: LstServiceComponent },
        { path: 'new', component: NewServiceComponent },
        { path: 'update/:serviceId', component: UpdServiceComponent }
      ] },
      { path: 'providers', component: ProvidersComponent, children: [
        { path: '', component: LstProviderComponent },
        { path: 'new', component: NewProviderComponent },
        { path: 'update/:providerId', component: UpdProviderComponent },
      ] },
      { path: 'statistics', component: StatisticsComponent, children: [
        { path: '', component: StatisticsComponent },
        
      ] },
      { path: 'sales', component: SalesComponent, children: [
        { path: '', component: LstSalesComponent },
        { path: 'new', component: NewSalesComponent },
        { path: 'update/:salesId', component: UpdSalesComponent },
      ] },
      { path: 'orders', component: OrderComponent, children: [
        { path: '', component: OrderComponent }
      ] },
    ]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
