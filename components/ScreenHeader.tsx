import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import BackButton from './BackButton';

interface ScreenHeaderProps {
    title?: string;
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
    const { colors } = useTheme();

    return (
        <SafeAreaView edges={['top']} style={styles.topSafeArea}>
            <View style={styles.headerContent}>
                <View style={styles.leftContainer}>
                    <BackButton />
                </View>

                {title && (
                    <Text style={styles.title}>{title}</Text>
                )}

                <View style={styles.rightContainer}>
                    <ThemeToggle />
                    <LanguageToggle />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topSafeArea: {
        backgroundColor: '#F03F33',
        zIndex: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 68, // Consistent height
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
});
