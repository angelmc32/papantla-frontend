import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";

export const polybase = new Polybase({
  defaultNamespace: `${process.env.NEXT_PUBLIC_POLYBASE_NAMESPACE}`,
});

export const auth = typeof window !== "undefined" ? new Auth() : null;
