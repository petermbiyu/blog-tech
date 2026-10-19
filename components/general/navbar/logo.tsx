import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-gray-300 font-bold text-xl md:text-2xl lg:text-3xl"
    >
      Blog<span className="text-primary">Tech</span>
    </Link>
  );
};

export default Logo;
