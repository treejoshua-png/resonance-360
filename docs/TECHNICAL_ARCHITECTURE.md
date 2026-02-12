# MVP Technical Architecture (recommended)

## Stack
- **Frontend**: Next.js + TypeScript
- **Backend/API**: Next.js API routes (single-repo) or lightweight Node service
- **Database**: PostgreSQL
- **Queue/Jobs**: scheduled task runner for 5-day reminders
- **Reporting**: server-rendered HTML-to-PDF templates
- **AI coaching**: LLM gateway using strict retrieval context from campaign report artifacts

## Data model (core entities)
- `users` (admin accounts only)
- `campaigns`
- `participants` (assessee records)
- `raters` (invite token, status, selected relationship)
- `responses_quant`
- `responses_qual`
- `self_assessments`
- `report_runs`
- `benchmark_aggregates` (anonymized)

## Security controls
- Role-based access for admin-only workspace.
- Signed one-time invite links for raters.
- Token expiry + reminder schedule.
- PII separation and minimal retention.

## Scoring algorithm notes
1. Compute item means per group.
2. Compute competency means as average of 3 items.
3. Apply group weights (30/25/25/20).
4. Exclude self from aggregate; overlay only.
5. Suppress group panels under threshold (<2 responses).

## AI coaching context packet
- Executive summary bullets.
- Top strengths + constraints + one lever.
- 30/90-day commitments.
- Theme-coded verbatim synthesis (anonymized).

Model instructions should force:
- no diagnostic labelling,
- no legal/HR advice,
- cite source section when giving coaching guidance.

## Deployment
- Deploy on UK-hosted infrastructure.
- Use managed Postgres in UK region.
- Domain mapping to `resonance.global`.
- Daily backup + audit trail for admin actions.
