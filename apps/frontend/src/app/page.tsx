import Header from "@/components/layout/Header";
import LineWaves from "@/components/ui/LineWaves";

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0">
        <LineWaves enableMouseInteraction mouseInfluence={1} />
      </div>

      <div className="px-3 md:px-6 lg:px-8 xl:px-10">
        <Header />
      </div>
    </>
  );
}
