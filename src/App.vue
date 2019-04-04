<template>
  <v-app>
    <v-content>
      <p v-show="activeId === 'home'">Home</p>
      <Viewer v-show="activeId === 'play'" ref="viewer"></Viewer>
      <TextEditor v-show="activeId === 'code'" key="code" :initialText="code" v-on:change="updateCode"></TextEditor>
      <TextEditor v-show="activeId === 'settings'" key="settings" :initialText="settings" v-on:change="updateSettings"></TextEditor>
    </v-content>

    <v-bottom-nav :active.sync="activeId" v-on:update:active="onNavChanged" :value="true" app fixed color="transparent">
      <v-btn color="teal" flat value="home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="play">
        <span>Play</span>
        <v-icon>play_arrow</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="code">
        <span>Code</span>
        <v-icon>code</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>

    </v-bottom-nav>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Viewer from './components/Viewer.vue';
import TextEditor from './components/TextEditor.vue';

@Component({
  components: {
    Viewer,
    TextEditor,
  },
})
export default class App extends Vue {
  private activeId: string = 'home';
  private contentSize: string = '10vh';
  private code: string = `concat(
  useMuzzle('center-muzzle'),
  useVirtualMuzzle(aimingMuzzle()),
  repeat(
    { times: 10, interval: 4 },
    fire({}),
  ),
);
`;
  private settings: string = `[setting.enemy]
position = { x = 0.5, y = 0.25 }  # area size: 1.0 x 1.0
rotationDeg = 90  # clockwise, 0: right direction

[[setting.enemy.muzzles]]
name = 'center-muzzle'
position = { x = 0.1, y = 0 }  # relative to enemy. x: front, y: right
rotationDeg = 0

[[setting.enemy.muzzles]]
name = 'right-muzzle'
position = { x = -0.1, y = 0.2 }
rotationDeg = 0

[[setting.enemy.muzzles]]
name = 'left-muzzle'
position = { x = -0.1, y = -0.2 }
rotationDeg = 0
`;

  constructor() {
    super();
  }

  public updateCode(newCode: string): void {
    this.code = newCode;
  }

  public updateSettings(newSettings: string): void {
    this.settings = newSettings;
  }

  private onNavChanged(newId: string): void {
    // Apply setting and code when viewer was open
    if (newId === 'play') {
      (this.$refs.viewer as Viewer).updateGunTreeCode(this.code);
      (this.$refs.viewer as Viewer).updateSettings(this.settings);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
