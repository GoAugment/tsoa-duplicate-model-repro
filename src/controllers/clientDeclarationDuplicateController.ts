import { Body, Controller, Post, Route } from "@tsoa/runtime";
import { WorkflowRequest } from "../../client/dist/api";
import { TemplateDraft, WorkflowMode } from "../shared-contracts/api";

export interface GlobalWorkflowRequest extends WorkflowRequest {
  template: TemplateDraft;
  mode: WorkflowMode;
}

@Route("client-declaration-duplicate")
export class ClientDeclarationDuplicateController extends Controller {
  @Post()
  public async createMessage(
    @Body() body: GlobalWorkflowRequest,
  ): Promise<GlobalWorkflowRequest> {
    return body;
  }
}
