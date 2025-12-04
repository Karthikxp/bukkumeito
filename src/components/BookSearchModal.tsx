/**
 * BookSearchModal - Book Search with Autocomplete
 * 
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  Animated,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface BookResult {
  id: string;
  title: string;
  authors?: string[];
  categories?: string[];
  coverUrl?: string;
  publishedDate?: string;
}

interface BookSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectBook: (book: BookResult) => void;
}

// Helper function to get the highest quality image URL
const getHighQualityImageUrl = (url: string, bookId?: string): string => {
  if (!url) return url;
  
  // If we have a book ID, try to construct the more reliable publisher content URL
  if (bookId && url.includes('books.google.com')) {
    return `https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w400-h600`;
  }
  
  return url
    .replace('http://', 'https://')
    .replace('zoom=1', 'zoom=0')      // zoom=0 gives original/highest quality
    .replace('zoom=2', 'zoom=0')
    .replace('zoom=3', 'zoom=0')
    .replace('zoom=4', 'zoom=0')
    .replace('zoom=5', 'zoom=0')
    .replace('&edge=curl', '')         // Remove edge curl for cleaner image
    .replace('img=1', 'img=1&fife=w400-h600'); // Request higher resolution via fife parameter
};

const BookSearchModal: React.FC<BookSearchModalProps> = ({
  visible,
  onClose,
  onSelectBook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BookResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputContainerPosition = useRef(new Animated.Value(0)).current;
  const cursorOpacity = useRef(new Animated.Value(1)).current;
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state when modal visibility changes
  useEffect(() => {
    if (!visible) {
      setSearchQuery('');
      setSearchResults([]);
      setIsSearching(false);
      setIsFocused(false);
    }
  }, [visible]);

  useEffect(() => {
    // Blinking cursor animation
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 530,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 530,
          useNativeDriver: true,
        }),
      ])
    );

    if (isFocused) {
      blinkAnimation.start();
    } else {
      blinkAnimation.stop();
      cursorOpacity.setValue(0);
    }

    return () => blinkAnimation.stop();
  }, [isFocused]);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      (e) => {
        Animated.spring(inputContainerPosition, {
          toValue: -e.endCoordinates.height / 2,
          useNativeDriver: true,
          friction: 8,
        }).start();
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        Animated.spring(inputContainerPosition, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
        }).start();
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    console.log('Search query changed:', searchQuery, 'Length:', searchQuery.length);
    
    if (searchQuery.length > 2) {
      console.log('Starting debounced search...');
      // Debounce search
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        console.log('Executing search for:', searchQuery);
        searchBooks(searchQuery);
      }, 500);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const searchBooks = async (query: string) => {
    setIsSearching(true);
    try {
      // Using Google Books API with API key
      const apiKey = 'AIzaSyAP5A9ACkpKbEbg3j9cTyPPZDUzvhtGoDc';
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&key=${apiKey}&maxResults=10`
      );
      const data = await response.json();
      
      console.log('API Response received, has items:', !!data.items, 'count:', data.items?.length);

      if (data.error) {
        console.error('API Error:', data.error);
        setSearchResults([]);
      } else if (data.items && data.items.length > 0) {
        console.log('Mapping', data.items.length, 'books...');
        const books: BookResult[] = data.items.map((item: any) => {
          const volumeInfo = item.volumeInfo || {};
          
          // Get the highest quality image available
          let coverUrl = null;
          const imageLinks = volumeInfo.imageLinks;
          
          if (imageLinks) {
            // Try to get the largest available image
            const imageUrl = imageLinks.extraLarge || 
                            imageLinks.large || 
                            imageLinks.medium || 
                            imageLinks.small || 
                            imageLinks.thumbnail || 
                            imageLinks.smallThumbnail;
            
            if (imageUrl) {
              coverUrl = getHighQualityImageUrl(imageUrl, item.id);
            }
          }
          
          const book = {
            id: item.id,
            title: volumeInfo.title || 'Unknown Title',
            authors: volumeInfo.authors || [],
            categories: volumeInfo.categories || [],
            coverUrl,
            publishedDate: volumeInfo.publishedDate,
          };
          return book;
        });
        console.log('Mapped books:', books.length, 'Setting to state...');
        console.log('First book:', books[0]?.title);
        setSearchResults(books);
        console.log('State updated with books');
      } else {
        console.log('No items in response');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectBook = (book: BookResult) => {
    Keyboard.dismiss();
    onSelectBook(book);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleClose = () => {
    Keyboard.dismiss();
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />

        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY: inputContainerPosition }],
            },
          ]}
        >
          {/* Title */}
          <Text style={styles.title}>Add a Book</Text>

          {/* Search Input */}
          <View style={styles.inputContainer}>
            {!searchQuery && !isFocused && (
              <Text style={styles.placeholder}>Search for a book...</Text>
            )}

            <TextInput
              style={styles.input}
              value={searchQuery}
              onChangeText={(text) => {
                console.log('Text input changed:', text);
                setSearchQuery(text);
              }}
              onFocus={() => {
                console.log('Input focused');
                setIsFocused(true);
              }}
              onBlur={() => {
                console.log('Input blurred');
                setIsFocused(false);
              }}
              placeholder=""
              autoCorrect={false}
              autoCapitalize="words"
              returnKeyType="search"
              selectionColor="#000000"
              caretHidden={true}
              autoFocus={true}
            />

            {isFocused && (
              <Animated.View
                style={[styles.blinkingCursor, { opacity: cursorOpacity }]}
              />
            )}
          </View>

          {/* Help Text */}
          <Text style={styles.helpText}>
            {searchQuery.length > 0 && searchQuery.length <= 2
              ? `Type ${3 - searchQuery.length} more character${3 - searchQuery.length === 1 ? '' : 's'} to search`
              : 'Search by title, author, or ISBN'}
          </Text>

          {/* Search Results Container */}
          <View style={styles.resultsContainer}>
            {(() => {
              console.log('Render check - isSearching:', isSearching, 'results count:', searchResults.length);
              return null;
            })()}
            {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000000" />
              <Text style={{marginTop: 10}}>Searching...</Text>
            </View>
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              style={styles.resultsList}
              contentContainerStyle={styles.resultsContent}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <Text style={{padding: 10}}>Found {searchResults.length} books</Text>
              )}
              renderItem={({ item }) => {
                console.log('Rendering item:', item.title);
                return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleSelectBook(item)}
                  activeOpacity={0.7}
                >
                  {item.coverUrl ? (
                    <Image
                      source={{ 
                        uri: item.coverUrl,
                        cache: 'force-cache',
                      }}
                      style={styles.resultCover}
                      resizeMode="cover"
                      fadeDuration={200}
                    />
                  ) : (
                    <View style={styles.resultCoverPlaceholder}>
                      <Text style={styles.placeholderText}>?</Text>
                    </View>
                  )}

                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    {item.authors && item.authors.length > 0 && (
                      <Text style={styles.resultAuthor} numberOfLines={1}>
                        {item.authors.join(', ')}
                      </Text>
                    )}
                    {item.publishedDate && (
                      <Text style={styles.resultDate}>
                        {item.publishedDate.split('-')[0]}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
              }}
            />
          ) : searchQuery.length > 2 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No books found</Text>
            </View>
          ) : null}
          </View>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    width: width * 0.85,
    height: height * 0.75,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.68,
    fontFamily: 'Inter',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  placeholder: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
    letterSpacing: -0.98,
    fontFamily: 'Inter',
    pointerEvents: 'none',
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -1.12,
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'center',
    paddingVertical: 0,
  },
  blinkingCursor: {
    width: 2,
    height: 20,
    backgroundColor: '#000000',
    marginLeft: 2,
  },
  helpText: {
    fontSize: 11,
    fontWeight: '300',
    color: '#666666',
    letterSpacing: -0.77,
    fontFamily: 'Inter',
    textAlign: 'center',
    marginBottom: 16,
  },
  resultsContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  resultsList: {
    flex: 1,
    width: '100%',
  },
  resultsContent: {
    paddingBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultCover: {
    width: 50,
    height: 75,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  resultCoverPlaceholder: {
    width: 50,
    height: 75,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    color: '#cccccc',
    fontWeight: '300',
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.98,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  resultAuthor: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: -0.84,
    fontFamily: 'Inter',
    marginBottom: 2,
  },
  resultDate: {
    fontSize: 11,
    fontWeight: '300',
    color: '#999999',
    fontFamily: 'Inter',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    fontFamily: 'Inter',
  },
  closeButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1,
    fontFamily: 'Inter',
  },
});

export default BookSearchModal;

