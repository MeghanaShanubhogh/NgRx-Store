import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { getPosts } from '../state/posts.selector';
import { Post } from '../../models/posts.model';
import { deletePost, loadPosts } from '../state/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit{
    posts$ :Observable<Post[]> = new Observable<Post[]>();
    constructor(private store: Store<AppState>) {}
    ngOnInit(): void {
      this.posts$ = this.store.select(getPosts);
      this.store.dispatch(loadPosts());
    }
    onDeletePost(id:string){
      if (confirm('Are you sure you want to delete?')){
          this.store.dispatch(deletePost({post_id:id}));
      }
    }
}
