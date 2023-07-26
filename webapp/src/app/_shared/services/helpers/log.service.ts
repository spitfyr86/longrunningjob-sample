export abstract class Logger {
  abstract debug(message?: any, ...optionalParams: any[]): void;
  abstract error(message?: any, ...optionalParams: any[]): void;
  abstract info(message?: any, ...optionalParams: any[]): void;
  abstract log(message?: any, ...optionalParams: any[]): void;
  abstract trace(message?: any, ...optionalParams: any[]): void;
  abstract warn(message?: any, ...optionalParams: any[]): void;
}

export class ConsoleLogger extends Logger {

  debug(message?: any, ...optionalParams: any[]): void {
    console.debug(message, optionalParams); // tslint:disable-line
  }
  error(message?: any, ...optionalParams: any[]): void {
    console.error(message, optionalParams); // tslint:disable-line
  }
  info(message?: any, ...optionalParams: any[]): void {
    console.info(message, optionalParams); // tslint:disable-line
  }
  log(message?: any, ...optionalParams: any[]): void {
    console.log(message, optionalParams); // tslint:disable-line
  }
  trace(message?: any, ...optionalParams: any[]): void {
    console.trace(message, optionalParams); // tslint:disable-line
  }
  warn(message?: any, ...optionalParams: any[]): void {
    console.warn(message, optionalParams); // tslint:disable-line
  }
}

export class NoopLogger extends Logger {
  debug(message?: any, ...optionalParams: any[]): void {
  }
  error(message?: any, ...optionalParams: any[]): void {
  }
  exception(message?: string, ...optionalParams: any[]): void {
  }
  info(message?: any, ...optionalParams: any[]): void {
  }
  log(message?: any, ...optionalParams: any[]): void {
  }
  trace(message?: any, ...optionalParams: any[]): void {
  }
  warn(message?: any, ...optionalParams: any[]): void {
  }
}

