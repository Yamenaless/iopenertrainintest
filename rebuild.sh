#!/bin/bash

# Set PATH to include Node.js
PATH=$PATH:/opt/cpanel/ea-nodejs20/bin

# Check if DEPLOY_ENV is set, otherwise default to 'production'
DEPLOY_ENV=${DEPLOY_ENV:-production}

# Clean up previous build
rm -rf .next

# Install dependencies
npm i

# Build the application
npm run build

# Run linting
npm run lint

# Determine the PM2 process name and port based on the environment
if [ "$DEPLOY_ENV" = "production" ]; then
    PM2_NAME="iopener-training.com"
elif [ "$DEPLOY_ENV" = "staging" ]; then
    PM2_NAME="dev.iopener-training.com"
else
    echo "Unknown environment: $DEPLOY_ENV"
    exit 1
fi

# Source the appropriate .env file
source .env

# Restart or start the PM2 process
pm2 restart "$PM2_NAME" || pm2 start server.js --name "$PM2_NAME" --env "$DEPLOY_ENV" -- -p $NODE_PORT

# Save the PM2 process list
pm2 save