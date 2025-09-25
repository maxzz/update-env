#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Environment variable utility class
 */
export class EnvUpdater {
    private envFilePath: string;

    constructor(envFilePath: string = '.env') {
        this.envFilePath = path.resolve(envFilePath);
    }

    /**
     * Read environment variables from file
     */
    public readEnvFile(): Record<string, string> {
        if (!fs.existsSync(this.envFilePath)) {
            return {};
        }

        const content = fs.readFileSync(this.envFilePath, 'utf-8');
        const envVars: Record<string, string> = {};

        content.split('\n').forEach((line: string) => {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const [key, ...valueParts] = trimmedLine.split('=');
                if (key && valueParts.length > 0) {
                    envVars[key.trim()] = valueParts.join('=').trim();
                }
            }
        });

        return envVars;
    }

    /**
     * Write environment variables to file
     */
    public writeEnvFile(envVars: Record<string, string>): void {
        const content = Object.entries(envVars)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');

        fs.writeFileSync(this.envFilePath, content + '\n');
    }

    /**
     * Update a specific environment variable
     */
    public updateVar(key: string, value: string): void {
        const envVars = this.readEnvFile();
        envVars[key] = value;
        this.writeEnvFile(envVars);
        console.log(`Updated ${key}=${value}`);
    }

    /**
     * Get a specific environment variable
     */
    public getVar(key: string): string | undefined {
        const envVars = this.readEnvFile();
        return envVars[key];
    }

    /**
     * List all environment variables
     */
    public listVars(): void {
        const envVars = this.readEnvFile();
        if (Object.keys(envVars).length === 0) {
            console.log('No environment variables found.');
            return;
        }

        console.log('Environment variables:');
        Object.entries(envVars).forEach(([key, value]) => {
            console.log(`${key}=${value}`);
        });
    }

    /**
     * Delete an environment variable
     */
    public deleteVar(key: string): void {
        const envVars = this.readEnvFile();
        if (key in envVars) {
            delete envVars[key];
            this.writeEnvFile(envVars);
            console.log(`Deleted ${key}`);
        } else {
            console.log(`Variable ${key} not found`);
        }
    }
}

/**
 * Main CLI function
 */
export function createCLI(): Command {
    const program = new Command();

    program
        .name('update-env')
        .description('CLI utility for managing environment variables')
        .version('1.0.0');

    program
        .command('set')
        .description('Set an environment variable')
        .argument('<key>', 'Variable name')
        .argument('<value>', 'Variable value')
        .option('-f, --file <file>', 'Environment file path', '.env')
        .action((key: string, value: string, options: { file: string; }) => {
            const updater = new EnvUpdater(options.file);
            updater.updateVar(key, value);
        });

    program
        .command('get')
        .description('Get an environment variable')
        .argument('<key>', 'Variable name')
        .option('-f, --file <file>', 'Environment file path', '.env')
        .action((key: string, options: { file: string; }) => {
            const updater = new EnvUpdater(options.file);
            const value = updater.getVar(key);
            if (value !== undefined) {
                console.log(`${key}=${value}`);
            } else {
                console.log(`Variable ${key} not found`);
            }
        });

    program
        .command('list')
        .description('List all environment variables')
        .option('-f, --file <file>', 'Environment file path', '.env')
        .action((options: { file: string; }) => {
            const updater = new EnvUpdater(options.file);
            updater.listVars();
        });

    program
        .command('delete')
        .description('Delete an environment variable')
        .argument('<key>', 'Variable name')
        .option('-f, --file <file>', 'Environment file path', '.env')
        .action((key: string, options: { file: string; }) => {
            const updater = new EnvUpdater(options.file);
            updater.deleteVar(key);
        });

    return program;
}

// Export for library usage
export default EnvUpdater;

// CLI execution when run directly
if (require.main === module) {
    const program = createCLI();
    program.parse();
}