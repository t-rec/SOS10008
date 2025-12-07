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

import { ScreenHeader } from '@/components/ScreenHeader';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalVisible]);

    const handleCloseModal = () => {
        Animated.timing(slideAnim, {
            toValue: Dimensions.get('window').height,
            duration: 300,
            useNativeDriver: true,
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
        const noteMessageFr = `Bonjour,

Je vous écris parce qu'un·e gestionnaire veut me rencontrer / m'a rencontré·e aujourd'hui.

Date : ${formatDate(note.date)}
Heure : ${formatTime(note.time)}
Gestionnaire : ${note.managerName || '[nom]'}
Sujet annoncé : ${note.subject || '[sujet]'}

Ce qui s'est passé :
${note.description || '(Aucune note)'}

Témoins / Autres détails :
${note.witnesses || '(Aucun)'}

J'aimerais être accompagné(e) par le syndicat ou obtenir des conseils.

Merci.`;

        const noteMessageEn = `Hello,

I am writing because a manager wants to meet with me / met with me today.

Date: ${formatDate(note.date)}
Time: ${formatTime(note.time)}
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
        const body = encodeURIComponent(message.replace(/\n/g, '\r\n'));
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
            <Stack.Screen options={{ headerShown: false }} />
            <ScreenHeader />
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
                            <Pressable
                                style={({ pressed }) => [
                                    styles.contactItem,
                                    { backgroundColor: colors.card, borderColor: colors.border },
                                    pressed && { opacity: 0.7 }
                                ]}
                                onPress={() => Linking.openURL('mailto:10008@ute-sei.org')}
                            >
                                <View style={styles.iconCircle}>
                                    <Mail size={24} color="#F03F33" />
                                </View>
                                <View style={styles.contactDetails}>
                                    <Text style={[styles.contactLabel, { color: colors.subtitle }]}>{t('common.email')}</Text>
                                    <Text style={[styles.contactValue, { color: colors.text }]}>10008@ute-sei.org</Text>
                                </View>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.contactItem,
                                    { backgroundColor: colors.card, borderColor: colors.border },
                                    pressed && { opacity: 0.7 }
                                ]}
                                onPress={() => Linking.openURL('tel:4387880300')}
                            >
                                <View style={styles.iconCircle}>
                                    <Phone size={24} color="#F03F33" />
                                </View>
                                <View style={styles.contactDetails}>
                                    <Text style={[styles.contactLabel, { color: colors.subtitle }]}>{t('common.phone')}</Text>
                                    <Text style={[styles.contactValue, { color: colors.text }]}>(438) 788-0300</Text>
                                </View>
                            </Pressable>
                        </View>

                        <View style={styles.messageSection}>
                            <View style={styles.messageHeaderRow}>
                                <View style={styles.messageLabelRow}>
                                    <Text style={[styles.messageLabel, { color: colors.text }]}>{t('contact.prefilledMessage')}</Text>
                                    <Pressable
                                        onPress={handleResetMessage}
                                        style={[styles.resetButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                                        hitSlop={8}
                                    >
                                        <RotateCcw size={18} color={colors.text} />
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
                                            <Text style={[styles.noteDate, { color: colors.subtitle }]}>{formatDate(item.date)} • {formatTime(item.time)}</Text>
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
    header: {
        fontSize: 32,
        fontWeight: '900' as const,
        color: '#000000',
        marginBottom: 32,
        textTransform: 'uppercase',
    },
    contactInfo: {
        gap: 20,
        marginBottom: 32,
    },
    contactItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 4,
        backgroundColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000000',
    },
    contactDetails: {
        flex: 1,
        gap: 4,
    },
    contactLabel: {
        fontSize: 14,
        fontWeight: '900' as const,
        color: '#000000',
        textTransform: 'uppercase' as const,
        letterSpacing: 0.5,
    },
    contactValue: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#000000',
    },
    messageSection: {
        marginBottom: 24,
    },
    messageHeaderRow: {
        gap: 16,
        marginBottom: 16,
    },
    messageLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    messageLabel: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#000000',
        textTransform: 'uppercase',
    },
    resetButton: {
        padding: 4,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 4,
    },
    importButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    importButtonText: {
        fontSize: 14,
        fontWeight: '700' as const,
        color: '#F03F33',
        textTransform: 'uppercase',
    },
    messageHint: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 12,
        fontWeight: '500',
    },
    messageInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 16,
        fontSize: 16,
        color: '#000000',
        borderWidth: 3,
        borderColor: '#000000',
        minHeight: 240,
        lineHeight: 24,
        fontWeight: '500',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    emailButton: {
        flex: 1,
        backgroundColor: '#F03F33',
        borderRadius: 4,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    emailButtonText: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
    copyButton: {
        width: 64,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    copyButtonCopied: {
        borderColor: '#000000',
        backgroundColor: '#F0FDF4',
    },
    copyButtonText: {
        display: 'none',
    },
    copyButtonTextCopied: {
        display: 'none',
    },
    buttonPressed: {
        transform: [{ translateX: 2 }, { translateY: 2 }],
        shadowOffset: { width: 2, height: 2 },
        opacity: 1,
    },
    infoBox: {
        backgroundColor: '#EFF6FF',
        borderLeftWidth: 8,
        borderLeftColor: '#3B82F6',
        padding: 24,
        borderRadius: 4,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    infoText: {
        fontSize: 16,
        color: '#000000',
        lineHeight: 24,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        height: '70%',
        paddingTop: 24,
        borderWidth: 4,
        borderColor: '#000000',
        borderBottomWidth: 0,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 3,
        borderBottomColor: '#000000',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '900' as const,
        color: '#000000',
        textTransform: 'uppercase',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#E5E7EB',
        gap: 16,
    },
    noteIcon: {
        width: 48,
        height: 48,
        borderRadius: 4,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000000',
    },
    noteInfo: {
        flex: 1,
        gap: 4,
    },
    noteDate: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '700' as const,
        textTransform: 'uppercase',
    },
    noteSubject: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#000000',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    emptyText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '600',
    },
});
