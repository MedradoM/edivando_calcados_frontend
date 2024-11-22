"use client";

import BrandsCarousel from "@/components/brandsCarousel";
import CarouselField from "@/components/carousel";
import ComercialField from "@/components/comercialField";
import FooterField from "@/components/footer";
import Header from "@/components/header";
import HighlightsField from "@/components/highlightsField";
import NewsField from "@/components/newsFields";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-28 relative justify-center z-0 flex flex-col gap-8 pb-16 bg-neutral-100">
        <CarouselField />
        <HighlightsField />
        <BrandsCarousel />
        <ComercialField />
        <NewsField />
      </main>
      <FooterField map={true} />
    </>
  );
}
