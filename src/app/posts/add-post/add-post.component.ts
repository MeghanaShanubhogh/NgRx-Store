import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { addPost } from '../state/posts.actions';
import { setLoadingSpinner } from '../../store/shared/shared.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit{
  postForm: FormGroup;
  constructor(private postStore:Store<AppState>,
              private store: Store<AppState>) {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }
  ngOnInit(): void {
    
  }
  onAddPost(){
    if(!this.postForm.valid){
      return;
    }
    const post: Post = {

      title : this.postForm.value.title,
      description: this.postForm.value.description,
    }
    this.store.dispatch(setLoadingSpinner({loadingState: true}));
    this.postStore.dispatch(addPost({post}));
    this.postForm.reset({
      title: '',   // replace with your initial values
      description: '',
      // ... other form controls
    });
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
}
