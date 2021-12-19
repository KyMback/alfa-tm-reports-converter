import { IAlfaReportParsingService } from "services/alfaReportParsingService/alfaReportParsingService";
import { AlfaParseResult } from "services/alfaReportParsingService/alfaTypings";

export class LazyAlfaReportParsingService implements IAlfaReportParsingService {
  private _servicePromise?: Promise<IAlfaReportParsingService>;

  private get servicePromise() {
    if (!this._servicePromise) {
      this._servicePromise = import(
        "services/alfaReportParsingService/alfaReportParsingService"
      ).then(({ AlfaReportParsingService }) => new AlfaReportParsingService());
    }

    return this._servicePromise;
  }

  public parse = async (file: File): Promise<AlfaParseResult> => {
    const s = await this.servicePromise;
    return await s.parse(file);
  };
}
