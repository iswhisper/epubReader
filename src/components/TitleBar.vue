<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show='ifTitleAndMenuShow'>
      <div class="left">
        <span class="icon-back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-cart icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-user icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more icon"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang='scss' scoped>
  @import '../assets/styles/global';
  .ebook{
    position:relative;
    .title-wrapper{
        position:absolute;
        top :0;
        left:0;
        z-index:101;
        width:100%;
        background:#fff;
        height:px2rem(48);
        display:flex;
        box-shadow:0 0 px2rem(8) rgba(0,0,0,0.15);
        .left{
          flex:0 0 px2rem(60);
          @include center;
        }
        .right{
          flex:1;
          display:flex;
          justify-content:flex-end;
          .icon-wrapper{
            flex:0 0 px2rem(40);
            @include center;
            .icon-menu{
              font-size:px2rem(18)
            }
          }
        }
      }
  }
</style>
