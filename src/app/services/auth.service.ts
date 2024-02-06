import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable, catchError, map, throwError } from "rxjs";
import { AuthResponseData } from "../models/authResponseData.model";
import { User } from "../models/user.model";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { logOut } from "../auth/state/auth.actions";

@Injectable({
    providedIn:'root'
})

export class AuthService {
    timeOutInterval: any;
    constructor(private http: HttpClient,
                private store: Store<AppState>){}
    
    login(email: string, password: string): Observable<any>{
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
            {email, password,returnSecureToken: true}).pipe(
                map((responseData: any)=>{
                            const authResponse: AuthResponseData = {
                                idToken: responseData.idToken,
                                email: responseData.email,
                                refreshToken: responseData.refreshToken,
                                expiresIn: responseData.expiresIn,
                                localId: responseData.localId,
                                registered: responseData.registered
                              };
                              return authResponse;
                        }),
                catchError((error)=>{
                    return throwError(error);
                })
            );
        
        //     
        // );
    }
    signup(email: string, password: string){
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`,
        {email, password,returnSecureToken: true}).pipe(
            map((responseData: any)=>{
                const authResponse: AuthResponseData = {
                    idToken: responseData.idToken,
                    email: responseData.email,
                    refreshToken: responseData.refreshToken,
                    expiresIn: responseData.expiresIn,
                    localId: responseData.localId,
                    registered: responseData.registered
                  };
                  return authResponse;
            }),
            catchError((error)=>{
                return throwError(error);
            })
        );
    }
    formatUser(data: AuthResponseData){
        const expiryDate = new Date(new Date().getTime()+ +data.expiresIn*1000);
        const user = new User(data.email, data.idToken, data.localId, expiryDate);
        return user;
    }
    getErrorMessage(message: string){
        switch(message){
            case 'INVALID_LOGIN_CREDENTIALS': return 'Invalid login Credentials';
            case 'EMAIL NOT FOUND': return 'Email not found';
            case 'INVALID PASSWORD': return 'Invalid did not match';
            case 'EMAIL_EXISTS': return 'Email already taken';
        }
        return "Unknown error found";
    }
    setUserInLocalStorage(user: User){
        localStorage.setItem('userData',JSON.stringify(user));
        
        this.runTimeOutInterval(user);
    }
    getUserInLocalStorage():User | undefined{
        const userdata = localStorage.getItem('userData');
        if(userdata){
            let user = JSON.parse(userdata);
            user = new User(user.email, user.token,user.localId, new Date(user.expirationDate));
            this.runTimeOutInterval(user);
            return user;
        }
        return undefined;
    }
    runTimeOutInterval(user: User){
        const expireDate = user.expireDate.getTime();
        const todaysDate = new Date().getTime();
        const timeInterval = expireDate - todaysDate;
        this.timeOutInterval = setTimeout(()=>{
            this.store.dispatch(logOut());
        },timeInterval);
    }
    deleteUserInLocalStorage(){
        localStorage.removeItem('userData');
        if(this.timeOutInterval){
            clearTimeout(this.timeOutInterval);
            this.timeOutInterval=null;
        }

    }
}