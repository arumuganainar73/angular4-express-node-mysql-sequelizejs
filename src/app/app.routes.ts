import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'task/:id',
		component: TaskComponent
	}
];

export const routing = RouterModule.forRoot(routes);
