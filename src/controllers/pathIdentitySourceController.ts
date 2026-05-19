import { Controller, Get, Route } from "@tsoa/runtime";
import { SharedPrompt } from "../path-identity/original";

@Route("path-identity-duplicate/source")
export class PathIdentitySourceController extends Controller {
  @Get()
  public async getSourcePrompt(): Promise<SharedPrompt> {
    return { id: "source", prompt: "from source path" };
  }
}
