import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProductEffects } from "@store/configuration/effects/product.effects";
import { reducers, configurationFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(configurationFeatureKey, reducers),
    EffectsModule.forFeature([ProductEffects]),
  ],
  exports: [],
  providers: [],
})
export class ConfigurationStoreModule {}
