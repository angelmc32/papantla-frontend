export const getRPCErrorMessage = (err: any) => {
  console.log(typeof err);
  var open = err.stack.indexOf("{");
  var close = err.stack.lastIndexOf("}");
  var j_s = err.stack.substring(open, close + 1);
  console.log(j_s);
  var j = JSON.parse(j_s);
  var reason = j.data[Object.keys(j.data)[0]].reason;
  return reason;
};
