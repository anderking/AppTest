import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerComponent } from "@root/shared/container/container.component";
import { AuthGuard } from "@services/guard/auth.guard";

const routes: Routes = [
  {
    path: "authenticated",
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "product", pathMatch: "full" },
      {
        path: "product",
        loadChildren: () =>
          import("./components/product/product.module").then(
            (m) => m.ProductModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}
