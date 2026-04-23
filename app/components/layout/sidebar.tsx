"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNavItems, navItems } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";
import { authClient } from "@/app/lib/auth-client";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 overflow-y-auto bg-slate-50 flex flex-col p-6 space-y-8 z-40">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3">
        <div className="w-10 h-10 relative">
          <Image
            src="/images/logo.svg"
            alt="ImpactSphere"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-xl font-black text-violet-900 font-manrope">
          ImpactSphere
        </span>
      </Link>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out active:scale-98",
                "hover:translate-x-1",
                isActive
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-200/50",
              )}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-semibold font-inter">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* CTA Button */}
      <div className="pt-6 border-t border-outline-variant/10">
        <button
          type="button"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm shadow-xl shadow-primary/20 active:scale-95 transition-transform"
        >
          Create Project
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="space-y-2 mt-auto">
        {footerNavItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl hover:translate-x-1 transition-transform duration-300 ease-in-out"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm font-semibold font-inter">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Auth Section */}
      <div className="pt-4 border-t border-outline-variant/10 space-y-2">
        {session?.user ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm">
                {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface truncate">
                  {session.user.name || session.user.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => authClient.signOut()}
              className="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-semibold font-inter">
                Sign out
              </span>
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined">login</span>
            <span className="text-sm font-semibold font-inter">Sign in</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
