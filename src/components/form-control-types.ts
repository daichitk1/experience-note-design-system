import type { AriaAttributes } from "react";
import type { FormControlSize } from "./form-control-styles";

export type FieldControlProps = {
  "aria-describedby"?: string;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  controlSize?: FormControlSize;
  grouped?: boolean;
  id?: string;
  required?: boolean;
};
