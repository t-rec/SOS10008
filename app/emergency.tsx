import { Stack, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

import { ScreenHeader } from '@/components/ScreenHeader';

export default function EmergencyScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { colors } = useTheme();

    return (
        <View style={[styles.background, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScreenHeader />
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.alertBox, { backgroundColor: colors.card, borderColor: colors.brand }]}>
                        <Text style={[styles.title, { color: colors.brand }]}>{t('emergency.title')}</Text>
                    </View>

                    <View style={styles.rightsList}>
                        <View style={styles.rightItem}>
                            <View style={[styles.bullet, { backgroundColor: colors.brand }]} />
                            <Text style={[styles.rightText, { color: colors.text }]}>
                                {t('emergency.right1')}
                            </Text>
                        </View>

                        <View style={styles.rightItem}>
                            <View style={[styles.bullet, { backgroundColor: colors.brand }]} />
                            <Text style={[styles.rightText, { color: colors.text }]}>
                                {t('emergency.right2')}
                            </Text>
                        </View>

                        <View style={styles.rightItem}>
                            <View style={[styles.bullet, { backgroundColor: colors.brand }]} />
                            <Text style={[styles.rightText, { color: colors.text }]}>
                                {t('emergency.right3')}
                            </Text>
                        </View>

                        <View style={styles.rightItem}>
                            <View style={[styles.bullet, { backgroundColor: colors.brand }]} />
                            <Text style={[styles.rightText, { color: colors.text }]}>
                                {t('emergency.right4')}
                            </Text>
                        </View>

                        <View style={styles.rightItem}>
                            <View style={[styles.bullet, { backgroundColor: colors.brand }]} />
                            <Text style={[styles.rightText, { color: colors.text }]}>
                                {t('emergency.right5')}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.primaryButton,
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={() => router.push('/phrases')}
                        >
                            <Text style={styles.primaryButtonText}>
                                {t('emergency.phrasesButton')}
                            </Text>
                            <ArrowRight size={24} color="#FFFFFF" />
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.secondaryButton,
                                { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder },
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={() => router.push('/new-note')}
                        >
                            <Text style={[styles.secondaryButtonText, { color: colors.secondaryButtonText }]}>
                                {t('emergency.notesButton')}
                            </Text>
                            <ArrowRight size={24} color={colors.brand} />
                        </Pressable>
                    </View>
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
    alertBox: {
        backgroundColor: '#FEF2F2',
        borderLeftWidth: 8,
        borderLeftColor: '#F03F33',
        padding: 24,
        borderRadius: 4,
        marginBottom: 32,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    title: {
        fontSize: 28,
        fontWeight: '900' as const,
        color: '#991B1B',
        textTransform: 'uppercase',
        letterSpacing: -0.5,
    },
    rightsList: {
        gap: 24,
        marginBottom: 40,
    },
    rightItem: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'flex-start',
    },
    bullet: {
        width: 12,
        height: 12,
        borderRadius: 0, // Square bullet
        backgroundColor: '#F03F33',
        marginTop: 8,
        borderWidth: 2,
        borderColor: '#000000',
    },
    rightText: {
        flex: 1,
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
        fontWeight: '600',
    },
    buttonsContainer: {
        gap: 20,
        marginTop: 'auto' as const,
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#F03F33',
        borderRadius: 4,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    primaryButtonText: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#FFFFFF',
        flex: 1,
        textTransform: 'uppercase',
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    secondaryButtonText: {
        fontSize: 20,
        fontWeight: '800' as const,
        color: '#000000',
        flex: 1,
        textTransform: 'uppercase',
    },
    buttonPressed: {
        transform: [{ translateX: 4 }, { translateY: 4 }],
        shadowOffset: { width: 0, height: 0 },
        opacity: 1,
    },
});
