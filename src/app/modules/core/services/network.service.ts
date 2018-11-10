import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Network } from '@ionic-native/network';

import { NetworkConnectionType } from '../model';

import { Observable } from 'rxjs';

@Injectable()
export class NetworkService {

	constructor(
		private network: Network,
		private platform: Platform
	) {}

	/**
	 * Function which will be called when network is connected
	 * @return {Observable<any>} An observable which notifies each time the device connects to a network
	 */
	onConnect = (): Observable<any> => {
		return this.network.onConnect();
	}

	/**
	 * Function which will be called when network is disconnect
	 * @return {Observable<any>} An observable which notifies each time the device disconnects to a network
	 */
	onDisconnect = (): Observable<any> => {
		return this.network.onDisconnect();
	}

	/**
	 * Function which will be called when network changes
	 * @return {Observable<any>} An observable which notifies each time the device changes its network
	 */
	onChange = (): Observable<any> => {
		return this.network.onchange();
	}

	/**
	 * Get the downlink max speed
	 * @return {String} The downlink max speed
	 */
	getDownlinkMaxSpeed = (): string => {
		return this.network.downlinkMax;
	}

	/**
	 * Get the connection type
	 * @return {String} The connection type
	 */
	getType = (): string => {
		if (this.platform.is('cordova')) {
			return this.network.type;
		} else {
			return (navigator.onLine ? NetworkConnectionType.UNKNOWN : NetworkConnectionType.NONE);
		}
	}

}