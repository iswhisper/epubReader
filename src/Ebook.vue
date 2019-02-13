<template>
  <div class='ebook'>
   <title-bar
    :ifTitleAndMenuShow='ifTitleAndMenuShow'>
    </title-bar>
    <div class='read-wrapper'>
       <div id='read'>
        </div>
        <div class='mask'>
          <div class='left' @click='prevPage'></div>
          <div class='center' @click='toggleTitleAndMenu'></div>
          <div class='right' @click='nextPage'></div>
        </div>
    </div>
     <menu-bar
    :ifTitleAndMenuShow='ifTitleAndMenuShow'
    :fontSizeList='fontSizeList'
    :defaultFontSize='defaultFontSize'
    @setFontSize='setFontSize'
    :themeList='themeList'
    :defaultTheme='defaultTheme'
    @setTheme='setTheme'
    @onProgressChange="onProgressChange"
    :bookAvailable="bookAvailable"
    @jumpTo="jumpTo"
    :navigation="navigation"
    ref='MenuBar'>
    </menu-bar>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import MenuBar from '@/components/MenuBar'
import Epub from 'epubjs'
const DOWNLOAD_URL = 'static/newBook.epub'
global.epub = Epub
export default {
  components: {
    TitleBar,
    MenuBar
  },
  data () {
    return {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              'color': '#000', 'background': '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              'color': '#000', 'background': '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              'color': '#fff', 'background': '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              'color': '#000', 'background': 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      defaultTheme: 1,
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: Object
    }
  },
  methods: {
    // 根据链接跳转到指定位置
    jumpTo (href) {
      this.rendition.display(href)
      this.hideTitleAndMenu()
    },
    hideTitleAndMenu () {
      // 隐藏标题栏和菜单栏
      this.ifTitleAndMenuShow = false
      // 隐藏菜单栏弹出的设置栏
      this.$refs.MenuBar.hideSetting()
      // 隐藏目录
      this.$refs.MenuBar.hideContent()
    },
    // progress 进度条的数值(0-100)
    onProgressChange (progress) {
      const percentage = progress / 100
      // 当前页数,为0自动显示第一页 \
      // this.locations.cfiFromPercentage(percentage) 获取当前位置的方法
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    setTheme (index) {
      this.themes.select(this.themeList[index].name)
      this.defaultTheme = index
    },
    registerTheme () {
      this.themeList.forEach(theme => {
        // statements
        this.themes.register(theme.name, theme.style)
      })
    },
    setFontSize (fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    },
    toggleTitleAndMenu () {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
      if (!this.ifTitleAndMenuShow) {
        this.$refs.MenuBar.hideSetting()
      }
    },
    showEpub () {
      // 生成Book
      this.book = new Epub(DOWNLOAD_URL)
      console.log(this.book)
      // 生成Rendition,通过Book.renderTo
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()
      // 获取Theme对象

      this.themes = this.rendition.themes
      // 设置默认字体
      this.setFontSize(this.defaultFontSize)
      // this.themes.register(name,styles)  //注册主题
      // this.themes.select(name)   //选择某主题

      this.registerTheme()
      this.setTheme(this.defaultTheme)
      // 获取locations对象
      // 通过epubjs的钩子函数来实现
      // ready表示电子书解析完成返回一个对象
      this.book.ready.then(() => {
        // 用异步的方法实现电子书定位
        return this.book.locations.generate()
      }).then(result => {
        // 定义一个目录变量
        this.navigation = this.book.navigation
        // 定义页面当前位置变量
        this.locations = this.book.locations
        this.onProgressChange(this.locations)
        // 加载完成设为可用
        this.bookAvailable = true
      })
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev() // 上一页，调用rendition自己的方法
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next() // 下一页
      }
    }
  },
  mounted () {
    this.showEpub()
  }
}
</script>
<style lang='scss' scoped>
  @import 'assets/styles/global';
    .ebook{
      position:relative;
      overflow:hidden;
      .read-wrapper{
          .mask{
          position:absolute;
          top:0;
          left:0;
          z-index:100;
          display:flex; //弹性布局
          width:100%;
          height:100%;
          .left{
            flex:0 0 px2rem(100);
          }
          .center{
            flex:1;
          }
          .right{
            flex:0 0 px2rem(100);
          }
        }
      }
    }
</style>
