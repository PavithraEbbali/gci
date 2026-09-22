import { serviceSections } from '@/lib/content';
import Header, { DisclosureBar } from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Offers from '@/components/sections/Offers';
import PlanSection from '@/components/sections/PlanSection';
import FinePrintGrid from '@/components/sections/FinePrintGrid';
import WhyGci from '@/components/sections/WhyGci';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';

/**
 * Section order is fixed by the brief:
 *   1. Top disclosure bar
 *   2. Sticky header
 *   3. Hero (ZIP check + call CTA + featured offer + aurora backdrop)
 *   3b. Current offers rail
 *   4. Service lines, in strict order — Fiber → Bundles → Mobile → Phone
 *      (Cable and TV are absent: the gci.com audit found no native offering
 *       for either, so no placeholder sections are rendered.)
 *   5. Honest fine-print grid
 *   6. Why GCI / features
 *   7. FAQ
 *   8. Legal footer
 *
 * The service list itself is driven entirely by `serviceSections` in
 * lib/content.ts — adding or removing a line there changes the page.
 */
export default function Page() {
  return (
    <>
      <DisclosureBar />
      <Header />

      <main>
        <Hero />
        <Offers />

        {serviceSections.map((section) => (
          <PlanSection key={section.id} section={section} />
        ))}

        <FinePrintGrid />
        <WhyGci />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
