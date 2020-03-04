<template>
  <div class="feed-container">
    <a v-for="(item, index) in feed" :key="index" class="feed-item" :href="item.link" target="_blank">
      <div class="image-container">
        <img v-if="item.image" class="img" :src="item.image" />
      </div>
      <div class="content-container">
        <div>
          <h3>{{item.title}}</h3>
        </div>
        <div class="byline">
          <div>{{item.creator}}</div>
          <div>|</div>
          <div>{{item.pubDate}}</div>
        </div>
        <div class="content">{{item.contentSnippet}}</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "FeedList",
  props: {
    feed: Array
  },
  methods:{
      articleClicked(index){
          alert("Clicked on article " + index);
      }
  }
};
</script>

<style scoped>
.feed-container {
  margin: 20px 0;
}
.image-container {
  width: 100px;
  height: 100px;
  background-color: #eee;
  margin-right: 20px;
  background-size: cover;
  background-position: center;
}

h3 {
  margin: 0;
}

.byline{
    font-size:14px;
    font-style:italic;
    display:flex;
}

.byline > div:nth-child(2){
    margin:0 10px;
    font-style:normal;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.feed-item {
  display:flex;
  text-align: left;
  padding: 1em;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  color:inherit;
  text-decoration:none;
  transition: background-color .4s;
}

.feed-item:hover{
  background-color:#eee;
}

.content{
    margin-top:10px;
    font-size:16px;
}
</style>