import { sql } from "@vercel/postgres";

export type StoredUser = {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
};

/** Creates or updates the local user row keyed by the Google account id. */
export async function upsertUser(user: StoredUser): Promise<void> {
  await sql`
    INSERT INTO users (id, email, name, image)
    VALUES (${user.id}, ${user.email}, ${user.name}, ${user.image})
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      image = EXCLUDED.image
  `;
}

export type TypingResultInput = {
  userId: string;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  modeKey: string;
  contentType: string;
};

export async function saveTypingResult(input: TypingResultInput): Promise<void> {
  await sql`
    INSERT INTO typing_results (user_id, wpm, raw_wpm, accuracy, consistency, mode_key, content_type)
    VALUES (
      ${input.userId},
      ${input.wpm},
      ${input.rawWpm},
      ${input.accuracy},
      ${input.consistency},
      ${input.modeKey},
      ${input.contentType}
    )
  `;
}

export type TypingResultRow = {
  id: number;
  wpm: number;
  raw_wpm: number;
  accuracy: number;
  consistency: number;
  mode_key: string;
  content_type: string;
  created_at: string;
};

export async function getRecentResults(userId: string, limit = 200): Promise<TypingResultRow[]> {
  const { rows } = await sql<TypingResultRow>`
    SELECT id, wpm, raw_wpm, accuracy, consistency, mode_key, content_type, created_at
    FROM typing_results
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows;
}

export type LessonProgressInput = {
  userId: string;
  lessonSlug: string;
  wpm: number;
  accuracy: number;
};

export async function saveLessonProgress(input: LessonProgressInput): Promise<void> {
  await sql`
    INSERT INTO lesson_progress (user_id, lesson_slug, best_wpm, best_accuracy, completed_at)
    VALUES (${input.userId}, ${input.lessonSlug}, ${input.wpm}, ${input.accuracy}, now())
    ON CONFLICT (user_id, lesson_slug) DO UPDATE SET
      best_wpm = GREATEST(lesson_progress.best_wpm, EXCLUDED.best_wpm),
      best_accuracy = GREATEST(lesson_progress.best_accuracy, EXCLUDED.best_accuracy),
      completed_at = now()
  `;
}

export type LessonProgressRow = {
  lesson_slug: string;
  best_wpm: number;
  best_accuracy: number;
  completed_at: string;
};

export async function getLessonProgress(userId: string): Promise<LessonProgressRow[]> {
  const { rows } = await sql<LessonProgressRow>`
    SELECT lesson_slug, best_wpm, best_accuracy, completed_at
    FROM lesson_progress
    WHERE user_id = ${userId}
  `;
  return rows;
}
