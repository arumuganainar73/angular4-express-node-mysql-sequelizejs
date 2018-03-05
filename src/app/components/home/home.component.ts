import { Component, Inject, OnInit } from '@angular/core';
import { ApiProvider } from '../../providers/api.provider';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: "home",
	templateUrl: "home.component.html",
	styleUrls: ['./home.component.css'],
	providers: [ApiProvider]
})

export class HomeComponent implements OnInit {

	title = 'Task';
	tasks = [];
	ApiProvider: any;

	constructor( @Inject(ApiProvider) ApiProvider, private router: Router) {
		this.ApiProvider = ApiProvider;
		//this.getTasks();
	}

	ngOnInit() {
		this.getTasks();
	}
	/**
	 * get all tasks
	 */
	getTasks() {
		var endpoint = "todo";
		var config = {
			'method': 'GET'
		}
		this.ApiProvider.apiRequest(endpoint, config).subscribe(
			results => {
				console.log("results", results);
				if (!results || results.length === 0) {
					return;
				}
				this.tasks = results[0]
			},
			err => {
				// Log errors if any
				console.log(err);
			});

	}
	/**
	 * navigate to task page
	 */
	navigate() {
		this.router.navigate(['task', 'add']);
	}
	/**
	 * navigate to edit task based on id
	 * @param taskid 
	 */
	editTask(taskid) {
		this.router.navigate(['task', taskid]);
	}
	/**
	 * delete task based on id
	 * @param Id 
	 */
	deleteTask(Id) {
		var endpoint = "deletetodo";
		var data = {
			id: Id
		}
		var config = {
			'method': 'POST',
			'data': data
		}
		this.ApiProvider.apiRequest(endpoint, config)
			.subscribe(
			results => {
				console.log("results", results);
				this.getTasks();
			},
			err => {
				// Log errors if any
				console.log(err);
			});

	}

}