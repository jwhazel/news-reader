<template>
  <select @change="feedChanged($event)">
    <option v-for="(item,index) in feedSource" :key="index" :value="item.value">{{item.label}}</option>
  </select>
</template>

<script>
export default {
  name: "FeedSelector",
  props: { feedSource: Array },
  methods: {
    feedChanged(e) {
      let i = e.target.options.selectedIndex;
      this.$emit("feed-changed", {
        value: e.target.value,
        label: e.target.options[i].innerText
      });
    }
  }
};
</script>