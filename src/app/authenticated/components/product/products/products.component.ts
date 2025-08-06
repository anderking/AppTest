import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { filter, takeUntil } from "rxjs/operators";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { Subject } from "rxjs";
import { CommonModule, Location } from "@angular/common";
import { Router } from "@angular/router";
import { ProductModel } from "@models/configurations/product.model";
import { ModalService } from "@services/ui/modal.service";
import { ModalModel } from "@models/shared/modal.model";
import { OrderByPipe } from "@root/core/pipes/orderBy.pipe";
import { ProductFacadeService } from "@facades/product-facade.service";

@Component({
  standalone: true,
  imports: [CommonModule, OrderByPipe],
  providers: [OrderByPipe],
  selector: "app-products",
  templateUrl: "./products.component.html"
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private _productFacadeService = inject(ProductFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _modalService = inject(ModalService);
  private _location = inject(Location);
  private _router = inject(Router);
  private _finisher$ = new Subject<void>();
  public isLoading: boolean;
  public items: ProductModel[] = [];

  ngOnInit() {
    this._productFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this._productFacadeService
      .getAll$()
      .pipe(
        filter((items: ProductModel[]) => !isNullOrUndefinedEmpty(items)),
        takeUntil(this._finisher$)
      )
      .subscribe((items: ProductModel[]) => {
        this.items = items;
      });
  }

  ngOnDestroy(): void {
    this._finisher$.next();
    this._sharedFacadeService.reset();
  }

  goNew(): void {
    setTimeout(() => {
      this._router.navigate(["/authenticated/product/form"]);
    }, 0);
  }

  goEdit(item: ProductModel): void {
    setTimeout(() => {
      this._router.navigate(["/authenticated/product/form", { id: item?.id }]);
    }, 0);
  }

  goDelete(item: ProductModel): void {
    this._productFacadeService.delete(item);
  }

  goBack(): void {
    this._location.back();
  }

  openModal(item: ProductModel) {
    const data: ModalModel<ProductModel> = {
      type: "confirmation",
      item,
      title: "Confirmación",
      message: "¿Está seguro de que desea eliminar este registro?",
      buttonYes: "Si",
      buttonCancel: "No"
    };
    this._modalService
      .openModal(data)
      .then((data) => {
        this.goDelete(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
