import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Posts {
  // Define the expected structure of a Post object
  id: number;
  name: string;
  username: string;
  password: string;
  email:string;
  // Add more fields as per your backend response
}
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private apiUrl="http://localhost:8083/api/users";

  constructor(private http: HttpClient){ }



    getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
   getPost(id: number): Observable<Posts> {
    return this.http.get<Posts>(`${this.apiUrl}/id/${id}`);
  }

   getPostName(name: string): Observable<Posts> {
    return this.http.get<Posts>(`${this.apiUrl}/name/${name}`);
  }

  addPost(post:Partial<Posts>):Observable<Posts>{
    return this.http.post<Posts>(this.apiUrl,post);
  }

    updatePost(post:Posts):Observable<Posts>{
    return this.http.put<Posts>(`${this.apiUrl}/${post.id}`,post);
  }

  deletePost(id: number): Observable<any[]> {
     return this.http.delete<any[]>(`${this.apiUrl}/${id}`);
  }

}

