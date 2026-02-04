"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain, Camera, CloudSnow, CreditCard, Phone, Menu, X, Package } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Webkamery", href: "/kamery", icon: Camera },
    { name: "Podmínky", href: "/podminky", icon: CloudSnow },
    { name: "Ceník", href: "/cenik", icon: CreditCard },
    { name: "Půjčovna", href: "/pujcovna", icon: Package },
    { name: "Kontakt", href: "/kontakt", icon: Phone },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-sunset-orange/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-diagonal-gradient flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Mountain className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="font-display text-2xl leading-none text-alpine-blue">
                Vleky Chotouň
              </div>
              <div className="font-mono text-xs text-sunset-orange uppercase tracking-wider">
                Rodinný areál
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-body font-semibold transition-all ${
                    active
                      ? "bg-diagonal-gradient text-white shadow-lg"
                      : "text-mountain-night hover:bg-sunset-orange/10 hover:text-sunset-orange"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-sunset-orange/10 flex items-center justify-center text-sunset-orange hover:bg-sunset-orange hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-sunset-orange/20">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body font-semibold transition-all ${
                      active
                        ? "bg-diagonal-gradient text-white"
                        : "text-mountain-night hover:bg-sunset-orange/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
