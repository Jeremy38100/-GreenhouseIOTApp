import { AppEvents, IOTAppErrors } from './../model/index';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface APIRoute {
	url: string,
	method: HttpMethod
}

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

export enum ServerState {
	REACHABLE = 'REACHABLE',
	UNREACHABLE = 'UNREACHABLE',
	UNKNOWN = 'UNKNOWN'
}

@Injectable()
export class APIService {

	private routesMap	: Map<string, APIRoute>;
	private protocol	: string = "http";
	private domain 		: string = "localhost";
	private port 			: number = 8101;
	private token 		: string;
	public 	state 		: ServerState = ServerState.UNKNOWN;

	constructor(
		private configService	: ConfigService,
		private httpService		: HttpService,
		private storageService: StorageService,
		private events				: Events
	) {
		this.routesMap = new Map<string, APIRoute>();
	}

	/**
	 * Load the api configuration from ConfigService
	 * @return {void}
	 */
	loadConfig = (): void => {
		this.protocol = this.configService.getProtocol();
		this.domain 	= this.configService.getDomain();
		this.port 		= this.configService.getPort();
	}

	/**
	 * Load the token from the storage
	 * @return {Promise} A promise which resolves when token is loaded
	 */
	loadToken = (): Promise<any> => {
		return new Promise((resolve, reject) => {
			this.storageService.get('access_token')
			.then(token => {
				this.token = token
				resolve(token);
			})
			.catch(err => reject(err));
		});
	}

	/**
	 * Get the api instance
	 * @return {any} The instance
	 */
	getInstance = (): any => {
		var instance = {};
		this.routesMap.forEach((route, key) => {
			instance[key] = this.getRouteCb(route);
		});
		return instance;
	}

	/**
	 * Get the callback from the route
	 * @param {APIRoute} route The route
	 * @return {() => {}} The callback from the route
	 */
	private getRouteCb = (route: APIRoute) : any => {
		let cb = null;
		switch (route.method) {
			case HttpMethod.GET:
				cb = (params?, opts?) => {
					return new Promise((resolve, reject) => {
						this.httpService.get(this.getUrlFromParams(route.url, params), opts)
						.then((response) => {
							this.events.publish(AppEvents.SERVER_REACHABLE);
							resolve(response);
						})
						.catch((err: HttpErrorResponse) => {
							if (err.status === 0) {
								this.events.publish(AppEvents.SERVER_UNREACHABLE, {code: IOTAppErrors.ERRORS.SERVER_UNREACHABLE.code});
							}
							reject(err);
						});
					});
				};
				break;
			case HttpMethod.POST:
				cb = (body, params?, opts?) => {
					return new Promise((resolve, reject) => {
						this.httpService.post(this.getUrlFromParams(route.url, params), body, opts)
						.then((response) => {
							this.events.publish(AppEvents.SERVER_REACHABLE);
							resolve(response);
						})
						.catch((err: HttpErrorResponse) => {
							if (err.status === 0) {
								this.events.publish(AppEvents.SERVER_UNREACHABLE, {code: IOTAppErrors.ERRORS.SERVER_UNREACHABLE.code});
							}
							reject(err);
						});
					});
				};
				break;
			case HttpMethod.PUT:
				cb = (body, params?, opts?) => {
					return new Promise((resolve, reject) => {
						this.httpService.put(this.getUrlFromParams(route.url, params), body, opts)
						.then((response) => {
							this.events.publish(AppEvents.SERVER_REACHABLE);
							resolve(response);
						})
						.catch((err: HttpErrorResponse) => {
							if (err.status === 0) {
								this.events.publish(AppEvents.SERVER_UNREACHABLE, {code: IOTAppErrors.ERRORS.SERVER_UNREACHABLE.code});
							}
							reject(err);
						});
					});
				};
				break;
			case HttpMethod.DELETE:
				cb = (params?, opts?) => {
					return new Promise((resolve, reject) => {
						this.httpService.delete(this.getUrlFromParams(route.url, params), opts)
						.then((response) => {
							this.events.publish(AppEvents.SERVER_REACHABLE);
							resolve(response);
						})
						.catch((err: HttpErrorResponse) => {
							if (err.status === 0) {
								this.events.publish(AppEvents.SERVER_UNREACHABLE, {code: IOTAppErrors.ERRORS.SERVER_UNREACHABLE.code});
							}
							reject(err);
						});
					});
				};
				break;
			default:
				return;
		}
		return cb;
	}

	private getUrlFromParams = (url, params?) => {
		let route = url;
		if (params) {
			for (let key in params) {
				let replace = new RegExp(':' + key, 'g');
				route = route.replace(replace, params[key]);
			}
		}
		return route;
	}

	/**
	 * Get the web service protocol
	 * @return {string}
	 */
	getProtocol = () : string => {
		return this.protocol;
	}

	/**
	 * Get the web service domain
	 * @return {string}
	 */
	getDomain = () : string => {
		return this.domain;
	}

	/**
	 * Get the web service port
	 * @return {number}
	 */
	getPort = () : number => {
		return this.port;
	}

	/**
	 * Get the web service url
	 * @return {string}
	 */
	getBaseUrl = () : string => {
		return this.protocol + "://" + this.domain + (this.port ? ":" + this.port : "");
	}

	/**
	 * Get the authentication token
	 * @return {string} The token
	 */
	getToken = () : string => {
		return this.token;
	}

	/**
	 * Set the authentication token 
	 * @param {string} token The token
	 * @return {void}
	 */
	setToken = (token) : void => {
		this.token = token;
	}

	/**
	 * Clear the authentication token
	 * @return {void}
	 */
	clearToken = () : void => {
		this.token = null;
	}

	/**
	 * Init routes 
	 * @return {void}
	 */
	initRoutes = () : void => {
		this.routesMap = this.configService.getRoutes();
	}


}