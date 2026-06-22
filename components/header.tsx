'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingBag, X } from 'lucide-react';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Головна', href: '/' },
  { name: 'Крамниця', href: '/shop' },
  { name: 'Наша історія', href: '/#about' },
  { name: 'Питання', href: '/#faq' },
  { name: 'Контакти', href: '/#contact' },
];

export function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (pathname.startsWith('/checkout')) {
      setCartOpen(false);
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">
              C
            </span>
          </div>
          <span className="font-serif text-xl font-semibold text-foreground">
            Карпатська Сироварня
          </span>
        </Link>

        <nav className="hidden md:flex md:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>

            <CartSheet onClose={() => setCartOpen(false)} />
          </Sheet>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-semibold">Меню</span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="mt-6 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function CartSheet({ onClose }: { onClose: () => void }) {
  const {
    cartProducts,
    decreaseQuantity,
    addItem,
    removeItem,
    subtotal,
    deliveryCost,
    total,
    clearCart,
  } = useCart();

  const canCheckout = subtotal >= 300 && cartProducts.length > 0;

  return (
    <SheetContent className="w-full max-w-md">
      <div className="flex h-full flex-col">
        <h2 className="font-serif text-2xl font-semibold">Ваш кошик</h2>

        {cartProducts.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
            <p className="text-muted-foreground">Ваш кошик порожній</p>

            <Link href="/shop" onClick={onClose}>
              <Button>Переглянути товари</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-4">
                {cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 rounded-lg border border-border p-3"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <h4 className="font-medium">{product.name}</h4>

                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Видалити товар"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        за {product.unit}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(product.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-sm hover:bg-muted"
                          >
                            -
                          </button>

                          <span className="w-8 text-center text-sm">
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => addItem(product.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-sm hover:bg-muted"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-medium">
                          {product.lineTotal} грн
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Підсумок</span>
                <span>{subtotal} грн</span>
              </div>

              <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                <span>Доставка</span>
                <span>
                  {subtotal >= 500 ? 'Безкоштовно' : `Від ${deliveryCost} грн`}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-lg font-semibold">
                <span>Разом</span>
                <span>{total} грн</span>
              </div>

              {subtotal < 300 && (
                <p className="mt-2 rounded-md bg-secondary/20 p-2 text-center text-xs text-[#6F4E37]">
                  Мінімальне замовлення: 300 грн
                </p>
              )}

              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={clearCart} className="flex-1">
                  Очистити
                </Button>

                {canCheckout ? (
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="flex-1"
                  >
                    <Button className="w-full">Оформити</Button>
                  </Link>
                ) : (
                  <Button className="flex-1" disabled>
                    Оформити
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </SheetContent>
  );
}
