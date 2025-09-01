import React from 'react';

export function Footer() {
  return (
    <footer className="mt-12 border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} StaesBlog. Built with Next.js &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}

export default Footer;

