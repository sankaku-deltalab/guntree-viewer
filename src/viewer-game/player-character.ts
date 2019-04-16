import * as ex from 'excalibur';

export class PlayerCharacter extends ex.Actor {
  private input: { x: number, y: number };

  constructor(config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Chartreuse;
    this.input = { x: 0, y: 0 };

    // Update velocity in every tick
    this.on('postupdate', () => {
      const moveInput = this.consumeInput();
      this.vel.x = moveInput.x;
      this.vel.y = moveInput.y;
    });
  }

  public addInput(input: { x: number, y: number }): void {
    this.input.x += input.x;
    this.input.y += input.y;
  }

  private consumeInput(): { x: number, y: number } {
    const input = this.input;
    this.input = { x: 0, y: 0 };
    const speed = 300;
    return {
      x: clamp(input.x, -1, 1) * speed,
      y: clamp(input.y, -1, 1) * speed,
    };
  }
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(value, max));
};
