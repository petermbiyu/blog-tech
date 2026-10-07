import ContainerLayout from "@/layouts/containerLayout";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <ContainerLayout>
      <div className="px-4 sm:px-12">
        {/* heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl mb:text-5xl font-bold text-white mb-4">
            About TechBlog
          </h1>
          <p className="text-gray-400 max-2-2xl mx-auto leading-relaxed">
            A modern tech blog real world development, and thoughtful
            engineering
          </p>
        </div>
        {/* content */}
        <div className="space-y-14">
          {/* section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <Image
              src={"/images/about.png"}
              alt="about TechBlog"
              width={600}
              height={600}
              className="rounded-2xl object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">
                Why TechBlog
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis ipsam necessitatibus ea fugit repudiandae, sequi
                numquam id minus? Obcaecati esse expedita delectus maiores
                reiciendis error, animi tenetur cumque tempore ipsam, ipsum,
                itaque optio quis cum!
              </p>
            </div>
          </div>
          {/* section 2 */}
          <div className="bg-secondary-background rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              What we write about
            </h2>
            <ul className="space-y-2 text-gray-400 list-disc">
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
            </ul>
          </div>
          {/* section 3 */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              Built for developers
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus temporibus illum facere odio deleniti perspiciatis
              alias laboriosam incidunt eum? Excepturi fuga odio porro quod ut.
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default About;
