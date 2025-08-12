import { Component, OnInit, inject } from "@angular/core";
import { ProductFacadeService } from "@facades/product-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {
  private _sharedFacadeService = inject(SharedFacadeService);
  private _productFacadeService = inject(ProductFacadeService);

  public sidebarExpanded = true;

  ngOnInit(): void {
    this._sharedFacadeService.messageSubscriptions();
    this._productFacadeService.search();
  }
}
