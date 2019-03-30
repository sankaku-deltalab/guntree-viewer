<template>
  <v-textarea
    v-model="settingsAsToml"
    rows=30
    flat
  ></v-textarea>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// TODO: Fix textarea height
@Component({
  components: {
  },
})
export default class Settings extends Vue {
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
</style>
