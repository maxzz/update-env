# Update Env Utils

A TypeScript utility package for managing environment variables with both programmatic API and CLI interface.

## Installation

### Global Installation (for CLI usage)
```bash
npm install -g update-env-utils
```

### Local Installation (for programmatic usage)
```bash
npm install update-env-utils
```

## CLI Usage

After global installation, you can use the `update-env` command:

### Set an environment variable
```bash
update-env set API_KEY "your-api-key-here"
update-env set DATABASE_URL "postgresql://localhost:5432/mydb"
```

### Get an environment variable
```bash
update-env get API_KEY
```

### List all environment variables
```bash
update-env list
```

### Delete an environment variable
```bash
update-env delete API_KEY
```

### Use a custom .env file
```bash
update-env set API_KEY "value" --file .env.production
update-env list --file .env.development
```

## Programmatic Usage

### Basic Usage
```typescript
import EnvUpdater from 'update-env-utils';

const envUpdater = new EnvUpdater('.env');

// Set a variable
envUpdater.updateVar('API_KEY', 'your-api-key');

// Get a variable
const apiKey = envUpdater.getVar('API_KEY');

// List all variables
envUpdater.listVars();

// Delete a variable
envUpdater.deleteVar('API_KEY');
```

### Using with Custom File Path
```typescript
import EnvUpdater from 'update-env-utils';

const prodEnv = new EnvUpdater('.env.production');
prodEnv.updateVar('NODE_ENV', 'production');

const devEnv = new EnvUpdater('.env.development');
devEnv.updateVar('NODE_ENV', 'development');
```

## API Reference

### EnvUpdater Class

#### Constructor
- `new EnvUpdater(envFilePath?: string)` - Creates a new instance with optional custom .env file path (defaults to '.env')

#### Methods
- `readEnvFile(): Record<string, string>` - Reads and parses the environment file
- `writeEnvFile(envVars: Record<string, string>): void` - Writes environment variables to file
- `updateVar(key: string, value: string): void` - Updates or creates an environment variable
- `getVar(key: string): string | undefined` - Gets the value of an environment variable
- `listVars(): void` - Lists all environment variables to console
- `deleteVar(key: string): void` - Deletes an environment variable

## Development

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd update-env

# Install dependencies
npm install

# Build the project
npm run build

# Watch for changes during development
npm run dev
```

### Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm run clean` - Remove dist directory
- `npm run start` - Run the compiled main file
- `npm test` - Run tests (placeholder)

### Publishing to npm

#### First-time setup
1. Create an npm account at https://www.npmjs.com/
2. Login to npm:
   ```bash
   npm login
   ```

#### Publishing process
```bash
# Build the project
npm run build

# Publish (this will automatically run prepublishOnly script)
npm publish

# Or use the version bump scripts:
npm run publish:patch  # 1.0.0 -> 1.0.1
npm run publish:minor  # 1.0.0 -> 1.1.0
npm run publish:major  # 1.0.0 -> 2.0.0
```

#### Before publishing checklist
- [ ] Update version in package.json
- [ ] Update changelog/release notes
- [ ] Test the CLI commands locally
- [ ] Run `npm run build` successfully
- [ ] Verify the `dist/` directory contains compiled files
- [ ] Test installation locally: `npm pack` and `npm install -g ./update-env-utils-1.0.0.tgz`

### Project Structure
```
update-env/
├── src/
│   └── main.ts          # Main TypeScript source file
├── bin/
│   └── cli.js           # CLI executable
├── dist/                # Compiled JavaScript (generated)
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request