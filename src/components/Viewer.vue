<template>
  <canvas ref="viewerCanvas" class="viewer-canvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as toml from 'toml';
import { GameManager } from '../viewer-game/game-manager';
import { ISettings } from '../settings-interface';

@Component({
  components: {
  },
})
export default class Viewer extends Vue {
  private canvas!: HTMLCanvasElement;
  @Prop() private canvasWidth!: number;
  @Prop() private canvasHeight!: number;
  private gameManager!: GameManager;

  public mounted() {
    const h = this.$parent.$el.clientHeight;
    const w = this.$parent.$el.clientWidth;
    this.canvas = this.$refs.viewerCanvas as HTMLCanvasElement;
    this.canvas.width = w;
    this.canvas.height = h - 100;  // TODO: Fix canvas size
    this.gameManager = new GameManager(this.canvas);
  }

  public updateSettings(settingsAsToml: string): void {
    this.gameManager.updateSettings(toml.parse(settingsAsToml).setting as ISettings);
  }

  // public updateGunTreeCode(code: string): void {}
}
</script>

<style lang="scss" scoped>
  .viewer-canvas {
    padding: 0px;
  }
</style>
