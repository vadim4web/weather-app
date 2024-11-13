import fs from 'fs';
import path from 'path';

const envExamplePath = path.resolve('.env.example');
const envPath = path.resolve('.env');

// Check if .env file already exists
if (!fs.existsSync(envPath)) {
  // Copy .env.example to .env
  fs.copyFileSync(envExamplePath, envPath);
  console.log('.env file created successfully.');
} else {
  console.log('.env file already exists. Skipping creation.');
}
