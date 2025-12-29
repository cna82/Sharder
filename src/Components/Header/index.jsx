"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};
const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);    
  const [openDropdown, setOpenDropdown] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const routeRegex =
    /^\/(?:$|products(?:$|\/.+)|contact|about|services\/(?:complaint|survey|warranty|service-request|service-agencies))$/;
  if (!routeRegex.test(pathname)) return null;

  return (
    <header
      className="fixed w-full top-2 z-50 bg-gray-100 border-b py-1 border-sky-600 shadow-md"
      dir="ltr"
    >
      <div className="max-w-full mx-auto flex items-center justify-between px-4 py-2 lg:py-3 relative">
        {/* Desktop Logos */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/"
            className="block w-[120px] h-[50px] relative cursor-pointer"
          >
            <Image
              src="/images/logo/logo.png"
              alt="لوگو"
              fill
              sizes="(min-width: 1024px) 120px"
              style={{ objectFit: "contain" }}
              priority={!isMobile}
              className="hover:scale-110 transition-transform duration-500"
            />
          </Link>
          <Link
            href="/"
            className="block w-[50px] h-[50px] relative cursor-pointer"
          >
            <Image
              src="/images/logo/fidaLogo.webp"
              alt="لوگو فیدا"
              fill
              sizes="50px"
              style={{ objectFit: "contain" }}
              className="hover:scale-110 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 text-[15px] font-semibold text-sky-600 ltr:flex-row-reverse">
          <NavLink href="/" label="صفحه اصلی" currentPath={pathname} />
          <DropdownMenu
            label="محصولات"
            links={[
              { href: "/products", label: "لیست محصولات" },
              { href: "/pdf", label: "کاتالوگ محصولات", target: "_blank" },
            ]}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <DropdownMenu
            label="خدمات پس از فروش"
            links={[
              { href: "/services/survey", label: "فرم نظرسنجی" },
              { href: "/services/complaint", label: "فرم ثبت شکایت" },
              { href: "/services/warranty", label: "فرم ثبت گارانتی" },
              { href: "/services/service-request", label: "درخواست خدمات" },
              {
                href: "/services/service-agencies",
                label: "لیست نمایندگی‌های خدمات",
              },
            ]}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <NavLink href="/about" label="درباره ما" currentPath={pathname} />
          <NavLink href="/contact" label="تماس با ما" currentPath={pathname} />
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between w-full px-3">
          <Link
            href="/"
            className="w-[120px] h-[50px] relative flex-shrink-0 cursor-pointer"
          >
            <Image
              src="/images/logo/logo.png"
              alt="لوگو"
              fill
              sizes="(max-width: 1023px) 50px"
              style={{ objectFit: "contain" }}
              priority={isMobile}
              className="hover:scale-110 transition-transform duration-500"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md text-sky-600 hover:bg-sky-100 transition-colors cursor-pointer z-50"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Sliding Mobile Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sky-600 transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav
            className="px-6 py-4 flex flex-col gap-4 text-[15px] font-medium text-sky-600 overflow-y-auto h-[calc(100%-64px)]"
            dir="rtl"
          >
            <div className="flex justify-start mb-4 border-b border-slate-600 pb-3">
              <Image
                src="/images/logo/fidaLogo.webp"
                alt="لوگو"
                width={70}
                height={70}
                className="cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-3">
              <MobileNavLink
                href="/"
                label="صفحه اصلی"
                setMenuOpen={setMenuOpen}
                pathname={pathname}
              />

              <MobileDropdown
                label="محصولات"
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                links={[
                  { href: "/products", label: "لیست محصولات" },
                  { href: "/pdf", label: "کاتالوگ محصولات", target: "_blank" },
                ]}
                setMenuOpen={setMenuOpen}
              />

              <MobileDropdown
                label="خدمات پس از فروش"
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                links={[
                  { href: "/services/survey", label: "فرم نظرسنجی" },
                  { href: "/services/complaint", label: "فرم ثبت شکایت" },
                  { href: "/services/warranty", label: "فرم ثبت گارانتی" },
                  { href: "/services/service-request", label: "درخواست خدمات" },
                  {
                    href: "/services/service-agencies",
                    label: "لیست نمایندگی‌ها",
                  },
                ]}
                setMenuOpen={setMenuOpen}
              />

              <MobileNavLink
                href="/about"
                label="درباره ما"
                setMenuOpen={setMenuOpen}
                pathname={pathname}
              />
              <MobileNavLink
                href="/contact"
                label="تماس با ما"
                setMenuOpen={setMenuOpen}
                pathname={pathname}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Desktop NavLink
const NavLink = ({ href, label, currentPath }) => (
  <Link
    href={href}
    className={`relative group px-1 cursor-pointer ${
      currentPath === href ? "text-gray-700" : ""
    }`}
  >
    {label}
    <span
      className={`absolute bottom-[-4px] left-0 h-[2px] w-0 bg-gray-700 group-hover:w-full transition-all duration-300 ${
        currentPath === href ? "w-full" : ""
      } rounded-full`}
    />
  </Link>
);

// Desktop Dropdown
const DropdownMenu = ({ label, links, openDropdown, setOpenDropdown }) => {
  const isOpen = openDropdown === label;
  const handleToggle = () => setOpenDropdown(isOpen ? null : label);

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center gap-1 hover:text-gray-700 transition-colors cursor-pointer"
      >
        {label} <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 bg-gray-100 border border-gray-200 rounded-lg shadow-md mt-4 z-20 min-w-[160px]">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.target}
              className={`block px-4 py-2 text-center hover:bg-sky-50 text-sm text-sky-600 cursor-pointer ${
                index === links.length - 1
                  ? " border-b-0"
                  : " border-b border-gray-500"
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Mobile NavLink
const MobileNavLink = ({ href, label, setMenuOpen, pathname }) => (
  <Link
    href={href}
    onClick={() => setMenuOpen(false)}
    className={`py-2 px-4 rounded-md hover:bg-gray-200 transition-all cursor-pointer text-right ${
      pathname === href ? "bg-gray-300/50 text-sky-700" : ""
    }`}
  >
    {label}
  </Link>
);

// Mobile Dropdown
const MobileDropdown = ({
  label,
  links,
  openDropdown,
  setOpenDropdown,
  setMenuOpen,
}) => {
  const isOpen = openDropdown === label;
  const handleToggle = () => setOpenDropdown(isOpen ? null : label);

  return (
    <div className="flex flex-col">
      <button
        onClick={handleToggle}
        className="flex justify-between items-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors cursor-pointer text-right"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="flex flex-col pl-4 text-right">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.target}
              onClick={() => {
                setOpenDropdown(null);
                setMenuOpen(false);
              }}
              className="py-2 px-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer text-right"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
