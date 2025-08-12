import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./product.component";
import { CategoriesComponent } from "./products/products.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { AuthGuard } from "@services/guard/auth.guard";

export const routes: Routes = [
  {
    path: "",
    component: ProductComponent,
    title: 'Product',
    canActivate: [AuthGuard],
    children: [
      { path: "", component: CategoriesComponent },
      { path: "form", component: ProductFormComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
