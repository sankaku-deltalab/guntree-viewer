import * as ex from 'excalibur';

export class TouchInput {
    private oldTouchPosition: ex.Vector | null;
    private touchEvent: (pos: ex.Vector) => void;
    private moveEvent: (delta: ex.Vector) => void;

    constructor(
        touchEvent: (pos: ex.Vector) => void,
        moveEvent: (delta: ex.Vector) => void,
    ) {
        this.oldTouchPosition = null;
        this.touchEvent = touchEvent;
        this.moveEvent = moveEvent;
    }

    public touchAt(pos: ex.Vector): void {
        this.oldTouchPosition = pos;
        this.touchEvent(pos);
    }

    public unTouchAt(pos: ex.Vector): void {
        this.oldTouchPosition = null;
    }

    public moveTo(pos: ex.Vector): void {
        if (this.oldTouchPosition === null) { return; }
        const delta = pos.sub(this.oldTouchPosition);
        this.oldTouchPosition = pos;
        this.moveEvent(delta);
    }
}
