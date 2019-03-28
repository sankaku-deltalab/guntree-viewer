<template>
  <md-field>
    <label>Write Setting as toml</label>
    <md-textarea class="settings-area" v-model="settingsAsToml" md-autogrow></md-textarea>
  </md-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Code extends Vue {
  private settingsAsToml: string = `[setting.enemy]
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
}
</script>

<style lang="scss" scoped>
  .settings-area {
    max-height: 100vh;  // TODO: Fix max height
  }
</style>
