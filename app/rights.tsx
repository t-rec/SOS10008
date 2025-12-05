import { ScreenHeader } from '@/components/ScreenHeader';
import { Stack, useRouter } from 'expo-router';
import { Phone } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

export default function RightsScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { colors } = useTheme();

    return (
        <View style={[styles.background, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScreenHeader />
            <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[styles.mainTitle, { color: colors.text }]}>{t('rights.mainTitle')}</Text>

                    <View style={styles.content}>
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: colors.brand }]}>{t('rights.section1Title')}</Text>
                            <Text style={[styles.paragraph, { color: colors.text }]}>
                                {t('rights.section1Text1')}
                            </Text>
                            <Text style={[styles.paragraph, { color: colors.text }]}>
                                {t('rights.section1Text2')}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: colors.brand }]}>{t('rights.section2Title')}</Text>
                            <Text style={[styles.paragraph, { color: colors.text }]}>
                                {t('rights.section2Text')}
                            </Text>
                            <View style={styles.bulletList}>
                                <View style={styles.bulletItem}>
                                    <View style={[styles.bullet, { backgroundColor: colors.brand }]} />
                                    <Text style={[styles.bulletText, { color: colors.text }]}>{t('rights.bullet1')}</Text>
                                </View>
                                <View style={styles.bulletItem}>
                                    <View style={[styles.bullet, { backgroundColor: colors.brand }]} />
                                    <Text style={[styles.bulletText, { color: colors.text }]}>{t('rights.bullet2')}</Text>
                                </View>
                                <View style={styles.bulletItem}>
                                    <View style={[styles.bullet, { backgroundColor: colors.brand }]} />
                                    <Text style={[styles.bulletText, { color: colors.text }]}>{t('rights.bullet3')}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: colors.brand }]}>{t('rights.section3Title')}</Text>
                            <Text style={[styles.paragraph, { color: colors.text }]}>
                                {t('rights.section3Text1')}
                            </Text>
                            <Text style={[styles.paragraph, { color: colors.text }]}>
                                {t('rights.section3Text2')}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: colors.brand }]}>{t('rights.section4Title')}</Text>
                            <Text style={[styles.paragraph, { color: colors.text }]}>
                                {t('rights.section4Text1')}
                            </Text>
                            <View style={[styles.contactBox, { backgroundColor: colors.card, borderColor: colors.brand }]}>

                                <Text style={[styles.contactText, { color: colors.text }]}>
                                    {t('rights.section4Text2')}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.contactButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => router.push('/contact')}
                    >
                        <Phone size={24} color="#FFFFFF" />
                        <Text style={styles.contactButtonText}>{t('common.contactButton')}</Text>
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
        paddingVertical: 24,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: '900' as const,
        color: '#000000',
        marginBottom: 32,
        textTransform: 'uppercase',
    },
    content: {
        gap: 32,
        marginBottom: 32,
    },
    section: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '900' as const,
        color: '#F03F33',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    paragraph: {
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
        fontWeight: '500',
    },
    bulletList: {
        gap: 16,
        marginTop: 8,
    },
    bulletItem: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-start',
    },
    bullet: {
        width: 12,
        height: 12,
        borderRadius: 0,
        backgroundColor: '#F03F33',
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#000000',
    },
    bulletText: {
        flex: 1,
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
        fontWeight: '600',
    },
    contactBox: {
        backgroundColor: '#FEF2F2',
        borderLeftWidth: 8,
        borderLeftColor: '#F03F33',
        padding: 24,
        borderRadius: 4,
        marginTop: 16,
        gap: 12,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    contactText: {
        fontSize: 18,
        color: '#000000',
        lineHeight: 26,
        fontWeight: '600',
    },
    contactBold: {
        fontWeight: '900' as const,
        color: '#F03F33',
    },
    contactButton: {
        backgroundColor: '#F03F33',
        borderRadius: 4,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 'auto' as const,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    contactButtonText: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
    buttonPressed: {
        transform: [{ translateX: 4 }, { translateY: 4 }],
        shadowOffset: { width: 0, height: 0 },
        opacity: 1,
    },
});
