// import mongoose from 'mongoose';

// const bookSchema = mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: String,
//       required: true,
//     },
//     publishYear: {
//       type: Number,
//       required: true,
//       default: 2000,
//     },
//     pdfUrl: {
//       type: String,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Book = mongoose.model('Book', bookSchema);
import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  pdfUrl: {
    type: String,
  },
});

export const Book = mongoose.model('Book', bookSchema);
