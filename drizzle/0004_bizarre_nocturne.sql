CREATE TABLE "processed_sessions" (
	"session_id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
