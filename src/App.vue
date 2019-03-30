<template>
  <v-app>
    <v-content>
      <p v-if="activeId === 'home'">Home</p>
      <p v-else-if="activeId === 'play'">Play</p>
      <TextEditor v-else-if="activeId === 'code'" key="code" :initialText="initialCode" v-on:change="updateCode"></TextEditor>
      <TextEditor v-else-if="activeId === 'settings'" key="settings" :initialText="initialSettings" v-on:change="updateSettings"></TextEditor>
    </v-content>

    <v-bottom-nav :active.sync="activeId" :value="true" app fixed color="transparent">
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
import TextEditor from './components/TextEditor.vue';

@Component({
  components: {
    TextEditor,
  },
})
export default class App extends Vue {
  private activeId: string = 'home';
  private contentSize: string = '10vh';
  private initialCode: string = `concat(
  setMuzzle('center-muzzle'),
  attachVirtualMuzzle(aimingMuzzle()),
  repeat(
    { times: 10, interval: 4 },
    fire(bullet()),
  ),
);
`;
  private initialSettings: string = `[setting.enemy]
position = { x: 50, y: 25 },  // area size: 100 x 100
angleDeg = 90,  // clockwise, 0: right direction

[[setting.enemy.muzzle]]
name = 'center-muzzle',
position = { x: 0, y: -5 },  // relative
angleDeg = 0,

[[setting.enemy.muzzle]]
name = 'right-muzzle',
position = { x: 30, y: 5 },
angleDeg = 0,

[[setting.enemy.muzzle]]
name = 'left-muzzle',
position = { x: -30, y: 5 },
angleDeg = 0,
`;

  constructor() {
    super();
  }

  public updateCode(newCode: string): void {
    console.log('code updated');
  }

  public updateSettings(newSettings: string): void {
    console.log('settings updated');
  }
}
</script>

<style lang="scss" scoped>
</style>
