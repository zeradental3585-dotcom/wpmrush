import TypingTest from "@/components/TypingTest";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Test your typing speed
        </h1>
        <p className="mx-auto max-w-xl text-slate-400">
          Start typing to begin. Your WPM and accuracy are tracked in real time.
        </p>
      </div>
      <TypingTest />
    </div>
  );
}
