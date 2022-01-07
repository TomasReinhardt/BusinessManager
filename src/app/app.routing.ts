import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { StockComponent } from './components/stock/stock.component';
import { LoginComponent } from './components/login/login.component';
import { SalesComponent } from './components/sales/sales.component';
import { SaleComponent } from "./components/sale/sale.component";
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
    {path: "", component:ProductsComponent,canActivate: [AuthGuard]},
    {path: "sale", component:SaleComponent,canActivate: [AuthGuard]},
    {path: "sales", component:SalesComponent,canActivate: [AuthGuard]},
    {path: "stock", component:StockComponent,canActivate: [AuthGuard]},
    {path: "login", component:LoginComponent},
    {path: "addProduct", component:AddProductComponent,canActivate: [AuthGuard]},
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);