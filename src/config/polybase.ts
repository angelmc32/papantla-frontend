import { Polybase } from "@polybase/client";

// const polybase = new Polybase({
//   baseURL: `${process.env.REACT_APP_API_URL}/v0`,
// });
// 0x143e4d08e397d00f4dfc65fa5660a743add9f414c80382455bb2bc5f29b528c7d72d7618283bfe006fa638a05f587c32a233f0601616189513407e461ca783ae
const polybase = new Polybase({
  defaultNamespace:
    "pk/0x143e4d08e397d00f4dfc65fa5660a743add9f414c80382455bb2bc5f29b528c7d72d7618283bfe006fa638a05f587c32a233f0601616189513407e461ca783ae/papantla-v1",
});

export default polybase;
