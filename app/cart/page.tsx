'use client';

import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { cartProducts, decreaseQuantity, addItem, removeItem, subtotal, deliveryCost, total, clearCart } = useCart();

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-[60vh] bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
          <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
            Ваш кошик порожній
          </h1>
          <p className="mt-4 text-muted-foreground">
            Схоже, ви ще не додали жодного сиру до кошика.
          </p>
          <Link href="/shop">
            <Button size="lg" className="mt-8">
              Переглянути сири
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Кошик
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-muted-foreground hover:text-destructive"
          >
            Очистити кошик
          </button>
        </div>

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="flex gap-4 p-4">
                    <Link
                      href={`/product/${product.slug}`}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href={`/product/${product.slug}`}
                            className="font-serif text-lg font-semibold hover:underline"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            за {product.unit}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQuantity(product.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm hover:bg-muted"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-medium">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => addItem(product.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm hover:bg-muted"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-lg font-semibold">
                          {product.lineTotal} грн
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Продовжити покупки
            </Link>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:col-span-4 lg:mt-0">
            <div className="sticky top-24">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h2 className="font-serif text-xl font-semibold">Підсумок замовлення</h2>

                  <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Підсумок ({cartProducts.length} {cartProducts.length === 1 ? 'товар' : 'товарів'})</span>
                      <span>{subtotal} грн</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Орієнтова доставка</span>
                      <span>{subtotal >= 500 ? 'Безкоштовно' : `${deliveryCost} грн`}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Разом</span>
                      <span>{total} грн</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Доставка розраховується при оформленні
                    </p>
                  </div>

                  {subtotal < 300 && (
                    <div className="rounded-md bg-secondary/20 p-3 text-center text-sm text-brown-600">
                      Мінімальне замовлення: 300 грн
                    </div>
                  )}

                  {subtotal >= 500 && (
                    <div className="rounded-md bg-muted p-3 text-center text-sm text-primary">
                      Ви отримуєте безкоштовну доставку!
                    </div>
                  )}

                  <Link href="/checkout">
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={subtotal < 300}
                    >
                      Оформити замовлення
                    </Button>
                  </Link>

                  <p className="text-center text-xs text-muted-foreground">
                    Це демонстрація. Реальні замовлення не обробляються.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
