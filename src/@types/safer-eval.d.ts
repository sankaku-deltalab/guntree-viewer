declare module 'safer-eval' {
  function saferEval<T>(code: string, context: {[key: string]: any}, opt?: Object): T;
  export = saferEval;
}
