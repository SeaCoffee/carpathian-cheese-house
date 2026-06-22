'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

interface ProductPageProps {
  slug: string;
}

export function ProductPage({ slug }: ProductPageProps) {
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Головна
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">
            Крамниця
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.categoryId}`}
            className="hover:text-foreground"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {!product.isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded bg-foreground px-4 py-2 text-lg text-background">
                  Немає в наявності
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="mt-8 lg:mt-0">
            <Badge variant="secondary" className="mb-4">
              {product.categoryName}
            </Badge>

            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                {product.price} грн
              </span>
              <span className="text-muted-foreground">за {product.unit}</span>
            </div>

            {/* Product details grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-border p-4">
              <div>
                <p className="text-sm text-muted-foreground">Вага</p>
                <p className="font-medium">{product.weight}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Витримка</p>
                <p className="font-medium">{product.aging}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Інгредієнти</p>
                <p className="font-medium">{product.ingredients.join(', ')}</p>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1"
                disabled={!product.isAvailable}
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Додано до кошика
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    До кошика — {product.price * quantity} грн
                  </>
                )}
              </Button>
            </div>

            {!product.isAvailable && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Цей продукт наразі відсутній. Перевірте пізніше!
              </p>
            )}

            {/* Back to shop */}
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад до крамниці
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Більше з {product.categoryName}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
