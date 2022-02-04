import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { FiadoComponent } from "./components/fiado/fiado.component";
import { SalesComponent } from './components/sales/sales.component';
import { SaleComponent } from "./components/sale/sale.component";
import { EditComponent } from "./components/edit/edit.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./auth.guard";
import { ScannerComponent } from "./components/scanner/scanner.component";
import { MenuComponent } from "./components/menu/menu.component";

const appRoutes: Routes = [
    {path: "", component:MenuComponent,canActivate: [AuthGuard]},
    {path: "products", component:ProductsComponent,canActivate: [AuthGuard]},
    {path: "sale", component:SaleComponent,canActivate: [AuthGuard]},
    {path: "sales", component:SalesComponent,canActivate: [AuthGuard]},
    {path: "fiado", component:FiadoComponent,canActivate: [AuthGuard]},
    {path: "login", component:LoginComponent},
    {path: "addProduct", component:AddProductComponent,canActivate: [AuthGuard]},
    {path: "editProducts", component:EditComponent,canActivate: [AuthGuard]},
    {path: "register", component:RegisterComponent,canActivate: [AuthGuard]},
    {path: "scanner", component:ScannerComponent,canActivate: [AuthGuard]}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);