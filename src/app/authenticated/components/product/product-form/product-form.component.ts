import { Component, OnInit, OnDestroy, inject, Input } from "@angular/core";
import { UntypedFormGroup, Validators, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { combineLatest, of, Subject } from "rxjs";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { filter, map, takeUntil } from "rxjs/operators";
import { CommonModule, Location } from "@angular/common";
import { getErrorMessageField, isValidField } from "@root/core/utilities/form-validations";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { ProductModel } from "@models/configurations/product.model";
import { ProductFacadeService } from "@facades/product-facade.service";
import { CategoryModel } from "@models/configurations/category.model";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: "app-product-form",
  templateUrl: "./product-form.component.html"
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() id?: string;

  private _productFacadeService = inject(ProductFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _fb = inject(UntypedFormBuilder);
  private _location = inject(Location);
  private _finisher$ = new Subject<void>();

  public categoryCombo$: CategoryModel[] = [
    { id: "1", name: "01" },
    { id: "2", name: "02" },
    { id: "3", name: "03" }
  ];

  public mainForm: UntypedFormGroup;
  public dataForm: ProductModel;
  public currentItem: ProductModel;
  public isLoading: boolean;

  ngOnInit() {
    this.mainForm = this.initForm();
    this.chargeIndicatorManager();

    const items$ = this._productFacadeService.getAll$().pipe(
      filter((items: ProductModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this._finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([items$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([items, mainForm]) => {
          console.log("items", items);
          try {
            const itemTemp = {
              item: items.find((reg: ProductModel) => reg.id === this.id),
              mainForm
            };

            return itemTemp;
          } catch (error) {
            console.error(error);
            return {
              item: null,
              mainForm
            };
          }
        }),
        takeUntil(this._finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        if (data.item) {
          this.selectCurrentItem(data.item);
        }
      });

    this._productFacadeService
      .getCurrentItem$()
      .pipe(
        filter((currentItem) => !isNullOrUndefinedEmpty(currentItem)),
        takeUntil(this._finisher$)
      )
      .subscribe((currentItem) => {
        console.log("currentItem", currentItem);
        this.currentItem = currentItem;
      });

    this._sharedFacadeService
      .getMessage$()
      .pipe(filter((currentItem) => !isNullOrUndefinedEmpty(currentItem)))
      .subscribe(() => {
        if (!this.currentItem) {
          this.clean();
        }
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._finisher$.next();
  }

  selectCurrentItem(item: ProductModel): void {
    this.mainForm.reset(item, { emitEvent: false });
    this._productFacadeService.select(item);
  }

  initForm(): UntypedFormGroup {
    return this._fb.group({
      id: null,
      nombre: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      precio: [null, [Validators.required]],
      categoria: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.dataForm = {
      ...this.mainForm.getRawValue()
    };
    if (this.mainForm.valid) {
      if(this.id){
        this._productFacadeService.update(this.dataForm);
      }
      else{
        this._productFacadeService.create(this.dataForm);
      }
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm);
  }

  clean() {
    this.mainForm.reset({ state: true });
  }

  goBack() {
    this._location.back();
  }

  chargeIndicatorManager(): void {
    const isLoadingProduct$ = this._productFacadeService.getLoading$();

    const result$ = combineLatest([isLoadingProduct$]).pipe(
      map(([isLoadingProduct]) => isLoadingProduct),
      takeUntil(this._finisher$)
    );

    result$.pipe(takeUntil(this._finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
