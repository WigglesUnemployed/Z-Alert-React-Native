import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { createAIService } from '@/utils/aiService';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function MamboAIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello there? I'm Mambo, Your personal safety assistant. how can you help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Initialize AI service
  const aiService = createAIService();

  // Handle keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      // Scroll to bottom when keyboard appears
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Add delay to simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get AI response
      const aiResponse = await aiService.sendMessage(userMessage.text);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Service Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    Alert.alert('Voice Input', 'Voice input feature coming soon!');
  };

  const handleBack = () => {
    router.back();
  };

  // Animated "Thinking" wave component
  const ThinkingWave = ({ text = 'Thinking' }: { text?: string }) => {
    const letters = text.split('');
    const animatedValues = useRef(letters.map(() => new Animated.Value(0))).current;

    useEffect(() => {
      const animations = animatedValues.map((value, index) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration: 450,
              delay: index * 140,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: 450,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
          ])
        )
      );
      animations.forEach((anim) => anim.start());
      return () => {
        animations.forEach((anim) => (anim as any).stop && (anim as any).stop());
        animatedValues.forEach((v) => v.setValue(0));
      };
    }, [animatedValues, text]);

    return (
      <ThemedView style={{ flexDirection: 'row' }}>
        {letters.map((char, index) => {
          const translateY = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1],
          });
          const opacity = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1],
          });
          return (
            <Animated.Text
              key={`${char}-${index}`}
              style={[styles.typingDots, { transform: [{ translateY }], opacity }]}
            >
              {char}
            </Animated.Text>
          );
        })}
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedView style={styles.headerTitleContainer}>
          <ThemedText type="title" style={styles.headerTitle}>
            Mambo AI
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            puntos 1.0
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Chat Area */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatArea} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <ThemedView key={message.id} style={styles.messageContainer}>
            {message.isUser ? (
              <ThemedView style={styles.userMessageContainer}>
                <ThemedView style={styles.messageContent}>
                  <ThemedView style={styles.userBubble}>
                    <ThemedText style={styles.messageText}>{message.text}</ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            ) : (
              <ThemedView style={styles.aiMessageContainer}>
                <ThemedView style={styles.messageContent}>
                  <ThemedView style={styles.aiAvatar}>
                    <Image
                      source={require('../../assets/images/Mlogo.png')}
                      style={styles.aiAvatarImage}
                      resizeMode="cover"
                    />
                  </ThemedView>
                  <ThemedView style={styles.aiBubble}>
                    <ThemedText style={styles.messageText}>{message.text}</ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            )}
          </ThemedView>
        ))}

        {/* AI typing indicator (ChatGPT-like) */}
        {isLoading && (
          <ThemedView style={styles.messageContainer}>
            <ThemedView style={styles.aiMessageContainer}>
              <ThemedView style={styles.messageContent}>
                <ThemedView style={styles.aiAvatar}>
                  <Image
                    source={require('../../assets/images/z-alertlogo.png')}
                    style={styles.aiAvatarImage}
                    resizeMode="cover"
                  />
                </ThemedView>
                <ThemedView style={styles.aiThinkingContainer}>
                  <ThinkingWave text="Thinking" />
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        )}
      </ScrollView>

      {/* Input Bar with Keyboard Avoidance */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ThemedView style={[styles.inputContainer, { marginBottom: keyboardHeight > 0 ? 0 : 0 }]}>
          <ThemedView style={styles.inputBar}>
            <TextInput
              style={styles.textInput}
              placeholder="Chat Mambo..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity style={styles.voiceButton} onPress={handleVoiceInput}>
              <IconSymbol name="mic.fill" size={20} color="#FF0000" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sendButton, isLoading && styles.disabledButton]} 
              onPress={handleSend}
              disabled={isLoading}
            >
              <IconSymbol 
                name={isLoading ? "hourglass" : "paperplane.fill"} 
                size={20} 
                color={isLoading ? "#999" : "#FF0000"} 
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

// Styles AI Chat
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    height: 95,
  },
  backButton: {
    padding: 8,
    marginTop: -5,
    zIndex: 1,
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    top: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  messageContainer: {
    marginBottom: 25,
  },
  messageHeader: {
    marginBottom: 8,
  },
  messageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  aiAvatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: '#E5E5E5',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 15,
    maxWidth: '80%',
    borderBottomRightRadius: 4,
    marginLeft: 10,
  },
  aiBubble: {
    backgroundColor: '#FFE4E6',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '85%',
    borderBottomLeftRadius: 4,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFE4E6',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  aiThinkingContainer: {
    maxWidth: '85%',
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 20,
  },
  typingDots: {
    fontSize: 16,
    color: '#6B7280',
    letterSpacing: 2,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFE4E6',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    maxHeight: 100,
    paddingVertical: 5,
  },
  voiceButton: {
    padding: 8,
    marginLeft: 10,
  },
  sendButton: {
    padding: 8,
    marginLeft: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
