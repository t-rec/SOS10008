import * as Clipboard from 'expo-clipboard';
import { Stack, useRouter } from 'expo-router';
import { Check, Copy } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

import { ScreenHeader } from '@/components/ScreenHeader';

export default function PhrasesScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const phrases = t('phrases.list', { returnObjects: true }) as string[];

    const handleCopy = async (phrase: string, index: number) => {
        try {
            await Clipboard.setStringAsync(phrase);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (error) {
            console.error('Erreur lors de la copie:', error);
            Alert.alert(t('noteDetail.copyErrorTitle'), t('noteDetail.copyErrorText'));
        }
    };

    return (
        <View style={[styles.background, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScreenHeader />
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[styles.header, { color: colors.text }]}>{t('phrases.title')}</Text>
                    <Text style={[styles.subheader, { color: colors.subtitle }]}>
                        {t('phrases.subtitle')}
                    </Text>

                    <View style={styles.phrasesList}>
                        {phrases.map((phrase, index) => (
                            <Pressable
                                key={index}
                                style={({ pressed }) => [
                                    styles.phraseCard,
                                    { backgroundColor: colors.card, borderColor: colors.border },
                                    pressed && styles.phraseCardPressed,
                                    copiedIndex === index && styles.phraseCardCopied,
                                ]}
                                onPress={() => handleCopy(phrase, index)}
                            >
                                <Text style={[
                                    styles.phraseText,
                                    { color: copiedIndex === index ? '#1F2937' : colors.text }
                                ]}>
                                    {phrase}
                                </Text>
                                <View style={[styles.copyIcon, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                    {copiedIndex === index ? (
                                        <Check size={20} color="#059669" strokeWidth={2.5} />
                                    ) : (
                                        <Copy size={20} color={colors.text} />
                                    )}
                                </View>
                            </Pressable>
                        ))}
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.backButton,
                            { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder },
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => router.push('/')}
                    >
                        <Text style={[styles.backButtonText, { color: colors.secondaryButtonText }]}>{t('phrases.backHome')}</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
    },
    header: {
        fontSize: 32,
        fontWeight: '900' as const,
        color: '#000000',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    subheader: {
        fontSize: 18,
        color: '#000000',
        marginBottom: 32,
        fontWeight: '600',
    },
    phrasesList: {
        gap: 20,
        marginBottom: 32,
    },
    phraseCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 24,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    phraseCardPressed: {
        transform: [{ translateX: 2 }, { translateY: 2 }],
        shadowOffset: { width: 2, height: 2 },
    },
    phraseCardCopied: {
        borderColor: '#10B981',
        backgroundColor: '#F0FDF4',
    },
    phraseText: {
        flex: 1,
        fontSize: 18,
        color: '#000000',
        lineHeight: 26,
        fontWeight: '700',
    },
    copyIcon: {
        padding: 4,
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 20,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#000000',
        marginTop: 'auto' as const,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    backButtonText: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#F03F33',
        textTransform: 'uppercase',
    },
    buttonPressed: {
        transform: [{ translateX: 2 }, { translateY: 2 }],
        shadowOffset: { width: 2, height: 2 },
        opacity: 1,
    },
});
