import { Controller, Get, Route } from "@tsoa/runtime";
import { SharedPrompt } from "../path-identity/injected";

@Route("path-identity-duplicate/injected")
export class PathIdentityInjectedController extends Controller {
  @Get()
  public async getInjectedPrompt(): Promise<SharedPrompt> {
    return { id: "injected", prompt: "from injected path" };
  }
}
