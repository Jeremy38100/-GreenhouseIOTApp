import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

	constructor(
		private storage: Storage
	) {}

	/**
	 * Set anything in storage
	 * @param {string} key The key
	 * @param {any} value The value to save
	 * @return {Promise} A promise which resolves when the object is saved
	 */
	set = (key, value) : Promise<any> => {
		return this.storage.set(key, JSON.stringify(value));
	}

	/**
	 * Get anything from storage
	 * @param {string} key The key
	 * @return {Promise} A promise which resolves when the object is retrieved
	 */
	get = (key) : Promise<any> => {
		return new Promise((resolve, reject) => {
			this.storage.get(key)
			.then(res => resolve(JSON.parse(res)))
			.catch(err => reject(err));
		}); 
	}

	/**
	 * Remove from storage
	 * @param {string} key The key
	 * @return {Promise} A promise which resolves when the value is removed
	 */
	remove = (key) : Promise<any> => {
		return this.storage.remove(key);
	}

	/**
	 * Clear all the storage
	 * @return {Promise} A promise which resolves when the storage is clear
	 */
	clear = () : Promise<any> => {
		return this.storage.clear();
	}
	
	/**
	 * Get all keys in storage
	 * @return {Promise} A promise which resolve when all keys have been retrieved
	 */
	keys = () : Promise<any> => {
		return this.storage.keys();
	}

}