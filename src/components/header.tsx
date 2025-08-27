'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookText } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="rounded-full bg-gradient-to-r from-primary to-accent p-2 text-primary-foreground"
          >
            <BookText className="h-5 w-5" />
          </motion.div>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            StaesBlog
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium sm:flex">
          <motion.span whileHover={{ scale: 1.1 }}>
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
          </motion.span>
          <motion.span whileHover={{ scale: 1.1 }}>
            <Link href="#latest-posts" className="transition-colors hover:text-primary">
              Posts
            </Link>
          </motion.span>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;

