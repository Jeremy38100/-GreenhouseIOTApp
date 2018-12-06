import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

	constructor() {}

	/**
	 * Set anything in storage
	 * @param {string} key The key
	 * @param {any} value The value to save
	 * @return {void}
	 */
	set = (key, value) : void => {
		return localStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * Get anything from storage
	 * @param {string} key The key
	 * @return {any} A promise which resolves when the object is retrieved
	 */
	get = (key: string) : any => {
		return JSON.parse(localStorage.getItem(key));
	}

	/**
	 * Remove from storage
	 * @param {string} key The key
	 * @return {void}
	 */
	remove = (key: string) : void => {
		return localStorage.removeItem(key);
	}

	/**
	 * Clear all the storage
	 * @return {void} A promise which resolves when the storage is cleared
	 */
	clear = () : void => {
		return localStorage.clear();
	}

}