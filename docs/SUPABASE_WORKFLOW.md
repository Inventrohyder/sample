# Supabase Professional Workflow

## Overview

This project uses **Supabase with local development** for database schema management.

### Architecture

```text
Development Flow       →    Database Environment     →    Your Local App
────────────────────────────────────────────────────────────────────────────
Local development      →    Local Docker Database    →    LOCAL env
Production/Cloud       →    Cloud Production DB      →    PROD env
Manual branches        →    Manual Cloud Branches    →    TESTING env
```

## Benefits

✅ **Safe Development** - Local changes don't affect production
✅ **Git-Based** - Database schema changes version-controlled in migrations
✅ **Fast Iteration** - Local database starts in seconds
✅ **Reversible** - Roll back any migration locally
✅ **Type-Safe** - Generated TypeScript types from actual schema
✅ **Isolated Testing** - Local database completely isolated
✅ **No Cost** - Local development is free (no Pro plan needed)

---

## Prerequisites

- [x] Homebrew installed (macOS)
- [x] Docker Desktop running (for local development)
- [x] Git repository connected to GitHub
- [x] Supabase project created

---

## Setup Instructions

### 1. Install Supabase CLI

```bash
brew install supabase/tap/supabase
```

### 2. Initialize Supabase in Project

```bash
cd /Users/inventrohyder/Projects/bonsai/sample
supabase init
```

This creates:

- `supabase/` directory
- `supabase/config.toml` - configuration
- `supabase/migrations/` - SQL migration files

### 3. Link to Cloud Project (Optional)

Only needed if you want to push migrations to cloud or use manual branches:

```bash
# Get access token from: https://supabase.com/dashboard/account/tokens
supabase link --project-ref szvmbgmxqwygickaqmvs --token <your-access-token>
```

### 4. Start Local Development

```bash
# Start local Supabase
npm run db:start

# Switch to local environment
npm run env:local
```

The local anon key is already configured in `.env.local`.

---

## Development Workflow

### Local Development (Recommended)

#### Start Local Supabase

```bash
supabase start
```

This starts:

- PostgreSQL database
- Studio (web UI): <http://localhost:54323>
- API: <http://localhost:54321>
- Inbucket (emails): <http://localhost:54324>

#### Point App to Local

```bash
npm run env:local
```

This copies `.env.local` to `.env` (anon key already configured).

#### Create Migration

```bash
# Create new migration file
supabase migration new add_user_responses_table

# Edit the generated file in supabase/migrations/
# Add your SQL

# Apply migration locally
supabase db reset
```

#### Generate Types

```bash
supabase gen types typescript --local > lib/database.types.ts
```

#### Develop & Test

```bash
npm start
# Test your changes against local database
```

---

### Manual Cloud Branch Workflow (Optional)

For testing migrations before production deployment:

#### 1. Create Manual Branch in Dashboard

1. Visit: <https://supabase.com/dashboard/project/szvmbgmxqwygickaqmvs/branches>
2. Click **Create Branch**
3. Name it (e.g., `test-new-feature`)
4. Copy the branch URL and anon key

#### 2. Create Environment File

```bash
# Create .env.test
echo "EXPO_PUBLIC_SUPABASE_URL=<branch-url>" > .env.test
echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=<branch-anon-key>" >> .env.test
```

#### 3. Test Migration on Branch

```bash
# Switch to test environment
cp .env.test .env

# Run your app and test
npm start
```

#### 4. Push to Production

Once tested, apply migration to production:

```bash
# Option 1: Via Dashboard SQL Editor
# Copy migration SQL and run in production SQL editor

# Option 2: Via CLI (if linked)
supabase db push
```

#### 5. Cleanup

Delete the test branch from the Supabase dashboard when done.

---

## Environment Management

### Environment Files

```bash
# .env.local (local development) - Already configured
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key-here

# .env.production (cloud production) - Your cloud credentials
EXPO_PUBLIC_SUPABASE_URL=https://szvmbgmxqwygickaqmvs.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-prod-key>

# .env (active) - Copied from .env.local or .env.production
# This is gitignored and changes based on what you're testing
```

### Switching Environments

```bash
# Use local (default for development)
npm run env:local

# Use production (for testing against cloud)
npm run env:prod
```

---

## Common Commands

### NPM Scripts (Recommended)

```bash
npm run db:start        # Start local Supabase
npm run db:stop         # Stop local Supabase
npm run db:status       # Check status and connection details
npm run db:reset        # Reset DB and apply all migrations
npm run db:types        # Generate TypeScript types from local DB
npm run db:migration    # Create new migration: npm run db:migration <name>
npm run env:local       # Switch to local environment
npm run env:prod        # Switch to production environment
```

### Direct Supabase CLI Commands

```bash
# Local development
supabase start                                    # Start local Supabase
supabase stop                                     # Stop local Supabase
supabase status                                   # Check status
supabase db reset                                 # Apply all migrations
supabase migration new <name>                     # Create new migration
supabase migration list                           # List migrations

# Type generation
supabase gen types typescript --local > lib/database.types.ts

# Cloud operations (requires linking first)
supabase link --project-ref szvmbgmxqwygickaqmvs --token <token>
supabase db push                                  # Push migrations to cloud
supabase db pull                                  # Pull schema from cloud
supabase branches list                            # List manual branches
```

---

## Migration Best Practices

### 1. Always Test Locally First

```bash
supabase migration new my_change
# Edit migration
supabase db reset
# Test
```

### 2. One Change Per Migration

❌ Bad:

```sql
-- 001_everything.sql
CREATE TABLE users ...;
CREATE TABLE posts ...;
ALTER TABLE comments ...;
```

✅ Good:

```sql
-- 001_create_users.sql
CREATE TABLE users ...;

-- 002_create_posts.sql
CREATE TABLE posts ...;

-- 003_alter_comments.sql
ALTER TABLE comments ...;
```

### 3. Always Include Rollback Logic

```sql
-- Migration up
CREATE TABLE new_table (...);

-- Migration down (commented for reference)
-- DROP TABLE IF EXISTS new_table;
```

### 4. Test Rollback Locally

```bash
supabase migration new my_change
# Edit
supabase db reset
# Test
supabase migration repair --status reverted <migration-version>
# Test again
```

---

## Troubleshooting

### Local Supabase Won't Start

```bash
# Check Docker is running
docker ps

# Reset everything
supabase stop
supabase start
```

### Migration Failed

```bash
# Check migration status
supabase migration list

# Mark as reverted
supabase migration repair --status reverted <version>

# Fix and retry
supabase db reset
```

### Environment Variables Not Loading

```bash
# Check which environment is active
cat .env | head -2

# Ensure you've switched environments
npm run env:local  # or npm run env:prod

# Restart your app after switching
npm start
```

---

## CI/CD Integration

### GitHub Actions (Future)

```yaml
# .github/workflows/test.yml
name: Test Migrations
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
      - name: Start Supabase
        run: supabase start
      - name: Run migrations
        run: supabase db reset
      - name: Run tests
        run: npm test
```

---

## Resources

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Supabase Branching](https://supabase.com/docs/guides/platform/branching)
- [Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)
- [GitHub Integration](https://supabase.com/docs/guides/platform/github)

---

## Last Updated

2025-10-17
