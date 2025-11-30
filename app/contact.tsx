import * as Clipboard from 'expo-clipboard';
import { Stack } from 'expo-router';
import { Check, Copy, Mail, Phone, FileText, X, ChevronRight, Send, RotateCcw } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Modal, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Linking, Animated, Dimensions } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNotes, Note } from '@/contexts/NotesContext';
import { useTranslation } from 'react-i18next';
import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';
import { useTheme } from '@/contexts/ThemeContext';

export default function ContactScreen() {
    const { t } = useTranslation();
    const { notes } = useNotes();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { formatDate, formatTime } = useDateTimeFormat();
    const [copied, setCopied] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    useEffect(() => {
        if (modalVisible) {
            slideAnim.setValue(Dimensions.get('window').height);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisible]);

    const handleCloseModal = () => {
        Animated.timing(slideAnim, {
            toValue: Dimensions.get('window').height,
            duration: 300,
            useNativeDriver: true,
            // eslint-disable-next-line react-compiler/react-compiler
        }).start(() => setModalVisible(false));
    };

    const now = new Date();
    const dateStr = formatDate(now);
    const timeStr = formatTime(now);

    const defaultMessage = t('contact.defaultMessage', { date: dateStr, time: timeStr });

    const [message, setMessage] = useState<string>(defaultMessage);

    // Update message when language changes or on mount
    useEffect(() => {
        setMessage(t('contact.defaultMessage', { date: dateStr, time: timeStr }));
    }, [t, dateStr, timeStr]);

    const handleResetMessage = () => {
        setMessage(t('contact.defaultMessage', { date: dateStr, time: timeStr }));
    };

    const handleSelectNote = (note: Note) => {
        // We might want to translate this too, but it's constructed from note data.
        // For now, let's keep the structure but maybe use a similar template if possible.
        // Or just keep it hardcoded for now as it's specific logic.
        // Actually, let's try to use the same template but replace the placeholders.

        // Re-construct using the template but with note data
        const noteMessage = t('contact.defaultMessage', {
            date: note.date,
            time: note.time
        })
            .replace('[nom]', note.managerName || '[nom]')
            .replace('[sujet]', note.subject || '[sujet]')
            .replace(
                t('contact.defaultMessage').split('\n\n')[4] || 'J\'aimerais être accompagné·e par le syndicat ou obtenir des conseils.', // Fallback if split fails
                `${t('contact.defaultMessage').split('\n\n')[4] || ''}\n\nCe qui s'est passé :\n${note.description || '(Aucune note)'}\n\nTémoins / Autres détails :\n${note.witnesses || '(Aucun)'}`
            );

        // This is getting complicated to replace exactly. 
        // Let's just construct it manually for now to be safe, or accept it might be in the wrong language if we switch?
        // If the user switches language, they probably want the message in that language.
        // But the note content is in the language it was written in.

        // Let's simplify: just use the default message template and append the note details.
        const baseMessage = t('contact.defaultMessage', {
            date: note.date,
            time: note.time
        });

        const noteDetails = `\n\nDetails:\n${note.description || '-'}\n\nWitnesses:\n${note.witnesses || '-'}`;

        // Ideally we should have a separate key for note-based message.
        // For now, I'll leave the handleSelectNote logic slightly less perfect or just use the French structure if it's too hard to genericize without more keys.
        // Let's stick to the manual construction for the note selection to ensure it includes the description/witnesses fields which aren't in the default template.

        const noteMessageFr = `Bonjour,

Je vous écris parce qu'un·e gestionnaire veut me rencontrer / m'a rencontré·e aujourd'hui.

Date : ${note.date}
Heure : ${note.time}
Gestionnaire : ${note.managerName || '[nom]'}
Sujet annoncé : ${note.subject || '[sujet]'}

Ce qui s'est passé :
${note.description || '(Aucune note)'}

Témoins / Autres détails :
${note.witnesses || '(Aucun)'}

J'aimerais être accompagné·e par le syndicat ou obtenir des conseils.

Merci.`;

        const noteMessageEn = `Hello,

I am writing because a manager wants to meet with me / met with me today.

Date: ${note.date}
Time: ${note.time}
Manager: ${note.managerName || '[name]'}
Subject: ${note.subject || '[subject]'}

What happened:
${note.description || '(No note)'}

Witnesses / Other details:
${note.witnesses || '(None)'}

I would like to be accompanied by the union or get advice.

Thank you.`;

        setMessage(t('common.back') === 'Back' ? noteMessageEn : noteMessageFr);
        handleCloseModal();
    };

    const handleCopy = async () => {
        try {
            await Clipboard.setStringAsync(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Erreur lors de la copie:', error);
            Alert.alert('Erreur', 'Impossible de copier le message');
        }
    };

    const handleSendEmail = async () => {
        const recipient = '10008@ute-sei.org';
        const subject = encodeURIComponent('Demande d\'accompagnement - Section locale 10008');
        const body = encodeURIComponent(message);
        const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

        try {
            const canOpen = await Linking.canOpenURL(mailtoUrl);
            if (canOpen) {
                await Linking.openURL(mailtoUrl);
            } else {
                Alert.alert(
                    'Erreur',
                    'Impossible d\'ouvrir l\'application de courriel. Utilise le bouton "Copier" à la place.'
                );
            }
        } catch (error) {
            console.error('Error opening email:', error);
            Alert.alert('Erreur', 'Une erreur s\'est produite.');
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
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.container}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                >
                    <ScrollView
                        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <Text style={[styles.header, { color: colors.text }]}>{t('contact.title')}</Text>

                        <View style={styles.contactInfo}>
                            <View style={[styles.contactItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                <View style={styles.iconCircle}>
                                    <Mail size={24} color="#F03F33" />
                                </View>
                                <View style={styles.contactDetails}>
                                    <Text style={[styles.contactLabel, { color: colors.subtitle }]}>{t('common.email')}</Text>
                                    <Text style={[styles.contactValue, { color: colors.text }]}>10008@ute-sei.org</Text>
                                </View>
                            </View>

                            <View style={[styles.contactItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                <View style={styles.iconCircle}>
                                    <Phone size={24} color="#F03F33" />
                                </View>
                                <View style={styles.contactDetails}>
                                    <Text style={[styles.contactLabel, { color: colors.subtitle }]}>{t('common.phone')}</Text>
                                    <Text style={[styles.contactValue, { color: colors.text }]}>(438) 788-0300</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.messageSection}>
                            <View style={styles.messageHeaderRow}>
                                <View style={styles.messageLabelRow}>
                                    <Text style={[styles.messageLabel, { color: colors.text }]}>{t('contact.prefilledMessage')}</Text>
                                    <Pressable
                                        onPress={handleResetMessage}
                                        style={styles.resetButton}
                                        hitSlop={8}
                                    >
                                        <RotateCcw size={18} color={colors.subtitle} />
                                    </Pressable>
                                </View>
                                {notes.length > 0 && (
                                    <Pressable
                                        style={[styles.importButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <FileText size={16} color="#F03F33" />
                                        <Text style={styles.importButtonText}>{t('contact.useNote')}</Text>
                                    </Pressable>
                                )}
                            </View>
                            <Text style={[styles.messageHint, { color: colors.subtitle }]}>
                                {t('contact.editHint')}
                            </Text>
                            <TextInput
                                style={[styles.messageInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                numberOfLines={12}
                                textAlignVertical="top"
                                placeholderTextColor={colors.subtitle}
                            />
                        </View>

                        <View style={styles.actionButtons}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.emailButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={handleSendEmail}
                            >
                                <Send size={24} color="#FFFFFF" />
                                <Text style={styles.emailButtonText}>{t('contact.sendEmail')}</Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.copyButton,
                                    pressed && styles.buttonPressed,
                                    copied && styles.copyButtonCopied,
                                ]}
                                onPress={handleCopy}
                            >
                                {copied ? (
                                    <Check size={24} color="#059669" strokeWidth={2.5} />
                                ) : (
                                    <Copy size={24} color="#6B7280" />
                                )}
                            </Pressable>
                        </View>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                {t('contact.infoText')}
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
                    <Animated.View
                        style={[
                            styles.modalContent,
                            { transform: [{ translateY: slideAnim }], backgroundColor: colors.card }
                        ]}
                        onStartShouldSetResponder={() => true}
                    >
                        <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>{t('contact.chooseNote')}</Text>
                            <Pressable onPress={handleCloseModal} hitSlop={10}>
                                <X size={24} color={colors.text} />
                            </Pressable>
                        </View>

                        {notes.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Text style={[styles.emptyText, { color: colors.subtitle }]}>{t('contact.noNotes')}</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={notes}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.listContent}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.noteItem, { borderBottomColor: colors.border }]}
                                        onPress={() => handleSelectNote(item)}
                                    >
                                        <View style={[styles.noteIcon, { backgroundColor: colors.background }]}>
                                            <FileText size={20} color={colors.subtitle} />
                                        </View>
                                        <View style={styles.noteInfo}>
                                            <Text style={[styles.noteDate, { color: colors.subtitle }]}>{item.date} • {item.time}</Text>
                                            <Text style={[styles.noteSubject, { color: colors.text }]} numberOfLines={1}>
                                                {item.subject || t('contact.noSubject')}
                                            </Text>
                                        </View>
                                        <ChevronRight size={20} color={colors.subtitle} />
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </Animated.View>
                </Pressable>
            </Modal>
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
        marginBottom: 24,
    },
    contactInfo: {
        gap: 16,
        marginBottom: 32,
    },
    contactItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderWidth: 2,
        borderColor: '#FEE2E2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FEF2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactDetails: {
        flex: 1,
        gap: 4,
    },
    contactLabel: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#6B7280',
        textTransform: 'uppercase' as const,
        letterSpacing: 0.5,
    },
    contactValue: {
        fontSize: 17,
        fontWeight: '600' as const,
        color: '#1F2937',
    },
    messageSection: {
        marginBottom: 20,
    },
    messageHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    messageLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    messageLabel: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#1F2937',
    },
    resetButton: {
        padding: 4,
    },
    importButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FEF2F2',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    importButtonText: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: '#F03F33',
    },
    messageHint: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    messageInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        fontSize: 15,
        color: '#1F2937',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        minHeight: 240,
        lineHeight: 22,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    emailButton: {
        flex: 1,
        backgroundColor: '#F03F33',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#F03F33',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    emailButtonText: {
        fontSize: 17,
        fontWeight: '600' as const,
        color: '#FFFFFF',
    },
    copyButton: {
        width: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    copyButtonCopied: {
        borderColor: '#10B981',
        backgroundColor: '#F0FDF4',
    },
    copyButtonText: {
        display: 'none',
    },
    copyButtonTextCopied: {
        display: 'none',
    },
    buttonPressed: {
        opacity: 0.7,
    },
    infoBox: {
        backgroundColor: '#EFF6FF',
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
        padding: 16,
        borderRadius: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#1E40AF',
        lineHeight: 22,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '70%',
        paddingTop: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#1F2937',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        gap: 16,
    },
    noteIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteInfo: {
        flex: 1,
        gap: 4,
    },
    noteDate: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500' as const,
    },
    noteSubject: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#1F2937',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    emptyText: {
        fontSize: 16,
        color: '#6B7280',
    },
});
