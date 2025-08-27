export function Footer() {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} StaesBlog. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
