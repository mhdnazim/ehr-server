/**
 * This is a helper created on top of js default logger, 
 * This will accept any input params ( usually what you give in console.log() method)
 * and log the input only if the environment is 'development' by checking the NODE_ENV env value
 * @param  {...any} inputs - any input you usually give in console.log()
 */
// export const consoleIt = (...inputs: any[]): void => {
//     if (process.env.NODE_ENV === 'development') {
//         console.log(...inputs);
//     }
// };

/**
 * Enhanced logger utility for consistent logging across the application.
 * Supports log levels: log, warn, error.
 * Only logs in 'development' environment or if explicitly allowed.
 */
import { config } from '../config/env.config';

const getTimestamp = (): string => {
    return new Date().toISOString();
};

const shouldLog = (): boolean => {
    return config.nodeEnv === 'development';
};

export const consoleIt = {
    log: (...args: any[]): void => {
        if (shouldLog()) {
            console.log(`[LOG] [${getTimestamp()}]`, ...args);
        }
    },
    warn: (...args: any[]): void => {
        if (shouldLog()) {
            console.warn(`[WARN] [${getTimestamp()}]`, ...args);
        }
    },
    error: (...args: any[]): void => {
        // Errors should generally be logged even in production, but following existing pattern for now.
        // Or we can decide to always log errors. Let's stick to dev for now or use a proper logger like winston later.
        // For this task, user asked to make it useful.
        console.error(`[ERROR] [${getTimestamp()}]`, ...args);
    }
};
