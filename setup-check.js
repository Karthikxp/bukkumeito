#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 BukkumeitoApp Setup Verification\n');

const checks = [
  {
    name: 'Node.js version',
    check: () => {
      const version = execSync('node --version', { encoding: 'utf8' }).trim();
      const majorVersion = parseInt(version.slice(1).split('.')[0]);
      return { success: majorVersion >= 20, message: version };
    }
  },
  {
    name: 'npm version',
    check: () => {
      const version = execSync('npm --version', { encoding: 'utf8' }).trim();
      return { success: true, message: version };
    }
  },
  {
    name: 'React Native CLI',
    check: () => {
      try {
        execSync('which react-native', { encoding: 'utf8' });
        return { success: true, message: 'Installed' };
      } catch {
        return { success: false, message: 'Not found' };
      }
    }
  },
  {
    name: 'Watchman',
    check: () => {
      try {
        execSync('which watchman', { encoding: 'utf8' });
        return { success: true, message: 'Installed' };
      } catch {
        return { success: false, message: 'Not found' };
      }
    }
  },
  {
    name: 'CocoaPods',
    check: () => {
      try {
        execSync('which pod', { encoding: 'utf8' });
        return { success: true, message: 'Installed' };
      } catch {
        return { success: false, message: 'Not found' };
      }
    }
  },
  {
    name: 'Project dependencies',
    check: () => {
      const nodeModulesExists = fs.existsSync(path.join(__dirname, 'node_modules'));
      return { success: nodeModulesExists, message: nodeModulesExists ? 'Installed' : 'Missing' };
    }
  },
  {
    name: 'TypeScript compilation',
    check: () => {
      try {
        execSync('npm run type-check', { encoding: 'utf8', stdio: 'pipe' });
        return { success: true, message: 'Passed' };
      } catch {
        return { success: false, message: 'Failed' };
      }
    }
  },
  {
    name: 'ESLint check',
    check: () => {
      try {
        execSync('npm run lint', { encoding: 'utf8', stdio: 'pipe' });
        return { success: true, message: 'Passed' };
      } catch {
        return { success: false, message: 'Failed' };
      }
    }
  }
];

let allPassed = true;

checks.forEach(({ name, check }) => {
  try {
    const result = check();
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${name}: ${result.message}`);
    if (!result.success) allPassed = false;
  } catch (error) {
    console.log(`❌ ${name}: Error - ${error.message}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 All checks passed! Your React Native environment is ready.');
  console.log('\nNext steps:');
  console.log('1. For iOS: npm run ios');
  console.log('2. For Android: npm run android');
} else {
  console.log('⚠️  Some checks failed. Please review the setup instructions.');
  console.log('\nFor iOS development, you need:');
  console.log('- Xcode (from Mac App Store)');
  console.log('- Xcode Command Line Tools');
  console.log('\nFor Android development, you need:');
  console.log('- Android Studio');
  console.log('- Android SDK');
  console.log('- Environment variables (ANDROID_HOME, etc.)');
}

console.log('\nFor detailed setup instructions, see README.md');
