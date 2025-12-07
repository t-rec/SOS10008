import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronUp, ChevronDown } from 'lucide-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function Footer() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleFooter = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={[styles.container, {
            paddingBottom: Math.max(insets.bottom, 20),
            backgroundColor: colors.background,
            borderTopColor: colors.border
        }]}>
            {isExpanded && (
                <Text style={[styles.disclaimer, { color: colors.subtitle }]}>
                    {t('footer.disclaimer')}
                </Text>
            )}

            <Pressable
                onPress={toggleFooter}
                style={[
                    styles.solidarityRow,
                    { backgroundColor: '#F03F33' }
                ]}
            >
                <Image
                    source={require('../assets/images/10008-Icon.png')}
                    style={[styles.icon, { tintColor: '#FFFFFF' }]}
                    resizeMode="contain"
                />
                <Text style={[
                    styles.solidarityText,
                    { color: '#FFFFFF' }
                ]}>
                    {t('footer.solidarity')}
                </Text>
                {isExpanded ? (
                    <ChevronDown
                        size={20}
                        color="#FFFFFF"
                        strokeWidth={3}
                    />
                ) : (
                    <ChevronUp
                        size={20}
                        color="#FFFFFF"
                        strokeWidth={3}
                    />
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 4,
        borderTopColor: '#000000',
        alignItems: 'center',
        gap: 16,
    },
    disclaimer: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 16,
        textTransform: 'uppercase',
    },
    solidarityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#000000',
        paddingHorizontal: 16,
        paddingVertical: 8,
        transform: [{ rotate: '-1deg' }], // Slight tilt for brutalist feel
    },
    icon: {
        width: 24,
        height: 24,
    },
    solidarityText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
