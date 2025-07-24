// importBooks.js
import mongoose from 'mongoose';
import axios from 'axios';
import { Book } from './models/bookModels.js'; // ✅ Correct import
import dotenv from 'dotenv';
dotenv.config();
const mongoDBURL=process.env.mongoDBURL;

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('MongoDB connected');
    fetchAndInsertBooks();
  })
  .catch((err) => console.error('MongoDB connection error:', err));
  const fetchAndInsertBooks = async () => {
  try {
    const res = await axios.get('https://gutendex.com/books?sort=downloads&page_size=100');
    const books = res.data.results;
    let inserted = 0;

    for (let book of books) {
      // Try getting a PDF link
      const pdfLink = book.formats['application/pdf'] ||
        book.formats['application/pdf; charset=utf-8'] ||
        book.formats['application/epub+zip'] || // fallback
        book.formats['text/html; charset=utf-8'] || // fallback
        book.formats['text/plain; charset=utf-8']; // fallback

      // If there's no valid PDF link, skip this book
      if (!pdfLink || pdfLink.endsWith('.zip')) {
        console.log(`🚫 No usable PDF for: ${book.title}`);
        continue;
      }

      const title = book.title?.trim() || 'Untitled';
      const author = book.authors?.[0]?.name?.trim() || 'Unknown Author';
      const publishYear = book.authors?.[0]?.birth_year || 2000;

      // Check if book already exists
      const exists = await Book.findOne({ title, author });

      if (!exists) {
        const newBook = {
          title,
          author,
          publishYear,
          pdfUrl: pdfLink,
        };

        await Book.create(newBook);
        inserted++;
        console.log(`✅ Inserted: ${title}`);
      } else {
        console.log(`⏭️ Skipped (already exists): ${title}`);
      }
    }

    console.log(`🎉 Done! Inserted ${inserted} new books.`);
  } catch (err) {
    console.error('❌ Error while fetching top books:', err.message);
  } finally {
    mongoose.disconnect();
  }
};


//   const fetchAndInsertBooks = async () => {
//   try {
//     const res = await axios.get('https://gutendex.com/books?sort=downloads&page_size=100');
//     const books = res.data.results;
//     let inserted = 0;

//     for (let book of books) {
//       const pdfLink = book.formats['application/pdf'] || book.formats['application/pdf; charset=utf-8'];

//       if (pdfLink) {
//         const newBook = {
//           title: book.title,
//           author: book.authors?.[0]?.name || 'Unknown',
//           publishYear: book.authors?.[0]?.birth_year || 2000,
//           pdfUrl: pdfLink,
//         };

//         const exists = await Book.findOne({
//           title: newBook.title,
//           author: newBook.author,
//         });

//         if (!exists) {
//           await Book.create(newBook);
//           inserted++;
//           console.log(`✅ Inserted: ${newBook.title}`);
//         } else {
//           console.log(`⏭️ Skipped (already exists): ${newBook.title}`);
//         }
//       } else {
//         console.log(`🚫 No PDF for: ${book.title}`);
//       }
//     }

//     console.log(`🎉 Done! Inserted ${inserted} new books.`);
//   } catch (err) {
//     console.error('❌ Error while fetching top books:', err.message);
//   } finally {
//     mongoose.disconnect();
//   }
// };


// const fetchAndInsertBooks = async () => {
//   let page = 1;
//   let inserted = 0;

//   while (page <= 15) {
//     try {
//       const res = await axios.get(`https://gutendex.com/books/?page=${page}`);
//       const books = res.data.results;

//       for (let book of books) {
//         const pdfLink = book.formats['application/pdf'];

//         if (pdfLink) {
//           const newBook = {
//             title: book.title,
//             author: book.authors?.[0]?.name || 'Unknown',
//             publishYear: 2000,
//             pdfUrl: pdfLink,
//           };

//           const exists = await Book.findOne({
//             title: newBook.title,
//             author: newBook.author,
//           });

//           if (!exists) {
//             await Book.create(newBook);
//             inserted++;
//             console.log(`✅ Inserted: ${newBook.title}`);
//           } else {
//             console.log(`⏭️ Skipped (already exists): ${newBook.title}`);
//           }
//         }
//       }

//       page++;
//     } catch (err) {
//       console.error(`❌ Error on page ${page}:`, err.message);
//       break;
//     }
//   }

//   console.log(`🎉 Done! Inserted ${inserted} books.`);
//   mongoose.disconnect();
// };
