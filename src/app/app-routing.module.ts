import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerComponent } from "./shared/container/container.component";
import { AppComponent } from "./app.component";

export const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      { path: "", redirectTo: "auth", pathMatch: "full" },

      {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule)
      },

      {
        path: "authenticated",
        component: ContainerComponent,
        loadChildren: () => import("./authenticated/authenticated.module").then((m) => m.AuthenticatedModule)
      }
    ]
  },

  {
    path: "pages",
    loadChildren: () => import("@root/pages/pages.module").then((m) => m.PagesModule)
  },

  { path: "**", redirectTo: "/pages/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
