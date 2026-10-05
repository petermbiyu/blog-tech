import Link from "next/link";
import { navLinks } from "./navbar";
const MobileNav = () => {
  return (
    <div className="md:hidden">
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />
      <ul className="fixed top-18 right-0 z-50 h-[80vh] w-full flex flex-col items-center justify-center gap-10 bg-secondary-background/80 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ease-in-out">
        {navLinks.map((link) => {
          return (
            <li key={link.url}>
              <Link
                href={link.url}
                className="text-xl font-semibold tracking-wide text-gray-200 hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileNav;
