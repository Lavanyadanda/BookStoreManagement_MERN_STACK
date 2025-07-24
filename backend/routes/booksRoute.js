import express from 'express';
import { Book } from '../models/bookModels.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Setup multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique name
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
});

// Route for Save a new Book
// router.post('/', async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publishYear
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields: title, author, publishYear',
//       });
//     }
//     const newBook = {
//       title: request.body.title,
//       author: request.body.author,
//       publishYear: request.body.publishYear,
//       pdfUrl: request.body.pdfUrl || '', 
//     };

//     const book = await Book.create(newBook);

//     return response.status(201).send(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });
router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    const { title, author, publishYear, pdfUrl } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: 'Send all required fields: title, author, publishYear' });
    }

    // Determine final PDF link
    let finalPdfUrl = pdfUrl;
    if (req.file) {
      finalPdfUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const newBook = {
      title,
      author,
      publishYear,
      pdfUrl: finalPdfUrl,
    };

    const book = await Book.create(newBook);
    res.status(201).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;