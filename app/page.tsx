import Link from 'next/link';
import { ArrowRight, Truck, MapPin, Award, Users, Star } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedProducts, categories, testimonials, faqData } from '@/lib/data';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cheese-50 via-cheese-100 to-forest-50 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5953714/pexels-photo-5953714.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-[0.08]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Крафтові сири з серця Карпат
            </h1>

            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Відкрийте справжній смак карпатського сироваріння: м’які, витримані,
              козині, копчені та блакитні сири, виготовлені малими партіями з
              локального молока.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" className="group">
                  Переглянути сири
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="#about">
                <Button variant="outline" size="lg">
                  Наша історія
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Категорії сирів
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Від ніжних вершкових сирів до витриманих, копчених і пікантних сортів
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/shop?category=${category.slug}`}>
                <Card className="group overflow-hidden border-border/50 shadow-sm transition-all hover:border-cheese-300 hover:shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <CardContent className="bg-card p-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Рекомендовані сири
              </h2>

              <p className="mt-2 text-muted-foreground">
                Найпопулярніші позиції для сирної тарілки, подарунка або затишної вечері
              </p>
            </div>

            <Link href="/shop" className="hidden sm:block">
              <Button variant="outline">
                Усі сири <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-cheese-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {!product.isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="rounded bg-foreground px-3 py-1 text-sm text-background">
                          Немає в наявності
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-secondary">
                      {product.categoryName}
                    </p>

                    <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {product.shortDescription}
                    </p>

                    <p className="mt-3 font-semibold text-foreground">
                      {product.price} грн{' '}
                      <span className="text-sm font-normal text-muted-foreground">
                        за {product.unit}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop">
              <Button variant="outline">
                Усі сири <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/5953714/pexels-photo-5953714.jpeg"
                  alt="Крафтове сироваріння в Карпатах"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 hidden rounded-lg bg-primary p-6 text-primary-foreground shadow-lg sm:block">
                <p className="text-3xl font-bold">25+</p>
                <p className="text-sm">років традиції</p>
              </div>
            </div>

            <div className="lg:pl-8">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Наша історія
              </h2>

              <p className="mt-6 text-muted-foreground">
                Карпатська Сироварня народилася з сімейної традиції та любові до
                простих, чесних продуктів. Ми працюємо невеликими партіями, обираємо
                локальне молоко та даємо кожному сиру стільки часу, скільки потрібно
                для природного дозрівання.
              </p>

              <p className="mt-4 text-muted-foreground">
                Щоранку ми отримуємо свіже молоко з місцевих господарств, де тварини
                пасуться на гірських луках. Наші сири дозрівають у прохолодних
                кам’яних погребах, набуваючи глибини, характеру й тонких смакових
                відтінків. Від солонуватої бринзи до витриманого твердого сиру —
                кожен шматочок передає смак Карпат.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Award className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">Відзнаки</p>
                    <p className="text-sm text-muted-foreground">
                      15+ регіональних нагород
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">Сімейна справа</p>
                    <p className="text-sm text-muted-foreground">
                      Третє покоління сироварів
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <Truck className="mb-4 h-10 w-10" />
              <h3 className="text-lg font-semibold">Безкоштовна доставка</h3>
              <p className="mt-1 text-sm opacity-90">
                Для замовлень від 500 грн
              </p>
            </div>

            <div className="flex flex-col items-center">
              <MapPin className="mb-4 h-10 w-10" />
              <h3 className="text-lg font-semibold">Самовивіз</h3>
              <p className="mt-1 text-sm opacity-90">
                Забирайте замовлення у нашій сироварні
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Award className="mb-4 h-10 w-10" />
              <h3 className="text-lg font-semibold">Гарантія якості</h3>
              <p className="mt-1 text-sm opacity-90">
                Пакуємо так, щоб сир доїхав свіжим
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm opacity-80">
              Мінімальне замовлення: 300 грн · Доставка для замовлень до 500 грн — від 80 грн
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Відгуки клієнтів
            </h2>

            <p className="mt-4 text-muted-foreground">
              Що кажуть люди, які вже куштували наші сири
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  {testimonial.text}
                </p>

                <div className="mt-4 border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Часті запитання
            </h2>

            <p className="mt-4 text-muted-foreground">
              Усе про замовлення, доставку, зберігання та відвідування сироварні
            </p>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Маєте запитання? Ми допоможемо
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Потрібна порада щодо сирної тарілки, подарункового набору, гуртової
            співпраці або візиту до сироварні? Напишіть нам — підкажемо найкращий
            варіант.
          </p>

          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Напишіть нам
              </p>

              <a
                href="mailto:hello@karpatska-syrovarnia.ua"
                className="text-lg font-semibold text-primary hover:underline"
              >
                hello@karpatska-syrovarnia.ua
              </a>
            </div>

            <div className="hidden h-12 w-px bg-border sm:block" />

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Зателефонуйте
              </p>

              <a
                href="tel:+380342212345"
                className="text-lg font-semibold text-primary hover:underline"
              >
                +380 342 212 345
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-border bg-muted p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Відвідайте нашу сироварню
            </p>

            <p className="mt-2 text-lg">
              Верховинський район, Карпати
            </p>

            <p className="mt-1 text-muted-foreground">
              Приймаємо гостей за попереднім записом. Зв’яжіться з нами, щоб
              узгодити дату дегустації або екскурсії.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}