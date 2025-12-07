import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
} from 'react-native';

const { width } = Dimensions.get('window');

interface AnimatedSplashProps {
    onComplete: () => void;
}

export function AnimatedSplash({ onComplete }: AnimatedSplashProps) {
    // Animation values
    const iconOpacity = useRef(new Animated.Value(0)).current;
    const iconScale = useRef(new Animated.Value(0.9)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const containerOpacity = useRef(new Animated.Value(1)).current;

    // Main animation sequence
    useEffect(() => {
        Animated.sequence([
            // 1. Icon fades in and scales up gently
            Animated.parallel([
                Animated.timing(iconOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.spring(iconScale, {
                    toValue: 1,
                    friction: 10,
                    tension: 20,
                    useNativeDriver: true,
                }),
            ]),
            // 2. Text fades in slower
            Animated.delay(300),
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            // 3. Hold
            Animated.delay(1000),
            Animated.timing(containerOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onComplete();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
            <StatusBar barStyle="light-content" backgroundColor="#1A0505" />
            <LinearGradient
                colors={['#2A0505', '#150000', '#000000']}
                locations={[0, 0.4, 1]}
                style={styles.gradient}
            >
                {/* Icon with animation */}
                <Animated.View
                    style={[
                        styles.iconContainer,
                        {
                            opacity: iconOpacity,
                            transform: [{ scale: iconScale }],
                        },
                    ]}
                >
                    <Image
                        source={require('@/assets/images/10008-Icon.png')}
                        style={styles.icon}
                        contentFit="contain"
                    />
                </Animated.View>

                {/* App name text */}
                <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
                    <Text style={styles.appName}>SOS 10008</Text>
                </Animated.View>
            </LinearGradient>
        </Animated.View>
    );
}

const ICON_SIZE = width * 0.45;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
    textContainer: {
        marginTop: 48,
    },
    appName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: 8,
        textTransform: 'uppercase',
    },
});
