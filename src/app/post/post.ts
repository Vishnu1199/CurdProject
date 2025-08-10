import { Component, OnInit } from '@angular/core';
import { PostService,Posts } from '../postservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  imports: [CommonModule,FormsModule],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post implements OnInit {

  posts:any[]=[]
  check=false;
  errorcheck=false;
  errorMessage: string = '';
  constructor(private postService:PostService){ }



  ngOnInit():void{
   this.postService.getPosts().subscribe((data) => {
    this.posts=data
   })
  }
 
  newPost:Partial<Posts> ={name:'',email:"",username:"",password:""};
  newPostedit:Partial<Posts> ={name:'',email:'',username:"",password:""};

  submitPost() {
   this.postService.addPost(this.newPost).subscribe((data)=> {
    this.posts.unshift(data)
    this.newPost ={name:'',email:"",username:"",password:""};
   })
  }

  editPost(id: number):void{
    this.check=true;
   this.postService.getPost(id).subscribe((data) => {
    this.newPostedit=data;
   
   })
  }

  // searchPost(name: string):void{
  
 //  this.postService.getPostName(name).subscribe((data) => {
 //   this.posts=[data];
 //  })
 // }

  searchPost(name: string): void {
  this.postService.getPostName(name).subscribe({
    next: (data) => {
      this.posts = [data];
      this.errorMessage = ''; // Clear error if success
    },
    error: (error) => {
      console.error('Error fetching user:', error);
      this.errorMessage = error.error.status+" "+error.error.message || 'User not found';
      this.posts = []; // Clear list on error
      this.errorcheck=true;
    }
  });
}

  updatePost(): void {
  if (this.newPostedit.id) {
    this.postService.updatePost(this.newPostedit as Posts).subscribe((updatedPost) => {
      const index = this.posts.findIndex(p => p.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
      this.newPostedit = { name: '', email: '', username: '', password: '' };
      this.check = false;
    });
  }
}

  deletePost(id: number):void{
    this.postService.deletePost(id).subscribe(()=>{
      this.posts=this.posts.filter(posts=>posts.id!==id);
    })
  }

}
