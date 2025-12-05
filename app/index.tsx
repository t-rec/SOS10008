import { useRouter } from 'expo-router';
import { useNotes } from '@/contexts/NotesContext';
import { AlertCircle, Book, FileText, Phone } from 'lucide-react-native';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen() {
    const router = useRouter();
    const { notes } = useNotes();
    const { t } = useTranslation();
    const { colors } = useTheme();

    return (
        <View style={[styles.background, { backgroundColor: colors.background }]}>
            <SafeAreaView edges={['top']} style={styles.topSafeArea}>
                <View style={styles.topBarContent}>
                    <ThemeToggle />
                    <LanguageToggle />
                </View>
            </SafeAreaView>

            <SafeAreaView style={styles.container} edges={[]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.header, { borderBottomColor: colors.border }]}>
                        <View style={styles.titleRow}>
                            <Image
                                source={require('../assets/images/10008-Icon.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                            <Text style={[styles.titleSingleLine, { color: colors.brand }]}>SOS 10008</Text>
                        </View>
                        <Text style={[styles.subtitle, { color: colors.subtitle }]}>
                            {t('common.subtitle')}
                        </Text>
                    </View>

                    <View style={styles.mainButtons}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.emergencyButton,
                                { shadowColor: colors.primaryShadow, borderColor: colors.primaryBorder },
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={() => router.push('/emergency')}
                        >
                            <AlertCircle size={32} color="#FFFFFF" strokeWidth={2.5} />
                            <Text style={styles.emergencyButtonText}>
                                {t('common.emergencyButton')}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.secondaryButton,
                                { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder, shadowColor: colors.shadow },
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={() => router.push('/rights')}
                        >
                            <Book size={28} color={colors.brand} />
                            <Text style={[styles.secondaryButtonText, { color: colors.secondaryButtonText }]}>
                                {t('common.rightsButton')}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.secondaryButton,
                                { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder, shadowColor: colors.shadow },
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={() => router.push('/notes')}
                        >
                            <FileText size={28} color={colors.brand} />
                            <Text style={[styles.secondaryButtonText, { color: colors.secondaryButtonText }]}>
                                {t('common.notesButton')}
                            </Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{notes.length}</Text>
                            </View>
                        </Pressable>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.contactButton,
                            { shadowColor: colors.primaryShadow, borderColor: colors.primaryBorder },
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
    topSafeArea: {
        backgroundColor: '#F03F33',
        zIndex: 10,
    },
    topBarContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        gap: 12,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    header: {
        marginBottom: 24,
        marginTop: 8,
        borderBottomWidth: 4,
        borderBottomColor: '#000000',
        paddingBottom: 24,
        gap: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleSingleLine: {
        fontSize: 56,
        fontWeight: '900' as const,
        color: '#F03F33',
        lineHeight: 56,
        letterSpacing: -1,
        textTransform: 'uppercase',
        flex: 1,
        includeFontPadding: false,
        textAlignVertical: 'center',
        marginTop: 8,
    },
    icon: {
        width: 64,
        height: 64,
        marginRight: 16,
    },
    mainButtons: {
        gap: 20,
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        color: '#000000',
        lineHeight: 26,
        fontWeight: '700',
    },
    emergencyButton: {
        backgroundColor: '#F03F33',
        borderRadius: 4,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        minHeight: 160,
        borderWidth: 4,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        minHeight: 90,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    emergencyButtonText: {
        fontSize: 32,
        fontWeight: '900' as const,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 36,
        textTransform: 'uppercase',
    },
    secondaryButtonText: {
        fontSize: 20,
        fontWeight: '800' as const,
        color: '#000000',
        flex: 1,
        textTransform: 'uppercase',
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
    badge: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        minWidth: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000000',
    },
    badgeText: {
        color: '#F03F33',
        fontWeight: '900' as const,
        fontSize: 16,
    },
});
