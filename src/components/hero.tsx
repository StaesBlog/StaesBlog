'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-background to-background py-16 text-center md:py-24"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl"
      >
        Welcome to StaesBlog
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mb-8 max-w-2xl text-muted-foreground"
      >
        Exploring minimalist thoughts with modern web tech.
      </motion.p>
      <Button asChild size="lg" className="group">
        <Link href="#latest-posts">
          Read Posts
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </motion.section>
  );
}

export default Hero;

