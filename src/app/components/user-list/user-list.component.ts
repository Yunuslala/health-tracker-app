import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
 // Import user model if defined
import { User, Workout } from '../../types/AllType';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone:true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports:[FormsModule,CommonModule]
})
export class UserListComponent implements OnInit {
  searchName: string = '';
  selectedWorkoutType: string = 'All';
  users: User[] = []; // Adjust User type as per your application
  filteredUsers: User[] = [];
  workoutTypes: string[] = ['All', 'Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers(); // Adjust to fetch users from your service
    this.filteredUsers = [...this.users];
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user:User) => {
      return (
        (this.selectedWorkoutType === 'All' || user.workouts.some((w:Workout) => w.workoutType === this.selectedWorkoutType)) && user.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    });
  }

  getTotalMinutes(user: User): number {
    if (!user || !user.workouts) return 0;
    return user.workouts.reduce((total:number, w:Workout) => total + w.workoutMinutes, 0);
  }
  getUsersWorkOutType(user: User): string {
    if (!user || !user.workouts) return "NA"; // Handle edge case
    return user.workouts.map((w:Workout) => w.workoutType).join(', '); // Concatenate workout types into a string
  }
}
