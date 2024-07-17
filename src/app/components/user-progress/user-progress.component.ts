import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Legend } from 'chart.js';
import { User, Workout } from '../../types/AllType';
import { CommonModule } from '@angular/common';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend);

@Component({
  selector: 'app-user-progress',
  standalone:true,
  templateUrl: './user-progress.component.html',
  imports:[CommonModule]
})
export class UserProgressComponent implements OnInit {
  selectedUser:any = null;
  users: User[] = [];
  chart: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
    if (this.users.length) {
      this.selectedUser = this.users[0];
      this.updateChart();
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.updateChart();
  }

  updateChart() {
    const ctx = document.getElementById('workoutChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.selectedUser.workouts.map((w: Workout) => w.workoutType),
        datasets: [{
          label: 'Minutes',
          data: this.selectedUser.workouts.map((w: Workout) => w.workoutMinutes),
          backgroundColor: 'rgba(54, 162, 235,0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
