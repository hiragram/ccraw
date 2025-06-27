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
  
  console.log('🚀 Starting ccraw (Claude Code Raw) viewer...');
  console.log('📂 Project root:', projectRoot);
  
  // Check if dependencies are installed
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  const nextBin = path.join(projectRoot, 'node_modules', '.bin', 'next');
  
  if (!fs.existsSync(nodeModulesPath) || !fs.existsSync(nextBin)) {
    console.log('📦 Installing dependencies...');
    const npmInstall = spawn('npm', ['install'], {
      cwd: projectRoot,
      stdio: 'inherit'
    });
    
    npmInstall.on('exit', (code) => {
      if (code !== 0) {
        console.error('❌ Failed to install dependencies');
        process.exit(1);
      }
      startNext();
    });
    
    return;
  }
  
  startNext();
}

function startNext() {
  const projectRoot = findProjectRoot();
  const nextBin = path.join(projectRoot, 'node_modules', '.bin', 'next');
  
  // Default to development mode for better TypeScript support
  const isDev = !process.argv.includes('--build');
  const nextExists = fs.existsSync(path.join(projectRoot, '.next'));
  
  console.log(`🔍 Checking build status - .next exists: ${nextExists}, dev mode: ${isDev}`);
  
  // If not in dev mode and .next doesn't exist, build first
  if (!isDev && !nextExists) {
    console.log('🔨 Building application...');
    const buildProcess = spawn(nextBin, ['build'], {
      cwd: projectRoot,
      stdio: 'inherit'
    });
    
    buildProcess.on('error', (error) => {
      if (error.code === 'ENOENT') {
        console.error('❌ Error: Next.js not found. Please run "npm install" first.');
        process.exit(1);
      } else {
        console.error('❌ Error building ccraw:', error.message);
        process.exit(1);
      }
    });
    
    buildProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error('❌ Build failed');
        process.exit(1);
      }
      startNextServer();
    });
    
    return;
  }
  
  startNextServer();
}

function startNextServer() {
  const projectRoot = findProjectRoot();
  const nextBin = path.join(projectRoot, 'node_modules', '.bin', 'next');
  
  const isDev = !process.argv.includes('--build');
  
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
  --build        Run in production mode with build step (default is development mode)
  --port <port>  Specify port number (default: 3000)
  --help, -h     Show this help message

Examples:
  npx ccraw                # Start in development mode on port 3000
  npx ccraw --port 8080    # Start in development mode on port 8080
  npx ccraw --build        # Start in production mode

Once started, open your browser and upload JSONL files containing
Claude Code conversation data for visualization and analysis.
`);
  process.exit(0);
}

main();