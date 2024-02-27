export default function EmptyState() {
  return (
    <section className="w-full h-full flex flex-col items-center p-2 sm:p-10 gap-3">
      <img
        alt="sprungg logo"
        src="/SprunggImg.png"
        className="h-[100px] w-[100px] sm:w-[200px] sm:h-[200px]"
      />
      <h1 className="text-base font-medium">Getting started</h1>
      <ul className="list-disc text-xs sm:text-sm font-light">
        <li>
          <b className="font-semibold">Note:</b> A good internet connection is
          required for maximum experience with this editor.
        </li>
        <li>
          Autosaving of files occurs every 10 seconds on the condition that as a
          single file must be open.
        </li>
        <li>
          Select the file icon besides &ldquo;Explorer&rdquo; to create a file.
        </li>
        <li>Select the created file in the explorer to open it.</li>
        <li>When multiple tabs are open, switching of tabs is possible.</li>
        <li>Select the trash icon on a file to delete it.</li>
        <li>
          Once a file is open, the code can be executed by clicking on the
          terminals run button.
        </li>
        <li>Code execution outputs are displayed in the Terminal.</li>
      </ul>
    </section>
  );
}
