import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../types/AllType';

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    localStorage.clear();
    service['users'] = [
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
  });

  it('should return the initial list of users', () => {
    const users = service.getUsers();
    expect(users.length).toBe(3);
  });

  it('should add a workout for an existing user', () => {
    service.addUserWorkout('John Doe', 'Yoga', 60);
    const user = service.getUsers().find(u => u.name === 'John Doe');
    expect(user?.workouts.length).toBe(3);
    expect(user?.workouts).toContain(jasmine.objectContaining({ workoutType: 'Yoga', workoutMinutes: 60 }));
  });

  it('should save users to localStorage after adding a workout', () => {
    service.addUserWorkout('John Doe', 'Yoga', 60);
    const storedUsers = JSON.parse(localStorage.getItem('UsersWorkouts') || '[]');
    expect(storedUsers.length).toBe(3); 
    const user = storedUsers.find((u: User) => u.name === 'John Doe');
    expect(user.workouts.length).toBe(3); 
    expect(user.workouts).toContain(jasmine.objectContaining({ workoutType: 'Yoga', workoutMinutes: 60 }));
  });

  it('add a new user if the user does not exist', () => {
    service.addUserWorkout('Alice', 'Pilates', 45);
    const users = service.getUsers();
    expect(users.length).toBe(4); 
    const newUser = users.find(u => u.name === 'Alice');
    expect(newUser?.workouts.length).toBe(1);
    expect(newUser?.workouts).toContain(jasmine.objectContaining({ workoutType: 'Pilates', workoutMinutes: 45 }));
  });

  it('save new user to localStorage after adding a workout', () => {
    service.addUserWorkout('Alice', 'Pilates', 45);
    const storedUsers = JSON.parse(localStorage.getItem('UsersWorkouts') || '[]');
    expect(storedUsers.length).toBe(4);
    const newUser = storedUsers.find((u: User) => u.name === 'Alice');
    expect(newUser.workouts.length).toBe(1);
    expect(newUser.workouts).toContain(jasmine.objectContaining({ workoutType: 'Pilates', workoutMinutes: 45 }));
  });
});
