<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper" v-if="bookAvailable">
        <div class="content-item" v-for="(item,index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
          <span class="text">{{item.label}}</span>
        </div>
      </div>
      <div class="empty" v-else="">加载中...</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    ifShowContent: Boolean,
    navigation: Object,
    bookAvailable: Boolean
  },
  methods: {
    jumpTo (target) {
      this.$emit('jumpTo', target)
    }
  }
}
</script>
<style lang='scss' scoped>
  @import '../assets/styles/global';
  .content{
    position:absolute;
    z-index: 102;
    left: 0px;
    top: 0px;
    flex: 1;
    display: flex;
    height: 100%;
    width: 40%;
    background:white;
    .content-wrapper{
      width:100%;
      height:100%;
      padding:px2rem(20);
      .content-item{
        height: px2rem(40);
        border-bottom:px2rem(1) solid #ccc;
        span{
          line-height: px2rem(40);
        }
      }
    }
    .empty{
         @include center;
         width:100%;
         height:100%;
      }
  }
</style>
