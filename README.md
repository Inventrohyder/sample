# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Sample Demo

![Sample Demo](./demo/demo_video.webm)

## Feature set

### Core

- [x] Setup the project fonts as documented in the figma design (Cardo, and Commissioner)
- [x] Setup the project theme as documented in the figma design (colors, spacing, border radius)
   - [x] _Optional:_ Added dark theme support
- [x] Setup the first screen as documented in the figma design

### Additional

- [x] Setup trunk.io as a metalinter to maintain code quality
- [x] Setup trunk.io as a GitHub Actions CI/CD pipeline
- [x] Setup dependabot to keep dependencies up to date

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Development Workflow

This project uses **trunk-based development** with **Graphite (gt)** for stacked changes, enabling:

- **Small, focused commits** that are independently reviewable and mergeable
- **Easy rollbacks** with granular change management
- **Simplified branching** with fewer merge conflicts

This approach prioritizes code quality and maintainability over traditional git-flow complexity.

**Learn more about trunk-based development:**

- [Trunk-based Development](https://trunkbaseddevelopment.com/)
- [Graphite Documentation](https://docs.graphite.dev/)

## Font Usage

**Cardo (Headings):**

- Regular (400), Bold (700), Italic (400)

**Commissioner (Body Text):**

- 9 weights: Thin (100) to Black (900)

```typescript
import { FONTS, TYPOGRAPHY } from './constants/fonts';

// Use predefined styles
<Text style={TYPOGRAPHY.H1}>Heading</Text>
<Text style={TYPOGRAPHY.BODY}>Body text</Text>

// Use specific fonts
<Text style={{ fontFamily: FONTS.CARDO.BOLD }}>Bold Heading</Text>
<Text style={{ fontFamily: FONTS.COMMISSIONER.MEDIUM }}>Medium Text</Text>

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
```
