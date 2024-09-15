import ExportAsset from "../ExportAsset";
import BGRemove from "./BGRemove";
import BGReplace from "./BGReplace";
import ExtractPart from "./ExtractPart";
import GenFill from "./GenFill";
import GenRemove from "./GenRemove";

export default function ImageToolbar () {
  return (
    <>
    <GenRemove /> 
    <BGRemove />
    <BGReplace />
      <GenFill />
        <ExtractPart />
    </>
  )
}