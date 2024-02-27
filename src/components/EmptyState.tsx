export default function EmptyState() {
  return (
    <section className="w-full h-full flex flex-col items-center p-2 sm:p-10 gap-3">
      <img
        alt="sprungg logo"
        src="/SprunggImg.png"
        className="h-[100px] w-[100px] sm:w-[200px] sm:h-[200px]"
      />
      <h1 className="text-lg sm:text-2xl">Nothing to show here</h1>
    </section>
  );
}
