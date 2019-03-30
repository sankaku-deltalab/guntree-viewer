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
    });
    document.getElementById = originalGetter;

    // Create player
    // TODO:

    // Create enemy
    // TODO:
  }

  public updateSetting(setting: {[key: string]: any}): void {}

  public updateGunTreeCode(code: string): void {}
}
