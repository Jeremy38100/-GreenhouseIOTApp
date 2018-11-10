export interface DeviceData {
  createdDate: string,
  data: any,
  deviceId: string,
  lastModifiedDate: string,
  sensor: string,
  __v: any,
  _id: string
};

export interface Settings {
};

export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
};

export enum AppEvents {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  NETWORK_CONNECT = 'NETWORK_CONNECT',
  NETWORK_DISCONNECT = 'NETWORK_DISCONNECT',
  NETWORK_CHANGED = 'NETWORK_CHANGED',
  SERVER_REACHABLE = 'SERVER_REACHABLE',
  SERVER_UNREACHABLE = 'SERVER_UNREACHABLE',
  SOCKET_ERROR = 'SOCKET_ERROR'
};

export interface AppConfiguration {
  env: {
    name: string
  },
  api: {
    protocol: string,
    domain: string,
    port: number
  },
  socket: {
    protocol: string
  },
  app: {
    debug: boolean,
    HOME_REFRESH_MAX_TIMEOUT: number
  }
};

export enum NetworkConnectionType {
  UNKNOWN = 'unknown',
  ETHERNET = 'ethernet',
  WIFI = 'wifi',
  CELL_2G = '2g',
  CELL_3G = '3g',
  CELL_4G = '4g',
  CELLULAR = 'cellular',
  NONE = 'none'
};

export enum LogLevel {
  INFO = 'INFO',
  LOG = 'LOG',
  WARNING = 'WARNING',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR'
};

export interface Log {
  level: LogLevel,
  message: string,
  obj?: any
};

export class IOTAppErrors {
  public static readonly ERRORS = {
    CORDOVA_NOT_AVAILABLE : {code: 0x01, message: "Cordova is not available"},
    SERVER_UNREACHABLE    : {code: 0x02, message: "The server is unreachable"}
  }
};