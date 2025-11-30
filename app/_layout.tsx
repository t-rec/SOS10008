// template
import { NotesProvider } from '@/contexts/NotesContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

import BackButton from '@/components/BackButton';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import './i18n/i18n'; // Initialize i18n


import { Footer } from '@/components/Footer';

function RootLayoutNav() {
    return (
        <View style={{ flex: 1 }}>
            <Stack screenOptions={{
                headerBackTitle: '', // Hide the default "Retour" text
                headerLeft: () => <BackButton />, // Use our custom button
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                        <ThemeToggle />
                        <View style={{ width: 12 }} />
                        <LanguageToggle />
                    </View>
                ), // Add language toggle to all screens with spacing
            }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="emergency" options={{ headerShown: true }} />
                <Stack.Screen name="phrases" options={{ headerShown: true }} />
                <Stack.Screen name="new-note" options={{ headerShown: true }} />
                <Stack.Screen name="notes" options={{ headerShown: true }} />
                <Stack.Screen name="note/[id]" options={{ headerShown: true }} />
                <Stack.Screen name="rights" options={{ headerShown: true }} />
                <Stack.Screen name="contact" options={{ headerShown: true }} />
            </Stack>
            <Footer />
        </View>
    );
}

export default function RootLayout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
                <NotesProvider>
                    <ThemeProvider>
                        <RootLayoutNav />
                        <Toast config={{
                            success: (props) => (
                                <BaseToast
                                    {...props}
                                    style={{ borderLeftColor: '#10B981', height: 80, width: '90%' }}
                                    contentContainerStyle={{ paddingHorizontal: 15 }}
                                    text1Style={{
                                        fontSize: 18,
                                        fontWeight: '700'
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#6B7280'
                                    }}
                                />
                            ),
                            error: (props) => (
                                <ErrorToast
                                    {...props}
                                    style={{ borderLeftColor: '#EF4444', height: 80, width: '90%' }}
                                    contentContainerStyle={{ paddingHorizontal: 15 }}
                                    text1Style={{
                                        fontSize: 18,
                                        fontWeight: '700'
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#6B7280'
                                    }}
                                />
                            ),
                            info: (props) => (
                                <BaseToast
                                    {...props}
                                    style={{ borderLeftColor: '#6B7280', height: 80, width: '90%' }}
                                    contentContainerStyle={{ paddingHorizontal: 15 }}
                                    text1Style={{
                                        fontSize: 18,
                                        fontWeight: '700'
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#6B7280'
                                    }}
                                />
                            )
                        }} />
                    </ThemeProvider>
                </NotesProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
