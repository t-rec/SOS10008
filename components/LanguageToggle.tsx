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
        <Pressable onPress={toggleLanguage} style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.switch, isFrench ? styles.switchLeft : styles.switchRight, { backgroundColor: colors.brand }]}>
                <Text style={[styles.switchText, { color: '#FFFFFF' }]}>{isFrench ? 'FR' : 'EN'}</Text>
            </View>
            <View style={styles.labelLeft}>
                <Text style={[styles.label, { color: colors.text }]}>FR</Text>
            </View>
            <View style={styles.labelRight}>
                <Text style={[styles.label, { color: colors.text }]}>EN</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 90,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 4,
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    labelLeft: {
        position: 'absolute',
        left: 0,
        width: 45,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    labelRight: {
        position: 'absolute',
        right: 0,
        width: 45,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    label: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000000',
    },
    activeLabel: {
        color: '#000000',
    },
    switch: {
        width: 40,
        height: 30,
        backgroundColor: '#000000',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        borderWidth: 0,
    },
    switchLeft: {
        alignSelf: 'flex-start',
    },
    switchRight: {
        alignSelf: 'flex-end',
    },
    switchText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFFFFF',
    },
});
