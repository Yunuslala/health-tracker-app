import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserInputComponent } from './user-input.component';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['addUserWorkout']);
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call userservise.addWorkout when all fields present', () => {
    component.userName = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;
    component.addUserWorkout();
    expect(userService.addUserWorkout).toHaveBeenCalledWith('John Doe', 'Running', 30);
    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBeNull();
  });
  it('give a alert when a field missing', () => {
    component.userName = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = null;
    spyOn(window, 'alert');
    component.addUserWorkout();
    expect(window.alert).toHaveBeenCalledWith('fill al the fields');
    expect(userService.addUserWorkout).not.toHaveBeenCalled();
  });
});
