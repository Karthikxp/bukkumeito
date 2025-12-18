#!/bin/bash

# Navigate to project directory
cd /Users/karthikm/BukkumeitoApp

# Kill any existing processes
pkill -f "expo start" 2>/dev/null || true
pkill -f "metro" 2>/dev/null || true

echo "Starting Expo with tunnel mode..."
echo "This will display a QR code for Expo Go"
echo "========================================="

# Start Expo with tunnel mode
npx expo start --tunnel --clear




