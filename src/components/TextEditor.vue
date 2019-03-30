<template>
  <v-textarea
    v-model="text"
    rows=30
    flat
    auto-grow
    v-on:change="$emit('change', text)"
  ></v-textarea>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// TODO: Fix textarea height
@Component({
  components: {
  },
})
export default class TextEditor extends Vue {
  @Prop() private initialText!: string;
  private text: string = '';

  constructor() {
    super();
  }

  public mounted() {
    this.text = this.initialText;
  }
}
</script>

<style lang="scss" scoped>
</style>
