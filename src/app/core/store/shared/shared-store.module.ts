import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducers, sharedFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(sharedFeatureKey, reducers),
  ],
  exports: [],
  providers: [],
})
export class SharedStoreModule {}
