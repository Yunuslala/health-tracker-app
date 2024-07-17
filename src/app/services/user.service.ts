import { Injectable } from '@angular/core';
import { User } from '../types/AllType';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    // Retrieve users from localStorage on initialization
    const storedUsers = localStorage.getItem("UsersWorkouts");
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  addUserWorkout(name: string, type: string, minutes: number) {
    // Check if the user already exists in localStorage
    let userIndex = this.users.findIndex(user => user.name === name);
    if (userIndex === -1) {
      // If user does not exist, create a new user object and add it to users array
      const newUser: User = { name, workouts: [{ workoutType: type, workoutMinutes: minutes }] };
      this.users.push(newUser);
    } else {
      // If user exists, add the new workout to the existing user's workouts array
      this.users[userIndex].workouts.push({ workoutType: type, workoutMinutes: minutes });
    }

    // Update localStorage after modifying users array
    localStorage.setItem("UsersWorkouts", JSON.stringify(this.users));
  }

  getUsers() {
    return this.users;
  }
}
