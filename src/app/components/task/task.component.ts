import { Component, Inject, OnInit } from '@angular/core';
import { ApiProvider } from '../../providers/api.provider';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: "task",
	templateUrl: "task.component.html",
	styleUrls: ['./task.component.css'],
	providers: [ApiProvider]
})
export class TaskComponent {
	title: string = "Task";
	data = {
		name: '',
		description: '',
		date: new Date(),
		status: '',
	}
	results = [];
	ApiProvider: any;
	buttonText: any;
	currentTaskId: any
	constructor( @Inject(ApiProvider) ApiProvider, private route: ActivatedRoute,
		private routerURL: Router, private router: Router) {
		this.ApiProvider = ApiProvider;
		const currentUrl = this.routerURL.url;
		console.log("currentUrl", currentUrl);
		/**
		 * get the state params values
		 */
		this.route.params.subscribe(params => {
			if (params.id === 'add') {
				this.buttonText = "ADD";
			} else {
				this.currentTaskId = params.id
				this.buttonText = "UPDATE";
				this.getTaksById();
			}
			console.log("params", params);
		});

	}

	ngOnInit() {
		this.results = [];
	}
	/**
	 * naviagate to home page
	 */
	navigate() {
		this.router.navigate(['']);
	}
	/**
	 * get the taske based on id
	 */
	getTaksById() {
		var endpoint = "todo";
		var data = {
			id: this.currentTaskId
		}
		var config = {
			'method': 'POST',
			'data': data
		}
		this.ApiProvider.apiRequest(endpoint, config)
			.subscribe(
			results => {
				if (!results || results.length === 0) {
					return;
				}
				console.log("results", results);
				var data = results[0];
				this.data.name = data[0].name;
				this.data.description = data[0].description;
				this.data.date = new Date(data[0].date);
				this.data.status = data[0].status;
			},
			err => {
				// Log errors if any
				console.log(err);
			});
	}
	/**
	 * add or update the task
	 * @param value 
	 */
	addTasks(value) {

		if (!this.data.name) {
			return;
		}
		if (!this.data.description) {
			return;
		}
		if (!this.data.date) {
			return;
		}
		if (!this.data.status) {
			return;
		}
		var config, data, endpoint;
		if (this.buttonText === "ADD") {
			data = {
				name: this.data.name,
				description: this.data.description,
				date: this.data.date,
				status: this.data.status,
			}
			endpoint = "addtodo";
			config = {
				method: 'POST',
				'data': data
			}
		} else if (this.buttonText === "UPDATE") {
			data = {
				id: this.currentTaskId,
				name: this.data.name,
				description: this.data.description,
				date: this.data.date,
				status: this.data.status,
			}
			endpoint = "updatetodo";
			config = {
				method: 'PUT',
				'data': data
			}
		}
		var result = this.ApiProvider.apiRequest(endpoint, config)
			.subscribe(
			results => {
				console.log("results", results);
				this.router.navigate(['']);
			},
			err => {
				// Log errors if any
				console.log(err);
			});
	}
}