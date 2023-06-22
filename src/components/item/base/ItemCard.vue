<template>
  <q-card :style="{ flex: [1, 1, props.flexBasis ?? 'auto'] }">
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  flexBasis?: string;
}>();
</script>

<style lang="scss">
dl {
  display: grid;
  grid-template-columns: max-content auto;
  margin-top: 0px;
  margin-bottom: 0px;
}

dt {
  font-weight: bold;
  text-align: right;
}

dd {
  margin-inline-start: 1rem;
}

dd ul {
  padding-left: 0.7em;
  margin-block-start: 0px;
  margin-block-end: 0px;
}

// p {
//   margin-bottom: 0px;
// }
</style>
