import BGRemove from "./BGRemove";
import BGReplace from "./BGReplace";
import GenRemove from "./GenRemove";

export default function ImageToolbar () {
  return (
    <>
    <GenRemove /> 
    <BGRemove />
    <BGReplace />
    </>
  )
}