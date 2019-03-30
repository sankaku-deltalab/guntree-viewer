import * as ex from 'excalibur';

export class GameManager {
  private game: ex.Engine;

  constructor(canvas: HTMLCanvasElement) {
    // Create game
    const originalGetter = document.getElementById;
    document.getElementById = () => canvas;
    this.game = new ex.Engine({
      width: canvas.width,
      height: canvas.height,
      canvasElementId: '__anyId',
      pointerScope: ex.Input.PointerScope.Canvas,
      backgroundColor: ex.Color.DarkGray,
      suppressConsoleBootMessage: true,
    });
    document.getElementById = originalGetter;

    // Create player
    const pc = new PlayerCharacter();
    pc.x = this.game.halfDrawWidth;
    pc.y = this.game.halfDrawHeight * 1.5;
    const pcSize = Math.min(
      this.game.halfDrawWidth / 10,
      this.game.halfCanvasHeight / 10,
    );
    pc.setWidth(pcSize);
    pc.setHeight(pcSize);
    this.game.add(pc);

    // // Create enemy
    // // TODO:

    this.game.start();
  }

  public updateSetting(setting: {[key: string]: any}): void {}

  public updateGunTreeCode(code: string): void {}
}
