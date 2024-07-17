import { Injectable } from '@angular/core';
import { User } from '../types/AllType';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private users: User[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { workoutType: 'Running', workoutMinutes: 30 },
          { workoutType: 'Cycling', workoutMinutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { workoutType: 'Swimming', workoutMinutes: 60 },
          { workoutType: 'Running', workoutMinutes: 20 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { workoutType: 'Yoga', workoutMinutes: 50 },
          { workoutType: 'Cycling', workoutMinutes: 40 }
        ]
      }
  ];

  constructor() {
    const storedUsers = localStorage.getItem("UsersWorkouts");
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }
  alert(message: string) {
    alert(message);
  }


  addUserWorkout(name: string, type: string, minutes: number) {
    let userIndex = this.users.findIndex(user => user.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (userIndex === -1) {
      const newId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
      const newUser: User = { id: newId, name, workouts: [{ workoutType: type, workoutMinutes: minutes }] };
      this.users.push(newUser);
      alert(`New workout added for ${name}`);
    } else {
      this.users[userIndex].workouts.push({ workoutType: type, workoutMinutes: minutes });
      alert(`New workout added for ${name}`);
    }
    localStorage.setItem("UsersWorkouts", JSON.stringify(this.users));
  }
  getUsers() {
    return this.users;
  }
}
