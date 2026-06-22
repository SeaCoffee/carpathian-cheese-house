'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md hover:border-cheese-300">
      <Link href={`/product/${product.slug}`} className="flex-1">
        <div className="relative aspect-square overflow-hidden bg-cheese-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!product.isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded bg-foreground px-3 py-1.5 text-sm text-background">
                  Немає в наявності
                </span>
            </div>
          )}
        </div>
        <CardContent className="p-4 bg-card">
          <p className="text-xs font-medium uppercase tracking-wide text-secondary">
            {product.categoryName}
          </p>
          <h3 className="mt-1 font-serif text-lg font-semibold text-foreground line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
          <p className="mt-3 font-semibold text-foreground">
            {product.price} грн{' '}
            <span className="text-sm font-normal text-muted-foreground">
              за {product.unit}
            </span>
          </p>
        </CardContent>
      </Link>
      <div className="border-t border-border px-4 pb-4 pt-3">
        <Button
          className="w-full"
          size="sm"
          disabled={!product.isAvailable}
          onClick={(e) => {
            e.preventDefault();
            addItem(product.id);
          }}
        >
          <Plus className="mr-1 h-4 w-4" />
          До кошика
        </Button>
      </div>
    </Card>
  );
}
