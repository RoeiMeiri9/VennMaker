import { parseExpression } from "@src/utils/parseExpression";
import { state } from "../states.svelte";
import { Region } from "@src/components/vennDiagram/types";

export function getActiveRegions(expression: string, mode: number): Region[] {
  const activeRegions: Region[] = [];
  try {
    for (let i = 1; i < 2 ** mode; i++) {
      activeRegions.push({
        signature: i.toString(2).padStart(mode, "0"),
        visible: parseExpression(expression, i),
      });
    }
  } catch (err) {
    state.error = "שגיאה בביטוי המתמטי.";
    // TODO: alert if no div!
    console.error(err);
    for (let i = 0; i <= mode; i++) {
      activeRegions.push({ signature: i.toString(2), visible: false });
    }
  }
  return activeRegions;
}
