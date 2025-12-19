'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';

export default function BeautySubcategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory;
  const { addToCart } = useCart();

  // Map subcategory slugs to display names and products
  const subcategoryData = {
    'skincare': {
      name: 'Skincare',
      description: 'Face creams, serums and treatments',
      image: '/Skincare.jpeg',
      products: [
        {
          id: 101,
          name: "Cetaphil Gentle Skin Cleanser",
          description: "Gentle daily facial cleanser for all skin types",
          price: 899,
          image: "https://picsum.photos/300/200?random=101"
        },
        {
          id: 102,
          name: "The Ordinary Hyaluronic Acid",
          description: "Hydrating serum for all skin types",
          price: 699,
          image: "https://picsum.photos/300/200?random=102"
        },
        {
          id: 103,
          name: "CeraVe Moisturizing Cream",
          description: "Daily facial moisturizer",
          price: 1299,
          image: "https://picsum.photos/300/200?random=103"
        }
      ]
    },
    'makeup': {
      name: 'Makeup',
      description: 'Cosmetics and beauty products',
      image: '/Makeup.jpeg',
      products: [
        {
          id: 104,
          name: "Maybelline Lash Sensational Mascara",
          description: "Volumizing mascara for dramatic lashes",
          price: 499,
          image: "https://picsum.photos/300/200?random=104"
        },
        {
          id: 105,
          name: "Fenty Beauty Foundation",
          description: "Inclusive foundation for all skin tones",
          price: 2499,
          image: "https://picsum.photos/300/200?random=105"
        },
        {
          id: 106,
          name: "NYX Professional Makeup Lipstick",
          description: "Creamy matte lipstick",
          price: 599,
          image: "https://picsum.photos/300/200?random=106"
        }
      ]
    },
    'haircare': {
      name: 'Hair Care',
      description: 'Shampoos, conditioners and styling',
      image: '/Hair Care.jpeg',
      products: [
        {
          id: 107,
          name: "Dove Shampoo Intense Repair",
          description: "Deep conditioning shampoo for damaged hair",
          price: 349,
          image: "https://picsum.photos/300/200?random=107"
        },
        {
          id: 108,
          name: "OGX Renewing + Argan Oil",
          description: "Argan oil infused conditioner",
          price: 799,
          image: "https://picsum.photos/300/200?random=108"
        },
        {
          id: 109,
          name: "Moroccanoil Treatment",
          description: "Intensive hair treatment oil",
          price: 1999,
          image: "https://picsum.photos/300/200?random=109"
        }
      ]
    },
    'fragrances': {
      name: 'Fragrances',
      description: 'Perfumes and body mists',
      image: '/Fragrances.png',
      products: [
        {
          id: 110,
          name: "Chanel No. 5 Perfume",
          description: "Iconic floral fragrance for women",
          price: 8500,
          image: "https://picsum.photos/300/200?random=110"
        },
        {
          id: 111,
          name: "Dior Sauvage",
          description: "Fresh and spicy men's fragrance",
          price: 7200,
          image: "https://picsum.photos/300/200?random=111"
        },
        {
          id: 112,
          name: "Gucci Bloom",
          description: "Floral and feminine fragrance",
          price: 6500,
          image: "https://picsum.photos/300/200?random=112"
        }
      ]
    },
    'bath-body': {
      name: 'Bath & Body',
      description: 'Soaps, lotions and bath products',
      image: '/Bath & Body.jpeg',
      products: [
        {
          id: 113,
          name: "The Body Shop Body Butter",
          description: "Rich moisturizing body lotion",
          price: 1299,
          image: "https://picsum.photos/300/200?random=113"
        },
        {
          id: 114,
          name: "Dove Body Wash",
          description: "Gentle cleansing body wash",
          price: 299,
          image: "https://picsum.photos/300/200?random=114"
        },
        {
          id: 115,
          name: "Bath & Body Works Lotion",
          description: "Scented body lotion",
          price: 899,
          image: "https://picsum.photos/300/200?random=115"
        }
      ]
    },
    'mens-grooming': {
      name: "Men's Grooming",
      description: 'Shaving and grooming products',
      image: "/Men's Grooming.jpg",
      products: [
        {
          id: 116,
          name: "Gillette Mach3 Razor",
          description: "Precision razor for smooth shaving",
          price: 299,
          image: "https://picsum.photos/300/200?random=116"
        },
        {
          id: 117,
          name: "Old Spice Aftershave",
          description: "Soothing aftershave lotion",
          price: 399,
          image: "https://picsum.photos/300/200?random=117"
        },
        {
          id: 118,
          name: "The Man Company Beard Oil",
          description: "Natural beard grooming oil",
          price: 699,
          image: "https://picsum.photos/300/200?random=118"
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
          <Link href="/beauty" className="btn btn-primary">Back to Beauty</Link>
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
            <Link href="/beauty">Beauty</Link>
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
