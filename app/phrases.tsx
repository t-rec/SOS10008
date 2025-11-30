import * as Clipboard from 'expo-clipboard';
import { Stack, useRouter } from 'expo-router';
import { Check, Copy } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

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
            <Stack.Screen
                options={{
                    title: t('common.back'),
                    headerStyle: { backgroundColor: '#F03F33' },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: { fontWeight: '700' as const },
                }}
            />
            <SafeAreaView style={styles.container} edges={['bottom']}>
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
                                <View style={styles.copyIcon}>
                                    {copiedIndex === index ? (
                                        <Check size={20} color="#059669" strokeWidth={2.5} />
                                    ) : (
                                        <Copy size={20} color={colors.subtitle} />
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
        backgroundColor: '#FAFAFA',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    header: {
        fontSize: 26,
        fontWeight: '700' as const,
        color: '#1F2937',
        marginBottom: 8,
    },
    subheader: {
        fontSize: 15,
        color: '#6B7280',
        marginBottom: 24,
    },
    phrasesList: {
        gap: 16,
        marginBottom: 32,
    },
    phraseCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    phraseCardPressed: {
        opacity: 0.7,
    },
    phraseCardCopied: {
        borderColor: '#10B981',
        backgroundColor: '#F0FDF4',
    },
    phraseText: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
        lineHeight: 24,
    },
    copyIcon: {
        padding: 4,
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FEE2E2',
        marginTop: 'auto' as const,
    },
    backButtonText: {
        fontSize: 17,
        fontWeight: '600' as const,
        color: '#F03F33',
    },
    buttonPressed: {
        opacity: 0.7,
    },
});
