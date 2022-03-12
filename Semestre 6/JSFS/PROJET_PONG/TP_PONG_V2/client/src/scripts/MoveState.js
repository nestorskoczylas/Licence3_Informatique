const UP = Symbol(0);
const DOWN = Symbol(1);
const NONE = Symbol(2);

export default class MoveState {
  static get UP() {return UP;}
  static get DOWN() {return DOWN;}
  static get NONE() {return NONE;}
}
