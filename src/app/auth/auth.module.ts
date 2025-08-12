import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "@root/shared/shared.module";
import { LoginTimeComponent } from "./login-time/login-time.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LoginTimeComponent
  ],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
