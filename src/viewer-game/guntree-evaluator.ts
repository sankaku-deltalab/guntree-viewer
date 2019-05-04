
import saferEval from 'safer-eval';
import * as gt from 'guntree';

export const evalGunTree = (code: string): gt.Gun => {
  try {
    return saferEval<gt.Gun>(code, gt);
  } catch (err) {
    return gt.nop();
  }
};
