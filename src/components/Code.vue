<template>
  <v-textarea
    v-model="code"
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
</style>
