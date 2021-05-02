<template>
  <label>
    <input
      type="radio"
      name="state"
      :value="filterLabel"
      :checked="defaultState"
      v-on:click="handleClick"
    />{{ filterLabel }}
  </label>
</template>
<script>
export default {
  props: {
    filterLabel: { type: String },
    checked: { tyoe: String },
    defaultState: { type: Number },
  },
  emits: ["clickFilter"],
  methods: {
    handleClick() {
      const clickLabel = this.filterLabel;
      this.$emit("clickFilter", clickLabel);
    },
  },
};
</script>
