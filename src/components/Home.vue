<template>
  <div>
    <p>
      GunTree is readable and extendable Danmaku describing package for shmups.
    </p>
    <div>
      <v-btn href="https://sankaku-deltalab.gitlab.io/guntree">View API</v-btn>
    </div>
    <div>
      <v-btn href="https://github.com/sankaku-deltalab/guntree">View Source</v-btn>
    </div>
    <div>
      <v-btn @click="viewLicense">View License</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import license from 'raw-loader!@/assets/license.txt';


@Component({
  components: {
  },
})
export default class Home extends Vue {
  constructor() {
    super();
  }

  public viewLicense(): void {
    alert(license);
  }
}
</script>

<style lang="scss" scoped>
</style>
