<template>
  <md-field>
    <label>Write Guntree</label>
    <md-textarea class="code-area" v-model="code" md-autogrow></md-textarea>
  </md-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Code extends Vue {
  private code: string = `concat(
  setMuzzle('center-muzzle'),
  attachVirtualMuzzle(aimingMuzzle()),
  repeat(
    { times: 10, interval: 4 },
    fire(bullet()),
  ),
);
`;
}
</script>

<style lang="scss" scoped>
  .code-area {
    max-height: 100vh;  // TODO: Fix max height
  }
</style>
