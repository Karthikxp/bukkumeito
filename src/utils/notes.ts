/**
 * Notes Storage Utility Functions
 * Helper functions to manage book notes
 * 
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types/Note';

const NOTES_KEY = 'bukkumeito_notes_v1';

/**
 * Get all notes from storage
 */
async function getAllNotes(): Promise<Note[]> {
  try {
    const raw = await AsyncStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read notes', e);
    return [];
  }
}

/**
 * Save or update a note
 */
export async function saveNote(note: Note): Promise<void> {
  try {
    const notes = await getAllNotes();
    const idx = notes.findIndex(n => n.id === note.id);
    
    if (idx >= 0) {
      notes[idx] = note; // update existing
    } else {
      notes.push(note);  // create new
    }
    
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save note', e);
    throw e;
  }
}

/**
 * Get all notes for a specific book
 */
export async function getNotesForBook(bookId: string): Promise<Note[]> {
  try {
    const notes = await getAllNotes();
    return notes.filter(n => n.bookId === bookId);
  } catch (e) {
    console.warn('Failed to get notes for book', e);
    return [];
  }
}

/**
 * Get the latest note for a specific book
 */
export async function getLatestNoteForBook(bookId: string): Promise<Note | null> {
  try {
    const notes = await getNotesForBook(bookId);
    if (notes.length === 0) return null;
    
    // Sort by createdAt descending and return the latest
    const sorted = notes.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sorted[0];
  } catch (e) {
    console.warn('Failed to get latest note', e);
    return null;
  }
}

/**
 * Delete a note by ID
 */
export async function deleteNote(id: string): Promise<void> {
  try {
    const notes = await getAllNotes();
    const filtered = notes.filter(n => n.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete note', e);
    throw e;
  }
}

/**
 * Get all unique book IDs that have notes
 */
export async function getBooksWithNotes(): Promise<string[]> {
  try {
    const notes = await getAllNotes();
    const bookIds = new Set(notes.map(n => n.bookId));
    return Array.from(bookIds);
  } catch (e) {
    console.warn('Failed to get books with notes', e);
    return [];
  }
}

