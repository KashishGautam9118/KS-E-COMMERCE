'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';

export default function ElectronicsSubcategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory;
  const { addToCart } = useCart();

  // Map subcategory slugs to display names and products
  const subcategoryData = {
    'smartphones': {
      name: 'Smartphones',
      description: 'Latest smartphones and accessories',
      image: '/Smartphones.jpeg',
      products: [
        {
          id: 501,
          name: "iPhone 15 Pro Max",
          description: "Latest iPhone with advanced camera system",
          price: 149999,
          image: "https://picsum.photos/300/200?random=501"
        },
        {
          id: 502,
          name: "Samsung Galaxy S24",
          description: "Flagship Android smartphone",
          price: 89999,
          image: "https://picsum.photos/300/200?random=502"
        },
        {
          id: 503,
          name: "Google Pixel 8",
          description: "AI-powered smartphone",
          price: 79999,
          image: "https://picsum.photos/300/200?random=503"
        }
      ]
    },
    'laptops': {
      name: 'Laptops & Computers',
      description: 'Laptops, desktops and computer accessories',
      image: '/Laptops & Computers.jpeg',
      products: [
        {
          id: 504,
          name: "MacBook Pro 16-inch",
          description: "Powerful laptop for professionals",
          price: 249999,
          image: "https://picsum.photos/300/200?random=504"
        },
        {
          id: 505,
          name: "Dell XPS 13",
          description: "Ultra-portable laptop",
          price: 129999,
          image: "https://picsum.photos/300/200?random=505"
        },
        {
          id: 506,
          name: "HP Pavilion Gaming",
          description: "Gaming laptop with RTX graphics",
          price: 89999,
          image: "https://picsum.photos/300/200?random=506"
        }
      ]
    },
    'tv-audio': {
      name: 'TV & Audio',
      description: 'Televisions, speakers and audio systems',
      image: '/TV & Audio.jpeg',
      products: [
        {
          id: 507,
          name: "Samsung 55-inch OLED TV",
          description: "4K OLED television with smart features",
          price: 89999,
          image: "https://picsum.photos/300/200?random=507"
        },
        {
          id: 508,
          name: "Sony Soundbar",
          description: "Wireless soundbar with Dolby Atmos",
          price: 29999,
          image: "https://picsum.photos/300/200?random=508"
        },
        {
          id: 509,
          name: "JBL Wireless Earbuds",
          description: "True wireless earbuds with noise cancellation",
          price: 14999,
          image: "https://picsum.photos/300/200?random=509"
        }
      ]
    },
    'cameras': {
      name: 'Cameras',
      description: 'DSLR, mirrorless and action cameras',
      image: '/Cameras.jpeg',
      products: [
        {
          id: 510,
          name: "Sony Alpha A7R IV",
          description: "Professional mirrorless camera",
          price: 349999,
          image: "https://picsum.photos/300/200?random=510"
        },
        {
          id: 511,
          name: "Canon EOS R5",
          description: "Full-frame mirrorless camera",
          price: 299999,
          image: "https://picsum.photos/300/200?random=511"
        },
        {
          id: 512,
          name: "GoPro HERO 11",
          description: "Action camera for adventure",
          price: 39999,
          image: "https://picsum.photos/300/200?random=512"
        }
      ]
    },
    'wearables': {
      name: 'Wearables',
      description: 'Smartwatches and fitness trackers',
      image: '/Wearables.png',
      products: [
        {
          id: 513,
          name: "Apple Watch Series 9",
          description: "Advanced smartwatch with health features",
          price: 49999,
          image: "https://picsum.photos/300/200?random=513"
        },
        {
          id: 514,
          name: "Samsung Galaxy Watch 6",
          description: "Smartwatch with fitness tracking",
          price: 34999,
          image: "https://picsum.photos/300/200?random=514"
        },
        {
          id: 515,
          name: "Fitbit Charge 6",
          description: "Advanced fitness tracker",
          price: 19999,
          image: "https://picsum.photos/300/200?random=515"
        }
      ]
    },
    'gaming': {
      name: 'Gaming',
      description: 'Gaming consoles and accessories',
      products: [
        {
          id: 516,
          name: "PlayStation 5 Console",
          description: "Next-gen gaming console",
          price: 59999,
          image: "https://picsum.photos/300/200?random=516"
        },
        {
          id: 517,
          name: "Xbox Series X",
          description: "Powerful gaming console",
          price: 54999,
          image: "https://picsum.photos/300/200?random=517"
        },
        {
          id: 518,
          name: "Nintendo Switch OLED",
          description: "Hybrid gaming console",
          price: 34999,
          image: "https://picsum.photos/300/200?random=518"
        }
      ]
    }
  };

  const currentSubcategory = subcategoryData[subcategory];

  if (!currentSubcategory) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Subcategory not found</h2>
          <Link href="/electronics" className="btn btn-primary">Back to Electronics</Link>
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
            <Link href="/electronics">Electronics</Link>
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
              />
            </div>
          )}
          <h1 className="display-4 text-center">{currentSubcategory.name}</h1>
          <p className="lead text-center">{currentSubcategory.description}</p>
        </div>
      </div>

      <div className="row g-4">
        {currentSubcategory.products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {currentSubcategory.products.length === 0 && (
        <div className="text-center py-5">
          <h3>No products available in this subcategory</h3>
          <p>Check back later for new arrivals!</p>
        </div>
      )}
    </div>
  );
}
