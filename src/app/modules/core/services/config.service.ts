import { Injectable } from '@angular/core';

import { AppConfiguration } from '../model';

import { APIRoute } from './api.service';

@Injectable()
export class ConfigService {

	private config: AppConfiguration;
	private routes: Map<string, APIRoute> = new Map<string, APIRoute>();

	constructor() {}

	/**
	 * Load all config files and parse them
	 * @return {void}
	 */
	load = (type: string): void => {
		this.config = require('../../../../assets/config/config.' + type + '.json');
		let routes = require('../../../../assets/config/routes.json').routes;
		this.loadRoutes(routes);
	}

	/**
	 * Get the config object
	 * @return {AppConfiguration} The config object
	 */
	getConfig = (): AppConfiguration => {
		return this.config;
	}

	/**
	 * Get the web service protocol
	 * @return {string} The web service protocol
	 */
	getProtocol = (): string => {
		return this.config.api.protocol;
	}

	/**
	 * Get the web service domain
	 * @return {string} The web service domain
	 */
	getDomain = (): string => {
		return this.config.api.domain;
	}

	/**
	 * Get the web service port
	 * @return {number} The web service port
	 */
	getPort = (): number => {	
		return this.config.api.port;
	}
 
	/**
	 * Get the web socket protocol
	 * @return {string} The web socket protocol
	 */
 	getSocketProtocol = (): string => {
 		return this.config.socket.protocol;
 	}

 	/**
 	 * Get the web service url
 	 * @return {string}
 	 */
 	getBaseUrl = () : string => {
 		return this.getProtocol() + "://" + this.getDomain() + (this.getPort() ? ":" + this.getPort() : "");
 	}

 	/**
 	 * Get loaded routes
 	 * @return {Map<string, APIRoute>} The routes
 	 */
 	getRoutes = () : Map<string, APIRoute> => {
 		return this.routes;
 	}

 	/**
 	 * Get if debug is allowed
 	 * @return {boolean} Debug state
 	 */
 	getDebug = (): boolean => {
 		return this.config.app.debug;
 	}

 	/**
 	 * Load routes from routes.json file, see ../../assets/config/routes.json
 	 * @return {void}
 	 */
 	private loadRoutes = (routes: {[key: string]: APIRoute}): void => {
 		for (let key in routes) {
 			this.routes.set(key, <APIRoute> {
 				url: this.getBaseUrl() + routes[key].url,
 				method: routes[key].method
 			});
 		}
 	}

}