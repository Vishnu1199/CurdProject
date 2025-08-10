import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Post } from './post/post';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,Post],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
title="CurdProject";


}
