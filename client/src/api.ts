export interface WorkflowRequest {
  mode: WorkflowMode;
  title: string;
  template?: TemplateDraft;
}

export const WorkflowMode = {
  Manual: "MANUAL",
  Automated: "AUTOMATED",
} as const;
export type WorkflowMode = (typeof WorkflowMode)[keyof typeof WorkflowMode];

export interface TemplateDraft {
  name: string;
  locale: TemplateDraftLocaleEnum;
  owner?: string | null;
  summary?: string | null;
  createdBy?: string | null;
}

export const TemplateDraftLocaleEnum = {
  EnUs: "en-US",
  EsMx: "es-MX",
  FrCa: "fr-CA",
} as const;
export type TemplateDraftLocaleEnum =
  (typeof TemplateDraftLocaleEnum)[keyof typeof TemplateDraftLocaleEnum];
