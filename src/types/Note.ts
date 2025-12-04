/**
 * Note Type Definition
 * 
 * @format
 */

export type Note = {
  id: string;
  bookId: string;        // Using book title as ID for now
  bookTitle: string;
  createdAt: string;     // ISO string
  content: string;
};



