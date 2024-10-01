export interface WorkoutLogInput {
    userId: number;           
    workoutPlanId: number;     
    notes?: string;            
    completed: boolean;      
    logDate: Date;        
  }
  