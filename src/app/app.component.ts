import { Component, } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-root",
  standalone:true,
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet,RouterModule,CommonModule],
})
export class AppComponent {
  
}