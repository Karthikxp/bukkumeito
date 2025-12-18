/**
 * RecorderScreen - Book Notes Recording Screen
 * 
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Animated,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { getUserProfile, getUserBooks, type Book } from '../utils/storage';
import { saveNote, getLatestNoteForBook } from '../utils/notes';
import { Note } from '../types/Note';
import { getSignatureImageSource } from '../utils/signature';

const { width, height } = Dimensions.get('window');

type RecorderScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Recorder'>;
  route: RouteProp<RootStackParamList, 'Recorder'>;
};

const RecorderScreen: React.FC<RecorderScreenProps> = ({ navigation, route }) => {
  const { bookTitle: initialBookTitle } = route.params || {};
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [noteText, setNoteText] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [showBookDropdown, setShowBookDropdown] = useState(false);
  const [signatureUri, setSignatureUri] = useState<string | null>(null);
  const [isSignatureStamped, setIsSignatureStamped] = useState(false);
  
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const signatureOpacity = useRef(new Animated.Value(0.3)).current; // Increased from 0.1 to 0.3 for better visibility
  const signatureScale = useRef(new Animated.Value(1)).current;
  const signatureRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserProfile();
    loadUserBooks();
    updateDateTime();
    loadSignature();
  }, []);

  useEffect(() => {
    // Load note for selected book
    if (selectedBook) {
      loadNoteForBook(selectedBook.title);
    }
  }, [selectedBook]);

  const loadUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      if (profile) {
        setUsername(profile.username);
        setProfileImage(profile.profileImageUri);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadSignature = async () => {
    try {
      const signatureSource = await getSignatureImageSource();
      console.log('Signature source:', signatureSource);
      if (signatureSource?.uri) {
        setSignatureUri(signatureSource.uri);
        console.log('Signature loaded successfully');
      } else {
        console.log('No signature found in storage');
      }
    } catch (error) {
      console.error('Error loading signature:', error);
    }
  };

  const loadUserBooks = async () => {
    try {
      const books = await getUserBooks();
      setUserBooks(books);
      
      // Set initial book
      if (initialBookTitle) {
        const book = books.find(b => b.title === initialBookTitle);
        if (book) {
          setSelectedBook(book);
        }
      } else if (books.length > 0) {
        setSelectedBook(books[0]);
      }
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const loadNoteForBook = async (bookTitle: string) => {
    try {
      const latestNote = await getLatestNoteForBook(bookTitle);
      if (latestNote) {
        setCurrentNoteId(latestNote.id);
        setNoteText(latestNote.content);
        
        // Update date/time to when note was created
        const noteDate = new Date(latestNote.createdAt);
        const day = String(noteDate.getDate()).padStart(2, '0');
        const month = String(noteDate.getMonth() + 1).padStart(2, '0');
        const year = noteDate.getFullYear();
        setCurrentDate(`${day}/${month}/${year}`);
        
        const hours = String(noteDate.getHours()).padStart(2, '0');
        const minutes = String(noteDate.getMinutes()).padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
      } else {
        // New note
        setCurrentNoteId(null);
        setNoteText('');
        updateDateTime();
      }
    } catch (error) {
      console.error('Error loading note:', error);
    }
  };

  const updateDateTime = () => {
    const now = new Date();
    
    // Format date as DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    setCurrentDate(`${day}/${month}/${year}`);
    
    // Format time as HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  };

  const handleNoteChange = (text: string) => {
    setNoteText(text);
    
    // Debounced auto-save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      autoSaveNote(text);
    }, 1000); // Save after 1 second of inactivity
  };

  const autoSaveNote = async (content: string) => {
    if (!selectedBook || !content.trim()) return;
    
    try {
      const noteId = currentNoteId || generateNoteId();
      const now = new Date().toISOString();
      
      const note: Note = {
        id: noteId,
        bookId: selectedBook.title,
        bookTitle: selectedBook.title,
        createdAt: currentNoteId ? currentDate + ' ' + currentTime : now,
        content,
      };
      
      await saveNote(note);
      
      if (!currentNoteId) {
        setCurrentNoteId(noteId);
      }
      
      console.log('Note auto-saved for:', selectedBook.title);
    } catch (error) {
      console.error('Error auto-saving note:', error);
    }
  };

  const generateNoteId = (): string => {
    return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setShowBookDropdown(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShareEntry = () => {
    // TODO: Implement share functionality
    console.log('Share entry pressed');
  };

  const handleSignaturePress = () => {
    if (isSignatureStamped) return; // Already stamped
    
    setIsSignatureStamped(true);
    
    // Stamp animation sequence: scale up, rotate slightly, then settle
    Animated.sequence([
      // Quick stamp down
      Animated.parallel([
        Animated.timing(signatureScale, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(signatureRotation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(signatureOpacity, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      // Settle and full opacity
      Animated.parallel([
        Animated.spring(signatureScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(signatureRotation, {
          toValue: 0,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(signatureOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  // Get full title
  const getDisplayTitle = () => {
    if (!selectedBook) return 'Select Book';
    return selectedBook.title;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Small */}
        <View style={styles.logoSmallContainer}>
          <Image
            source={require('../../Asset/ui/logo_small.png')}
            style={styles.logoSmall}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Bukkumeito</Text>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../../Asset/ui/avatar1.png')
            }
            style={styles.profilePicture}
            resizeMode="cover"
          />
          <View style={styles.profileBorderOverlay} pointerEvents="none" />
        </View>

        {/* Back Button with My Notes */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.myNotesTitle}> ~ My Notes</Text>
        </TouchableOpacity>

        {/* Book Dropdown */}
        <TouchableOpacity
          style={styles.bookDropdownContainer}
          onPress={() => setShowBookDropdown(true)}
          activeOpacity={0.8}
        >
          <View style={styles.bookDropdownButton}>
            <Text 
              style={styles.bookDropdownText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {getDisplayTitle()}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </View>
        </TouchableOpacity>

        {/* Share Entry */}
        <TouchableOpacity
          style={styles.shareEntryButton}
          onPress={handleShareEntry}
          activeOpacity={0.7}
        >
          <Text style={styles.shareEntryText}>Share Entry</Text>
        </TouchableOpacity>

        {/* Date */}
        <Text style={styles.dateText}>{currentDate}</Text>

        {/* Time */}
        <Text style={styles.timeText}>{currentTime}</Text>

        {/* Notes Input Area */}
        <TextInput
          style={styles.notesInput}
          value={noteText}
          onChangeText={handleNoteChange}
          placeholder="Threw the eye of a poet..."
          placeholderTextColor="#999999"
          multiline
          textAlignVertical="top"
          autoCorrect={true}
          autoCapitalize="sentences"
        />

        {/* Animated Signature Stamp */}
        {signatureUri ? (
          <TouchableOpacity
            style={styles.signatureContainer}
            onPress={handleSignaturePress}
            activeOpacity={1}
            disabled={isSignatureStamped}
          >
            <Animated.View
              style={{
                opacity: signatureOpacity,
                transform: [
                  { scale: signatureScale },
                  {
                    rotate: signatureRotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-5deg'],
                    }),
                  },
                ],
              }}
            >
              <Image
                source={{ uri: signatureUri }}
                style={styles.signatureImage}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableOpacity>
        ) : (
          <View style={styles.signatureContainer}>
            <Text style={styles.signaturePlaceholder}>
              [Tap to sign]
            </Text>
          </View>
        )}
        
      </ScrollView>

      {/* Book Selection Modal */}
      <Modal
        visible={showBookDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBookDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowBookDropdown(false)}
          />
          
          <View style={styles.bookListContainer}>
            <Text style={styles.bookListTitle}>Select a Book</Text>
            
            <FlatList
              data={userBooks}
              keyExtractor={(item) => item.id}
              style={styles.bookList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.bookListItem,
                    selectedBook?.id === item.id && styles.bookListItemSelected
                  ]}
                  onPress={() => handleBookSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text 
                    style={[
                      styles.bookListItemText,
                      selectedBook?.id === item.id && styles.bookListItemTextSelected
                    ]}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  {item.authors && item.authors.length > 0 && (
                    <Text style={styles.bookListItemAuthor} numberOfLines={1}>
                      {item.authors[0]}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowBookDropdown(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  logoSmallContainer: {
    position: 'absolute',
    left: 30,
    top: 32,
    width: 36.189,
    height: 36.653,
  },
  logoSmall: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    right: 30,
    top: 24,
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
  },
  profilePictureContainer: {
    position: 'absolute',
    right: 30,
    top: height * 0.0714 + 30.64,
    width: 57,
    height: 57,
    borderRadius: 28.5,
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  profileBorderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 28.5,
    borderWidth: 0.32,
    borderColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    left: 30,
    top: height * 0.0714 + 39.64,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  backArrow: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '700',
    marginRight: 8,
  },
  myNotesTitle: {
    fontSize: 19.959,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.3971,
    fontFamily: 'Inter',
  },
  bookDropdownContainer: {
    position: 'absolute',
    left: 30,
    top: height * 0.1429 + 29.29,
  },
  bookDropdownButton: {
    width: 210,
    height: 54.025,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 41.826,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  bookDropdownText: {
    flex: 1,
    fontSize: 19.959,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.3971,
    fontFamily: 'Inter',
    marginRight: 8,
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#000000',
    flexShrink: 0,
  },
  shareEntryButton: {
    position: 'absolute',
    right: 5,
    top: height * 0.1429 + 50.29,
  },
  shareEntryText: {
    fontSize: 12.94,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.9058,
    fontFamily: 'Inter',
    textDecorationLine: 'underline',
    width: 94,
  },
  dateText: {
    position: 'absolute',
    left: 29,
    top: height * 0.2857 - 0.43,
    fontSize: 12.94,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.9058,
    fontFamily: 'Inter-Medium',

  },
  timeText: {
    position: 'absolute',
    left: width * 0.0833,
    top: height * 0.2897 + 18.57,
    fontSize: 12.94,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.9058,
    fontFamily: 'Inter',
  },
  notesInput: {
    position: 'absolute',
    left: 29,
    top: height * 0.3571 + 16.21,
    width: 300,
    minHeight: 400,
    fontSize: 12.959,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.5988,
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  signatureContainer: {
    position: 'absolute',
    right: 30,
    top: height * 0.3571 + 410,
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureImage: {
    width: 120,
    height: 80,
  },
  signaturePlaceholder: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999999',
    fontFamily: 'Inter',
    fontStyle: 'italic',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bookListContainer: {
    width: width * 0.85,
    maxHeight: height * 0.6,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bookListTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
    fontFamily: 'Inter',
    letterSpacing: -1.2,
  },
  bookList: {
    maxHeight: height * 0.4,
  },
  bookListItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  bookListItemSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  bookListItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Inter',
    letterSpacing: -0.8,
    marginBottom: 4,
  },
  bookListItemTextSelected: {
    color: '#ffffff',
  },
  bookListItemAuthor: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666666',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Inter',
  },
});

export default RecorderScreen;

