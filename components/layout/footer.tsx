export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">⚡ WorkSphere</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Multi-tenant company management SaaS by Techinovates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/pricing" className="hover:text-foreground">Pricing</a></li>
              <li><a href="/products" className="hover:text-foreground">Products</a></li>
              <li><a href="/services" className="hover:text-foreground">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-foreground">About Us</a></li>
              <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/terms" className="hover:text-foreground">Terms</a></li>
              <li><a href="/privacy" className="hover:text-foreground">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Techinovates. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
