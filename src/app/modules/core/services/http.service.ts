import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

	private headers 			: any = {};
	private requestOptions: any;

	constructor(
		private http: HttpClient
	) {
		this.requestOptions = { headers: this.headers, observe: 'response' };
	}

	/**
	 * Perform a get request
	 * @param {string} url The url
	 * @param {any} opts The options (optional)
	 * @return {Promise} A promise which resolves when the request received a response
	 */
	get = (url: string, opts?: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			let options = {};
			if (opts) {
				options = Object.assign({}, this.requestOptions, opts);
			}
			this.http.get(url, options)
			.subscribe(response => resolve(response), err => reject(err));
		});
	}

	/**
	 * Perform a post request
	 * @param {string} url The url
	 * @param {any} body The body to send
	 * @param {any} opts The options (optional)
	 * @return {Promise} A promise which resolves when the request received a response
	 */
	post = (url: string, body: any, opts?: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			let options = {};
			if (opts) {
				options = Object.assign({}, this.requestOptions, opts);
			}
			this.http.post(url, body, options)
			.subscribe(response => resolve(response), err => reject(err));
		});
	}

	/**
	 * Perform a put request
	 * @param {string} url The url
	 * @param {any} body The body to send
	 * @param {any} opts The options (optional)
	 * @return {Promise} A promise which resolves when the request received a response
	 */
	put = (url: string, body: any, opts?: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			let options = {};
			if (opts) {
				options = Object.assign({}, this.requestOptions, opts);
			}
			this.http.put(url, body, options)
			.subscribe(response => resolve(response), err => reject(err));
		});
	}

	/**
	 * Perform a delete request
	 * @param {string} url The url
	 * @param {any} opts The options (optional)
	 * @return {Promise} A promise which resolves when the request received a response
	 */
	delete = (url: string, opts?: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			let options = {};
			if (opts) {
				options = Object.assign({}, this.requestOptions, opts);
			}
			this.http.delete(url, options)
			.subscribe(response => resolve(response), err => reject(err));
		});
	}

}