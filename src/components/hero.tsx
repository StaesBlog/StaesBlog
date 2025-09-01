import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="py-16 text-center md:py-24">
      <h1 className="mb-6 text-5xl font-extrabold md:text-6xl">Welcome to StaesBlog</h1>
      <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
        Exploring minimalist thoughts with modern web tech.
      </p>
      <Button asChild size="lg">
        <Link href="#latest-posts">
          Read Posts
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </section>
  );
}

export default Hero;

