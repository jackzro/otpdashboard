import CreateNumber from "./_component/CreateNumber";
import NumberTable from "./_component/NumberTable";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg">
      <CreateNumber />
      <NumberTable />
      {/* <MainTable /> */}
    </section>
  );
}
