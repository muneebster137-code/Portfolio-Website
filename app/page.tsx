import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Services } from "@/components/home/Services";
import { Work } from "@/components/home/Work";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { Closing } from "@/components/home/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Services />
      <Work />
      <Process />
      <Proof />
      <Closing />
    </>
  );
}
