import { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FeaturedProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  discount_label: string;
}

const WHATSAPP_NUMBER = '254740685488';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .eq('in_stock', true)
        .order('sort_order', { ascending: true })
        .limit(5);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleOrderNow = (productName: string) => {
    const message = encodeURIComponent(`Hello! I'd like to order ${productName}.`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
        <p className="text-gray-600 text-lg">Discover our handpicked collection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-6xl">👕</span>
                </div>
              )}

              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg z-10">
                {product.discount_label}
              </div>

              <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100 transition-all shadow-lg z-10">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-bold text-lg text-gray-900 line-clamp-2 min-h-[3.5rem]">
                {product.name}
              </h3>

              {product.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  KSh {product.price.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => handleOrderNow(product.name)}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
