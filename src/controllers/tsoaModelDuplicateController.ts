import { Controller, Get, Path, Route } from "@tsoa/runtime";
import { ULID } from "../tsoa-model/apitypes";
import { RealGeo } from "../tsoa-model/realGeo";

@Route("tsoa-model-duplicate")
export class TsoaModelDuplicateController extends Controller {
  @Get("{id}")
  public async getStuff(@Path() id: ULID): Promise<RealGeo[]> {
    return [{ id }];
  }
}
