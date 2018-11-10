import { Injectable } from '@angular/core';

import { LogLevel, Log } from '../model';

import { ConfigService } from './config.service';
import { StorageService } from './storage.service';

import * as moment from 'moment';

@Injectable()
export class LogService {

	private logs : Map<string, Log>;

	constructor(
		private configService: ConfigService,
		private storageService: StorageService
	) {}

	/**
	 * Get logs
	 * @return {Map<string, Log>} the logs
	 */
	getLogs = (): Map<string, Log> => {
		return this.logs;
	}

	/**
	 * Load logs
	 * @return {void}
	 */
	loadLogs = (): void => {
		this.storageService.get('logs').then(logs => {
			if (logs && Object.getOwnPropertyNames(logs).length > 0) {
				this.logs = new Map<string, Log>();
				for (let key in logs) {
					this.logs.set(key, <Log>logs[key]);
				}
			} else {
				this.logs = new Map<string, Log>();
				this.saveLogs()
				.then(() => {})
				.catch(err => this.error('in LogService.loadLogs.saveLogs()', err));
			}
		})
		.catch(err => {
			this.logs = new Map<string, Log>();
			this.error('in LogService.loadLogs()', err);
		});
	}

	/**
	 * Save logs
	 * @return {Promise<any>} A promise which resolves when logs are saved
	 */
	saveLogs = (): Promise<any> => {
		let logs = {};
		Array.from(this.logs.keys()).forEach(key => {
			logs[key] = this.logs.get(key);
		});
		return this.storageService.set('logs', logs);
	}

	/**
	 * Clear all logs
	 * @return {Promise<any>} A promise which resolves when logs are cleared
	 */
	clearLogs = (): Promise<any> => {
		this.logs = new Map<string, Log>();
		return this.storageService.remove('logs');
	}

	/**
	 * Print a message with a loglevel
	 * @param {string} message The message to print
	 * @param {LogLevel} logLevel The log level
	 * @param {any} obj The object you want to print
	 * @return {void}
	 */
	print = (message: string, logLevel: LogLevel, obj?: any): void => {
		switch (logLevel) {
			case LogLevel.INFO:
				this.info(message, obj);
				break;
			case LogLevel.LOG:
				this.log(message, obj);
				break;
			case LogLevel.WARNING:
				this.warning(message, obj);
				break;
			case LogLevel.DEBUG:
				if (this.configService.getDebug()) this.debug(message, obj);
				break;
			case LogLevel.ERROR:
				this.error(message, obj);
				break;
			default:
				console.warn('Unknow log level, message : ', message, obj);
				break;
		}
	}

	/**
	 * Print an info message
	 * @param {string} message The message to print
	 * @param {any} obj The object you want to print
	 * @return {void}
	 */
	info = (message: string, obj?: any) : void => {
		let key = moment().format('DD/MM/YYYY-HH:mm:ss.SSS');
		let string = key + ' - ' + LogLevel.INFO + ' : ' + message;
		this.logs.set(key, <Log>{
			level: LogLevel.INFO,
			message: string,
			obj: obj
		});
		console.info(string, obj);
		this.saveLogs()
		.then(() => {})
		.catch(err => console.error(err));
	}

	/**
	 * Print a log message
	 * @param {string} message The message to print
	 * @param {any} obj The object you want to print
	 * @return {void}
	 */
	log = (message: string, obj?: any) : void => {
		let key = moment().format('DD/MM/YYYY-HH:mm:ss.SSS');
		let string = key + ' - ' + LogLevel.LOG + ' : ' + message;
		this.logs.set(key, <Log>{
			level: LogLevel.LOG,
			message: string,
			obj: obj
		});
		console.log(string, obj);
		this.saveLogs()
		.then(() => {})
		.catch(err => console.error(err));
	}

	/**
	 * Print a warning message
	 * @param {string} message The message to print
	 * @param {any} obj The object you want to print
	 * @return {void}
	 */
	warning = (message: string, obj?: any) : void => {
		let key = moment().format('DD/MM/YYYY-HH:mm:ss.SSS');
		let string = key + ' - ' + LogLevel.WARNING + ' : ' + message;
		this.logs.set(key, <Log>{
			level: LogLevel.WARNING,
			message: string,
			obj: obj
		});
		console.warn(string, obj);
		this.saveLogs()
		.then(() => {})
		.catch(err => console.error(err));
	}

	/**
	 * Print a debug message
	 * @param {string} message The message to print
	 * @param {any} obj The object you want to print
	 * @return {void}
	 */
	debug = (message: string, obj?: any) : void => {
		let key = moment().format('DD/MM/YYYY-HH:mm:ss.SSS');
		let string = key + ' - ' + LogLevel.DEBUG + ' : ' + message;
		this.logs.set(key, <Log>{
			level: LogLevel.DEBUG,
			message: string,
			obj: obj
		});
		console.debug(string, obj);
		this.saveLogs()
		.then(() => {})
		.catch(err => console.error(err));
	}

	/**
	 * Print an error message
	 * @param {string} message The message to print
	 * @param {any} obj The object you want to print
	 * @return {void}
	 */
	error = (message: string, obj?: any) : void => {
		let key = moment().format('DD/MM/YYYY-HH:mm:ss.SSS');
		let string = key + ' - ' + LogLevel.ERROR + ' : ' + message;
		this.logs.set(key, <Log>{
			level: LogLevel.ERROR,
			message: string,
			obj: obj
		});
		console.error(string, obj);
		this.saveLogs()
		.then(() => {})
		.catch(err => console.error(err));
	}

}