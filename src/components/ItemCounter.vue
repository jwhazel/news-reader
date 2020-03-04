<template>
  <div class="item-counter">
    Got
    <b>{{itemCount}} stories</b> spanning
    <b>{{daySpan}} days</b> in
    <i>{{feedLabel}}</i>
    . Last Update: {{formattedTime}}
  </div>
</template>

<script>
import { format, differenceInCalendarDays } from "date-fns";

export default {
  name: "ItemCounter",
  props: {
    itemCount: Number,
    timestamp: Date,
    dateDifference: Array,
    feedLabel: String
  },
  computed: {
    formattedTime() {
      return format(new Date(this.timestamp), "h:mmaaaa");
    },
    daySpan() {
      return differenceInCalendarDays(
        new Date(this.dateDifference[1]),
        new Date(this.dateDifference[0])
      );
    }
  }
};
</script>

<style scoped>
i {
  color: #1565c0;
  font-weight: bold;
}
</style>