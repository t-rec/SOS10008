import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/color';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    themeMode: ThemeMode;
    activeTheme: 'light' | 'dark';
    colors: typeof Colors.light;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState<ThemeMode>('system');

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('themeMode');
            if (savedTheme) {
                setThemeMode(savedTheme as ThemeMode);
            }
        } catch (error) {
            console.error('Failed to load theme', error);
        }
    };

    const toggleTheme = async () => {
        const modes: ThemeMode[] = ['light', 'dark', 'system'];
        const nextIndex = (modes.indexOf(themeMode) + 1) % modes.length;
        const nextMode = modes[nextIndex];

        setThemeMode(nextMode);
        try {
            await AsyncStorage.setItem('themeMode', nextMode);
        } catch (error) {
            console.error('Failed to save theme', error);
        }
    };

    const activeTheme = themeMode === 'system'
        ? (systemColorScheme === 'dark' ? 'dark' : 'light')
        : themeMode;

    const colors = Colors[activeTheme];

    return (
        <ThemeContext.Provider value={{ themeMode, activeTheme, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
