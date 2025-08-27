'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-12 border-t bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} StaesBlog. Built with Next.js &amp; Tailwind CSS.</p>
      </div>
    </motion.footer>
  );
}

export default Footer;

