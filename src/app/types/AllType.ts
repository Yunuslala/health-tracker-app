
export interface Workout {
    workoutType: string;    
    workoutMinutes: number;
   
  }
  

export interface User{
    id:number,
    name:string,
    workouts:Workout[]
}