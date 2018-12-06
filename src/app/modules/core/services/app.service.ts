import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { 
	SocketEvent, 
	Settings, 
	NetworkConnectionType, 
	AppEvents, 
	AppConfiguration,
	IOTAppErrors,
	DisplayMethod,
	Lesson,
	LessonStatus } from '../model';

import { APIService, APIRoute } from './api.service';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { LessonService } from './lesson.service';
import { LogService } from './log.service';
import { NetworkService } from './network.service';
import { SocketService } from './socket.service';
import { StorageService } from './storage.service';

import { Events, Platform } from 'ionic-angular';

@Injectable()
export class AppService {

	private networkState : NetworkConnectionType;

	constructor(
		public 	api 							: APIService,
		private configService 		: ConfigService,
		private httpService				: HttpService,
		private lessonService 		: LessonService,
		private logService				: LogService,
		private networkService		: NetworkService,
		private socketService			: SocketService,
		private storageService		: StorageService,
		private events 						: Events,
		private platform					: Platform
	) {
		this.platform.ready().then(() => {
			if (this.platform.is('cordova')) {
				this.initNetworkListener();
			} else {
				this.initNetworkListenerForNavigator();
			}
		});
	}

	/**
	 * Get the settings
	 * @return {Settings} The settings
	 */
	getSettings = (): Settings => {
		let settings = <Settings>this.getFromStorage('settings');
		if (settings) return settings;
		else {
			let newSettings = <Settings>{
				displayMethod: DisplayMethod.LAST_DAY
			};
			this.saveSettings(newSettings);
			return newSettings;
		}
	}

	/**
	 * Save settings in storage
	 * @param {Settings} settings The settings to save
	 * @return {void}
	 */
	saveSettings = (settings: Settings): void => {
		return this.setInStorage('settings', settings);
	}


	// CONFIGURATION SERVICE INTERFACE
	
	/**
	 * Get the config object
	 * @return {AppConfiguration} The config object
	 */
	getConfiguration = () : AppConfiguration => {
		return this.configService.getConfig();
	}

	/**
	 * Get the web service protocol
	 * @return {string} The web service protocol
	 */
	getProtocol = (): string => {
		return this.configService.getProtocol();
	}

	/**
	 * Get the web service domain
	 * @return {string} The web service domain
	 */
	getDomain = (): string => {
		return this.configService.getDomain();
	}

	/**
	 * Get the web service port
	 * @return {number} The web service port
	 */
	getPort = (): number => {	
		return this.configService.getPort();
	}
 
	/**
	 * Get the web socket protocol
	 * @return {string} The web socket protocol
	 */
 	getSocketProtocol = (): string => {
 		return this.configService.getProtocol();
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
 		return this.configService.getRoutes();
 	}

 	/**
 	 * Get if debug is allowed
 	 * @return {boolean} Debug state
 	 */
 	getDebug = (): boolean => {
 		return this.configService.getDebug();
 	}


	// STORAGE SERVICE INTERFACE

	/**
	 * Set anything in storage
	 * @param {string} key The key
	 * @param {any} value The value to save
	 * @return {void}
	 */
	setInStorage = (key: string, value: any) : void => {
		return this.storageService.set(key, value);
	}

	/**
	 * Get anything from storage
	 * @param {string} key The key
	 * @return {any} The object retrieved
	 */
	getFromStorage = (key) : any => {
		return this.storageService.get(key);
	}

	/**
	 * Remove from storage
	 * @param {string} key The key
	 * @return {void}
	 */
	removeFromStorage = (key: string) : void => {
		return this.storageService.remove(key);
	}

	/**
	 * Clear all the storage
	 * @return {void}
	 */
	clearStorage = () : void => {
		return this.storageService.clear();
	}



	// HTTP SERVICE INTERFACE

	/**
	 * Perform a get request
	 * @param {string} url The url
	 * @param {any} opts The options (optional)
	 * @return {Promise} A promise which resolves when the request received a response
	 */
	performGetRequest = (url, opts?) : Promise<any> => {
		return this.httpService.get(url, opts);
	}

	/**
	 * Perform a post request
	 * @param {string} url The url
	 * @param {any} body The body to send
	 * @param {any} opts The options (optional)
	 * @return {Promise} A promise which resolves when the request received a response
	 */
	performPostRequest = (url, body, opts?) : Promise<any> => {
		return this.httpService.post(url, body, opts);
	}

	/**
	 * Perform a put request
	 * @param {string} url The url
	 * @param {any} body The body to send
	 * @param {any} opts The options (optional)
	 * @return {Promise} A promise which resolves when the request received a response
	 */
	performPutRequest = (url, body, opts?) : Promise<any> => {
		return this.httpService.put(url, body, opts);
	}

	/**
	 * Perform a delete request
	 * @param {string} url The url
	 * @param {any} opts The options (optional)
	 * @return {Promise} A promise which resolves when the request received a response
	 */
	performDeleteRequest = (url, opts?) : Promise<any> => {
		return this.httpService.delete(url, opts);
	}


	// SOCKET SERVICE INTERFACE
	 
	/**
	 * Initialisation of the socket
	 * @return {void}
	 */
	initSocket = (onError?: (err) => any) => {
		this.socketService.initSocket(onError);
	}

	/**
	 * Send an object through the socket
	 * @param {any} object The object you want to send
	 * @return {void}
	 */
	sendBySocket = (object: any) => {
		this.socketService.send(object);
	}

	/**
	 * Function that will be executed on a socket message
	 * @return {Observable} An Observable which resolves each message received
	 */
	onSocketMessage = () => {
		return this.socketService.onMessage();
	}

	/**
	 * Function that will be executed on error
	 * @return {Observable} An Observable which resolves each error
	 */
	onSocketError = () => {
		return this.socketService.onError();
	}

	/**
	 * Function that will be executed on a socket event
	 * @param {SocketEvent} event The event observed
	 * @return {Observable<SocketEvent>} An Observable which resolves each event received
	 */
	onSocketEvent = (event: SocketEvent) => {
		return this.socketService.onEvent(event);
	}

	/**
	 * Close the current socket
	 * @return {void}
	 */
	closeSocket = (): void => {
		return this.socketService.close();
	}



	// NETWORK SERVICE FUNCTIONS

	/**
	 * Initialize the network listener and get the connection type
	 * @return {void}
	 */
	initNetworkListener = (): void => {
		let type = this.networkService.getType();
		switch (type) {
			case NetworkConnectionType.UNKNOWN:
				this.networkState = NetworkConnectionType.UNKNOWN;
				break;
			case NetworkConnectionType.WIFI:
				this.networkState = NetworkConnectionType.WIFI;
				break;
			case NetworkConnectionType.ETHERNET:
				this.networkState = NetworkConnectionType.ETHERNET;
				break;
			case NetworkConnectionType.CELL_2G:
				this.networkState = NetworkConnectionType.CELL_2G;
				break;
			case NetworkConnectionType.CELL_3G:
				this.networkState = NetworkConnectionType.CELL_3G;
				break;
			case NetworkConnectionType.CELL_4G:
				this.networkState = NetworkConnectionType.CELL_4G;
				break;
			case NetworkConnectionType.CELLULAR:
				this.networkState = NetworkConnectionType.CELLULAR;
				break;
			case NetworkConnectionType.NONE:
				this.networkState = NetworkConnectionType.NONE;
				break;
			default:
				this.logService.warning("Unknown network type : " + type);
				break;
		}
		this.networkService.onConnect().subscribe(() => {
			this.events.publish(AppEvents.NETWORK_CONNECT);
		});
		this.networkService.onDisconnect().subscribe(() => {
			this.events.publish(AppEvents.NETWORK_DISCONNECT);
		});
		this.networkService.onChange().subscribe(event => {
			this.events.publish(AppEvents.NETWORK_CHANGED, {event: event});
		});
	}

	/**
	 * Initialize the network listeners and set the connection type
	 * @return {void}
	 */
	initNetworkListenerForNavigator = () : void => {
		this.networkState = navigator.onLine ? NetworkConnectionType.UNKNOWN : NetworkConnectionType.NONE;
		window.addEventListener('online', (event) => {
			this.events.publish(AppEvents.NETWORK_CONNECT);
		});
		window.addEventListener('offline', (event) => {
			this.events.publish(AppEvents.NETWORK_DISCONNECT);
		});
	}

	/**
	 * Function which will be called when network is connected
	 * @return {Observable<any>} An observable which notifies each time the device connects to a network
	 */
	onNetworkConnect = (): Observable<any> => {
		return this.networkService.onConnect();
	}

	/**
	 * Function which will be called when network is disconnect
	 * @return {Observable<any>} An observable which notifies each time the device disconnects to a network
	 */
	onNetworkDisconnect = (): Observable<any> => {
		return this.networkService.onDisconnect();
	}

	/**
	 * Function which will be called when network changes
	 * @return {Observable<any>} An observable which notifies each time the device changes its network
	 */
	onNetworkChange = (): Observable<any> => {
		return this.networkService.onChange();
	}

	/**
	 * Get the downlink max speed
	 * @return {String} The downlink max speed
	 */
	getDownlinkMaxSpeed = (): string => {
		return this.networkService.getDownlinkMaxSpeed();
	}
	
	/**
	 * Get the connection type
	 * @return {String} The connection type
	 */
	getNetworkType = (): string => {
		if (this.platform.is('cordova')) {
			return this.networkService.getType();
		} else {
			return this.networkState;
		}
	}


	// LESSON SERVICE FUNCTIONS 

  /**
   * Get all lessons
   * @return {Lesson[]} The lesson
   */
	getLessons = (): Lesson[] => {
		return this.lessonService.getLessons();
	}

	/**
	 * Get the lessons status
	 * @return {LessonStatus[]} The lessons status
	 */
	getLessonsStatus = (): LessonStatus[] => {
		return this.lessonService.getLessonsStatus();
	}

	/**
	 * Save lessons status in storage
	 * @param {LessonStatus[]} lessonsStatus The lessons status to save
	 * @return {void}
   */
	saveLessonsStats = (lessonsStatus: LessonStatus[]): void => {
		return this.lessonService.saveLessonsStatus(lessonsStatus);
	}

	/**
   * Toggle the lesson status
   * @param {number} id The lesson id
   * @return {void}
   */
	toggleLessonStatus = (id: number, force?: boolean): void => {
		return this.lessonService.toggleLessonStatus(id, force);
	}


	/**
	 * Get the api instance
	 * @return {any} The api instance
	 */
	getApi = () : any => {
		return this.api.getInstance();
	} 

}
