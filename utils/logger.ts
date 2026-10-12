import * as fs from 'fs';
import * as path from 'path';

/**
 * Author: Subham Maharana
 * Class Name: Logger
 * Description: Writes INFO and ERROR messages to the console and to logs/execution.log.
 */
class Logger {
  private readonly LOG_DIR: string = path.join(__dirname, '..', 'logs');
  private readonly LOG_FILE: string = path.join(this.LOG_DIR, 'execution.log');

  constructor() {
    if (!fs.existsSync(this.LOG_DIR)) fs.mkdirSync(this.LOG_DIR, { recursive: true });
  }

  /**
   * Author: Subham Maharana
   * Method Name: writeLog
   * Description: Builds one log line with time and level, prints it and appends it to the log file.
   * Parameters: level {string} - INFO or ERROR, message {string} - text to log
   * Return Type: void
   */
  private writeLog(level: string, message: string): void {
    try {
      const logLine = `[${new Date().toISOString()}] [${level}] ${message}`;
      console.log(logLine);
      fs.appendFileSync(this.LOG_FILE, logLine + '\n');
    } catch (error) {
      console.error(`Logger failed: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: info
   * Description: Logs a normal step message.
   * Parameters: message {string} - text to log
   * Return Type: void
   */
  info(message: string): void {
    this.writeLog('INFO', message);
  }

  /**
   * Author: Subham Maharana
   * Method Name: error
   * Description: Logs a failure message.
   * Parameters: message {string} - text to log
   * Return Type: void
   */
  error(message: string): void {
    this.writeLog('ERROR', message);
  }
}

export const logger = new Logger();
