import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {
            paddingBottom: Math.max(insets.bottom, 20),
            backgroundColor: colors.background,
            borderTopColor: colors.border
        }]}>
            <Text style={[styles.disclaimer, { color: colors.subtitle }]}>
                {t('footer.disclaimer')}
            </Text>
            <View style={styles.solidarityRow}>
                <Image
                    source={require('../assets/images/10008-Icon.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <Text style={[styles.solidarityText, { color: colors.brand }]}>
                    {t('footer.solidarity')}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 16,
        backgroundColor: '#F9FAFB',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        alignItems: 'center',
        gap: 12,
    },
    disclaimer: {
        fontSize: 10,
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: 14,
    },
    solidarityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    icon: {
        width: 20,
        height: 20,
    },
    solidarityText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#F03F33',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});
