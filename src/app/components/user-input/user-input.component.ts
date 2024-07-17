import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms"
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-input',
  standalone:true,
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
  imports: [FormsModule,CommonModule,RouterModule],
})
export class UserInputComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private userService: UserService) {}

  addUserWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes) {
      this.userService.addUserWorkout(this.userName, this.workoutType, this.workoutMinutes);
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = null;
    }
  }
}
