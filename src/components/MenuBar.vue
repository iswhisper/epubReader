<template>
   <div class="menu-bar">
 <transition name="slide-up">
    <div class="menu-wrapper" v-show='ifTitleAndMenuShow' :class="{'hide-box-shaow':ifSettingShow||!ifTitleAndMenuShow}">
      <div class="icon-wrapper">
        <span class="icon-menu icon"
        @click="showSetting(3)"></span>
      </div>
       <div class="icon-wrapper">
        <span class="icon-Progress-read icon"
          @click="showSetting(2)"></span>
      </div>
       <div class="icon-wrapper">
        <span class="icon-brightness icon"
        @click="showSetting(1)"></span>
      </div>
       <div class="icon-wrapper">
        <span class="iconfont icon-A icon"
        @click="showSetting(0)"></span>
      </div>
    </div>
  </transition>
  <transition name="slide-up">
  <div class="setting-wrapper" v-show='ifSettingShow'>
    <div class="setting-font-size" v-if="showTag===0">
     <div class="preview" :style="{fontSize:fontSizeList[0].fontSize + 'px'}"> A</div>
      <div class="select">
       <div class="select-wrapper"
       @click="setFontSize(item.fontSize)" v-for="(item,index) in fontSizeList" :key="index">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize===item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
       </div>
      </div>
     <div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize + 'px'}"> A</div>
    </div>
    <div class="setting-theme" v-else-if="showTag===1">
      <div class="setting-theme-item" v-for="(item,index) in themeList" :key="index" @click="setTheme(index)">
        <div class="preview"
        :class="{'no-border': item.style.body.background !=='#fff'}"
        :style="{background:item.style.body.background}"></div>
        <div class="text" :class="{'selected':index=== defaultTheme}">item.name</div>
      </div>
    </div>
    <div class="setting-progress"  v-if="showTag===2">
      <div class="progress-wrapper">
        <input class="progress" type="range" max="100" min="0" step="1" @change="onProgressChange($event.target.value)"
        @input="onProgressInput($event.target.value)"
        :value="progress" :disabled="!bookAvailable" ref="progress"/>
      </div>
      <div class="text-wrapper">
        <span>{{bookAvailable ? progress + '%' : "加载中..."}}</span>
      </div>
    </div>
  </div>
</transition>
<content-view :ifSettingContent="ifSettingContent"
v-show="ifShowContent" :navigation="navigation" :bookAvailable="bookAvailable" @jumpTo="jumpTo">
</content-view>
<transition name="fade">
<div class="content-mask"
 v-show="ifShowContent"
 @click="hideContent"></div>
</transition>
</div>
</template>

<script>
import ContentView from '@/components/Content'
export default {
  components: {
    ContentView
  },
  // 定义接收传来的变量
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false // 默认值
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: {
      type: Boolean,
      default: false
    },
    navigation: Object
  },
  data () {
    return {
      ifSettingShow: false,
      showTag: 0,
      progress: 0,
      ifSettingContent: false,
      ifShowContent: false
    }
  },
  methods: {
    hideContent () {
      this.ifShowContent = false
    },
    jumpTo (target) {
      this.$emit('jumpTo', target)
    },
    onProgressInput (progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = 'this.progress% 100%'
    },
    onProgressChange (progress) {
      this.$emit('onProgressChange', progress)
    },
    showSetting (tag) {
      this.ifSettingShow = true
      this.showTag = tag
      if (this.showTag === 3) {
        this.ifSettingShow = false
        this.ifShowContent = true
      } else {
        this.ifSettingShow = true
      }
    },
    hideSetting () {
      this.ifSettingShow = false
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize) // 调用父组件的setFontSize方法
    },
    setTheme (index) {
      this.$emit('setTheme', index)
    }
  }
}
</script>
<style lang='scss' scoped>
  @import '../assets/styles/global';
  .menu-bar{
    .menu-wrapper{
        position:absolute;
        bottom :0;
        left:0;
        z-index:101;
        width:100%;
        background:#fff;
        height:px2rem(48);
        display:flex;
        box-shadow:0 px2rem(-8) px2rem(8) rgba(0,0,0,0.15);
        .icon-wrapper{
            flex:1;
            @include center;
            .icon{
              font-size:px2rem(20)
            }
          }
      }
    .hide-box-shaow{
      box-shadow:none;
    }
    .setting-wrapper{
          position:absolute;
          bottom:px2rem(48);
          left:0;
          z-index:101;
          width:100%;
          height:px2rem(60);
          background:#fff;
          box-shadow:0 px2rem(-8) px2rem(8) rgba(0,0,0,0.15);
          .setting-font-size{
            display:flex;
            height:100%;
            .preview{
              flex:0 0 px2rem(40);
               @include center
            }
            .select{
              display:flex;
              flex:1;
              .select-wrapper{
                flex:1;
                display:flex;
                align-items:center;
                &:first-child{
                .line{
                    &:first-child{
                       border-top:none;
                      }
                    }
                }
                &:last-child{
                .line{
                    &:last-child{
                       border-top:none;
                      }
                    }
                }
                .line{
                  flex:1;
                  height:0;
                  border-top:px2rem(1) solid #ccc;
                }
                .point-wrapper{
                  flex:0 0 0;
                  position:relative;
                  width:0;
                  height:px2rem(7);
                  border-left:px2rem(1) solid #ccc;
                  .point{
                    position:absolute;
                    top:px2rem(-8);
                    left:px2rem(-10);
                    width:px2rem(20);
                    height:px2rem(20);
                    border-radius:50%;
                    background:#fff;
                    border:px2rem(1) solid #ccc;
                    box-shadow:0 0 px2rem(8) rgba(0,0,0,0.15);
                    @include center;
                    .small-point{
                      width:px2rem(5);
                      height:px2rem(5);
                      border-radius:50%;
                      background:#000;
                    }
                }
                }
              }
           }
          }
          .setting-theme {
            height: 100%;
            display: flex;
            .setting-theme-item {
              flex: 1;
              display: flex;
              padding: px2rem(5);
              box-sizing: border-box;
              flex-direction: column;  //垂直布局
              .preview {
                flex:1;
                padding: px2rem(5);
                border:px2rem(1) solid #ccc;
                &.no-border{
                  border:none;
                }
              }
              .text {
                @include center;
                color:#999;
                flex: 0 0 px2rem(30);
                font-size: px2rem(16);
                &.selected{
                  color:#333;
                }
              }
            }
          }
          .setting-progress{
            position:relative;
            width:100%;
            height:100%;
            .progress-wrapper{
              width:100%;
              height:100%;
              @include center;
              padding:0 px2rem(30);
              box-sizing: border-box;
              .progress{
                width:100%;
                -webkit-appearance: none;
                height: px2rem(2);
                background-size: 0% 100%;
                background: -webkit-linear-gradient(#999,#999) no-repeat, #ddd;
                &:focus{
                  ontline:none;
                }
                // 小手柄
                &::-webkit-slider-thumb{
                  -webkit-appearance:none;
                  height:px2rem(20);
                  width:px2rem(20);
                  border-radius:50%;
                  background:white;
                  box-shadow: 0 4px 4px 0 rgba(0,0,0, .15);
                  border:px2rem(1) solid #ddd;
                }
              }
            }
            .text-wrapper{
              width:100%;
              @include center;
            }
          }
        }
    .content-mask{
      position:absolute;
      top:0;
      left:0;
      z-index:101;
      display:flex;
      width:100%;
      height:100%;
      background:rgba(51,51,51,.8);
    }
  }
</style>
