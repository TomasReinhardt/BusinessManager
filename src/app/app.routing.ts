import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { StockComponent } from './components/stock/stock.component';
import { LoginComponent } from './components/login/login.component';
import { FiadoComponent } from './components/fiado/fiado.component';
import { SalesComponent } from './components/sales/sales.component';
import { SaleComponent } from "./components/sale/sale.component";

const appRoutes: Routes = [
    {path: "", component:ProductsComponent},
    {path: "sale", component:SaleComponent},
    {path: "sales", component:SalesComponent},
    {path: "stock", component:StockComponent},
    {path: "login", component:LoginComponent},
    {path: "fiado", component:FiadoComponent},
    {path: "addProduct", component:AddProductComponent},
    {path: "addCategory", component:AddCategoryComponent},
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);