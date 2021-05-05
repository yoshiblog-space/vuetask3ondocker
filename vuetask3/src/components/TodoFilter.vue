<template>
  <div class="state">
    <radio-Btn
      v-for="state in stateFilter"
      :key="state.id"
      :filterLabel="state.label"
      :defaultState="state.defaultState"
      v-on:clickFilters="clickFilter"
    />
  </div>
</template>
<script>
import radioBtn from "./RadioBtn";
export default {
  props: {
    stateFilter: { type: Array }
  },
  components: {
    "radio-Btn": radioBtn
  },
  emits: ["selectFilter"],
  methods: {
    clickFilter(clickLabel) {
      this.$emit("selectFilter", clickLabel);
    }
  }
};
</script>
