import { TriangleAlert } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmationModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export default function DeleteConfirmationModal({
    visible,
    onCancel,
    onConfirm,
    title,
    message,
}: DeleteConfirmationModalProps) {
    const { t } = useTranslation();

    const modalTitle = title || t('deleteModal.title');
    const modalMessage = message || t('deleteModal.message');
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <Pressable style={styles.backdrop} onPress={onCancel} />
                <View style={styles.modalView}>
                    <View style={styles.iconContainer}>
                        <TriangleAlert size={32} color="#EF4444" />
                    </View>

                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    <Text style={styles.modalText}>{modalMessage}</Text>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonCancel]}
                            onPress={onCancel}
                        >
                            <Text style={styles.textStyleCancel}>{t('deleteModal.cancel')}</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonDelete]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.textStyleDelete}>{t('deleteModal.delete')}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 16,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#1F2937',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6B7280',
        lineHeight: 24,
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    button: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCancel: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    buttonDelete: {
        backgroundColor: '#EF4444',
        borderWidth: 2,
        borderColor: '#EF4444',
    },
    textStyleCancel: {
        color: '#374151',
        fontWeight: '600',
        fontSize: 16,
    },
    textStyleDelete: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
