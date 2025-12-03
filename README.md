# BukkumeitoApp

A modern React Native mobile application boilerplate with TypeScript, Redux Toolkit, and React Navigation.

## 📱 Features

- **React Native 0.82.1** - Latest stable version
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Modern state management
- **React Navigation** - Navigation with stack and tab navigators
- **Gesture Handler** - Smooth gesture interactions
- **AsyncStorage** - Local data persistence
- **Safe Area Context** - Handle device safe areas
- **Organized Architecture** - Clean folder structure and reusable components

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   └── Card.tsx
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── store/             # Redux store and slices
│   ├── index.ts
│   └── counterSlice.ts
├── services/          # API and external services
├── utils/             # Utility functions and constants
│   ├── constants.ts
│   └── storage.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── hooks/             # Custom React hooks
└── assets/            # Images, fonts, and other assets
    ├── images/
    ├── fonts/
    └── icons/
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Watchman** (for macOS)
- **CocoaPods** (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BukkumeitoApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### iOS (macOS only)
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Start Metro Bundler
```bash
npm start
```

## 📦 Dependencies

### Core Dependencies
- `react`: ^19.1.1
- `react-native`: 0.82.1
- `@react-navigation/native`: Navigation library
- `@react-navigation/stack`: Stack navigator
- `@react-navigation/bottom-tabs`: Tab navigator
- `@reduxjs/toolkit`: State management
- `react-redux`: React bindings for Redux
- `react-native-gesture-handler`: Gesture handling
- `react-native-screens`: Native screen optimization
- `react-native-safe-area-context`: Safe area handling
- `@react-native-async-storage/async-storage`: Local storage

### Development Dependencies
- `typescript`: Type checking
- `@types/react`: React type definitions
- `eslint`: Code linting
- `prettier`: Code formatting
- `jest`: Testing framework

## 🛠️ Development Setup

### iOS Development (macOS required)

1. **Install Xcode** from the Mac App Store
2. **Install Xcode Command Line Tools**:
   ```bash
   xcode-select --install
   ```
3. **Install CocoaPods**:
   ```bash
   brew install cocoapods
   ```

### Android Development

1. **Install Android Studio** from the official website
2. **Install Android SDK** through Android Studio
3. **Set up environment variables** in your shell profile:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📝 Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🎨 Customization

### Adding New Screens

1. Create a new screen component in `src/screens/`
2. Add the screen to the navigator in `src/navigation/AppNavigator.tsx`
3. Update type definitions in `src/types/index.ts`

### Adding New Redux Slices

1. Create a new slice in `src/store/`
2. Add the reducer to the store in `src/store/index.ts`
3. Use the slice in your components with `useSelector` and `useDispatch`

### Styling

The app uses a consistent design system defined in `src/utils/constants.ts`:
- Colors
- Typography
- Dimensions
- Animation durations

## 🔧 Configuration

### Metro Configuration
The app uses the default Metro configuration with React Native 0.82.1.

### Babel Configuration
Configured for React Native with TypeScript support.

### TypeScript Configuration
Strict TypeScript configuration for better type safety.

## 📱 Platform-Specific Notes

### iOS
- Requires Xcode for development
- Uses CocoaPods for dependency management
- Supports iOS 12.4 and above

### Android
- Requires Android Studio for development
- Uses Gradle for build management
- Supports Android API level 21 and above

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build issues**: Clean build folder in Xcode or run `cd ios && xcodebuild clean`
3. **Android build issues**: Clean Gradle cache with `cd android && ./gradlew clean`
4. **Pod install issues**: Update CocoaPods with `pod repo update`

### Getting Help

- Check the [React Native documentation](https://reactnative.dev/docs/getting-started)
- Visit the [React Navigation documentation](https://reactnavigation.org/)
- Check [Redux Toolkit documentation](https://redux-toolkit.js.org/)

## 🚀 Next Steps

- Set up continuous integration (CI/CD)
- Add unit and integration tests
- Implement authentication flow
- Add API integration
- Set up crash reporting
- Add analytics
- Implement push notifications