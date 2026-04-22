import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero
        name="Krish Patel"
        tagline="CS & Stats Student at Duke University · Software Engineer"
        blurb="I build data-driven web apps, dabble in machine learning, and love turning my messy ideas into polished products."
      />
    </main>
  );
}
