import React from 'react';
import { Pressable, StyleSheet, Text, View, LayoutAnimation } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

export function LanguageToggle() {
    const { i18n } = useTranslation();
    const { colors } = useTheme();
    const isFrench = i18n.language === 'fr';

    const toggleLanguage = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        i18n.changeLanguage(isFrench ? 'en' : 'fr');
    };

    return (
        <Pressable onPress={toggleLanguage} style={[styles.container, { backgroundColor: colors.border }]}>
            <View style={[styles.switch, isFrench ? styles.switchLeft : styles.switchRight, { backgroundColor: colors.card }]}>
                <Text style={[styles.switchText, { color: colors.brand }]}>{isFrench ? 'FR' : 'EN'}</Text>
            </View>
            <View style={styles.labelLeft}>
                <Text style={[styles.label, { color: isFrench ? colors.text : colors.subtitle }]}>FR</Text>
            </View>
            <View style={styles.labelRight}>
                <Text style={[styles.label, { color: !isFrench ? colors.text : colors.subtitle }]}>EN</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 36,
        backgroundColor: '#E5E7EB',
        borderRadius: 18,
        padding: 2,
        justifyContent: 'center',
    },
    labelLeft: {
        position: 'absolute',
        left: 0,
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    labelRight: {
        position: 'absolute',
        right: 0,
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    activeLabel: {
        color: '#1F2937',
    },
    switch: {
        width: 38,
        height: 32,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 1,
    },
    switchLeft: {
        alignSelf: 'flex-start',
    },
    switchRight: {
        alignSelf: 'flex-end',
    },
    switchText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#F03F33',
    },
});
