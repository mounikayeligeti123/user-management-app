import { Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details.component/user-details.component';
import { UserTableComponent } from './components/user-table.component/user-table.component';

export const routes: Routes = [
  { path: '', component: UserTableComponent },
  { path: 'details/:id', component: UserDetailsComponent }
];
