import { Stack, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

export default function EmergencyScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { colors } = useTheme();

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
    alertBox: {
        backgroundColor: '#FEF2F2',
        borderLeftWidth: 4,
        borderLeftColor: '#F03F33',
        padding: 20,
        borderRadius: 12,
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '700' as const,
        color: '#991B1B',
    },
    rightsList: {
        gap: 20,
        marginBottom: 40,
    },
    rightItem: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-start',
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#F03F33',
        marginTop: 8,
    },
    rightText: {
        flex: 1,
        fontSize: 17,
        color: '#1F2937',
        lineHeight: 26,
    },
    buttonsContainer: {
        gap: 16,
        marginTop: 'auto' as const,
    },
    primaryButton: {
        backgroundColor: '#F03F33',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#F03F33',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: '#FFFFFF',
        flex: 1,
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#FEE2E2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    secondaryButtonText: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: '#1F2937',
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.7,
    },
});
