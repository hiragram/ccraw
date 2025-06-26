#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function findProjectRoot() {
  let currentDir = __dirname;
  
  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (packageJson.name === 'ccraw') {
          return currentDir;
        }
      } catch (error) {
        // Continue searching
      }
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback to the directory containing this script
  return path.dirname(__dirname);
}

function main() {
  const projectRoot = findProjectRoot();
  const nextBin = path.join(projectRoot, 'node_modules', '.bin', 'next');
  
  console.log('🚀 Starting ccraw (Claude Code Raw) viewer...');
  console.log('📂 Project root:', projectRoot);
  
  // Check if we're in development or production mode
  const isDev = process.argv.includes('--dev') || !fs.existsSync(path.join(projectRoot, '.next'));
  
  const command = isDev ? 'dev' : 'start';
  const args = [command];
  
  // Add port option if specified
  const portIndex = process.argv.indexOf('--port');
  if (portIndex !== -1 && process.argv[portIndex + 1]) {
    args.push('--port', process.argv[portIndex + 1]);
  } else {
    args.push('--port', '3000');
  }
  
  console.log(`🔧 Running: next ${args.join(' ')}`);
  console.log('🌐 Open http://localhost:3000 in your browser');
  console.log('📁 Upload your JSONL files to view Claude Code conversation data');
  console.log('');
  
  const child = spawn(nextBin, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  child.on('error', (error) => {
    if (error.code === 'ENOENT') {
      console.error('❌ Error: Next.js not found. Please run "npm install" first.');
      process.exit(1);
    } else {
      console.error('❌ Error starting ccraw:', error.message);
      process.exit(1);
    }
  });
  
  child.on('exit', (code) => {
    process.exit(code || 0);
  });
  
  // Handle process termination gracefully
  process.on('SIGTERM', () => child.kill('SIGTERM'));
  process.on('SIGINT', () => child.kill('SIGINT'));
}

// Show help if requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
ccraw - Claude Code Raw conversation data viewer

Usage:
  npx ccraw [options]

Options:
  --dev          Run in development mode (default if .next doesn't exist)
  --port <port>  Specify port number (default: 3000)
  --help, -h     Show this help message

Examples:
  npx ccraw                # Start on port 3000
  npx ccraw --port 8080    # Start on port 8080
  npx ccraw --dev          # Force development mode

Once started, open your browser and upload JSONL files containing
Claude Code conversation data for visualization and analysis.
`);
  process.exit(0);
}

main();