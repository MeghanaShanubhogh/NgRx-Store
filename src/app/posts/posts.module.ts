import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { UpdatePostComponent } from "./update-post/update-post.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { postsReducer } from "./state/posts.reducer";
import { POST_STATE_NAME } from "./state/posts.selector";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "./state/posts.effects";

const routes: Routes = [
    {
        path:'',
        component:PostsListComponent,
        children: 
        [
            { 
                path:'add',
                component:AddPostComponent
            },
            {
                path:'update/:id',
                component: UpdatePostComponent
            }
        ]
    }
];
@NgModule({
    declarations:[
        PostsListComponent,
        AddPostComponent,
        UpdatePostComponent
    ],
    imports:[
        CommonModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature(POST_STATE_NAME,postsReducer),
        EffectsModule.forFeature([PostEffects]),
    ],
})
export class PostsModule {}