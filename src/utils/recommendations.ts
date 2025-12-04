import { Book } from './storage';

export interface RecommendationBook {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
  coverUrl: string;
  publishedDate: string;
  description?: string;
}

// A curated list of books for recommendations
// Using Open Library Covers API where possible for better reliability
// Format: https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg
export const BOOK_POOL: RecommendationBook[] = [
  // Fiction / Classics
  {
    id: 'kotPYEqx7kMC', // 1984
    title: '1984',
    authors: ['George Orwell'],
    categories: ['Fiction', 'Science Fiction', 'Dystopian'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    publishedDate: '1949',
  },
  {
    id: 'iUv5AwAAQBAJ', // Great Gatsby
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    categories: ['Fiction', 'Classics', 'Literary Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    publishedDate: '1925',
  },
  {
    id: 'PGR2AwAAQBAJ', // To Kill a Mockingbird
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    categories: ['Fiction', 'Classics', 'Historical Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
    publishedDate: '1960',
  },
  {
    id: 's1gVAAAAYAAJ', // Pride and Prejudice
    title: 'Pride and Prejudice',
    authors: ['Jane Austen'],
    categories: ['Fiction', 'Classics', 'Romance'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    publishedDate: '1813',
  },
  {
    id: 'FzVcBgAAQBAJ', // Catcher in the Rye
    title: 'The Catcher in the Rye',
    authors: ['J.D. Salinger'],
    categories: ['Fiction', 'Classics', 'Young Adult'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg',
    publishedDate: '1951',
  },

  // Fantasy
  {
    id: 'wrOQLV6xB-wC', // Harry Potter 1
    title: 'Harry Potter and the Sorcerer\'s Stone',
    authors: ['J.K. Rowling'],
    categories: ['Fantasy', 'Young Adult', 'Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg',
    publishedDate: '1997',
  },
  {
    id: 'hFfhrCWiLSMC', // The Hobbit
    title: 'The Hobbit',
    authors: ['J.R.R. Tolkien'],
    categories: ['Fantasy', 'Classics', 'Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    publishedDate: '1937',
  },
  {
    id: '5NomkK4EV68C', // Game of Thrones
    title: 'A Game of Thrones',
    authors: ['George R.R. Martin'],
    categories: ['Fantasy', 'Fiction', 'Epic Fantasy'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg',
    publishedDate: '1996',
  },
  {
    id: 'XfFvDwAAQBAJ', // Name of the Wind
    title: 'The Name of the Wind',
    authors: ['Patrick Rothfuss'],
    categories: ['Fantasy', 'Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg',
    publishedDate: '2007',
  },

  // Science Fiction
  {
    id: 'B1hPFQQ_8DUC', // Dune
    title: 'Dune',
    authors: ['Frank Herbert'],
    categories: ['Science Fiction', 'Fiction', 'Classics'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg',
    publishedDate: '1965',
  },
  {
    id: 'zT7oDwAAQBAJ', // Project Hail Mary
    title: 'Project Hail Mary',
    authors: ['Andy Weir'],
    categories: ['Science Fiction', 'Thriller', 'Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg',
    publishedDate: '2021',
  },
  {
    id: '7C9wCgAAQBAJ', // Dark Matter
    title: 'Dark Matter',
    authors: ['Blake Crouch'],
    categories: ['Science Fiction', 'Thriller', 'Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781101904220-L.jpg',
    publishedDate: '2016',
  },

  // Mystery / Thriller
  {
    id: 'KjLxPwAACAAJ', // Gone Girl
    title: 'Gone Girl',
    authors: ['Gillian Flynn'],
    categories: ['Thriller', 'Mystery', 'Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg',
    publishedDate: '2012',
  },
  {
    id: 'j-XQYy0c_xUC', // Girl with Dragon Tattoo
    title: 'The Girl with the Dragon Tattoo',
    authors: ['Stieg Larsson'],
    categories: ['Thriller', 'Mystery', 'Fiction', 'Crime'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780307269751-L.jpg',
    publishedDate: '2005',
  },
  {
    id: '7jRYDwAAQBAJ', // The Silent Patient
    title: 'The Silent Patient',
    authors: ['Alex Michaelides'],
    categories: ['Thriller', 'Mystery', 'Fiction', 'Psychological Thriller'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg',
    publishedDate: '2019',
  },

  // Non-Fiction / Self-Help / Business
  {
    id: 'fFCjDQAAQBAJ', // Atomic Habits
    title: 'Atomic Habits',
    authors: ['James Clear'],
    categories: ['Self-Help', 'Business', 'Non-Fiction', 'Psychology'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    publishedDate: '2018',
  },
  {
    id: 'FmyBAwAAQBAJ', // Sapiens
    title: 'Sapiens: A Brief History of Humankind',
    authors: ['Yuval Noah Harari'],
    categories: ['Non-Fiction', 'History', 'Science', 'Anthropology'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
    publishedDate: '2011',
  },
  {
    id: 'ZnSHAwAAQBAJ', // Thinking Fast Slow
    title: 'Thinking, Fast and Slow',
    authors: ['Daniel Kahneman'],
    categories: ['Psychology', 'Non-Fiction', 'Science', 'Business'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780374275631-L.jpg',
    publishedDate: '2011',
  },
  {
    id: '2ObQDwAAQBAJ', // Educated
    title: 'Educated',
    authors: ['Tara Westover'],
    categories: ['Biography', 'Memoir', 'Non-Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg',
    publishedDate: '2018',
  },
  {
    id: 'hi17DwAAQBAJ', // Becoming
    title: 'Becoming',
    authors: ['Michelle Obama'],
    categories: ['Biography', 'Memoir', 'Non-Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg',
    publishedDate: '2018',
  },
  
  // More Fiction
  {
    id: 'FEL8DlqjYEkC', // The Alchemist
    title: 'The Alchemist',
    authors: ['Paulo Coelho'],
    categories: ['Fiction', 'Philosophy', 'Fantasy'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
    publishedDate: '1988',
  },
  {
    id: 'eI0tDQEACAAJ', // Kite Runner
    title: 'The Kite Runner',
    authors: ['Khaled Hosseini'],
    categories: ['Fiction', 'Historical Fiction'],
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781594480003-L.jpg',
    publishedDate: '2003',
  }
];

/**
 * Get recommended books based on user's current collection
 * 
 * Algorithm:
 * 1. Extract all categories and authors from user's books.
 * 2. Calculate frequency/weight of each category and author.
 * 3. Score each book in the BOOK_POOL:
 *    - +3 points for matching author
 *    - +1 point for matching category (cumulative)
 * 4. Exclude books already in user's collection.
 * 5. Sort by score (descending).
 * 6. If no user books or no matches, return a randomized shuffle of top books.
 */
export const getRecommendations = (userBooks: Book[]): RecommendationBook[] => {
  // Normalize user book titles for comparison
  const userBookTitles = new Set(userBooks.map(b => b.title.toLowerCase().trim()));
  const userBookIds = new Set(userBooks.map(b => b.id));

  // If no books, return a random subset of the pool (filtering only if any ID matches coincidentally)
  if (!userBooks || userBooks.length === 0) {
    return [...BOOK_POOL].sort(() => 0.5 - Math.random()).slice(0, 10);
  }

  const categoryWeights: Record<string, number> = {};
  const authorWeights: Record<string, number> = {};

  // Analyze user's books
  userBooks.forEach(book => {
    // Weight categories
    if (book.categories) {
      book.categories.forEach(cat => {
        const normalizedCat = cat.toLowerCase().trim();
        categoryWeights[normalizedCat] = (categoryWeights[normalizedCat] || 0) + 1;
      });
    }

    // Weight authors
    if (book.authors) {
      book.authors.forEach(author => {
        const normalizedAuthor = author.toLowerCase().trim();
        authorWeights[normalizedAuthor] = (authorWeights[normalizedAuthor] || 0) + 1;
      });
    }
  });

  // Score candidate books
  const scoredBooks = BOOK_POOL.map(candidate => {
    // Skip if already owned (check by ID or Title similarity)
    if (userBookIds.has(candidate.id)) return { ...candidate, score: -1 };
    
    // Fuzzy title matching: Check if user has a book with a very similar title
    // e.g. "Atomic Habits" vs "Atomic Habits: An Easy & Proven Way..."
    const candidateTitleLower = candidate.title.toLowerCase().trim();
    const hasTitleMatch = Array.from(userBookTitles).some(userTitle => {
      return userTitle.includes(candidateTitleLower) || candidateTitleLower.includes(userTitle);
    });
    
    if (hasTitleMatch) return { ...candidate, score: -1 };

    let score = 0;

    // Author match (high weight)
    candidate.authors.forEach(author => {
      const normalizedAuthor = author.toLowerCase().trim();
      if (authorWeights[normalizedAuthor]) {
        score += 5 * authorWeights[normalizedAuthor];
      }
    });

    // Category match
    candidate.categories.forEach(cat => {
      const normalizedCat = cat.toLowerCase().trim();
      // Exact match
      if (categoryWeights[normalizedCat]) {
        score += 2 * categoryWeights[normalizedCat];
      }
      // Partial match (e.g., "Science Fiction" matches "Fiction")
      else {
         Object.keys(categoryWeights).forEach(userCat => {
           if (normalizedCat.includes(userCat) || userCat.includes(normalizedCat)) {
             score += 0.5 * categoryWeights[userCat];
           }
         });
      }
    });
    
    // Add a small random factor to keep it fresh if scores are tied
    score += Math.random() * 0.5;

    return { ...candidate, score };
  });

  // Filter out owned books and sort by score
  const recommendations = scoredBooks
    .filter(b => b.score > 0) // Only return items with some relevance
    .sort((a, b) => b.score - a.score);

  // If we don't have enough relevant recommendations (e.g. < 5), fill with random popular ones
  if (recommendations.length < 5) {
    const existingIds = new Set(recommendations.map(r => r.id));
    
    const fillers = BOOK_POOL
      .filter(b => !existingIds.has(b.id)) // Not already in recommendations
      .filter(b => !userBookIds.has(b.id)) // Not in user books (ID)
      .filter(b => {
        const candidateTitleLower = b.title.toLowerCase().trim();
        return !Array.from(userBookTitles).some(userTitle => 
          userTitle.includes(candidateTitleLower) || candidateTitleLower.includes(userTitle)
        );
      })
      .sort(() => 0.5 - Math.random())
      .slice(0, 5 - recommendations.length);
      
    return [...recommendations, ...fillers];
  }

  return recommendations.slice(0, 10); // Return top 10
};
