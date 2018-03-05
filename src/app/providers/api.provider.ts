import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CONFIG } from '../../app/app.config';

@Injectable()

export class ApiProvider {

	http: any;

	constructor( @Inject(Http) http) {
		this.http = http;
	}
	apiRequest(endPoint, args): Observable<any> {

		let hdrs = new Headers();
		let options = new RequestOptions({ headers: hdrs });

		var url = CONFIG.ApiUrl + endPoint;
		var promise;
		//this.showLoader('');
		if (args.method === "POST") {
			return this.http.post(url, args.data || {}, options).map((res) => {
				console.log('api response:', res);
				return res.json();
			})
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));


		} else if (args.method === "PUT") {
			return this.http.put(url, args.data || {}, options).map((res) => {
				console.log('api response:', res);
				return res.json();
			})
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));


		} else if (args.method === "GET") {
			return this.http.get(url, options)
				.map((res) => {
					console.log('api response:', res);
					return res.json();
				})
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		}
	}
	getTasks() {
		return this.http.get('http://localhost:3000/todo');
	}

	addTasks(data) {
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/addtask', JSON.stringify(data), options)
			.map(res => res.json());
	}


}