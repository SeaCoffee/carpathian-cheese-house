'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Truck, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/lib/cart-context';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartProducts, subtotal, deliveryCost, total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const finalDeliveryCost = deliveryMethod === 'delivery' ? deliveryCost : 0;
  const finalTotal = subtotal + finalDeliveryCost;

  useEffect(() => {
    if (cartProducts.length === 0 && !submitted) {
      router.push('/shop');
    }
  }, [cartProducts, submitted, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Замовлення прийнято!
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Дякуємо за ваше замовлення! Це демонстраційний сайт, тому реальне замовлення не було створено.
            У реальному магазині ви б отримали лист-підтвердження найближчим часом.
          </p>
          <div className="mt-8 rounded-lg border border-border bg-muted/50 p-6 text-left">
            <h3 className="font-semibold">Підсумок демо-замовлення</h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">Ім’я:</span> {name || 'Не вказано'}</p>
              <p><span className="font-medium text-foreground">Телефон:</span> {phone || 'Не вказано'}</p>
              <p><span className="font-medium text-foreground">Email:</span> {email || 'Не вказано'}</p>
              <p><span className="font-medium text-foreground">Доставка:</span> {deliveryMethod === 'pickup' ? 'Самовивіз' : 'Доставка'}</p>
              {deliveryMethod === 'delivery' && address && (
                <p><span className="font-medium text-foreground">Адреса:</span> {address}</p>
              )}
              {notes && <p><span className="font-medium text-foreground">Примітки:</span> {notes}</p>}
            </div>
          </div>
          <Link href="/shop">
            <Button className="mt-8" size="lg">
              Продовжити покупки
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад до крамниці
        </Link>

        <h1 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Оформлення замовлення
        </h1>

        {cartProducts.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">Ваш кошик порожній.</p>
          </div>
        ) : (
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Контактна інформація</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Повне ім’я *</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Введіть ваше ім'я"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Номер телефону *</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+380..."
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email адреса *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Спосіб доставки</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={deliveryMethod}
                      onValueChange={(v) => setDeliveryMethod(v as 'pickup' | 'delivery')}
                    >
                      <div className="flex items-start space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <div className="flex-1">
                          <Label htmlFor="pickup" className="flex items-center gap-2 font-medium">
                            <Store className="h-4 w-4" />
                            Самовивіз
                          </Label>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Заберіть замовлення на нашій сироварні в Карпатах. Ми зателефонуємо, коли все буде готово.
                          </p>
                        </div>
                        <span className="font-medium text-primary">Безкоштовно</span>
                      </div>

                      <div className="flex items-start space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <div className="flex-1">
                          <Label htmlFor="delivery" className="flex items-center gap-2 font-medium">
                            <Truck className="h-4 w-4" />
                            Доставка
                          </Label>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Доставляємо у великі міста України рефрижераторним транспортом.
                          </p>
                        </div>
                        <span className="font-medium text-primary">
                          {subtotal >= 500 ? 'Безкоштовно' : `Від ${deliveryCost} грн`}
                        </span>
                      </div>
                    </RadioGroup>

                    {deliveryMethod === 'delivery' && (
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="address">Адреса доставки *</Label>
                        <Textarea
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Введіть повну адресу доставки з містом та поштовим індексом"
                          required={deliveryMethod === 'delivery'}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Order Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Примітки до замовлення (необов’язково)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Будь-які особливі побажання або інструкції до замовлення..."
                    />
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full">
                  Оформити демо-замовлення
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Це демонстрація. Реальне замовлення не буде створено.
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:col-span-5 lg:mt-0">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Підсумок замовлення</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Products list */}
                    <div className="max-h-64 space-y-3 overflow-y-auto">
                      {cartProducts.map((product) => (
                        <div key={product.id} className="flex gap-3">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.quantity} x {product.price} грн
                            </p>
                          </div>
                          <p className="font-medium">
                            {product.lineTotal} грн
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Підсумок</span>
                        <span>{subtotal} грн</span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                        <span>Доставка</span>
                        <span>
                          {deliveryMethod === 'pickup'
                            ? 'Безкоштовно'
                            : finalDeliveryCost === 0
                            ? 'Безкоштовно'
                            : `${finalDeliveryCost} грн`}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-between text-lg font-semibold">
                        <span>Разом</span>
                        <span>{finalTotal} грн</span>
                      </div>
                    </div>

                    {subtotal >= 500 && deliveryMethod === 'delivery' && (
                      <div className="rounded-md bg-muted p-3 text-center text-sm text-primary">
                        Безкоштовна доставка застосована!
                      </div>
                    )}

                    {subtotal < 300 && (
                      <div className="rounded-md bg-secondary/20 p-3 text-center text-sm text-brown-600">
                        Мінімальна сума замовлення — 300 грн
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
