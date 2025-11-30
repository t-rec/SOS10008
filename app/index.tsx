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
            <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <View style={styles.titleRow}>
                            <Image
                                source={require('../assets/images/10008-Icon.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                            <Text style={[styles.title, { color: colors.brand }]}>{t('common.title')}</Text>
                            <View style={styles.togglesContainer}>
                                <ThemeToggle />
                                <LanguageToggle />
                            </View>
                        </View>
                        <Text style={[styles.subtitle, { color: colors.subtitle }]}>
                            {t('common.subtitle')}
                        </Text>
                    </View>

                    <View style={styles.mainButtons}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.emergencyButton,
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
                                { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder },
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
                                { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder },
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
    languageToggleContainer: {
        position: 'absolute',
        top: 60, // Adjust based on safe area
        right: 24,
        zIndex: 10,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    header: {
        marginBottom: 40,
        marginTop: 20,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 32,
    },
    togglesContainer: {
        marginLeft: 'auto' as const,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    icon: {
        width: 48,
        height: 48,
    },
    title: {
        fontSize: 48,
        fontWeight: '800' as const,
        color: '#F03F33',
        lineHeight: 48,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 17,
        color: '#4B5563',
        lineHeight: 26,
    },
    mainButtons: {
        gap: 16,
        marginBottom: 40,
    },
    emergencyButton: {
        backgroundColor: '#F03F33',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        minHeight: 140,
        shadowColor: '#F03F33',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        minHeight: 80,
        borderWidth: 2,
        borderColor: '#FEE2E2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    emergencyButtonText: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 36,
    },
    secondaryButtonText: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: '#1F2937',
        flex: 1,
    },
    contactButton: {
        backgroundColor: '#F03F33',
        borderRadius: 16,
        padding: 20,
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
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#FFFFFF',
    },
    buttonPressed: {
        opacity: 0.7,
    },
    badge: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        minWidth: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: '#F03F33',
        fontWeight: '700' as const,
        fontSize: 14,
    },
});
