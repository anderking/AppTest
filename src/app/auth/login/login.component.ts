import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  inject,
  signal,
} from "@angular/core";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";
import {
  LoginFormModel,
  CurrentUserModel,
} from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { isNullOrUndefined } from "@root/core/utilities/is-null-or-undefined.util";
import { first, takeUntil } from "rxjs/operators";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("mainForm", { read: NgForm }) mainForm: NgForm;

  private _authService = inject(AuthService);
  private _authFacadeService = inject(AuthFacadeService);
  private _finisher = new Subject<void>();

  public dataForm: LoginFormModel;
  public isLoading: boolean;
  public username = signal("emilys");
  public password = signal("emilyspass");
  public loginGoogleFB: CurrentUserModel;

  ngOnInit() {
    this._authFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this._authFacadeService
      .getCurrentUser$()
      .pipe(
        first((userAuth) => !isNullOrUndefined(userAuth)),
        takeUntil(this._finisher)
      )
      .subscribe((userAuth: CurrentUserModel) => {
        this._authService.theParamsToLoginTime = userAuth;
      });
  }

  ngAfterViewInit(): void {
    this._authService.logout();
  }

  ngOnDestroy() {
    this._authFacadeService.reset();
    this._finisher.next();
  }

  onSubmit() {
    this.dataForm = { ...this.mainForm.form.getRawValue() };
    if (this.mainForm.form.valid) {
      this._authFacadeService.login(this.dataForm);
    }
  }
}
