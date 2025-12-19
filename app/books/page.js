// app/books/page.js
'use client';
import Link from 'next/link';
import '../category-style.css';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function BooksPage() {
  const { addToCart } = useCart();

  const subCategories = [
    {
      id: 1,
      name: "Fiction",
      description: "Novels, stories and literary fiction",
      link: "/books/fiction",
      image: "/Fiction.jpeg"
    },
    {
      id: 2,
      name: "Non-Fiction",
      description: "Biographies, memoirs and educational books",
      link: "/books/non-fiction",
      image: "/Non-Fiction.jpeg"
    },
    {
      id: 3,
      name: "Children's Books",
      description: "Books for kids of all ages",
      link: "/books/children",
      image: "/Children's Books.jpeg"
    },
    {
      id: 4,
      name: "Educational",
      description: "Textbooks and academic materials",
      link: "/books/educational",
      image: "/Educational.jpeg"
    },
    {
      id: 5,
      name: "Self-Help",
      description: "Personal development and motivation",
      link: "/books/self-help",
      image: "/Self-Help.jpeg"
    },
    {
      id: 6,
      name: "Comics & Manga",
      description: "Graphic novels and comic books",
      link: "/books/comics",
      image: "/Comics & Manga.jpeg"
    }
  ];

  const booksProducts = [
    {
      id: 301,
      name: "The Great Gatsby",
      description: "Classic American novel by F. Scott Fitzgerald",
      price: 599,
      image: "/The Great Gatsby.jpeg"
    },
    {
      id: 302,
      name: "Sapiens: A Brief History of Humankind",
      description: "Bestselling book on human history",
      price: 899,
      image: "/Brief History of Humankind.jpeg"
    },
    {
      id: 303,
      name: "Where the Crawdads Sing",
      description: "New York Times bestselling mystery novel",
      price: 699,
      image: "/Where the Crawdads Sing.jpeg"
    },
    {
      id: 304,
      name: "Atomic Habits",
      description: "Self-help book on building good habits",
      price: 799,
      image: "/Atomic Habits.jpeg"
    },
    {
      id: 305,
      name: "The Very Hungry Caterpillar",
      description: "Classic children's book by Eric Carle",
      price: 299,
      image: "/The Very Hungry Caterpillar.jpeg"
    },
    {
      id: 306,
      name: "Spider-Man: Into the Spider-Verse",
      description: "Graphic novel collection",
      price: 1299,
      image: "/Into the Spider-Verse.jpeg"
    }
  ];

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Books & Literature</h1>
        <p>Discover stories that inspire and educate</p>
      </div>

      <div className="subcategories-grid">
        {subCategories.map((category) => (
          <Link href={category.link} key={category.id} className="subcategory-card">
            <div className="category-image">
              <img
                src={category.image}
                alt={category.name}
                className="category-img"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=${encodeURIComponent(category.name)}`;
                }}
              />
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="shop-now">Shop Now →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Books</h2>
        <div className="row g-4">
          {booksProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
