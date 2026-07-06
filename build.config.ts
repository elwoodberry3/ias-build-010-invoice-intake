/**
 * build.config.ts — BUILD 010 · Invoice & Field Log Intake
 * ─────────────────────────────────────────────────────────────
 * Repo: ias-build-010-invoice-intake
 * URL:  invoice-intake.elwoodberry.com
 * Sector: Supply Chain, Logistics & Construction
 *
 * THE ONLY FILE EDITED FOR THIS BUILD.
 *
 * Governance (Article IX): no fabricated data. Every unknown
 * value stays as an explicit "TODO:" string — the page renders
 * TODO values in a visible warning style so they cannot ship
 * silently.
 * ─────────────────────────────────────────────────────────────
 */

import type { BuildConfig } from "./lib/types";

export const buildConfig: BuildConfig = {
  // ── Identity ─────────────────────────────────────────────
  buildNumber: "010",
  name: "Invoice & Field Log Intake",
  sector: "Supply Chain, Logistics & Construction",

  // Verbatim from projects.csv (primary_description) —
  // site + CSV + repo never drift.
  tagline:
    "Parses invoices, delivery bills, and field logs from diverse sub-contractors, validates structural fields, and passes clean data to ERP.",

  // ── Status (honest, always) ──────────────────────────────
  // Upgrade path: "planned" → "preview" → "prototype" → "live"
  // as the deep-build ships. One word, push to main, auto-deploys.
  status: "planned",

  // ── What it does ─────────────────────────────────────────
  // One string per paragraph — the page renders each as its
  // own <p>. Problem / pipeline / traceability.
  whatItDoes: [
    "Subcontractor invoices, delivery bills, and field logs arrive in every format imaginable, and someone types them into the ERP by hand.",
    "This pipeline parses documents from heterogeneous formats, validates required structural fields, flags exceptions for review, and pushes clean records directly into the ERP via API.",
    "Exceptions route to humans; clean data never waits on one.",
  ],

  // ── Stack ────────────────────────────────────────────────
  stack: ["n8n", "OpenAI API", "Next.js", "Vercel"],

  // ── Architecture ─────────────────────────────────────────
  architecture: {
    // Real diagrams only. Stays null until one is drawn —
    // the page renders the system-map table alone.
    diagramSrc: null,
    diagramAlt: "TODO: describe the diagram for screen readers",

    layers: [
      {
        layer: "Presentation",
        technology: "Next.js on Vercel",
        responsibility:
          "Build page, document upload UI, validation status and payload rendering",
      },
      {
        layer: "Orchestration",
        // Demos run on n8n Cloud. The identical workflows deploy
        // self-hosted or in a client's VPC for regulated
        // production — the /workflows export is the portable
        // artifact. Never state "self-hosted" as current fact.
        technology: "n8n (cloud-hosted)",
        responsibility:
          "Multi-format document parsing, structural field validation, exception flagging, ERP push",
      },
      {
        layer: "Data",
        // Storage + queue selection pending deep-build.
        // Stated uncertainty beats invented detail.
        technology: "TODO: ERP connector + document store selection pending deep-build",
        responsibility:
          "TODO: parsed records, validation results, exception queue, audit log",
      },
      {
        layer: "AI",
        technology: "OpenAI API (schema-validated calls)",
        responsibility:
          "Field extraction from heterogeneous invoice, delivery bill, and field log formats",
      },
    ],

    // One string per step — numbered on render because order
    // carries meaning: this is the sequence a record travels.
    flow: [
      "Document received from subcontractor",
      "n8n parses against format profile",
      "fields extracted per fixed schema",
      "required structural fields validated",
      "exceptions flagged to review queue",
      "clean records pushed to ERP via API",
      "intake logged",
    ],
  },

  // ── Sample payload ───────────────────────────────────────
  // Real production schema, mock values, labeled as mock.
  payload: {
    caption: "// mock data — representative of production schema",
    input: {
      event: "field.document.received",
      submitted_at: "2026-07-05T15:16:00Z",
      source: "invoice-intake.elwoodberry.com",
      fields: {
        filename: "sub-invoice-7741.pdf", doc_type: "invoice", vendor_ref: "MOCK-SUB-0033", line_items: 12
      },
    },
    output: {
      status: "validated",
      confidence: 0.92,
      routed_to: "erp:ap-intake",
      audit_id: "ias-demo-010-0001",
    },
  },

  // ── Live demo slot ───────────────────────────────────────
  // Renders only when a real demo exists. Demo Mode (cached
  // representative responses) is the default for public
  // traffic — protects demo reliability and n8n Cloud
  // execution quota.
  demo: {
    embedUrl: null,
    videoUrl: null,
    note: "Demo Mode serves cached representative responses to public traffic; live mode is enabled per session.",
  },

  // ── Links ────────────────────────────────────────────────
  links: {
    github: "https://github.com/elwoodberry3/ias-build-010-invoice-intake",
    // Decision pending: master CSV stores the build's own deploy
    // URL here; the page needs a route BACK to the portfolio
    // index. Root used until the portfolio index URL is final.
    portfolio: "https://elwoodberry.com", // TODO: confirm portfolio index URL
    // TODO: confirm /contact is the persona-routed booking page,
    // not a generic contact form, before deep-build ships.
    booking: "https://elwoodberry.com/contact",
  },
};
