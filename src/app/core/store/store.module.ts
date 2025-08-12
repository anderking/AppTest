import { NgModule } from "@angular/core";
import { AuthStoreModule } from "./auth/auth-store.module";
import { ConfigurationStoreModule } from "./configuration/configuration-store.module";
import { SharedStoreModule } from "./shared/shared-store.module";

@NgModule({
  declarations: [],
  imports: [
    AuthStoreModule,
    SharedStoreModule,
    ConfigurationStoreModule,
  ],
  exports: [
    AuthStoreModule,
    SharedStoreModule,
    ConfigurationStoreModule,
  ],
})
export class StoreModule {}
