import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-serif text-6xl font-bold text-foreground">404</h1>
      <h2 className="mt-4 text-xl text-muted-foreground">Сторінку не знайдено</h2>
      <p className="mt-2 text-muted-foreground">
        Сторінка, яку ви шукаєте, не існує або була переміщена.
      </p>
      <Link href="/">
        <Button className="mt-8">Повернутися на головну</Button>
      </Link>
    </div>
  );
}
