import { createReducer, on } from "@ngrx/store";
import { initialState } from "./posts.state";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";

export function postsReducer(state:any, action: any){
    return _postsReducer(state,action);
}
const _postsReducer = createReducer(
    initialState,
    // on(addPost,(state, action)=>{
    //     let post = {...action.post};
    //     return {
    //         ...state,
    //         posts: state.posts.concat(post)
    //         //posts: [...state.posts,post]
    //     }
    // }),
    on(updatePostSuccess,(state,action)=>{
        //console.log(action);
        const updatedPosts = state.posts.map((post)=>{
            return post.id === action.post.id?action.post:post;
        });
        return {
            ...state,
            posts: updatedPosts,
        }
    }),
    on(deletePostSuccess,(state,action)=>{
        const deletedPosts = state.posts.filter((post)=> post.id !== action.post_id);
        return{
            ...state,
            posts: deletedPosts
        }
    }),
    on(loadPostsSuccess,(state,action)=>{
        return{
            ...state,
            posts: action.posts
        }
    }),
    on(addPostSuccess, (state,action)=>{
        return{
            ...state,
            posts: [...state.posts,action.post]
        }
    }),
);
