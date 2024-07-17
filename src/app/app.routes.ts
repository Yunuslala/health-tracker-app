import { Routes } from '@angular/router';
import { UserInputComponent } from './components/user-input/user-input.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProgressComponent } from './components/user-progress/user-progress.component';
export const routes: Routes = [

    {
        path:"",
        component:UserInputComponent,
    },
    {
        path:"userList",
        component:UserListComponent,
    },
    {
        path:"userProgress",
        component:UserProgressComponent,
    }
];
