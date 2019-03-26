<template>
  <div class="wrapper">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <div>
      <p v-if="activeId === 'home'">Home</p>
      <p v-else-if="activeId === 'play'">Play</p>
      <p v-else-if="activeId === 'code'">Code</p>
      <p v-else-if="activeId === 'settings'">Settings</p>
      <p v-else>Other</p>
    </div>
    <div>
      <md-bottom-bar class="phone-viewport" md-sync-route @md-changed="onBarSelectionChanged">
        <md-bottom-bar-item id="home" md-label="Home" md-icon="home"></md-bottom-bar-item>
        <md-bottom-bar-item id="play" md-label="Play" md-icon="play_arrow"></md-bottom-bar-item>
        <md-bottom-bar-item id="code" md-label="Code" md-icon="code"></md-bottom-bar-item>
        <md-bottom-bar-item id="settings" md-label="Settings" md-icon="settings"></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class App extends Vue {
  private activeId: string = 'home';

  public onBarSelectionChanged(activeId: string) {
    this.activeId = activeId;
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .phone-viewport {
    width: 100%;
    height: auto;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
    position: absolute;
    bottom: 0;
  }
</style>
