import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import ProductGrid from './components/ProductGrid';
import BrandStory from './components/BrandStory';
import WhatsAppCTA from './components/WhatsAppCTA';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import CartDrawer from './components/CartDrawer';
import { cartService } from './lib/cart';

function App() {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [showHero, setShowHero] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateCartCount = async () => {
    try {
      const count = await cartService.getCartCount();
      setCartCount(count);
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setShowHero(category === 'all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      setShowHero(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
        onSearch={handleSearch}
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
          updateCartCount();
        }}
      />

      {showHero && (
        <>
          <Hero onShopClick={handleCategoryChange} />
          <FeaturedCollections onCollectionClick={handleCategoryChange} />
          <BrandStory />
        </>
      )}

      <ProductGrid
        category={currentCategory}
        searchQuery={searchQuery}
        onCartUpdate={updateCartCount}
      />

      {showHero && (
        <>
          <WhatsAppCTA />
          <Newsletter />
        </>
      )}

      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

export default App;
