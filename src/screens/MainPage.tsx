/**
 * MainPage - Main application screen
 * 
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { getUserProfile, getUserBooks, addBook, removeBook, type Book } from '../utils/storage';
import BookSearchModal from '../components/BookSearchModal';

const { width, height } = Dimensions.get('window');

type MainPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'MainPage'>;
};

// Suggested books with high-quality covers
const SUGGESTED_BOOKS = [
  {
    id: 'sugg-1',
    title: '1984',
    authors: ['George Orwell'],
    coverUrl: 'https://books.google.com/books/publisher/content/images/frontcover/kotPYEqx7kMC?fife=w400-h600',
    publishedDate: '1949',
  },
  {
    id: 'sugg-2',
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    coverUrl: 'https://books.google.com/books/publisher/content/images/frontcover/iUv5AwAAQBAJ?fife=w400-h600',
    publishedDate: '1925',
  },
  {
    id: 'sugg-3',
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    coverUrl: 'https://books.google.com/books/publisher/content/images/frontcover/PGR2AwAAQBAJ?fife=w400-h600',
    publishedDate: '1960',
  },
  {
    id: 'sugg-4',
    title: 'Pride and Prejudice',
    authors: ['Jane Austen'],
    coverUrl: 'https://books.google.com/books/publisher/content/images/frontcover/s1gVAAAAYAAJ?fife=w400-h600',
    publishedDate: '1813',
  },
  {
    id: 'sugg-5',
    title: 'Harry Potter and the Philosopher\'s Stone',
    authors: ['J.K. Rowling'],
    coverUrl: 'https://books.google.com/books/publisher/content/images/frontcover/wrOQLV6xB-wC?fife=w400-h600',
    publishedDate: '1997',
  },
  {
    id: 'sugg-6',
    title: 'The Hobbit',
    authors: ['J.R.R. Tolkien'],
    coverUrl: 'https://books.google.com/books/publisher/content/images/frontcover/hFfhrCWiLSMC?fife=w400-h600',
    publishedDate: '1937',
  },
];

const MainPage: React.FC<MainPageProps> = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [bookSearchVisible, setBookSearchVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadUserProfile();
    loadUserBooks();
  }, []);

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

  const loadUserBooks = async () => {
    try {
      const userBooks = await getUserBooks();
      setBooks(userBooks);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const handleAddBook = () => {
    setBookSearchVisible(true);
  };

  const handleSelectBook = async (book: any) => {
    try {
      await addBook({
        id: book.id,
        title: book.title,
        authors: book.authors,
        coverUrl: book.coverUrl,
        publishedDate: book.publishedDate,
      });
      await loadUserBooks();
      setBookSearchVisible(false);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleRemoveBook = async (bookId: string) => {
    try {
      await removeBook(bookId);
      await loadUserBooks();
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  const handleModeSwitch = () => {
    // TODO: Implement mode switch functionality
    console.log('Mode switch pressed');
  };

  return (
    <View style={styles.container}>
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

      {/* Mode Switch - Your Collection */}
      <TouchableOpacity
        style={styles.modeSwitchContainer}
        onPress={handleModeSwitch}
        activeOpacity={0.8}
      >
        <View style={styles.modeSwitchButton}>
          <Text style={styles.modeSwitchText}>Your Collection</Text>
          <View style={styles.dropdownArrow}>
            <Text style={styles.dropdownArrowText}>▼</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Continue Reading Section */}
      <Text style={styles.continueReadingTitle}>Continue Reading</Text>

      {/* Reading Frame - Horizontal Scroll */}
      <View style={styles.readingFrameWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.readingFrame}
          contentContainerStyle={styles.readingFrameContent}
        >
          {/* Add a Book Card */}
          <TouchableOpacity
            style={styles.addBookCard}
            onPress={handleAddBook}
            activeOpacity={0.7}
          >
            {/* Text Elements */}
            <Text style={styles.addBookTitle}>Add a Book</Text>
            <Text style={styles.plusSign}>+</Text>
            <Text style={styles.importText}>import PDF or EPUB</Text>

            {/* Embedded WebView */}
            <View style={styles.embeddedBox} pointerEvents="none">
              <WebView
                source={{ uri: 'https://davvcdn.lon1.cdn.digitaloceanspaces.com/6a35f22287536191e502392b00ce6431/7425cbadee753504ccf8.html' }}
                style={styles.embeddedWebView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={['*']}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                automaticallyAdjustContentInsets={false}
                bounces={false}
                allowsInlineMediaPlayback={true}
                scalesPageToFit={false}
                allowsLinkPreview={false}
                injectedJavaScript={`
                  const meta = document.createElement('meta');
                  meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
                  meta.setAttribute('name', 'viewport');
                  document.getElementsByTagName('head')[0].appendChild(meta);
                  
                  document.addEventListener('gesturestart', function(e) {
                    e.preventDefault();
                  });
                  document.addEventListener('touchmove', function(e) {
                    if (e.scale !== 1) { e.preventDefault(); }
                  }, { passive: false });
                `}
              />
            </View>

            {/* Border Overlay */}
            <View style={styles.borderOverlay} pointerEvents="none" />
          </TouchableOpacity>

          {/* User's Books */}
          {books.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() => navigation.navigate('Recorder', { bookTitle: book.title })}
              activeOpacity={0.9}
            >
              {book.coverUrl && !imageErrors.has(book.id) ? (
                <Image
                  source={{ 
                    uri: book.coverUrl,
                    cache: 'force-cache',
                  }}
                  style={styles.bookCover}
                  resizeMode="cover"
                  fadeDuration={200}
                  onError={() => {
                    console.log('Image load error for book:', book.title);
                    setImageErrors(prev => new Set(prev).add(book.id));
                  }}
                />
              ) : (
                <View style={styles.bookCoverPlaceholder}>
                  <Text style={styles.bookCoverText}>?</Text>
                </View>
              )}
              
              <Text style={styles.bookTitle} numberOfLines={2}>
                {book.title}
              </Text>
              
              {book.authors && book.authors.length > 0 && (
                <Text style={styles.bookAuthor} numberOfLines={1}>
                  {book.authors[0]}
                </Text>
              )}

              {/* Remove button */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleRemoveBook(book.id);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Suggestions Section */}
      <Text style={styles.suggestionsTitle}>Suggestions</Text>

      {/* Suggested Frame - Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.suggestedFrame}
        contentContainerStyle={styles.suggestedFrameContent}
      >
        {SUGGESTED_BOOKS.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={styles.suggestionCard}
            onPress={async () => {
              try {
                await addBook(book);
                await loadUserBooks();
              } catch (error) {
                console.error('Error adding suggested book:', error);
              }
            }}
            activeOpacity={0.7}
          >
            {book.coverUrl && !imageErrors.has(book.id) ? (
              <Image
                source={{ 
                  uri: book.coverUrl,
                  cache: 'force-cache',
                }}
                style={styles.suggestionCover}
                resizeMode="cover"
                fadeDuration={200}
                onError={() => {
                  console.log('Image load error for suggested book:', book.title);
                  setImageErrors(prev => new Set(prev).add(book.id));
                }}
              />
            ) : (
              <View style={styles.suggestionCoverPlaceholder}>
                <Text style={styles.bookCoverText}>?</Text>
              </View>
            )}
            
            <Text style={styles.suggestionTitle} numberOfLines={2}>
              {book.title}
            </Text>
            
            {book.authors && book.authors.length > 0 && (
              <Text style={styles.suggestionAuthor} numberOfLines={1}>
                {book.authors[0]}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Book Search Modal */}
      <BookSearchModal
        visible={bookSearchVisible}
        onClose={() => setBookSearchVisible(false)}
        onSelectBook={handleSelectBook}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
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
  modeSwitchContainer: {
    position: 'absolute',
    left: 30,
    top: height * 0.0714 + 32.64,
  },
  modeSwitchButton: {
    backgroundColor: '#000000',
    height: 54.025,
    width: 210,
    borderRadius: 41.826,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modeSwitchText: {
    fontSize: 19.959,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1.3971,
    fontFamily: 'Inter',
    marginRight: 8,
  },
  dropdownArrow: {
    marginLeft: 4,
  },
  dropdownArrowText: {
    fontSize: 10,
    color: '#ffffff',
  },
  continueReadingTitle: {
    position: 'absolute',
    left: 29,
    top: height * 0.2143 + 9.93,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.4,
    fontFamily: 'Inter',
  },
  readingFrameWrapper: {
    position: 'absolute',
    left: 0,
    top: height * 0.2143 + 28.93,
    width: width,
    height: 295,
  },
  readingFrame: {
    width: width,
    height: 295,
  },
  readingFrameContent: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 34,
  },
  addBookCard: {
    width: 159,
    height: 227,
    position: 'relative',
    marginRight: 20,
    borderRadius: 13,
    overflow: 'hidden',
  },
  addBookTitle: {
    position: 'absolute',
    left: 40,
    top: 35,
    fontSize: 15.584,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.0909,
    fontFamily: 'Inter',
  },
  plusSign: {
    position: 'absolute',
    left: 62,
    top: 131,
    fontSize: 53.761,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -3.7633,//inter thin
    fontFamily: 'Inter-Thin',
  },
  importText: {
    position: 'absolute',
    left: 32,
    top: 204,
    fontSize: 11.129,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.779,
    fontFamily: 'Inter',
  },
  embeddedBox: {
    position: 'absolute',
    left: 0,
    top: 70,
    width: 159,
    height: 106,
    overflow: 'hidden',
  },
  embeddedWebView: {
    width: 159,
    height: 106,
    backgroundColor: 'transparent',
  },
  borderOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 159,
    height: 227,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#000000',
  },
  bookCard: {
    width: 159,
    height: 227,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    marginRight: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  bookCover: {
    width: '100%',
    height: 180,
  },
  bookCoverPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCoverText: {
    fontSize: 48,
    color: '#cccccc',
    fontWeight: '300',
  },
  bookTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.84,
    fontFamily: 'Inter',
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  bookAuthor: {
    fontSize: 10,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: -0.7,
    fontFamily: 'Inter',
    paddingHorizontal: 8,
    paddingTop: 2,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '400',
    lineHeight: 20,
  },
  suggestionsTitle: {
    position: 'absolute',
    left: 29,
    top: height * 0.6029 + 1.79,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.4,
    fontFamily: 'Inter',
  },
  suggestedFrame: {
    position: 'absolute',
    left: 0,
    top: height * 0.6429 + 20.79,
    width: width,
    height: 271,
  },
  suggestedFrameContent: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  suggestionCard: {
    width: 159,
    height: 227,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    marginRight: 20,
    overflow: 'hidden',
  },
  suggestionCover: {
    width: '100%',
    height: 180,
  },
  suggestionCoverPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.84,
    fontFamily: 'Inter',
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  suggestionAuthor: {
    fontSize: 10,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: -0.7,
    fontFamily: 'Inter',
    paddingHorizontal: 8,
    paddingTop: 2,
  },
});

export default MainPage;

