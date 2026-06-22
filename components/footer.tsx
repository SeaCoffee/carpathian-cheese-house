import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-xl font-semibold">Карпатська Сироварня</h3>
            <p className="mt-4 text-sm opacity-90">
              Артистичні сири ручної роботи в Українських Карпатах,
              виготовлені за традиційними методами, що передаються з покоління в покоління.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Швидкі посилання</h4>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              <li>
                <Link href="/shop" className="hover:text-white">
                  Усі сири
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white">
                  Категорії
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white">
                  Наша історія
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white">
                  Питання
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Контакти</h4>
            <ul className="mt-4 space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  Верховинський район,
                  <br />
                  Івано-Франківська область, Україна
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+380 3422 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@карпатська-сироварня.ua</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Графік роботи</h4>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>
                  <p>Пн-Пт: 9:00 - 18:00</p>
                  <p>Субота: 10:00 - 16:00</p>
                  <p>Неділя: Зачинено</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>
            &copy; {new Date().getFullYear()} Карпатська Сироварня. Усі права захищені.
          </p>
          <p className="mt-2 text-xs opacity-70">
            Це демонстраційний сайт. Реальні замовлення не обробляються.
          </p>
        </div>
      </div>
    </footer>
  );
}
