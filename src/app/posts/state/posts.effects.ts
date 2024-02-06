import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../../services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { Post } from "../../models/posts.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { setLoadingSpinner } from "../../store/shared/shared.actions";

@Injectable()
export class PostEffects{
    constructor(private actions$:Actions,
                private postService:PostService,
                private store: Store<AppState>) {}
    
    loadPosts$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(loadPosts),
            exhaustMap((action)=>{
                return this.postService.getPosts().pipe(
                  map((postsData: Post[])=>{
                    return loadPostsSuccess({posts:postsData});
                  }),
                  catchError((error)=>{
                    return of();
                  })
                )
            })
        );
    });
    addPost$ = createEffect(()=>{
      return this.actions$.pipe(
        ofType(addPost),
        mergeMap((action)=>{
          return this.postService.addPost(action.post).pipe(
            map((data)=>{
              this.store.dispatch(setLoadingSpinner({loadingState: false}));
              console.log(data);
              const post = {...action.post, id:data.name};
              return addPostSuccess({post: post});
            }),
            catchError((error)=>{
              console.log('error');
              this.store.dispatch(setLoadingSpinner({loadingState: false}));
              return of();
            })
          );
        })
      );
    });
    updatePost$ = createEffect(()=>{
      return this.actions$.pipe(
        ofType(updatePost),
        mergeMap((action)=>{
          return this.postService.updatePost(action.post).pipe(
            map((data: Post)=>{
              this.store.dispatch(setLoadingSpinner({loadingState: false}));
              return updatePostSuccess({post:data});
            }),
            catchError((error)=>{
              console.log('error');
              this.store.dispatch(setLoadingSpinner({loadingState: false}));
              return of();
            })
          );
        })
      );
    });
    deletePost$ = createEffect(()=>{
      return this.actions$.pipe(
        ofType(deletePost),
        mergeMap((action)=>{
          return this.postService.deletePost(action.post_id).pipe(
            map((data: string)=>{
              return deletePostSuccess({post_id:data});
            }),
            catchError((error)=>{
              console.log('error');
              return of();
            })
          );
        })
      );
    });
}