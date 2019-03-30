<template>
  <v-app>
    <v-card height="100vh" flat>
      <v-content>
        <p v-if="activeId === 'home'">Home</p>
        <p v-else-if="activeId === 'play'">Play</p>
        <Code v-else-if="activeId === 'code'"></Code>
        <Settings v-else-if="activeId === 'settings'"></Settings>
      </v-content>

      <v-bottom-nav :active.sync="activeId" :value="true" absolute color="transparent">
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
    </v-card>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Code from './components/Code.vue';
import Settings from './components/Settings.vue';

@Component({
  components: {
    Code,
    Settings,
  },
})
export default class App extends Vue {
  private activeId: string = 'home';
  private contentSize: string = '10vh';

  public onBarSelectionChanged(activeId: string): void {
    this.activeId = activeId;
  }

  // public mounted() {
  //   this.contentSize = this.getContentSize();
  // }

  // public getContentSize(): string {
  //   const wrapper = this.$refs.wrapper as Vue | undefined;
  //   const bottomNav = this.$refs.bottomNav as Vue;
  //   if (wrapper === undefined) { return '100vh'; }
  //   const height = wrapper.$el.clientHeight - bottomNav.$el.clientHeight;
  //   return `${height}px`;
  // }
}
</script>

<style lang="scss" scoped>
</style>
