import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookSingleCard from './BookSingleCard';

// ✅ Import DownloadForm
import DownloadForm from '../DownloadForm';

const BooksCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {books.map((item) => (
        <div key={item._id} className="border p-4 rounded shadow">
          {/* Book card content */}
          <BookSingleCard book={item} />

          {/* ✅ Download form appears if book has PDF */}
          {item.pdfUrl && <DownloadForm book={item} />}
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
