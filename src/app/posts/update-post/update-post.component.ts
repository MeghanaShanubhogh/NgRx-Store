import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Post } from '../../models/posts.model';
import { ActivatedRoute, Router } from '@angular/router';
import { getPostById } from '../state/posts.selector';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/posts.actions';
import { setLoadingSpinner } from '../../store/shared/shared.actions';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit, OnDestroy{
  id!: string
  postForm!: FormGroup;
  post!: Post;
  postSubscription: Subscription = new Subscription();
  constructor(private route: ActivatedRoute,
               private postStore:Store<AppState>,
               private router: Router,
               private store: Store<AppState>) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.id = params.get('id') ?? "";
      this.postSubscription = this.postStore.select(getPostById, this.id).subscribe((data)=>{
        this.post = data;
        this.createForm();
      });
    });
    
  }
  createForm(){
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    });
  }
  onUpdatePost(){
    if(!this.postForm.valid){
      return;
    }
    const post: Post = {
      id: this.id,
      title : this.postForm.value.title,
      description: this.postForm.value.description,
    }
    this.store.dispatch(setLoadingSpinner({loadingState: true}));
    this.postStore.dispatch(updatePost({post}));
    this.router.navigateByUrl('posts');
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm!=null && descriptionForm.touched && !descriptionForm.valid) {
        if (descriptionForm?.errors?.['required']) {
          return 'Description is required';
        }

        if (descriptionForm?.errors?.['minlength']) {
          return 'Description should be of minimum 10 characters length';
        }
    }
    return "";
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
