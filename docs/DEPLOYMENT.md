# Deployment Guide

## Overview
This guide covers building and deploying the SOS 10008 app using Expo Application Services (EAS).

> **New to Expo?** EAS handles the complex parts (code signing, certificates, server builds) so you don't have to manage Xcode/Android Studio directly.

---

## Prerequisites

### Accounts Required
| Account | Cost | Purpose |
|---------|------|---------|
| **Expo** | Free | Build servers, project hosting |
| **Apple Developer** | $99/year | iOS distribution, TestFlight, App Store |
| **Google Play** | $25 one-time | Android distribution |

### Tools
```bash
# Install EAS CLI globally
npm install -g eas-cli

# Link project to Expo (run once per project)
eas init
```

---

## Understanding Build Profiles

The project has **three build profiles** in `eas.json`. Each serves a different purpose:

| Profile | Command | Purpose | Who Can Install |
|---------|---------|---------|-----------------|
| **development** | `eas build --profile development` | Testing on your device with dev tools | Only registered devices (Ad Hoc) |
| **preview** | `eas build --profile preview` | Internal testing without dev tools | Only registered devices (Ad Hoc) |
| **production** | `eas build --platform ios` | App Store/TestFlight submission | Anyone via App Store |

### When to Use Each

**Development Build:**
- You're actively coding and need to test changes
- You want access to dev menu, hot reload, debugging
- You're testing native features (splash screen, permissions)
- Command: `eas build --profile development --platform ios`

**Production Build:**
- You're ready to submit to App Store or TestFlight
- You want a smaller, optimized build
- Command: `eas build --platform ios` (defaults to production profile)

> **Important:** Development and Production builds use different provisioning. A dev build **cannot** be submitted to the App Store.

---

## Development Workflow (Custom Dev Client)

### Why Not Expo Go?

**Expo Go** is a pre-built app that runs your JavaScript code. It's convenient but limited:

| Feature | Expo Go | Custom Dev Client |
|---------|---------|-------------------|
| Native splash screen | ❌ Uses Expo Go's | ✅ Uses your custom splash |
| Native permissions (ATT, Camera) | ❌ Limited | ✅ Full access |
| expo-dev-client library | ❌ Cannot run | ✅ Required |
| Custom native modules | ❌ Blocked | ✅ Supported |

Since this project uses `expo-dev-client` and a custom animated splash, **you must use a Custom Dev Client**.

### One-Time Setup

1. **Install the library** (already done):
   ```bash
   npx expo install expo-dev-client
   ```

2. **Register your iPhone:**
   ```bash
   eas device:create
   ```
   - Select "Website" method
   - Scan QR code on your iPhone
   - This registers your device's UDID in Apple Developer Portal

3. **Build the dev client:**
   ```bash
   eas build --profile development --platform ios
   ```
   - Takes ~15-20 minutes on EAS servers
   - When complete, scan the QR code to install on your device

4. **Install on device:**
   - Scan QR code from terminal
   - iOS will ask to install profile → Accept
   - Open "SOS 10008" app (has "Dev" badge)

### Daily Development

**Start the dev server:**
```bash
npx expo start --dev-client
```

**Not:**
```bash
npx expo start  # This is for Expo Go, won't work!
```

**What happens:**
1. Metro bundler starts
2. Open "SOS 10008 (Dev)" app on your phone
3. App connects to your computer via LAN
4. Code changes hot-reload instantly

### When to Rebuild

You need a **new dev build** when:
- You change `app.json` (splash, icons, permissions)
- You install a new native library (`expo install xyz`)
- You modify `eas.json`

You **don't** need to rebuild when:
- You edit JavaScript/TypeScript files
- You modify styles, components, screens
- You add translations

---

## Animated Splash Screen

### How It Works

The app has a **two-stage splash**:

1. **Native Splash** (instant, before JS loads):
   - Configured in `app.json`
   - Shows black background with icon
   - Controlled by `expo-splash-screen`

2. **Animated Splash** (React Native component):
   - Located at `components/AnimatedSplash.tsx`
   - Shows gradient backdrop with icon scale-up and text fade-in
   - Runs for ~3.5 seconds, then fades to home screen

### Key Files

| File | Purpose |
|------|---------|
| `app.json` → `splash` | Native splash config (background color, icon) |
| `components/AnimatedSplash.tsx` | Animated React Native splash |
| `app/_layout.tsx` | Controls splash lifecycle, shows/hides animated splash |

### Modifying the Splash

**To change native splash (requires rebuild):**
```json
// app.json
"splash": {
  "image": "./assets/images/10008-Icon.png",
  "resizeMode": "contain",
  "backgroundColor": "#000000"  // Black to match animated splash
}
```

**To change animated splash (hot-reloads):**
Edit `components/AnimatedSplash.tsx`:
- Timing: Adjust `Animated.delay()` values
- Colors: Change `LinearGradient` colors
- Typography: Modify `appName` style (size, tracking, weight)

---

## Production Builds & App Store

### Building for Production

```bash
# Build for iOS App Store
eas build --platform ios

# Build for Android Play Store
eas build --platform android

# Build both
eas build --platform all
```

**What happens:**
1. EAS prompts for Apple credentials (cached after first use)
2. Generates/reuses certificates and provisioning profiles
3. Builds optimized `.ipa` (iOS) or `.aab` (Android)
4. Provides download link when complete (~15-20 min)

### Submitting to App Store

```bash
eas submit --platform ios
```

**What happens:**
1. Uploads your `.ipa` to App Store Connect
2. Apple processes the binary (10-30 min)
3. Build appears in TestFlight tab

**Next steps in App Store Connect:**
1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Select your app → TestFlight tab
3. Build shows "Processing" → wait for "Ready to Test"
4. Add internal/external testers
5. For App Store: Go to App Store tab → Add build → Submit for Review

### TestFlight Testing

After submission, testers can install via TestFlight:
1. Invite testers (email) in App Store Connect
2. They download TestFlight app from App Store
3. They accept invite and install your app
4. You can push new builds anytime

---

## Versioning

### Version Numbers Explained

| Field | Example | Purpose |
|-------|---------|---------|
| `version` | "1.0.0" | User-facing version (shown in App Store) |
| `buildNumber` (iOS) | "6" | Internal build number (must increment each upload) |
| `versionCode` (Android) | 1 | Internal version code (must increment each upload) |

### Releasing an Update

1. **Bump versions in `app.json`:**
   ```json
   "version": "1.1.0",  // User-facing (if significant changes)
   "ios": {
     "buildNumber": "7"  // Always increment for each upload
   }
   ```

2. **Build and submit:**
   ```bash
   eas build --platform ios
   eas submit --platform ios
   ```

> **Note:** `buildNumber` must be higher than any previous upload, even if `version` stays the same.

---

## Configuration Reference

### `app.json` (Key Fields)

```json
{
  "expo": {
    "name": "SOS 10008",
    "version": "1.0.0",
    "splash": {
      "image": "./assets/images/10008-Icon.png",
      "backgroundColor": "#000000"
    },
    "ios": {
      "bundleIdentifier": "org.local10008.sos10008",
      "buildNumber": "6",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false,
        "LSApplicationQueriesSchemes": ["mailto"]
      }
    }
  }
}
```

> **LSApplicationQueriesSchemes**: Required for `mailto:` links to work. Without this, the Contact page email button fails silently.

### `eas.json` (Build Profiles)

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

## Quick Reference

### Common Commands

```bash
# Development
npx expo start --dev-client    # Start dev server for custom client
eas build --profile development --platform ios  # Build dev client

# Production
eas build --platform ios       # Build for App Store
eas submit --platform ios      # Upload to App Store Connect

# Utilities
eas build:list                 # View all builds
eas device:create              # Register new device
eas credentials                # Manage certificates
```

### Troubleshooting

| Problem | Solution |
|---------|----------|
| "No development build" error | Build with `--profile development`, install on device |
| App won't connect to Metro | Ensure phone and computer on same WiFi |
| Splash shows white flash | Check `app.json` splash.backgroundColor matches animated splash |
| Build fails with credentials | Run `eas credentials` to reset/regenerate |

---

## Resources

- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [EAS Submit Docs](https://docs.expo.dev/submit/introduction/)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Expo Splash Screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
