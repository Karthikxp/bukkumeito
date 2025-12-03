# Development Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **For iOS development** (macOS only):
   ```bash
   npm run pod:install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on device/simulator**:
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## Development Workflow

### Code Quality
- Run linting: `npm run lint`
- Fix linting issues: `npm run lint:fix`
- Type checking: `npm run type-check`
- Run tests: `npm test`

### Debugging
- Reset Metro cache: `npm run start:reset`
- Clean project: `npm run clean`
- Clean Android: `npm run clean:android`
- Clean iOS: `npm run clean:ios`

### Adding New Features

1. **Create a new screen**:
   - Add screen component in `src/screens/`
   - Update navigation in `src/navigation/AppNavigator.tsx`
   - Add types in `src/types/index.ts`

2. **Add state management**:
   - Create slice in `src/store/`
   - Add to store configuration
   - Use in components with hooks

3. **Create reusable components**:
   - Add to `src/components/`
   - Follow existing patterns
   - Include TypeScript types

### Folder Conventions

- **Components**: Reusable UI components with props interface
- **Screens**: Full screen components for navigation
- **Store**: Redux slices and store configuration
- **Utils**: Helper functions and constants
- **Types**: TypeScript type definitions
- **Services**: API calls and external integrations

### Styling Guidelines

- Use constants from `src/utils/constants.ts`
- Follow consistent naming for colors and dimensions
- Use StyleSheet.create() for performance
- Implement responsive design principles

### Testing

- Write unit tests for utilities and components
- Use React Native Testing Library
- Test Redux slices with mock store
- Add integration tests for navigation flows

## Troubleshooting

### Common Issues

1. **Metro bundler not starting**:
   ```bash
   npm run start:reset
   ```

2. **iOS build failing**:
   ```bash
   npm run clean:ios
   npm run pod:install
   ```

3. **Android build failing**:
   ```bash
   npm run clean:android
   npm run android
   ```

4. **TypeScript errors**:
   ```bash
   npm run type-check
   ```

### Performance Tips

- Use React.memo for expensive components
- Implement proper list virtualization
- Optimize images and assets
- Use Flipper for debugging
- Profile with React DevTools
