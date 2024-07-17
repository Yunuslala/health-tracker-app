import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { User, Workout } from '../../types/AllType';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class UserListComponent implements OnInit {
  searchName: string = '';
  selectedWorkoutType: string = 'All';
  users: User[] = []; 
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  workoutTypes: string[] = ['All', 'Running', 'Cycling', 'Swimming', 'Yoga'];
  displayedColumns: string[] = ['name', 'workouts', 'numberOfWorkouts', 'totalWorkoutMinutes'];

  // Pagination properties
  pageSize: number = 5;
  currentPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers(); 
    this.filteredUsers = [...this.users];
    this.updatePaginatedUsers();
  }

  filterUsers() {
    console.log('selectedWorkoutType', this.selectedWorkoutType);
    this.filteredUsers = this.users.filter((user: User) => {
      return (
        (this.selectedWorkoutType === 'All' ||
          user.workouts.some((w: Workout) => w.workoutType === this.selectedWorkoutType)) &&
        user.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    });
    this.updatePaginatedUsers();
  }

  getTotalMinutes(user: User): number {
    if (!user || !user.workouts) return 0;
    return user.workouts.reduce((total: number, w: Workout) => total + Number(w.workoutMinutes), 0);
  }

  getUsersWorkOutType(user: User): string {
    if (!user || !user.workouts) return 'NA'; // Handle edge case
    return user.workouts.map((w: Workout) => w.workoutType).join(', '); // Concatenate workout types into a string
  }

  updatePaginatedUsers() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedUsers();
  }
}
