'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';

export default function SportsSubcategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory;
  const { addToCart } = useCart();

  // Map subcategory slugs to display names and products
  const subcategoryData = {
    'fitness': {
      name: 'Fitness Equipment',
      description: 'Weights, treadmills and gym equipment',
      image: '/Fitness Equipment.jpeg',
      products: [
        {
          id: 201,
          name: "Adidas Dumbbells Set",
          description: "Adjustable weight dumbbells for home workouts",
          price: 4999,
          image: "/Adidas Dumbbells Set.jpeg"
        },
        {
          id: 202,
          name: "Yoga Mat Premium",
          description: "Non-slip yoga mat with carrying strap",
          price: 1999,
          image: "/Yoga Mat Premium.jpeg"
        },
        {
          id: 203,
          name: "Treadmill Electric",
          description: "Motorized treadmill for home use",
          price: 29999,
          image: "/Treadmill Electric.jpeg"
        }
      ]
    },
    'outdoor': {
      name: 'Outdoor Sports',
      description: 'Camping, hiking and adventure gear',
      image: '/Outdoor Sports.jpeg',
      products: [
        {
          id: 204,
          name: "Camping Tent 4-Person",
          description: "Waterproof camping tent with easy setup",
          price: 12999,
          image: "/Camping Tent 4-Person.jpeg"
        },
        {
          id: 205,
          name: "Hiking Backpack",
          description: "Durable hiking backpack with multiple compartments",
          price: 3999,
          image: "/Hiking Backpack.jpeg"
        },
        {
          id: 206,
          name: "Sleeping Bag",
          description: "Warm sleeping bag for outdoor adventures",
          price: 2999,
          image: "/Sleeping Bag.jpeg"
        }
      ]
    },
    'team': {
      name: 'Team Sports',
      description: 'Cricket, football and basketball',
      image: '/Team Sports.jpeg',
      products: [
        {
          id: 207,
          name: "Cricket Bat",
          description: "Professional cricket bat",
          price: 4999,
          image: "https://picsum.photos/300/200?random=207"
        },
        {
          id: 208,
          name: "Football",
          description: "Official size football",
          price: 1499,
          image: "/Football.jpeg"
        },
        {
          id: 209,
          name: "Basketball",
          description: "Professional basketball",
          price: 2499,
          image: "/Basketball.jpeg"
        }
      ]
    },
    'clothing': {
      name: 'Athletic Clothing',
      description: 'Sportswear and athletic shoes',
      image: '/Athletic Clothing.jpeg',
      products: [
        {
          id: 210,
          name: "Nike Air Zoom Pegasus",
          description: "Running shoes with responsive cushioning",
          price: 8999,
          image: "/Nike Air Zoom Pegasus.jpeg"
        },
        {
          id: 211,
          name: "Adidas Running Shorts",
          description: "Breathable running shorts",
          price: 1999,
          image: "/Adidas Running Shorts.jpeg"
        },
        {
          id: 212,
          name: "Under Armour T-Shirt",
          description: "Moisture-wicking athletic t-shirt",
          price: 2499,
          image: "/Under Armour T-Shirt.jpeg"
        }
      ]
    },
    'water': {
      name: 'Water Sports',
      description: 'Swimming and water activities',
      image: '/Water Sports.jpeg',
      products: [
        {
          id: 213,
          name: "Swimming Goggles",
          description: "Anti-fog swimming goggles with UV protection",
          price: 899,
          image: "/Swimming Goggles.jpeg"
        },
        {
          id: 214,
          name: "Swim Fins",
          description: "Training fins for swimming",
          price: 1499,
          image: "/Swim Fins.jpeg"
        },
        {
          id: 215,
          name: "Life Jacket",
          description: "Safety life jacket for water activities",
          price: 2999,
          image:"/Life Jacket.jpeg"
        }
      ]
    },
    'cycling': {
      name: 'Cycling',
      description: 'Bikes and cycling accessories',
      image: '/Cycling.jpeg',
      products: [
        {
          id: 216,
          name: "Mountain Bike",
          description: "Full suspension mountain bike",
          price: 49999,
          image: "/Mountain Bike.jpeg"
        },
        {
          id: 217,
          name: "Cycling Helmet",
          description: "Safety helmet with ventilation",
          price: 3999,
          image: "/Cycling Helmet.jpeg"
        },
        {
          id: 218,
          name: "Bike Lock",
          description: "Heavy-duty bicycle lock",
          price: 1999,
          image: "/Bike Lock.jpeg"
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
          <Link href="/sports" className="btn btn-primary">Back to Sports</Link>
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
            <Link href="/sports">Sports</Link>
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
