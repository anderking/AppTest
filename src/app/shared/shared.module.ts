import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ContainerComponent } from "./container/container.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgBoostrapModule } from "@root/core/ui/ng-bootstrap.module";
import { ToastContainerComponent } from "./toast-container/toast-container.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavFooterComponent } from "./nav-footer/nav-footer.component";

@NgModule({
  declarations: [
    ContainerComponent,
    ToastContainerComponent,
    NavFooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgBoostrapModule,
    FontAwesomeModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgBoostrapModule,
    ContainerComponent,
    ToastContainerComponent,
  ],
  providers: [
    DecimalPipe,
  ],
})
export class SharedModule {}
