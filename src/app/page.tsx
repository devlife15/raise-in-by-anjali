import CategoryWheel from "@/components/CategoryWheel";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative">
      {/* Minimalistic Premium Header Frame */}
      {/* <header className="absolute top-0 left-0 z-50 flex w-full items-center justify-between px-[6vw] py-8 pointer-events-none">
        <h1 className="font-serif text-xl font-bold tracking-wide pointer-events-auto">
          Raise-in
          <span className="italic font-normal text-neutral-500">
            .by anjali
          </span>
        </h1>
        <div className="font-sans text-[11px] tracking-[0.2em] text-neutral-500 uppercase pointer-events-auto">
          Anju
        </div>
      </header> */}

      {/* The Core Category Arc Scroll Experience */}
      <CategoryWheel />
    </main>
  );
}
