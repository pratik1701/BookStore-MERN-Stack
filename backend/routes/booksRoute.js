import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// add a new Book
router.post('/', async(req, res) => {
    try {
       if(!req.body.title || !req.body.author || !req.body.publishYear) {
           return res.status(400).send({ message: 'Send all required fields: title, author, publishYear',})
       }
   
       const newBook = {
           title: req.body.title,
           author: req.body.author,
           publishYear: req.body.publishYear
       }
       const book =  await Book.create(newBook);
       return res.status(201).send(book);
    } catch(e){
       console.log(e.message);
       res.status(500).send({ message: e.message });
   
    }
   });

// Get all Books
router.get('/',async (req,res) => {
    try{
        const books =  await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(e){
        return res.status(500).send({ message: e.message });
    }
});

// Get a Book by id
router.get('/:id',async (req,res) => {
    try{
        const book =  await Book.findById(req.params.id);
        return res.status(200).json(book);
    } catch(e){
        return res.status(500).send({ message: e.message });
    }
});

// Route to update a book
router.put('/:id',async (req,res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear',})
        }
        const book =  await Book.findByIdAndUpdate(req.params.id, req.body);

        if(!book) {
            return res.status(404).send({ message: 'book not found'});
        }
        return res.status(200).send({ message: 'book updated successfully'});
    } catch(e){
        return res.status(500).send({ message: e.message });
    }
});

// Route to delete a book
router.delete('/:id',async (req,res) => {
    try{
        const book =  await Book.findByIdAndDelete(req.params.id, req.body);

        if(!book) {
            return res.status(404).send({ message: 'book not found'});
        }
        return res.status(200).send({ message: 'book deleted successfully'});
    } catch(e){
        return res.status(500).send({ message: e.message });
    }
});

export default router;

