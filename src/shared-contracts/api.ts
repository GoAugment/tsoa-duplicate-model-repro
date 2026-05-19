export enum WorkflowMode {
  AUTOMATED = "AUTOMATED",
  MANUAL = "MANUAL",
}

export type LocaleCode = "en-US" | "es-MX" | "fr-CA";

export interface Template {
  readonly name: string;
  readonly locale: LocaleCode;
  readonly owner: string | null;
  readonly summary: string | null;
  readonly createdBy: string | null;
}

export type TemplateDraft = Omit<
  Template,
  "owner" | "summary" | "createdBy"
> & {
  readonly owner?: string | null;
  readonly summary?: string | null;
  readonly createdBy?: string | null;
};
