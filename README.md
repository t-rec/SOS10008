# SOS 10008

Application mobile native pour aider les membres de la section locale 10008 lors de rencontres avec la gestion.

## Description

Cette application aide les membres du syndicat quand un·e gestionnaire veut les rencontrer. Elle fournit:

- Des informations sur les droits syndicaux
- Des phrases pré-écrites à utiliser
- Un système de prise de notes pour documenter les rencontres
- Des coordonnées pour contacter la section locale 10008

## Platform

**SOS 10008 is a native mobile application** designed for iOS and Android devices. The app is built using React Native and Expo to provide the best user experience on mobile platforms.

### Target Platforms
- **iOS** (iPhone and iPad)
- **Android** smartphones and tablets
- **macOS** (Apple Silicon only - runs the iPad version natively on M1/M2/M3 Macs)

### Web Support
While the app can technically run in a web browser during development, it is optimized for mobile devices. A PWA (Progressive Web App) version may be considered in the future after the mobile version is complete.

## Development

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platforms
npm run ios       # iOS Simulator/Device
npm run android   # Android Emulator/Device
npm run web       # Web browser (development/preview only)
```

### Setup Notes

**If coming from pnpm:**
- Delete `pnpm-lock.yaml` and `node_modules/.pnpm`
- Run `npm install`
- `lucide-react-native` updated to `^0.555.0` for React 19 compat
- `@react-native-community/datetimepicker` pinned to SDK 54 version (8.4.4)

**TypeScript config:**
- `tsconfig.json` uses relative path for expo base: `./node_modules/expo/tsconfig.base.json`
- If seeing ghost `.pnpm` errors: restart TS server or reload window

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo Router** - File-based routing for React Native
- **TypeScript** - Type-safe JavaScript
- **React Query** - Data fetching and state management
- **i18next & react-i18next** - Internationalization (French/English)
- **expo-localization** - Device locale detection
- **@react-native-async-storage/async-storage** - Language and theme preference persistence
- **lucide-react-native** - Icon library
- **@react-native-community/datetimepicker** - Native date/time pickers (iOS spinner display)
- **react-native-toast-message** - Non-blocking user feedback

## Dark Mode

**Theme System:**
- **Light Mode** - Default bright theme with white backgrounds
- **Dark Mode** - Eye-friendly dark gray theme (`#111827` background, `#1F2937` cards)
- **System Default** - Automatically follows device's dark mode setting

**Features:**
- Theme toggle in header (Sun/Moon/Smartphone icons) on all screens
- Triple-tap cycling through Light → Dark → System modes
- Theme preference persisted across app sessions using AsyncStorage
- Consistent theming across all screens, components, and modals
- Dynamic color system via `ThemeContext` and `useTheme` hook
- Toast notifications adapt to theme

**Implementation:**
- `ThemeContext` provides theme state and colors throughout the app
- `ThemeToggle` component for user control
- Color palette defined in `constants/color.ts` for both themes
- All screens and components use dynamic colors from context

## Contact

**Section locale 10008**
- Email: `10008@ute-sei.org`
- Phone: `(438) 788-0300`

## Internationalization (i18n)

**Languages Supported:**
- **French** (default) - App defaults to French for new users
- **English** - Available via language toggle

**Features:**
- Language toggle (FR/EN) available on all screens in the top-right header
- User language preference persisted across app sessions
- Automatic device locale detection (falls back to French if not English)
- All user-facing text translated including buttons, labels, error messages, and templates

**Date & Time Formatting:**
- **French**: YYYY-MM-DD format, 24-hour time (e.g., 2025-11-30 14:30)
- **English**: MM/DD/YYYY format, 12-hour AM/PM time (e.g., 11/30/2025 2:30 PM)
- Formatting applied consistently across all screens via `useDateTimeFormat` hook

## UI/UX Features

- **Dark Mode Toggle** - Sun/Moon/Smartphone icon toggle in header for Light/Dark/System theme switching
- **Global Footer** - Disclaimer and "En toute solidarité" branding on all screens
- **Language Toggle** - FR/EN toggle in header (top-right) on all screens, with smooth animations
- **Consistent Navigation** - "Retour" header on all sub-pages, global `BackButton` component
- **Email Integration** - Direct "Envoyer le courriel" from Contact page (opens default mail app)
- **Note Counter** - Home page "Mes notes" button shows saved note count
- **iOS Date/Time Pickers** - Direct spinner-style pickers (no double-tap bubble), theme-aware
- **Custom Modals** - `DeleteConfirmationModal` for destructive actions, tap-outside-to-close support, fully translatable
- **Toast Notifications** - Large, readable success/error/info feedback (80px height, 18px title text) without blocking UI
- **Message Template Reset** - Reset icon on Contact page to restore default message template

## Deployment

The app will be distributed through:
- **Apple App Store** (iOS)
- **Google Play Store** (Android)
