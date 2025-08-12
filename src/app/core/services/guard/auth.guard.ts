import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { take, tap } from "rxjs/operators";

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.initAuthListener$().pipe(
    take(1),
    tap((user) => {
      console.log("AuthGuard user", user);
      if (user) {
        return true;
      } else {
        logoutSesion(authService, router);
      }
    })
  );
};

export const AuthRedirectGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.initAuthListener$().pipe(
    take(1),
    tap((user) => {
      console.log("AuthRedirectGuard user", user);
      if (!user) {
        return true;
      } else {
        router.navigateByUrl("/authenticated");
      }
    })
  );
};

function logoutSesion(authService: AuthService, router: Router) {
  authService.logout();
  router.navigateByUrl("/auth");
}
