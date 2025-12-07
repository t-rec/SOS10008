# Architecture Guide

## Project Structure

```
SOS 10008/
├── app/                    # Screens (Expo Router file-based routing)
│   ├── _layout.tsx        # Root layout, providers, header config
│   ├── index.tsx          # Home screen
│   ├── contact.tsx        # Contact page
│   ├── emergency.tsx      # Emergency info
│   ├── phrases.tsx        # Useful phrases
│   ├── rights.tsx         # Union rights info
│   ├── notes.tsx          # Notes list
│   ├── new-note.tsx       # Create note
│   ├── note/[id].tsx      # Note detail (dynamic route)
│   └── i18n/              # Translation system
│       ├── i18n.ts        # i18next configuration
│       └── locales/       # Translation files
│           ├── en.json    # English
│           └── fr.json    # French
├── components/            # Reusable UI components
│   ├── AnimatedSplash.tsx # Premium animated splash screen
│   ├── BackButton.tsx    # Custom back button
│   ├── Footer.tsx        # Global footer
│   ├── ScreenHeader.tsx  # Subpage header with toggles
│   ├── LanguageToggle.tsx # FR/EN switcher
│   ├── ThemeToggle.tsx   # Light/Dark/System switcher
│   └── DeleteConfirmationModal.tsx # Confirmation dialog
├── contexts/             # React Context providers
│   ├── ThemeContext.tsx  # Dark mode state & colors
│   └── NotesContext.tsx  # Notes CRUD operations
├── hooks/                # Custom React hooks
│   └── useDateTimeFormat.ts # Locale-aware date/time
├── constants/            # Static values
│   └── color.ts          # Color palette (light/dark)
├── assets/images/        # Images and icons
├── docs/                 # Documentation (you are here)
└── app.json              # Expo configuration
```

## Core Systems

### 1. Theme System (Dark Mode)

**How It Works:**
- `contexts/ThemeContext.tsx` manages theme state
- Three modes: Light, Dark, System (follows device)
- User preference saved to AsyncStorage
- `useTheme()` hook provides colors to components

**Color Palette:**
```typescript
// constants/color.ts
export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    brand: '#F03F33',
    border: '#000000',
    shadow: '#000000',
    primaryShadow: '#000000',  // Shadow for red buttons
    primaryBorder: '#000000',  // Border for red buttons
    secondaryButton: '#FFFFFF',
    secondaryButtonBorder: '#000000',
    // ...
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    brand: '#F03F33',
    border: '#FFFFFF',
    shadow: '#F03F33',         // Shadow for secondary buttons
    primaryShadow: 'transparent', // No shadow for red buttons in dark mode
    primaryBorder: '#FFFFFF',  // White border for red buttons in dark mode
    secondaryButton: '#000000',
    secondaryButtonBorder: '#FFFFFF',
    // ...
  }
};
```

**Usage in Components:**
```tsx
import { useTheme } from '@/contexts/ThemeContext';

export default function MyScreen() {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello</Text>
    </View>
  );
}
```

### 2. Notes System (Data Persistence)

**How It Works:**
- `contexts/NotesContext.tsx` provides CRUD operations
- Data stored locally with AsyncStorage (no backend)
- Notes are simple JSON objects

**Note Structure:**
```typescript
interface Note {
  id: string;
  date: string; // ISO 8601 string (e.g. "2023-11-20T14:00:00.000Z")
  time: string; // ISO 8601 string (redundant but consistent)
  managerName: string;
  subject: string;
  description: string;
  witnesses: string;
  createdAt: number;
}
```

**Usage:**
```tsx
import { useNotes } from '@/contexts/NotesContext';

export default function MyComponent() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  
  // Add a note
  await addNote({
    date: '2025-11-30',
    managerName: 'John Doe',
    // ...
  });
  
  // Update a note (edit mode: navigate to /new-note?edit=noteId)
  await updateNote(noteId, {
    date: '2025-12-01',
    managerName: 'Jane Doe',
    // ...
  });
  
  // Delete a note
  await deleteNote(noteId);
}
```

### 3. Internationalization (i18n)

**How It Works:**
- `react-i18next` for translations
- `app/i18n/locales/` contains JSON files
- User preference saved to AsyncStorage
- `useDateTimeFormat` hook for locale-aware formatting (with ISO support + legacy fallback)

**Adding Translations:**
1. Open `app/i18n/locales/en.json` and `fr.json`
2. Add your key-value pairs in both files
3. Use in components:

```tsx
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();
  
  return <Text>{t('myKey.mySubkey')}</Text>;
}
```

**Date/Time Formatting:**
```tsx
import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';

const { formatDate, formatTime } = useDateTimeFormat();

// Use ISO strings for best results
const isoDate = '2025-11-30T14:30:00.000Z';
const displayDate = formatDate(isoDate); // FR: 2025-11-30, EN: 11/30/2025
const displayTime = formatTime(isoDate); // FR: 14:30, EN: 2:30 PM
```

## Common Patterns

### Adding a New Screen

1. Create file in `app/` directory:
```tsx
// app/my-screen.tsx
import { View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function MyScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        {t('myScreen.title')}
      </Text>
    </View>
  );
}
```

2. Add translations to `app/i18n/locales/en.json` and `fr.json`:
```json
{
  "myScreen": {
    "title": "My Screen Title"
  }
}
```

3. Link to it from another screen:
```tsx
import { router } from 'expo-router';

<Pressable onPress={() => router.push('/my-screen')}>
  <Text>Go to My Screen</Text>
</Pressable>
```

### Creating a Reusable Component

```tsx
// components/MyButton.tsx
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface MyButtonProps {
  title: string;
  onPress: () => void;
}

export default function MyButton({ title, onPress }: MyButtonProps) {
  const { colors } = useTheme();
  
  return (
    <Pressable 
      style={[styles.button, { backgroundColor: colors.brand }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
```

### Custom Screen Header (Subpages)
Use the custom `ScreenHeader` component to disable the native iOS "glass pill" style.

```tsx
import { ScreenHeader } from '@/components/ScreenHeader';
import { Stack } from 'expo-router';

export default function MySubpage() {
  return (
    <View style={{ flex: 1 }}>
        {/* Disable native header and use custom one */}
        <Stack.Screen options={{ headerShown: false }} />
        <ScreenHeader />
        
        {/* Page Content */}
    </View>
  );
}
```

## Key Files to Know

### `app/_layout.tsx`
- **Purpose**: Root of the app, wraps everything
- **Contains**: `ThemeProvider`, `NotesProvider`, Navigation config
- **Modify when**: Adding global providers, changing header appearance

### `app/index.tsx`
- **Purpose**: Home screen
- **Modify when**: Changing the main menu layout

### `constants/color.ts`
- **Purpose**: Centralized color palette
- **Modify when**: Adding new theme colors or adjusting existing ones

### `contexts/ThemeContext.tsx`
- **Purpose**: Dark mode logic
- **Modify when**: Adding new theme modes or color properties

### `contexts/NotesContext.tsx`
- **Purpose**: Notes data management
- **Modify when**: Adding new note fields or operations

### `components/AnimatedSplash.tsx`
- **Purpose**: Premium animated splash screen with gradient backdrop and typography
- **Modify when**: Changing splash timing, colors, or animations
- **Note**: Changes hot-reload. Native splash in `app.json` requires rebuild.

## Development Tips

### Run the App
```bash
npm start       # Start Expo Go (Limited native features)
npx expo start --dev-client # Start Custom Dev Client (Full native features)
npm run ios     # Open in iOS Simulator (Native build)
npm run android # Open in Android Emulator (Native build)
```

### Debugging
- Use React DevTools: `npx react-devtools`
- Check Expo logs in terminal
- Use `console.log()` liberally

### Linting
```bash
npm run lint    # Check for code issues
```

## Dependencies

### Key Libraries
- **expo-router**: File-based routing
- **react-i18next**: Translations
- **@react-native-async-storage/async-storage**: Local storage
- **react-native-toast-message**: Toast notifications
- **lucide-react-native**: Icons
- **expo-dev-client**: Custom development builds
- **expo-splash-screen**: Native splash control
- **expo-linear-gradient**: Gradient backgrounds (used in splash)