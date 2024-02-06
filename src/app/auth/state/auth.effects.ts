import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, logOut, loginStart, loginSuccess, signUpStart, signUpSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { AuthResponseData } from "../../models/authResponseData.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { setErrorMessage, setIsError, setLoadingSpinner } from "../../store/shared/shared.actions";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects{
    constructor(private actions$:Actions,
                private authService: AuthService,
                private store: Store<AppState>,
                private router: Router){}
    
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action)=>{
                return this.authService.login(action.email, action.password).pipe(
                    map((data: AuthResponseData)=>{
                        this.store.dispatch(setLoadingSpinner({loadingState: false}));
                        this.store.dispatch(setIsError({isError: false}));
                        this.store.dispatch(setErrorMessage({errorMsg:""}));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return loginSuccess({user, redirect:true});
                    }),
                    catchError((errorResp: any)=>{
                        this.store.dispatch(setLoadingSpinner({loadingState: false}));
                        this.store.dispatch(setIsError({isError: true}));
                        const errMsg = this.authService.getErrorMessage(errorResp.error.error.message);
                        return of(setErrorMessage({errorMsg:errMsg}));
                    })
                );
            })
        );
    });

    signup$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(signUpStart),
            exhaustMap((action)=>{
                return this.authService.signup(action.email, action.password).pipe(
                    map((data: AuthResponseData)=>{
                        this.store.dispatch(setLoadingSpinner({loadingState: false}));
                        this.store.dispatch(setIsError({isError: false}));
                        this.store.dispatch(setErrorMessage({errorMsg:""}));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return signUpSuccess({user,redirect:true});
                    }),
                    catchError((errorResp: any)=>{
                        this.store.dispatch(setLoadingSpinner({loadingState: false}));
                        this.store.dispatch(setIsError({isError: true}));
                        const errMsg = this.authService.getErrorMessage(errorResp.error.error.message);
                        return of(setErrorMessage({errorMsg:errMsg}));
                    })
                );
            })
        );
    });
    loginRedirect$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(loginSuccess, signUpSuccess),
            map((action)=>{
                this.store.dispatch(setIsError({isError: false}));
                this.store.dispatch(setErrorMessage({errorMsg:""}));
                if(action.redirect)
                    this.router.navigate(['/']);
                }
            )
     );   
    }, {dispatch: false});

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(autoLogin),
          mergeMap((action) => {
            const user = this.authService.getUserInLocalStorage();
            if (user) {
              return of(loginSuccess({ user, redirect:false }));
            } else {
              // Return an observable with no value using `of(null)` or `of()` depending on your needs
              return of();
            }
          })
        );
      });
    
      LogOut$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(logOut),
          map((action) => {
            const user = this.authService.deleteUserInLocalStorage();
            this.router.navigate(['auth']);
            })
        );
    },{dispatch: false});
    
}