import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { useNotes } from '@/contexts/NotesContext';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';
import { useTheme } from '@/contexts/ThemeContext';
import { ScreenHeader } from '@/components/ScreenHeader';

export default function NewNoteScreen() {
    const router = useRouter();
    const { addNote } = useNotes();
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const { colors, activeTheme } = useTheme();
    const { formatDate, formatTime, isFrench } = useDateTimeFormat();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [managerName, setManagerName] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [witnesses, setWitnesses] = useState<string>('');

    const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (date) {
            const newDate = new Date(selectedDate);
            newDate.setFullYear(date.getFullYear());
            newDate.setMonth(date.getMonth());
            newDate.setDate(date.getDate());
            setSelectedDate(newDate);
        }
    };

    const onTimeChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowTimePicker(false);
        }
        if (date) {
            const newDate = new Date(selectedDate);
            newDate.setHours(date.getHours());
            newDate.setMinutes(date.getMinutes());
            setSelectedDate(newDate);
        }
    };

    const [errors, setErrors] = useState<{ managerName?: string; subject?: string }>({});

    const validate = () => {
        const newErrors: { managerName?: string; subject?: string } = {};
        let isValid = true;

        if (!managerName.trim()) {
            newErrors.managerName = t('newNote.errorManager');
            isValid = false;
        }

        if (!subject.trim()) {
            newErrors.subject = t('newNote.errorSubject');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (!validate()) {
            Toast.show({
                type: 'error',
                text1: t('newNote.toastErrorTitle'),
                text2: t('newNote.toastErrorText'),
                position: 'bottom',
            });
            return;
        }

        try {
            const isoDate = selectedDate.toISOString();

            await addNote({
                date: isoDate,
                time: isoDate,
                managerName: managerName.trim(),
                subject: subject.trim(),
                description: description.trim(),
                witnesses: witnesses.trim(),
            });

            Toast.show({
                type: 'success',
                text1: t('newNote.toastSuccessTitle'),
                text2: t('newNote.toastSuccessText'),
                position: 'bottom',
            });

            // Navigate back after a short delay to let the user see the success state
            setTimeout(() => {
                if (router.canGoBack()) {
                    router.back();
                } else {
                    router.replace('/notes');
                }
            }, 500);

        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            Toast.show({
                type: 'error',
                text1: t('newNote.toastSaveErrorTitle'),
                text2: t('newNote.toastSaveErrorText'),
                position: 'bottom',
            });
        }
    };



    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/notes');
        }
    };

    return (
        <View style={[styles.background, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScreenHeader />
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.flex}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                >
                    <ScrollView
                        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <Text style={[styles.header, { color: colors.text }]}>{t('newNote.title')}</Text>

                        <View style={styles.form}>
                            <View style={styles.row}>
                                <View style={styles.halfField}>
                                    <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.date')}</Text>
                                    <Pressable onPress={() => {
                                        setShowDatePicker(!showDatePicker);
                                        setShowTimePicker(false); // Close other picker
                                    }}>
                                        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }, showDatePicker && { borderColor: colors.brand, backgroundColor: colors.background }]}>
                                            <Text style={[styles.inputText, { color: colors.text }]}>
                                                {formatDate(selectedDate)}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>

                                <View style={styles.halfField}>
                                    <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.time')}</Text>
                                    <Pressable onPress={() => {
                                        setShowTimePicker(!showTimePicker);
                                        setShowDatePicker(false); // Close other picker
                                    }}>
                                        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }, showTimePicker && { borderColor: colors.brand, backgroundColor: colors.background }]}>
                                            <Text style={[styles.inputText, { color: colors.text }]}>
                                                {formatTime(selectedDate)}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>

                            {(showDatePicker || showTimePicker) && (
                                <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={selectedDate}
                                            mode="date"
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            onChange={onDateChange}
                                            style={styles.datePicker}
                                            themeVariant={activeTheme}
                                            locale={isFrench ? 'fr-CA' : 'en-US'}
                                        />
                                    )}
                                    {showTimePicker && (
                                        <DateTimePicker
                                            value={selectedDate}
                                            mode="time"
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            is24Hour={true}
                                            onChange={onTimeChange}
                                            style={styles.datePicker}
                                            themeVariant={activeTheme}
                                            locale={isFrench ? 'fr-CA' : 'en-US'}
                                        />
                                    )}
                                </View>
                            )}

                            <View style={styles.field}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.managerLabel')}</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }, errors.managerName && styles.inputError]}
                                    value={managerName}
                                    onChangeText={(text) => {
                                        setManagerName(text);
                                        if (errors.managerName) {
                                            setErrors({ ...errors, managerName: undefined });
                                        }
                                    }}
                                    placeholder={t('newNote.managerPlaceholder')}
                                    placeholderTextColor={colors.subtitle}
                                />
                                {errors.managerName && (
                                    <Text style={styles.errorText}>{errors.managerName}</Text>
                                )}
                            </View>

                            <View style={styles.field}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.subjectLabel')}</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }, errors.subject && styles.inputError]}
                                    value={subject}
                                    onChangeText={(text) => {
                                        setSubject(text);
                                        if (errors.subject) {
                                            setErrors({ ...errors, subject: undefined });
                                        }
                                    }}
                                    placeholder={t('newNote.subjectPlaceholder')}
                                    placeholderTextColor={colors.subtitle}
                                />
                                {errors.subject && (
                                    <Text style={styles.errorText}>{errors.subject}</Text>
                                )}
                            </View>

                            <View style={styles.field}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.descriptionLabel')}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                                    value={description}
                                    onChangeText={setDescription}
                                    placeholder={t('newNote.descriptionPlaceholder')}
                                    placeholderTextColor={colors.subtitle}
                                    multiline
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                />
                            </View>

                            <View style={styles.field}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.witnessesLabel')}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                                    value={witnesses}
                                    onChangeText={setWitnesses}
                                    placeholder={t('newNote.witnessesPlaceholder')}
                                    placeholderTextColor={colors.subtitle}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.saveButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveButtonText}>{t('newNote.saveButton')}</Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.cancelButton,
                                    { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder },
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={handleBack}
                            >
                                <Text style={[styles.cancelButtonText, { color: colors.secondaryButtonText }]}>{t('newNote.cancelButton')}</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
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
    flex: {
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
    form: {
        gap: 24,
        marginBottom: 32,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    halfField: {
        flex: 1,
    },
    field: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '900' as const,
        color: '#000000',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 16,
        fontSize: 18,
        color: '#000000',
        borderWidth: 3,
        borderColor: '#000000',
        fontWeight: '600',
    },
    inputError: {
        borderColor: '#EF4444',
        backgroundColor: '#FEF2F2',
    },
    errorText: {
        fontSize: 14,
        color: '#EF4444',
        marginTop: 4,
        fontWeight: '700',
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 16,
        borderWidth: 3,
        borderColor: '#000000',
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '600',
    },
    textArea: {
        minHeight: 140,
        paddingTop: 16,
    },
    buttonsContainer: {
        gap: 16,
        marginTop: 'auto' as const,
    },
    saveButton: {
        backgroundColor: '#F03F33',
        borderRadius: 4,
        padding: 20,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    saveButtonText: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
    cancelButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 20,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    cancelButtonText: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#000000',
        textTransform: 'uppercase',
    },
    inputActive: {
        borderColor: '#F03F33',
        backgroundColor: '#FEF2F2',
    },
    datePicker: {
        alignSelf: 'center',
    },
    pickerContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: -8,
        alignItems: 'center',
        paddingVertical: 12,
        borderWidth: 3,
        borderColor: '#000000',
    },
    buttonPressed: {
        transform: [{ translateX: 2 }, { translateY: 2 }],
        shadowOffset: { width: 2, height: 2 },
        opacity: 1,
    },
});
