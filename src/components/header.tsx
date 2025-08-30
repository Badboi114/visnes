
'use client';

import Link from 'next/link';
import { Button } from './ui/button';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/discover', label: 'Elegir' },
  { href: '/premium', label: 'Pase Premium' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <span className="font-bold text-xl tracking-wider text-primary">PENSALA</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
           <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
           </Button>
        </div>
      </div>
    </header>
  );
}
