'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categories, products } from '@/lib/data';

const sortOptions = [
  { value: 'featured', label: 'Обрані' },
  { value: 'price-asc', label: 'Ціна: від низької' },
  { value: 'price-desc', label: 'Ціна: від високої' },
  { value: 'name-asc', label: 'Назва: А-Я' },
  { value: 'name-desc', label: 'Назва: Я-А' },
];

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category');
  const selectedCategory =
    categoryParam && categories.some((category) => category.id === categoryParam)
      ? categoryParam
      : 'all';

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const changeCategory = (value: string) => {
    setFiltersOpen(false);

    if (value === 'all') {
      router.replace('/shop', { scroll: false });
      return;
    }

    router.replace(`/shop?category=${value}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearch('');
    setFiltersOpen(false);
    router.replace('/shop', { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.shortDescription.toLowerCase().includes(normalizedSearch)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.categoryId === selectedCategory
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;

      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;

      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
        break;

      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name, 'uk'));
        break;

      default:
        result.sort((a, b) => {
          if (a.isFeatured !== b.isFeatured) {
            return a.isFeatured ? -1 : 1;
          }

          return Number(b.isAvailable) - Number(a.isAvailable);
        });
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const activeCategory = categories.find(
    (category) => category.id === selectedCategory
  );

  const hasActiveFilters =
    search.trim().length > 0 || selectedCategory !== 'all';

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-cheese-50 to-muted py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Наші сири
          </h1>

          <p className="mt-2 text-muted-foreground">
            Відкрийте повну добірку наших карпатських сирів ручної роботи
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Пошук сирів..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-3 sm:flex">
              <Select
                value={selectedCategory}
                onValueChange={changeCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Категорія" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">Усі категорії</SelectItem>

                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Сортувати" />
                </SelectTrigger>

                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Фільтри</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Категорія</label>

                    <Select
                      value={selectedCategory}
                      onValueChange={changeCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Усі категорії" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="all">Усі категорії</SelectItem>

                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сортувати</label>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Сортувати" />
                      </SelectTrigger>

                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Очистити фільтри
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Активні фільтри:
            </span>

            {search.trim() && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
              >
                Пошук: {search}
                <X className="h-3 w-3" />
              </button>
            )}

            {selectedCategory !== 'all' && activeCategory && (
              <button
                type="button"
                onClick={() => changeCategory('all')}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
              >
                {activeCategory.name}
                <X className="h-3 w-3" />
              </button>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Очистити все
            </button>
          </div>
        )}

        <p className="mb-4 text-sm text-muted-foreground">
          Знайдено {filteredProducts.length}{' '}
          {filteredProducts.length === 1
            ? 'сир'
            : filteredProducts.length < 5
              ? 'сири'
              : 'сирів'}
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-semibold">
              Сирів не знайдено
            </h3>

            <p className="mt-2 text-muted-foreground">
              Спробуйте змінити пошук або фільтри, щоб знайти те, що шукаєте.
            </p>

            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Очистити фільтри
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="bg-gradient-to-br from-cheese-50 to-muted py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Наші сири
              </h1>

              <p className="mt-2 text-muted-foreground">
                Відкрийте повну добірку наших карпатських сирів ручної роботи
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-80 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}