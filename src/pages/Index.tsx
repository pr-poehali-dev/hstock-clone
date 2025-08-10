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
  price: number;
  oldPrice?: number;
  image: string;
  seller: string;
  rating: number;
  sales: number;
  verified: boolean;
  category: string;
  online: boolean;
  lastSeen?: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Discord Nitro 1 месяц",
      price: 299,
      oldPrice: 399,
      image: "/placeholder.svg",
      seller: "DigitalStore",
      rating: 4.9,
      sales: 1247,
      verified: true,
      category: "Аккаунты",
      online: true
    },
    {
      id: 2,
      title: "Steam аккаунт с играми (100+ игр)",
      price: 1299,
      image: "/placeholder.svg",
      seller: "GameHub",
      rating: 4.8,
      sales: 834,
      verified: true,
      category: "Аккаунты",
      online: false,
      lastSeen: "2 часа назад"
    },
    {
      id: 3,
      title: "Spotify Premium 6 месяцев",
      price: 899,
      oldPrice: 1199,
      image: "/placeholder.svg",
      seller: "MusicDeals",
      rating: 4.9,
      sales: 2156,
      verified: true,
      category: "Подписки",
      online: true
    },
    {
      id: 4,
      title: "Netflix аккаунт 4K UHD",
      price: 599,
      image: "/placeholder.svg",
      seller: "StreamPro",
      rating: 4.7,
      sales: 567,
      verified: false,
      category: "Подписки",
      online: true
    },
    {
      id: 5,
      title: "YouTube Premium 3 месяца",
      price: 449,
      oldPrice: 599,
      image: "/placeholder.svg",
      seller: "VideoPlus",
      rating: 4.8,
      sales: 923,
      verified: true,
      category: "Подписки",
      online: false,
      lastSeen: "30 минут назад"
    },
    {
      id: 6,
      title: "Adobe Creative Suite лицензия",
      price: 2299,
      image: "/placeholder.svg",
      seller: "CreativeHub",
      rating: 4.6,
      sales: 345,
      verified: true,
      category: "Софт",
      online: true
    },
    {
      id: 7,
      title: "Minecraft Premium аккаунт",
      price: 799,
      image: "/placeholder.svg",
      seller: "GameWorld",
      rating: 4.9,
      sales: 1876,
      verified: true,
      category: "Игры",
      online: true
    },
    {
      id: 8,
      title: "Microsoft Office 365 Personal",
      price: 1599,
      oldPrice: 1999,
      image: "/placeholder.svg",
      seller: "OfficePro",
      rating: 4.7,
      sales: 678,
      verified: true,
      category: "Софт",
      online: false,
      lastSeen: "1 час назад"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    oldPrice: 0,
    seller: '',
    category: '',
    image: '/placeholder.svg'
  });

  const categories = ['Все', 'Аккаунты', 'Подписки', 'Игры', 'Софт'];

  const addProduct = () => {
    if (newProduct.title && newProduct.price && newProduct.seller && newProduct.category) {
      const product: Product = {
        id: Date.now(),
        title: newProduct.title,
        price: newProduct.price,
        oldPrice: newProduct.oldPrice || undefined,
        image: newProduct.image,
        seller: newProduct.seller,
        rating: 4.5,
        sales: 0,
        verified: false,
        category: newProduct.category,
        online: true
      };
      setProducts([...products, product]);
      setNewProduct({ title: '', price: 0, oldPrice: 0, seller: '', category: '', image: '/placeholder.svg' });
      setIsAdminOpen(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">hStock</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-purple-600 font-medium">Каталог</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Продавцам</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Гарантии</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Помощь</a>
            </nav>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icon name="Plus" size={16} className="mr-1" />
                    Продать
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
                      <Label htmlFor="price">Цена (₽)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="oldPrice">Старая цена (₽)</Label>
                      <Input
                        id="oldPrice"
                        type="number"
                        value={newProduct.oldPrice}
                        onChange={(e) => setNewProduct({...newProduct, oldPrice: Number(e.target.value)})}
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
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <select
                        id="category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Выберите категорию</option>
                        {categories.slice(1).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <Button onClick={addProduct} className="w-full">
                      Добавить товар
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Войти
              </Button>

              <Button variant="outline" size="sm" className="text-gray-500">
                RU
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
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
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Categories */}
        <div className="flex overflow-x-auto space-x-4 mb-6 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} товаров найдено
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white">
              {/* Product Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.oldPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white text-xs px-2 py-1">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </Badge>
                )}
                {product.verified && (
                  <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-500 text-white text-xs px-2 py-1">
                    Проверен
                  </Badge>
                )}
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                {/* Title */}
                <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 text-sm leading-tight">
                  {product.title}
                </h3>
                
                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.oldPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  )}
                </div>

                {/* Seller Info */}
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-600 truncate mr-2">{product.seller}</span>
                      {product.online && (
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating and Sales */}
                <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Icon name="Star" size={12} className="text-yellow-400 fill-current mr-1" />
                    <span>{product.rating}</span>
                  </div>
                  <span>Продано: {product.sales}</span>
                </div>

                {/* Last Seen */}
                {!product.online && product.lastSeen && (
                  <div className="text-xs text-gray-400 mb-3">
                    Был в сети: {product.lastSeen}
                  </div>
                )}

                {/* Buy Button */}
                <Button 
                  size="sm" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
                >
                  Купить сейчас
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
              Попробуйте изменить поисковый запрос или категорию
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-purple-600 mb-4">hStock</h3>
              <p className="text-gray-600 text-sm mb-4">
                Место покупки и продажи цифровых товаров, аккаунтов и промокодов. 
                Безопасные сделки с гарантией.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <Icon name="Send" size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center">
                  <Icon name="Mail" size={16} className="text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Как купить</a></li>
                <li><a href="#" className="hover:text-gray-900">Гарантии</a></li>
                <li><a href="#" className="hover:text-gray-900">Поддержка</a></li>
                <li><a href="#" className="hover:text-gray-900">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Продавцам</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Как продать</a></li>
                <li><a href="#" className="hover:text-gray-900">Правила</a></li>
                <li><a href="#" className="hover:text-gray-900">Комиссии</a></li>
                <li><a href="#" className="hover:text-gray-900">Выплаты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">О нас</a></li>
                <li><a href="#" className="hover:text-gray-900">Контакты</a></li>
                <li><a href="#" className="hover:text-gray-900">Соглашение</a></li>
                <li><a href="#" className="hover:text-gray-900">Конфиденциальность</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
              <div>
                © 2024 hStock. Все права защищены. ИНН: 1234567890
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span>Принимаем:</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    Visa
                  </div>
                  <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    ЮM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;