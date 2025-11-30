# SOS 10008

Mobile app for Local 10008 union members to help navigate management meetings.

## What It Does

- **Emergency Info**: Know your rights before entering a meeting
- **Useful Phrases**: Copy pre-written phrases to use in meetings
- **Meeting Notes**: Document what happens during meetings
- **Contact Union**: Quick access to Local 10008 contact info
- **Dark Mode**: Eye-friendly dark theme with Light/Dark/System modes
- **Bilingual**: Full French and English support

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on platforms
npm run ios      # iOS Simulator
npm run android  # Android Emulator
```

## Documentation

- **[Deployment Guide](docs/DEPLOYMENT.md)**: How to build and submit to App Stores
- **[Architecture Guide](docs/ARCHITECTURE.md)**: How the code works
- **[Privacy Policy](PRIVACY_POLICY.md)**: Data handling and privacy

## Tech Stack

- React Native + Expo
- TypeScript
- Expo Router (file-based routing)
- React Query
- i18next (French/English)
- AsyncStorage (local data)

## Key Features

### Dark Mode
- Light, Dark, and System themes
- Theme toggle in header
- Persistent preferences
- Consistent across all screens

### Internationalization
- French (default) and English
- Language toggle in header
- Locale-aware date/time formatting
- All UI text translated

### Notes System
- Create and save meeting notes
- Local storage (no backend)
- Email integration for sharing
- Delete with confirmation

### UI/UX
- Custom back button on all screens
- Toast notifications for feedback
- Custom modals with backdrop dismiss
- Global footer with disclaimer

## Contact

**Section locale 10008**
- Email: `10008@ute-sei.org`
- Phone: `(438) 788-0300`

## License

Exclusive to Local 10008 members. Not affiliated with UTE nor PSAC.
