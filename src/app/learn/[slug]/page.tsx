import { notFound } from "next/navigation";
import Link from "next/link";
import { buildLessonText, getLesson, getNextLesson, LESSONS } from "@/lib/lessons";
import { buildMetadata } from "@/lib/seo";
import LessonRunner from "@/components/LessonRunner";

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const lesson = getLesson(params.slug);
  if (!lesson) {
    return buildMetadata({
      title: "Lesson Not Found – WPM Rush",
      description: "This lesson doesn't exist.",
      path: `/learn/${params.slug}`,
    });
  }
  return buildMetadata({
    title: `${lesson.title} – Learn to Type – WPM Rush`,
    description: lesson.description,
    path: `/learn/${lesson.slug}`,
  });
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLesson(params.slug);
  if (!lesson) notFound();

  const practiceText = buildLessonText(lesson);
  const nextLesson = getNextLesson(lesson.order);

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-faint">
          Lesson {lesson.order} of {LESSONS.length} · {lesson.group}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {lesson.title}
        </h1>
        <p className="text-muted">{lesson.description}</p>
        <Link
          href="/learn"
          className="inline-block text-sm text-muted underline underline-offset-2 transition-colors hover:text-secondary"
        >
          ← Back to all lessons
        </Link>
      </div>

      <LessonRunner
        lessonSlug={lesson.slug}
        practiceText={practiceText}
        nextLessonSlug={nextLesson?.slug ?? null}
        nextLessonTitle={nextLesson?.title ?? null}
      />
    </div>
  );
}
