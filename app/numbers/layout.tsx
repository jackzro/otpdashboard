import { Toaster } from "@/components/ui/toast";

export default function NumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center">
        <Toaster />
        {children}
      </div>
    </section>
  );
}
