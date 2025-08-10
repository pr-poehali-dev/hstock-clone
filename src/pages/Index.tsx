import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  category: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Смартфон iPhone 15 Pro",
      price: 89990,
      oldPrice: 99990,
      image: "/placeholder.svg",
      category: "Электроника"
    },
    {
      id: 2,
      title: "Ноутбук MacBook Air M3",
      price: 129990,
      oldPrice: 149990,
      image: "/placeholder.svg",
      category: "Компьютеры"
    },
    {
      id: 3,
      title: "Наушники AirPods Pro",
      price: 24990,
      image: "/placeholder.svg",
      category: "Аксессуары"
    },
    {
      id: 4,
      title: "Планшет iPad Pro 12.9",
      price: 94990,
      oldPrice: 109990,
      image: "/placeholder.svg",
      category: "Планшеты"
    },
    {
      id: 5,
      title: "Умные часы Apple Watch",
      price: 34990,
      image: "/placeholder.svg",
      category: "Аксессуары"
    },
    {
      id: 6,
      title: "Телевизор Samsung QLED 55",
      price: 79990,
      oldPrice: 89990,
      image: "/placeholder.svg",
      category: "Телевизоры"
    }
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    oldPrice: 0,
    category: '',
    image: '/placeholder.svg'
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const addProduct = () => {
    if (newProduct.title && newProduct.price && newProduct.category) {
      const product: Product = {
        id: Date.now(),
        title: newProduct.title,
        price: newProduct.price,
        oldPrice: newProduct.oldPrice || undefined,
        image: newProduct.image,
        category: newProduct.category
      };
      setProducts([...products, product]);
      setNewProduct({ title: '', price: 0, oldPrice: 0, category: '', image: '/placeholder.svg' });
      setIsAdminOpen(false);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-orange-blue rounded-xl flex items-center justify-center">
                <Icon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">H-Stock</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative hover-scale">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs gradient-orange-blue text-white border-0">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Корзина товаров</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                            <p className="font-bold text-primary">{item.price.toLocaleString('ru-RU')} ₽</p>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold">Итого:</span>
                            <span className="font-bold text-xl text-primary">
                              {getTotalPrice().toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                          <Button className="w-full gradient-orange-blue text-white hover:opacity-90">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hover-scale">
                    <Icon name="Settings" size={20} />
                    Админ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
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
                        placeholder="Введите название"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Цена</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="oldPrice">Старая цена (необязательно)</Label>
                      <Input
                        id="oldPrice"
                        type="number"
                        value={newProduct.oldPrice}
                        onChange={(e) => setNewProduct({...newProduct, oldPrice: Number(e.target.value)})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Input
                        id="category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        placeholder="Электроника"
                      />
                    </div>
                    <Button onClick={addProduct} className="w-full gradient-orange-blue text-white hover:opacity-90">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить товар
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 gradient-electric opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Современные технологии
            <br />
            <span className="gradient-orange-blue bg-clip-text text-transparent">по лучшим ценам</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Огромный выбор электроники, гаджетов и аксессуаров с доставкой по всей России
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-orange-blue text-white hover:opacity-90 hover-scale">
              <Icon name="Zap" size={20} className="mr-2" />
              Каталог товаров
            </Button>
            <Button size="lg" variant="outline" className="hover-scale">
              <Icon name="Truck" size={20} className="mr-2" />
              Быстрая доставка
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Популярные товары</h3>
            <p className="text-gray-600">Самые актуальные новинки и хиты продаж</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="hover-scale card-shadow border-0 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.oldPrice && (
                      <Badge className="absolute top-3 left-3 gradient-orange-blue text-white border-0">
                        Скидка {Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </Badge>
                    )}
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-2">{product.title}</CardTitle>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.oldPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => addToCart(product)}
                    className="w-full gradient-orange-blue text-white hover:opacity-90"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-orange-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Быстрая доставка</h4>
              <p className="text-gray-600">Доставим заказ в течение 1-2 дней по всей России</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-orange-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Гарантия качества</h4>
              <p className="text-gray-600">Все товары имеют официальную гарантию производителя</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-orange-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Удобная оплата</h4>
              <p className="text-gray-600">Оплачивайте картой, наличными или в рассрочку</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;