import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-user-input',
  standalone:true,
  templateUrl: './user-input.component.html',
  imports: [FormsModule,CommonModule,RouterModule,MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
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
    }else{
      alert("fill al the fields")
    }
  }
}
