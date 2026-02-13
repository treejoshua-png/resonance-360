# Resonance 360 MVP Blueprint

## Product intent
Build a Resonance-branded 360 feedback platform for senior leaders and executives, with:
- Structured qualitative and quantitative multi-rater input.
- Weighted scoring by relationship group.
- Self-assessment overlay comparisons.
- Executive-grade PDF and in-app reporting.
- AI coaching grounded in participant-specific feedback.

## Users & access
- **Super admins**: consultancy owner + assistant (Kim).
- **Assessee**: leader being assessed, varies by campaign.
- **Raters**: invited by email, self-select relationship group.
- **Line manager/sponsor**: included as rater category; no attributable comments in output.

## Rater groups
1. Line manager / sponsor
2. Peers (same level)
3. Direct reports
4. Key stakeholders (cross-functional/internal clients)

## Questionnaire design
### Qualitative prompts (all raters)
1. At her best, what specific behaviours make her most effective—and what positive impact do you see as a result? Include brief examples.
2. What 1–3 specific behaviours or habits should she change to be more effective over the next 6 months?
3. If she focused on just one leadership priority this year, what should it be—and why?

### Quantitative prompts
- 10 competencies, each with 3 sub-component questions.
- Scale: 1–7, where 1 = rarely demonstrates and 7 = consistently demonstrates.
- Self-assessment captures quant only; used only for overlay (not overall score).

## Weighting and aggregation
- Manager: 30%
- Peers: 25%
- Direct reports: 25%
- Stakeholders: 20%

Each competency score = weighted average of available group means.
- Group display threshold: minimum 2 responses.
- If a group is below threshold, suppress displayed group score and redistribute weight proportionally across available groups for aggregate reporting.

## Report outputs
1. Purpose & Method
2. Executive Summary
3. Scorecard Snapshot
4. Strengths to Amplify
5. Constraints to Address
6. The One Lever
7. Priority for next 12 months
8. Development Plan
9. AI coaching guidance
10. Appendix (question set + method)

### Additional line manager report (2 pages)
- Executive summary
- Scorecard snapshot
- Strengths to amplify
- Constraints to address
- One lever + 90-day plan

## Mandatory insight coding lenses
Every qualitative insight is coded to one primary lens:
- Impact on results
- Impact on people/relationships
- Impact on execution (decisions, follow-through)

## AI coaching boundaries
- Use only feedback for that specific assessee and campaign.
- No personal attribution of comments.
- Tone selected by user at chat start: supportive / direct challenger / mixed.
- Avoid legal/HR determinations; redirect to qualified internal channels where needed.

## Compliance and data handling
- UK regulatory alignment baseline (GDPR-first handling).
- No raw PII in analytics or logs.
- Keep anonymized trend-level benchmark data only.
- Avoid retaining identifiable raw comments in long-term data stores.

## MVP milestones
1. Survey flow + email invite/reminder engine.
2. Scoring engine + dashboard (heatmap + dual radar).
3. Full report generator + 2-page manager report PDF export.
4. AI coaching chat grounded in generated report pack.
