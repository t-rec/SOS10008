import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Sun, Moon, Smartphone } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
    const { themeMode, toggleTheme, colors } = useTheme();

    const getIcon = () => {
        switch (themeMode) {
            case 'light':
                return <Sun size={24} color={colors.text} strokeWidth={2.5} />;
            case 'dark':
                return <Moon size={24} color={colors.text} strokeWidth={2.5} />;
            case 'system':
                return <Smartphone size={24} color={colors.text} strokeWidth={2.5} />;
        }
    };

    return (
        <Pressable onPress={toggleTheme} style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed
        ]}>
            <View style={[styles.iconContainer, {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: '#000000',
            }]}>
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
        width: 44,
        height: 44,
        borderRadius: 4, // Minimal rounding
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0, // Disable default elevation to use custom shadow
    },
    pressed: {
        transform: [{ translateX: 2 }, { translateY: 2 }], // Press effect moves button down-right
        opacity: 1,
    }
});
