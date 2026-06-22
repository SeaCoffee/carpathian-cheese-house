import { ProductPage } from './client-page';
import { products } from '@/lib/data';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProductPage slug={params.slug} />;
}
