import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { Post } from "../models/posts.model";

@Injectable({
    providedIn:'root'
})

export class PostService {
    constructor(private http: HttpClient){}

    getPosts():Observable<any>{
        //console.log('gets posts service');
        return this.http.get<Post[]>('https://vue-completecourse.firebaseio.com/posts.json').pipe(
            map((responseData:any)=>{
               console.log(responseData);
                const posts :Post[] = [];
                for(let key in responseData){
                    posts.push({...responseData[key], id: key});
                }
                return posts;
            }),
            catchError((error)=>{
                return throwError(error);
            })
        );
    }
    addPost(post: Post): Observable<{name:string}>{
        return this.http.post<{name: string}>('https://vue-completecourse.firebaseio.com/posts.json',post).pipe(
            map((responseData)=>{
                return responseData;
            }),
            catchError((error)=>{
                return throwError(error);
            })
        )
    }
    updatePost(post: Post):Observable<Post>{
        const postData = {[post.id?.toString() ?? ""]: { title: post.title, description: post.description }};
        return this.http.patch('https://vue-completecourse.firebaseio.com/posts.json',postData).pipe(
            map((responseData)=>{
                //console.log(responseData);
                return responseData as Post;
            }),
            catchError(err=>{
                return throwError(err);
            })
        );
    }
    deletePost(post_id: string):Observable<any>{
        return this.http.delete(`https://vue-completecourse.firebaseio.com/posts/${post_id}.json`).pipe(
            map((responseData)=>{
                console.log(responseData);
                return responseData;
            }),
            catchError(err=>{
                return throwError(err);
            })
        );
    }
}