import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { RouterModule } from '@angular/router';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
})
export class AppComponent {}