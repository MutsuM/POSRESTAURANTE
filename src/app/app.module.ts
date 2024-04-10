import { NgModule,OnChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryService } from './core/services/Category.service';
import { ProductService } from './core/services/Product.service';
import { ProviderService } from './core/services/Provider.service';
import { HttpClientService } from './core/services/HttpClient';

import { NgApexchartsModule } from "ng-apexcharts";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';

import { LayoutComponent } from './shared/layout/layout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SalesComponent } from './modules/sales/sales.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { ProductsComponent } from './modules/products/products.component';
import { ServicesComponent } from './modules/services/services.component';
import { NewProductComponent } from './modules/products/new-product/new-product.component';
import { UpdProductComponent } from './modules/products/upd-product/upd-product.component';
import { LstProductComponent } from './modules/products/lst-product/lst-product.component';
import { NewServiceComponent } from './modules/services/new-service/new-service.component';
import { UpdServiceComponent } from './modules/services/upd-service/upd-service.component';
import { LstServiceComponent } from './modules/services/lst-service/lst-service.component';
import { NewCategoryComponent } from './modules/categories/new-category/new-category.component';
import { UpdCategoryComponent } from './modules/categories/upd-category/upd-category.component';
import { LstCategoryComponent } from './modules/categories/lst-category/lst-category.component';
import { NewClientComponent } from './modules/clients/new-client/new-client.component';
import { UpdClientComponent } from './modules/clients/upd-client/upd-client.component';
import { LstClientComponent } from './modules/clients/lst-client/lst-client.component';
import { CashiersComponent } from './modules/cashiers/cashiers.component';
import { NewCashierComponent } from './modules/cashiers/new-cashier/new-cashier.component';
import { TablePaginationComponent } from './shared/components/table-pagination/table-pagination.component';
import { ProvidersComponent } from './modules/providers/providers.component';
import { LstProviderComponent } from './modules/providers/lst-provider/lst-provider.component';
import { NewProviderComponent } from './modules/providers/new-provider/new-provider.component';
import { UpdProviderComponent } from './modules/providers/upd-provider/upd-provider.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { TabGeneralComponent } from './modules/statistics/tab-general/tab-general.component';
import { TabEmployeesComponent } from './modules/statistics/tab-employees/tab-employees.component';
import { TabCategoriesComponent } from './modules/statistics/tab-categories/tab-categories.component';
import { TabServicesComponent } from './modules/statistics/tab-services/tab-services.component';
import { ApexChartsComponent } from './shared/components/apex-charts/apex-charts.component';
import { TabEmployeeDetailComponent } from './modules/statistics/tab-employee-detail/tab-employee-detail.component';
import { LstSalesComponent } from './modules/sales/lst-sales/lst-sales.component';
import { NewSalesComponent } from './modules/sales/new-sales/new-sales.component';
import { UpdSalesComponent } from './modules/sales/upd-sales/upd-sales.component';
import { OrderComponent } from './modules/order/order.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    SalesComponent,
    ClientsComponent,
    CategoriesComponent,
    ProductsComponent,
    ServicesComponent,
    NewProductComponent,
    UpdProductComponent,
    LstProductComponent,
    NewServiceComponent,
    UpdServiceComponent,
    LstServiceComponent,
    NewCategoryComponent,
    UpdCategoryComponent,
    LstCategoryComponent,
    NewClientComponent,
    UpdClientComponent,
    LstClientComponent,
    CashiersComponent,
    NewCashierComponent,
    TablePaginationComponent,
    ProvidersComponent,
    LstProviderComponent,
    NewProviderComponent,
    UpdProviderComponent,
    StatisticsComponent,
    TabGeneralComponent,
    TabEmployeesComponent,
    TabCategoriesComponent,
    TabServicesComponent,
    ApexChartsComponent,
    TabEmployeeDetailComponent,
    LstSalesComponent,
    NewSalesComponent,
    UpdSalesComponent,
    OrderComponent,


  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    NgxPaginationModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    Ng2SearchPipeModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          // {
          //   id: GoogleLoginProvider.PROVIDER_ID,
          //   provider: new GoogleLoginProvider(
          //     '228314030719-ksc1iqtcn7msudlftuik0rfpmm2oslmh.apps.googleusercontent.com'
          //   )
          // },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1482801685527712')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    CategoryService,
    ProductService,
    ProviderService,
    HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
