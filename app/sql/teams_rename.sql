SELECT to_regclass('public.team');

ALTER TABLE "public"."team" RENAME TO "teams";

SELECT to_regclass('public.teams');
