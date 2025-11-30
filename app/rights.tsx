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
                                    {t('common.email')}: <Text style={[styles.contactBold, { color: colors.brand }]}>10008@ute-sei.org</Text>
                                </Text>
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
    mainTitle: {
        fontSize: 26,
        fontWeight: '700' as const,
        color: '#1F2937',
        marginBottom: 24,
    },
    content: {
        gap: 28,
        marginBottom: 32,
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#F03F33',
        marginBottom: 4,
    },
    paragraph: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 26,
    },
    bulletList: {
        gap: 12,
        marginTop: 8,
    },
    bulletItem: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#F03F33',
        marginTop: 10,
    },
    bulletText: {
        flex: 1,
        fontSize: 16,
        color: '#374151',
        lineHeight: 26,
    },
    contactBox: {
        backgroundColor: '#FEF2F2',
        borderLeftWidth: 4,
        borderLeftColor: '#F03F33',
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
        gap: 8,
    },
    contactText: {
        fontSize: 15,
        color: '#374151',
        lineHeight: 24,
    },
    contactBold: {
        fontWeight: '700' as const,
        color: '#F03F33',
    },
    contactButton: {
        backgroundColor: '#F03F33',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 'auto' as const,
        shadowColor: '#F03F33',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    contactButtonText: {
        fontSize: 17,
        fontWeight: '600' as const,
        color: '#FFFFFF',
    },
    buttonPressed: {
        opacity: 0.7,
    },
});
