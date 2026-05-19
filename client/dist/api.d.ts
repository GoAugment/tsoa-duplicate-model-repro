export interface WorkflowRequest {
    mode: WorkflowMode;
    title: string;
    template?: TemplateDraft;
}
export declare const WorkflowMode: {
    readonly Manual: "MANUAL";
    readonly Automated: "AUTOMATED";
};
export type WorkflowMode = (typeof WorkflowMode)[keyof typeof WorkflowMode];
export interface TemplateDraft {
    name: string;
    locale: TemplateDraftLocaleEnum;
    owner?: string | null;
    summary?: string | null;
    createdBy?: string | null;
}
export declare const TemplateDraftLocaleEnum: {
    readonly EnUs: "en-US";
    readonly EsMx: "es-MX";
    readonly FrCa: "fr-CA";
};
export type TemplateDraftLocaleEnum = (typeof TemplateDraftLocaleEnum)[keyof typeof TemplateDraftLocaleEnum];
