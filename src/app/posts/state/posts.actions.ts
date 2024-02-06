import { createAction, props } from "@ngrx/store";
import { Post } from "../../models/posts.model";

export const ADD_POST_ACTION = '[posts page] add action';
export const ADD_POST_SUCCESS = '[posts page] add action success';
export const UPDATE_POST_ACTION = '[posts page] update action';
export const UPDATE_POST_SUCCESS = '[posts page] update action ';
export const DELETE_POST_ACTION = '[posts page] delete action';
export const DELETE_POST_SUCCESS = '[posts page] delete action success';
export const LOAD_POSTS = '[posts page] load posts';
export const LOAD_POSTS_SUCCESS = '[posts page] load success';

export const addPost = createAction(ADD_POST_ACTION, props<{ post:Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS,props<{ post:Post }>());
export const deletePost = createAction(DELETE_POST_ACTION,props<{post_id:string}>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS,props<{post_id:string}>());
export const updatePost = createAction(UPDATE_POST_ACTION,props<{post:Post}>());
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS,props<{post: Post}>());
export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS,props<{posts: Post[]}>());