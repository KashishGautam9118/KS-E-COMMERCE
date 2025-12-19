'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { getProductsBySubcategory } from '../../utils/product';

export default function BooksSubcategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory;
  const { addToCart } = useCart();

  // Map subcategory slugs to display names
  const subcategoryData = {
    'fiction': {
      name: 'Fiction',
      description: 'Novels, stories and literary fiction',
      image: '/Fiction.jpeg'
    },
    'non-fiction': {
      name: 'Non-Fiction',
      description: 'Biographies, memoirs and educational books',
      image: '/Non-Fiction.jpeg'
    },
    'children': {
      name: "Children's Books",
      description: "Books for kids of all ages",
      image: '/Children\'s Books.jpeg'
    },
    'educational': {
      name: 'Educational',
      description: 'Textbooks and academic materials',
      image: '/Educational.jpeg'
    },
    'self-help': {
      name: 'Self-Help',
      description: 'Personal development and motivation',
      image: '/Self-Help.jpeg'
    },
    'comics': {
      name: 'Comics & Manga',
      description: 'Graphic novels and comic books',
      image: '/Comics & Manga.jpeg'
    }
  };

  const currentSubcategory = subcategoryData[subcategory];
  const products = getProductsBySubcategory('Books', subcategory);

  if (!currentSubcategory) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Subcategory not found</h2>
          <Link href="/books" className="btn btn-primary">Back to Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/books">Books</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {currentSubcategory.name}
          </li>
        </ol>
      </nav>

      <div className="row mb-4">
        <div className="col-12">
          {currentSubcategory.image && (
            <div className="text-center mb-4">
              <img
                src={currentSubcategory.image}
                alt={currentSubcategory.name}
                className="img-fluid rounded shadow"
                style={{
                  maxHeight: '250px',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  border: '2px solid #e9ecef'
                }}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x400/FFA5A5/FFFFFF?text=${encodeURIComponent(currentSubcategory.name)}`;
                }}
              />
            </div>
          )}
          <h1 className="display-4 text-center">{currentSubcategory.name}</h1>
          <p className="lead text-center">{currentSubcategory.description}</p>
        </div>
      </div>

      <div className="row g-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-5">
          <h3>No products available in this subcategory</h3>
          <p>Check back later for new arrivals!</p>
        </div>
      )}
    </div>
  );
}
