
export interface Workout {
    workoutType: string;    
    workoutMinutes: number;
   
  }
  

export interface User{
    name:string,
    workouts:Workout[]
}