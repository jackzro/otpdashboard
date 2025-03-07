export default function MrktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="justify-center inline-block w-full text-center">
        {children}
      </div>
    </section>
  );
}
