# Supabase Migrations

Database migrations for the Bonsai burnout assessment questionnaire.

## Running Migrations

### Local Development (Recommended)

Run migrations against your local Supabase instance:

```bash
# Start local Supabase (if not already running)
npm run db:start

# Apply all migrations
npm run db:reset

# Verify in Supabase Studio
open http://127.0.0.1:54323
```

### Cloud/Production

For cloud deployment or manual branches:

```bash
# Option 1: Via Supabase Dashboard SQL Editor
# 1. Open: https://supabase.com/dashboard/project/szvmbgmxqwygickaqmvs/sql
# 2. Copy contents of migration file
# 3. Paste and click Run

# Option 2: Via Supabase CLI (requires linking)
# Install via Homebrew (macOS)
brew install supabase/tap/supabase

# Link to cloud project (requires access token)
supabase link --project-ref szvmbgmxqwygickaqmvs --token <your-token>

# Push migrations to cloud
supabase db push
```

## Database Schema

### Tables

#### `questions`

Stores questionnaire questions.

| Column     | Type      | Description                       |
| ---------- | --------- | --------------------------------- |
| id         | UUID      | Primary key                       |
| type       | TEXT      | 'single-select' or 'multi-select' |
| explainer  | TEXT      | Context text shown above question |
| question   | TEXT      | Main question text                |
| order      | INTEGER   | Display order (1, 2, 3...)        |
| required   | BOOLEAN   | Whether answer is required        |
| created_at | TIMESTAMP | When question was created         |
| updated_at | TIMESTAMP | When question was last updated    |

#### `question_options`

Stores answer options for each question.

| Column      | Type      | Description                     |
| ----------- | --------- | ------------------------------- |
| id          | UUID      | Primary key                     |
| question_id | UUID      | Foreign key to questions table  |
| value       | TEXT      | Option value (e.g., 'very-low') |
| label       | TEXT      | Display text (e.g., 'Very Low') |
| order       | INTEGER   | Display order within question   |
| created_at  | TIMESTAMP | When option was created         |

### Row Level Security (RLS)

Both tables have RLS enabled with public read access:

- Anyone can SELECT (read) questions and options
- Only authenticated users with proper roles can INSERT/UPDATE/DELETE

This allows the app to fetch questions without authentication while keeping admin operations secure.

## Sample Data

The migration includes sample data for the burnout assessment questionnaire:

**Question 1 (Single-select):**

- Explainer: "Understanding your current state helps us provide better support."
- Question: "How would you describe your current stress level?"
- Options: Very Low, Low, Moderate, High, Very High, Extreme

**Question 2 (Multi-select):**

- Explainer: "Select all that apply to your current experience."
- Question: "Which of the following symptoms have you been experiencing?"
- Options: Chronic Fatigue, Anxiety, Difficulty Concentrating, Irritability, Sleep Issues, Physical Symptoms (headaches, muscle tension)

## Next Steps

After running the migration:

1. Verify data in Supabase Studio
2. Test the QuestionRepository in the app
3. Add more questions via Studio or additional migrations

## Adding New Questions

Via Supabase Studio Table Editor:

1. Navigate to the `questions` table
2. Click **Insert row**
3. Fill in the fields
4. Add options in the `question_options` table referencing the question's ID
