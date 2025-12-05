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
                headerBackTitle: '',
                headerBackVisible: false, // Keeping this to try ensuring native back is hidden
                headerLeft: () => <BackButton />,
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                        <ThemeToggle />
                        <View style={{ width: 12 }} />
                        <LanguageToggle />
                    </View>
                ),
                headerStyle: {
                    backgroundColor: '#F03F33',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: '900',
                    fontSize: 20,
                },
                contentStyle: {
                    backgroundColor: '#FFFFFF',
                },
                headerShadowVisible: false, // Remove default shadow for cleaner look
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
                                    style={{
                                        borderLeftColor: '#10B981',
                                        borderLeftWidth: 12,
                                        height: 90,
                                        width: '90%',
                                        backgroundColor: '#FFFFFF',
                                        borderWidth: 3,
                                        borderColor: '#000000',
                                        borderRadius: 4,
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 4, height: 4 },
                                        shadowOpacity: 1,
                                        shadowRadius: 0,
                                        elevation: 0,
                                    }}
                                    contentContainerStyle={{ paddingHorizontal: 16 }}
                                    text1Style={{
                                        fontSize: 18,
                                        fontWeight: '900',
                                        color: '#000000',
                                        textTransform: 'uppercase',
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        fontWeight: '600',
                                    }}
                                />
                            ),
                            error: (props) => (
                                <ErrorToast
                                    {...props}
                                    style={{
                                        borderLeftColor: '#EF4444',
                                        borderLeftWidth: 12,
                                        height: 90,
                                        width: '90%',
                                        backgroundColor: '#FFFFFF',
                                        borderWidth: 3,
                                        borderColor: '#000000',
                                        borderRadius: 4,
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 4, height: 4 },
                                        shadowOpacity: 1,
                                        shadowRadius: 0,
                                        elevation: 0,
                                    }}
                                    contentContainerStyle={{ paddingHorizontal: 16 }}
                                    text1Style={{
                                        fontSize: 18,
                                        fontWeight: '900',
                                        color: '#000000',
                                        textTransform: 'uppercase',
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        fontWeight: '600',
                                    }}
                                />
                            ),
                            info: (props) => (
                                <BaseToast
                                    {...props}
                                    style={{
                                        borderLeftColor: '#3B82F6',
                                        borderLeftWidth: 12,
                                        height: 90,
                                        width: '90%',
                                        backgroundColor: '#FFFFFF',
                                        borderWidth: 3,
                                        borderColor: '#000000',
                                        borderRadius: 4,
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 4, height: 4 },
                                        shadowOpacity: 1,
                                        shadowRadius: 0,
                                        elevation: 0,
                                    }}
                                    contentContainerStyle={{ paddingHorizontal: 16 }}
                                    text1Style={{
                                        fontSize: 18,
                                        fontWeight: '900',
                                        color: '#000000',
                                        textTransform: 'uppercase',
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        fontWeight: '600',
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
