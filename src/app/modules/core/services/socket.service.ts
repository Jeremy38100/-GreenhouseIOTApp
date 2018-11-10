import { AppEvents } from './../model/index';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { ConfigService } from './config.service';
import { LogService } from './log.service';

import { SocketEvent } from '../model';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {

	private socket;
	private wsProtocol 	: string;
	private domain 			: string;
	private port 				: number;

	constructor(
		private configService	: ConfigService,
		private logService 		: LogService,
		private events 				: Events
	) {}

	/**
	 * Load the configuration from json file. See ../../assets/config/config.dev.json
	 * @return {void}
	 */
	loadConfig = (): void => {
		this.wsProtocol = this.configService.getSocketProtocol();
		this.domain 		= this.configService.getDomain();
		this.port 			= this.configService.getPort();
	}

	/**
	 * Initialisation of the socket
	 * @return {void}
	 */
	initSocket = (onError?: (error) => any): void => {
		let url = this.wsProtocol + "://" + this.domain + (this.port ? ':' + this.port : '');
		this.socket = socketIo(url);
		this.logService.debug("Socket listening");
		if (onError) {
			this.onError().subscribe(onError);
		} else {
			this.onError().subscribe(this.socketErrorHandler);
		}
	}

	/**
	 * Close the current socket
	 * @return {void}
	 */
	close = (): void => {
		return this.socket.disconnect();
	}

	/**
	 * Function that handles socket error
	 * @return {void}
	 */
	socketErrorHandler = (error): void => {
		this.events.publish(AppEvents.SOCKET_ERROR, error);
	}

	/**
	 * Send an object
	 * @param {any} object The object you want to send
	 * @return {void}
	 */
	send = (object: any) : void => {
		this.socket.emit('message', {data: JSON.stringify(object)});
	}

	/**
	 * Function that will be executed on message
	 * @return {Observable} An Observable which resolves each message received
	 */
	onMessage = (): Observable<any> => {
		return new Observable(observer => {
			this.socket.on('message', (message: any) => observer.next(JSON.parse(message.data)));
		});
	}

	/**
	 * Function that will be executed on error
	 * @return {Observable} An Observable which resolves each error
	 */
	onError = (): Observable<any> => {
		return new Observable(observer => {
			this.socket.on('connect_error', (error: any) => observer.next(error));
		})
	}

	/**
	 * Function that will be executed on event
	 * @param {SocketEvent} event The event observed
	 * @return {Observable<SocketEvent>} An Observable which resolves each event received
	 */
	onEvent = (event: SocketEvent): Observable<any> => {
		return new Observable<SocketEvent>(observer => {
			this.socket.on('event', () => observer.next());
		});
	}

}