<template>
  <div id="app">
    <h1>Courier Journal News Reader</h1>
    <FeedSelector :feedSource="feedSource" @feed-changed="getFeed" />
    <FeedList :feed="feed" />
    <ItemCounter
      v-if="itemCount > 0"
      :item-count="itemCount"
      :timestamp="timestamp"
      :dateDifference="daySpan"
      :feedLabel="feedLabel"
    />
  </div>
</template>

<script>
import ItemCounter from "./components/ItemCounter";
import FeedList from "./components/FeedList";
import FeedSelector from "./components/FeedSelector";

import feedRetriever from "./lib/feed-retriever.js";
import feedSource from "./feed-source.json";

export default {
  name: "app",
  components: {
    ItemCounter,
    FeedList,
    FeedSelector
  },
  computed: {
    daySpan() {
      let l = this.itemCount;
      if (l === 0) {
        return 0;
      }
      return [this.feed[l - 1].timestamp, this.feed[0].timestamp];
    }
  },
  data() {
    return {
      feedSource,
      feedLabel: null,
      feed: [],
      itemCount: 0,
      timestamp: 0
    };
  },
  mounted() {
    this.getFeed(feedSource[0]);
  },
  methods: {
    async getFeed(req) {
      this.feed = await feedRetriever(req.value);
      this.feedLabel = req.label;
      this.itemCount = this.feed.length;
      this.timestamp = new Date();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
