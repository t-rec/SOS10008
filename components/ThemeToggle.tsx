import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Sun, Moon, Smartphone } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
    const { themeMode, toggleTheme, colors } = useTheme();

    const getIcon = () => {
        switch (themeMode) {
            case 'light':
                return <Sun size={20} color={colors.text} />;
            case 'dark':
                return <Moon size={20} color={colors.text} />;
            case 'system':
                return <Smartphone size={20} color={colors.text} />;
        }
    };

    return (
        <Pressable onPress={toggleTheme} style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: colors.border }]}>
                {getIcon()}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
