import ContainerLayout from "@/layouts/containerLayout";
import Image from "next/image";

export default function Home() {
  return (<ContainerLayout>
<div className="text-3xl lg:text-5xl xl:text-7xl text-center text-gray-200 tracking-wide leading-snug lg:leading-tight ">
  <span className="font-bold">Welcome to TechBlog!</span><br/>Discover Stories and Creative Ideas
</div>
<div className="py-12 lg:py-24">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
  {/* image */}
  <div className="relative">
    <Image src={"/images/about.png"} alt="about image" width={600} height={600} className="rounded-2xl border border-white/10"/>
  </div>

</div>
</div>
  </ContainerLayout>);
}
