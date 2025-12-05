# Deployment Guide

## Overview
This guide covers building and deploying the SOS 10008 app to the Apple App Store and Google Play Store using Expo Application Services (EAS).

## Prerequisites

### Accounts Required
- **Expo Account**: Free account at [expo.dev](https://expo.dev)
- **Apple Developer Account**: $99/year at [developer.apple.com](https://developer.apple.com)
- **Google Play Developer Account**: $25 one-time at [play.google.com/console](https://play.google.com/console)

### Tools
- **EAS CLI**: Install globally with `npm install -g eas-cli`
- **Project Linked**: Run `eas init` once to link to Expo project

## Configuration Files

### `app.json`
Contains app metadata and versioning:
```json
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "org.local10008.sos10008",
      "buildNumber": "1",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false,
        "LSApplicationQueriesSchemes": ["mailto"]
      }
    },
    "android": {
      "package": "org.local10008.sos10008",
      "versionCode": 1
    }
  }
}
```

> **Note**: `LSApplicationQueriesSchemes` is **required** for iOS to allow opening `mailto:` links from the Contact page. Without this, the email button will fail on real devices.

### `eas.json`
Build configuration (already set up).

## Building

### iOS Build
```bash
eas build --platform ios
```

**What happens:**
1. Logs you into Apple Developer account
2. Generates certificates and provisioning profiles automatically
3. Builds the `.ipa` file on EAS servers (~15-20 minutes)
4. Provides download link when complete

### Android Build
```bash
eas build --platform android
```

**What happens:**
1. Generates a keystore for app signing
2. Builds the `.aab` file on EAS servers (~10-15 minutes)
3. Provides download link when complete

### Build Both Platforms
```bash
eas build --platform all
```

## Submitting to App Stores

### Submit to Apple App Store
```bash
eas submit --platform ios
```

**Post-Submission Steps:**
1. Wait for Apple to process the binary (10-30 minutes)
2. Go to [App Store Connect](https://appstoreconnect.apple.com)
3. Complete the app listing:
   - Upload screenshots (6.5" and 5.5" iPhone displays)
   - Add app description (French primary, English secondary)
   - Fill out privacy questionnaire
   - Set pricing (Free)
4. Select your build and click "Submit for Review"
5. Wait for Apple review (24-48 hours typically)

### Submit to Google Play
```bash
eas submit --platform android
```

**Post-Submission Steps:**
1. Go to [Google Play Console](https://play.google.com/console)
2. Complete store listing
3. Upload screenshots
4. Fill out content rating questionnaire
5. Submit for review

## Versioning

### For App Updates
1. Update version in `app.json`:
   - Bump `version` (e.g., "1.0.0" → "1.1.0")
   - Bump `buildNumber` for iOS (e.g., "1" → "2")
   - Bump `versionCode` for Android (e.g., 1 → 2)
2. Commit changes
3. Run `eas build --platform all`
4. Run `eas submit --platform all`

## Testing with TestFlight

After iOS submission, your app appears in TestFlight:
1. Download "TestFlight" app on your iPhone
2. You'll receive an email invite
3. Install and test the app before public release

## Common Commands

```bash
# Check build status
eas build:list

# View submission status
eas submit:list

# Build and auto-submit
eas build --platform ios --auto-submit
```

## Resources

- **EAS Documentation**: [docs.expo.dev/eas](https://docs.expo.dev/eas)
- **App Store Connect**: [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- **Privacy Policy**: See `PRIVACY_POLICY.md` in repo root
