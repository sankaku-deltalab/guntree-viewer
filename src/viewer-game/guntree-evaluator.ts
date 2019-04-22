
import saferEval from 'safer-eval';
import * as gt from 'guntree';

export const evalGunTree = (code: string): gt.IGun => {
  try {
    return saferEval<gt.IGun>(code, gt);
  } catch (err) {
    return gt.nop();
  }
};
