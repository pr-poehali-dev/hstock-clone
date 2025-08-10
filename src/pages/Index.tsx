import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  title: string;
  price: string;
  oldPrice?: string;
  image: string;
  seller: string;
  rating: number;
  sales: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Discord Nitro 1 месяц",
      price: "299₽",
      oldPrice: "399₽",
      image: "/placeholder.svg",
      seller: "DigitalStore",
      rating: 4.9,
      sales: 1247
    },
    {
      id: 2,
      title: "Steam аккаунт с играми",
      price: "1,299₽",
      image: "/placeholder.svg",
      seller: "GameHub",
      rating: 4.8,
      sales: 834
    },
    {
      id: 3,
      title: "Spotify Premium 6 месяцев",
      price: "899₽",
      oldPrice: "1199₽",
      image: "/placeholder.svg",
      seller: "MusicDeals",
      rating: 4.9,
      sales: 2156
    },
    {
      id: 4,
      title: "Netflix аккаунт 4K",
      price: "599₽",
      image: "/placeholder.svg",
      seller: "StreamPro",
      rating: 4.7,
      sales: 567
    },
    {
      id: 5,
      title: "YouTube Premium 3 месяца",
      price: "449₽",
      oldPrice: "599₽",
      image: "/placeholder.svg",
      seller: "VideoPlus",
      rating: 4.8,
      sales: 923
    },
    {
      id: 6,
      title: "Adobe Creative Suite",
      price: "2,299₽",
      image: "/placeholder.svg",
      seller: "CreativeHub",
      rating: 4.6,
      sales: 345
    },
    {
      id: 7,
      title: "Minecraft Premium аккаунт",
      price: "799₽",
      image: "/placeholder.svg",
      seller: "GameWorld",
      rating: 4.9,
      sales: 1876
    },
    {
      id: 8,
      title: "Office 365 на год",
      price: "1,599₽",
      oldPrice: "1999₽",
      image: "/placeholder.svg",
      seller: "OfficePro",
      rating: 4.7,
      sales: 678
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    oldPrice: '',
    seller: '',
    image: '/placeholder.svg'
  });

  const addProduct = () => {
    if (newProduct.title && newProduct.price && newProduct.seller) {
      const product: Product = {
        id: Date.now(),
        title: newProduct.title,
        price: newProduct.price,
        oldPrice: newProduct.oldPrice || undefined,
        image: newProduct.image,
        seller: newProduct.seller,
        rating: 4.5,
        sales: 0
      };
      setProducts([...products, product]);
      setNewProduct({ title: '', price: '', oldPrice: '', seller: '', image: '/placeholder.svg' });
      setIsAdminOpen(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold gradient-orange-blue bg-clip-text text-transparent">
                  hStock
                </h1>
              </div>
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">
                  Каталог
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Продавцам
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Помощь
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="relative">
                  <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Поиск товаров..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Добавить товар</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Название товара</Label>
                      <Input
                        id="title"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Цена</Label>
                      <Input
                        id="price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="299₽"
                      />
                    </div>
                    <div>
                      <Label htmlFor="oldPrice">Старая цена</Label>
                      <Input
                        id="oldPrice"
                        value={newProduct.oldPrice}
                        onChange={(e) => setNewProduct({...newProduct, oldPrice: e.target.value})}
                        placeholder="399₽"
                      />
                    </div>
                    <div>
                      <Label htmlFor="seller">Продавец</Label>
                      <Input
                        id="seller"
                        value={newProduct.seller}
                        onChange={(e) => setNewProduct({...newProduct, seller: e.target.value})}
                      />
                    </div>
                    <Button onClick={addProduct} className="w-full">
                      Добавить товар
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="sm">
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Все товары</h2>
          <p className="text-gray-600">
            {filteredProducts.length} товаров найдено
          </p>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.oldPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                    Скидка
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                  {product.title}
                </h3>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  <div className="flex items-center justify-between">
                    <span>Продавец: {product.seller}</span>
                    <div className="flex items-center">
                      <Icon name="Star" size={12} className="text-yellow-400 fill-current mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <span>Продано: {product.sales}</span>
                  </div>
                </div>

                <Button 
                  size="sm" 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Купить
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">hStock</h3>
              <p className="text-gray-600 text-sm">
                Место покупки и продажи цифровых товаров, аккаунтов и промокодов
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Как купить</a></li>
                <li><a href="#" className="hover:text-gray-900">Гарантии</a></li>
                <li><a href="#" className="hover:text-gray-900">Поддержка</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Продавцам</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Как продать</a></li>
                <li><a href="#" className="hover:text-gray-900">Правила</a></li>
                <li><a href="#" className="hover:text-gray-900">Комиссии</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Поддержка 24/7</li>
                <li>support@hstock.org</li>
                <li>Telegram: @hstock</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © 2024 hStock. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;