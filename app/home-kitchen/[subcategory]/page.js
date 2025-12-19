'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';

export default function HomeKitchenSubcategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory;
  const { addToCart } = useCart();

  // Map subcategory slugs to display names and products
  const subcategoryData = {
    'furniture': {
      name: 'Furniture',
      description: 'Sofas, beds, tables and home furniture',
      image: '/Furniture.jpeg',
      products: [
        {
          id: 601,
          name: "Ikea KIVIK Sofa",
          description: "Comfortable 3-seater sofa with removable covers",
          price: 29999,
          image: "https://picsum.photos/300/200?random=601"
        },
        {
          id: 602,
          name: "Wooden Dining Table",
          description: "Solid wood dining table for 6 people",
          price: 39999,
          image: "https://picsum.photos/300/200?random=602"
        },
        {
          id: 603,
          name: "King Size Bed Frame",
          description: "Modern king size bed frame with storage",
          price: 49999,
          image: "https://picsum.photos/300/200?random=603"
        }
      ]
    },
    'appliances': {
      name: 'Kitchen Appliances',
      description: 'Mixers, cookers and kitchen tools',
      image: '/Kitchen Appliances.jpeg',
      products: [
        {
          id: 604,
          name: "KitchenAid Stand Mixer",
          description: "Professional 5-quart tilt-head stand mixer",
          price: 49999,
          image: "https://picsum.photos/300/200?random=604"
        },
        {
          id: 605,
          name: "Philips Air Fryer",
          description: "Healthy cooking with rapid air technology",
          price: 8999,
          image: "https://picsum.photos/300/200?random=605"
        },
        {
          id: 606,
          name: "Instant Pot Pressure Cooker",
          description: "Multi-cooker for fast and easy cooking",
          price: 7999,
          image: "https://picsum.photos/300/200?random=606"
        }
      ]
    },
    'decor': {
      name: 'Home Decor',
      description: 'Wall art, lighting and decorative items',
      image: '/Home Decor.jpeg',
      products: [
        {
          id: 607,
          name: "Wall Art Canvas",
          description: "Abstract wall art canvas print",
          price: 2999,
          image: "https://picsum.photos/300/200?random=607"
        },
        {
          id: 608,
          name: "Floor Lamp",
          description: "Modern floor lamp with adjustable height",
          price: 5999,
          image: "https://picsum.photos/300/200?random=608"
        },
        {
          id: 609,
          name: "Decorative Throw Pillows",
          description: "Set of 4 decorative throw pillows",
          price: 1999,
          image: "https://picsum.photos/300/200?random=609"
        }
      ]
    },
    'bed-bath': {
      name: 'Bed & Bath',
      description: 'Bedding, towels and bathroom accessories',
      image: '/Bed & Bath.jpeg',
      products: [
        {
          id: 610,
          name: "Egyptian Cotton Bed Sheets",
          description: "Luxury 400 thread count bed sheets set",
          price: 3999,
          image: "https://picsum.photos/300/200?random=610"
        },
        {
          id: 611,
          name: "Bath Towel Set",
          description: "Ultra soft 6-piece bath towel set",
          price: 2499,
          image: "https://picsum.photos/300/200?random=611"
        },
        {
          id: 612,
          name: "Memory Foam Pillow",
          description: "Ergonomic memory foam pillow",
          price: 1499,
          image: "https://picsum.photos/300/200?random=612"
        }
      ]
    },
    'gardening': {
      name: 'Gardening',
      description: 'Plants, tools and outdoor furniture',
      image: '/Gardening.jpeg',
      products: [
        {
          id: 613,
          name: "Indoor Plant Collection",
          description: "Set of 3 low-maintenance indoor plants",
          price: 1999,
          image: "https://picsum.photos/300/200?random=613"
        },
        {
          id: 614,
          name: "Garden Tool Set",
          description: "Complete gardening tool set",
          price: 2999,
          image: "https://picsum.photos/300/200?random=614"
        },
        {
          id: 615,
          name: "Outdoor Patio Set",
          description: "4-piece outdoor patio furniture set",
          price: 34999,
          image: "https://picsum.photos/300/200?random=615"
        }
      ]
    },
    'storage': {
      name: 'Storage',
      description: 'Organizers and storage solutions',
      image: '/Storage.jpeg',
      products: [
        {
          id: 616,
          name: "Storage Ottoman",
          description: "Multi-functional storage with seating",
          price: 7999,
          image: "https://picsum.photos/300/200?random=616"
        },
        {
          id: 617,
          name: "Plastic Storage Containers",
          description: "Set of 6 stackable storage containers",
          price: 1499,
          image: "https://picsum.photos/300/200?random=617"
        },
        {
          id: 618,
          name: "Closet Organizer",
          description: "Adjustable closet organization system",
          price: 4999,
          image: "https://picsum.photos/300/200?random=618"
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
          <Link href="/home-kitchen" className="btn btn-primary">Back to Home & Kitchen</Link>
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
            <Link href="/home-kitchen">Home & Kitchen</Link>
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
