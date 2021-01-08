<template xmlns:v-video-player="http://www.w3.org/1999/xhtml">
  <div id="bigdiv">

    <!--左边扩展功能按钮 开始-->
    <div class="open-right">
      <div class="open-right-btn" @click="isExpand = !isExpand">
        <i :class="[isExpand ?'iconfont icon-zhankai-' : 'iconfont icon-zhankai4']"></i>
      </div>

      <transition name="el-zoom-in-right">
        <!--扩展模块 开始-->
        <div class="expand-right" v-if="isExpand" @click="$router.push('/dataPage')">
          <div class="expand-right-top">
            <i class="iconfont icon-shuju1"></i>
          </div>
        </div>
      </transition>
      <!--扩展模块 结束-->
    </div>
    <!--左边扩展功能 结束-->


    <!--header头部模块开始-->
    <div class="header w">
      <div class="title">
        客流分析大数据平台
      </div>
      <div class="timeed timeBg">
        <span>2020年06月25日 星期三 14:45:00</span>
      </div>
    </div>
    <!--头部模块结束-->

    <!--主体开始-->
    <div class="maindiv clearfix w">
      <!--左边大盒子开始-->
      <div class="main-left">
        <div class="clearfix">
          <div class="main-left-left">
            <div class="main-left-left-title">识别比例</div>
            <div id="recognitionRatioDIV" style="height: 100%"></div>
          </div>
          <div class="main-left-right">
            <div class="main-left-right-title">年龄趋势</div>
            <div id="ageTrendDIV" style="height: 100%"></div>
          </div>
        </div>

        <div class="main-left-middle">
          <div class="main-left-middle-title">男女比例</div>
          <!--男女图形开始-->
          <div class="main-left-middle-content">
            <ul>
              <!--遍历 男-->
              <li v-for="index in gender.maleLogo" :key="'male' + index"><img src="../assets/img/main/man.png" alt=""
                                                                              title="男"></li>

              <!--遍历 女-->
              <li v-for="index in (20 - gender.maleLogo)" :key="'female' + index"><img
                src="../assets/img/main/woman.png" alt="" title="女"></li>
            </ul>
          </div>
          <!--男女图形结束-->

          <!--底部男女 数字比例开始-->
          <div class="main-left-middle-bottom">
            <div class="main-left-middle-bottom-left">
              <div class="man_data"></div>
              <span>男{{gender.malePercentage}}%</span>
            </div>
            <div class="main-left-middle-bottom-right">
              <div class="woman_data"></div>
              <span>女{{100 - gender.malePercentage}}%</span>
            </div>
          </div>
          <!--底部男女 数字比例结束-->
        </div>
        <div class="main-left-bottom">
          <div class="main-left-middle-title">到访峰值</div>
          <div id="peakVisitDIV" style="height: 100%; padding-top: 3%"></div>
        </div>
      </div>
      <!--左边大盒子结束-->

      <!--中间大盒子开始-->
      <div class="main-middle">
        <!--上-->
        <div class="main-middle-top clearfix">
          <div class="main-middle-top1">
            <h5>- 本年访客 -</h5>
            <span>{{realtimeVO.yearNum ? realtimeVO.yearNum : 0}}</span>
          </div>
          <div class="main-middle-top2">
            <h5>- 本月访客 -</h5>
            <span>{{realtimeVO.monthNum ? realtimeVO.monthNum : 0}}</span>
          </div>
          <div class="main-middle-top3">
            <h5>- 当天访客 -</h5>
            <span>{{realtimeVO.todayNum ? realtimeVO.todayNum : 0}}</span>
          </div>
          <div class="main-middle-top4">
            <h5>- 佩戴口罩 -</h5>
            <span>{{realtimeVO.maskNum ? realtimeVO.maskNum : 0}}</span>
          </div>
        </div>

        <!--中-->
        <div class="main-middle-middle">
          <div class="main-middle-middle-title">
            人脸识别实时监控
          </div>

          <!--视频插件区域开始-->
          <!--视频插件区域 结束-->

        </div>

        <!--下-->
        <div class="main-middle-bottom">
          <div class="main-middle-bottom-title">流量走势</div>
          <div id="trafficTrendDIV" style="height: 100%;"></div>
        </div>
      </div>
      <!--中间大盒子结束-->

      <!--右边大盒子开始-->
      <div class="main-right">
        <!--上-->
        <div class="clearfix">
          <div class="main-right-left">
            <div class="main-right-left-title">
              年龄比例
            </div>
            <div id="ageRatioDIV" style="height: 100%; margin-top: 10%"></div>
          </div>
          <div class="main-right-right">
            <div class="main-right-right-title">
              情绪分布
            </div>
            <div id="emotionalDistributionDIV" style="height: 100%; margin-top: 6%"></div>
          </div>
        </div>
        <!--下-->
        <div class="main-right-bottom">
          <div class="main-right-bottom-title">
            实时抓拍
          </div>

          <div class="main-right-bottom-top clearfix">
            <!--一个完整的头像检测框-->
            <div class="avatar-left">
              <div class="avatar-left-timeBg">
                {{moment(lastVisitor.userDate).format('hh:mm:ss')}}
              </div>
              <img v-show="lastVisitor.imagePath" :src="lastVisitor.imagePath" alt=""/>
              <img v-show="!lastVisitor.imagePath" src="../assets/img/main/avatar.jpg"/>
            </div>

            <div class="user-info">
              <ul>
                <li>姓名：<span>{{lastVisitor.name}}</span></li>
                <li>性别：<span>{{lastVisitor.sex === 0 ? '男' : '女'}}</span></li>
                <li>年龄：<span>{{lastVisitor.age}}</span></li>
                <li>情绪：<span>{{handleEmotion(lastVisitor.emotion - 1)}}</span></li>
                <li>口罩：<span>{{lastVisitor.isMask === 0 ? '是' : '否'}}</span></li>
              </ul>
            </div>

            <div class="avatar-change">
            </div>

            <div class="avatar-right">
              <img v-show="lastVisitor.imagePath" :src="lastVisitor.imagePath" alt=""/>
              <img v-show="!lastVisitor.imagePath" src="../assets/img/main/avatar.jpg"/>
            </div>
          </div>

          <!--底部4个用户开始-->
          <div class="main-right-bottom-bottom">
            <ul>
              <li v-for="(item, index) in otherVisitors" :key="index">
                <div :class="'user' + (index + 1)">
                  <div :class="'avatar' + (index + 1)">
                    <div :class="'user-avatar-timeBg' + (index + 1)">
                      {{moment(item.userDate).format('hh:mm:ss')}}
                    </div>
                    <img v-show="item.imagePath" :src="item.imagePath" alt=""/>
                    <img v-show="!item.imagePath" src="../assets/img/main/avatar.jpg"/>
                  </div>
                  <div :class="'user-info' + (index + 1)">
                    <ul>
                      <li>姓名：<span>{{item.name}}</span></li>
                      <li>性别：<span>{{item.sex === 0 ? '男' : '女'}}</span></li>
                      <li>年龄：<span>{{item.age}}</span></li>
                      <li>情绪：<span>{{handleEmotion(item.emotion - 1)}}</span></li>
                      <li>体温：<span>{{item.isMask === 0 ? '是' : '否'}}</span></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--底部4个用户结束-->

        </div>
      </div>
      <!--右边大盒子结束-->
    </div>
    <!--主体结束-->
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {realTimeStatistic, timerScopeStatistic, visitPeaks, weekStatistic} from '../api/api'
  import moment from 'moment'

  export default {
    name: 'main',
    data() {
      return {
        // 控制右侧扩展功能的收起与展开
        isExpand: false,
        moment: moment,
        // 访问峰值
        temporaryList: [],
        // 男女比例、会员比例、情绪分布、年龄分布
        timerScopeStatisticVO: {},
        // 平均年龄、日流量
        weekStatisticVO: {},
        // 用户实时信息
        realtimeVO: {},
        otherVisitors: [],
        lastVisitor: {
          emotion: 1,
          headImg: '',
          name: '',
          sex: 0,
          age: 0,
          animalHeat: ''
        },
        timerScope: 0,
        marketId: 0,
        ageRatioEnum: [
          {name: 'lessTen', content: '0-10岁', number: 0},
          {name: 'lessTwenty', content: '10-20岁', number: 0},
          {name: 'lessThirty', content: '20-30岁', number: 0},
          {name: 'lessFourty', content: '30-40岁', number: 0},
          {name: 'lessFifty', content: '40-50岁', number: 0},
          {name: 'moreFifty', content: '大于50岁', number: 0}
        ],
        emotionEnum: [
          {name: 'happy', content: '开心'},
          {name: 'smile', content: '微笑'},
          {name: 'surprised', content: '惊讶'},
          {name: 'disappointment', content: '失望'},
          {name: 'angry', content: '愤怒'},
          {name: 'sad', content: '伤心'}
        ],
        gender: {
          malePercentage: 0,
          maleLogo: 0
        }
      }
    },
    methods: {
      handleEmotion(val) {
        val = val > 5 ? 5 : val
        let enumEmotion = this.emotionEnum[val]
        console.info(enumEmotion)
        return enumEmotion.content
      },
      /** 识别比例饼图开始 */
      recognitionRatio() {
        let data = [{
          name: '登记会员',
          value: this.timerScopeStatisticVO.identifyProportionVO.vipNum
        }, {
          name: '陌生访客',
          value: this.timerScopeStatisticVO.identifyProportionVO.nonVipNum
        }]
        let color = ['#fec101', '#b5b8cd', '#ff6226', '#f60000', '#2cc78f', '#2ca7f9']
        let recognitionRatioDIV = echarts.init(document.getElementById('recognitionRatioDIV'))
        // 这步主要是为了让小圆点的颜色和饼状图的块对应，如果圆点的颜色是统一的，只需要把itemStyle写在series里面
        let setLabel = (data) => {
          let opts = []
          for (let i = 0; i < data.length; i++) {
            let item = {}
            item.name = data[i].name
            item.value = data[i].value
            item.label = {
              normal: {
                // 控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
                show: true,
                // a和b来识别不同的文字区域
                formatter: [
                  // 引导线上面文字
                  '{a|{d}%  {b}}',
                  '{b|}' // 引导线下面文字
                ].join('\n'), // 用\n来换行
                rich: {
                  a: {
                    left: 30,
                    padding: [0, -50, -15, -60]
                  },
                  b: {
                    height: 5,
                    width: 5,
                    lineHeight: 5,
                    marginBottom: 10,
                    padding: [0, -5],
                    borderRadius: 5,
                    backgroundColor: color[i] // 圆点颜色和饼图块状颜色一致
                  }
                }
              }
            }
            opts.push(item)
          }
          return opts
        }
        let option = {
          /* 加载动画 */
          animation: true,
          series: [
            {
              color: color,
              name: '饼图圆点',
              type: 'pie',
              radius: ['35%', '45%'],
              avoidLabelOverlap: false,
              labelLine: {
                normal: {
                  show: true,
                  length: 30, // 第一段线 长度
                  length2: 30, // 第二段线 长度
                  align: 'center'
                },
                emphasis: {
                  show: false
                }
              },
              data: setLabel(data)
            }
          ]
        }
        if (option && typeof option === 'object') {
          recognitionRatioDIV.setOption(option, true)
        }
      },
      /** 年龄趋势 */
      doAgeTendency() {
        let ageTrendDIV = echarts.init(document.getElementById('ageTrendDIV'))
        let ageTendencyList = this.weekStatisticVO.avgAgeList
        let data = []
        let markLineData = []
        let i = 1
        if (ageTendencyList) {
          ageTendencyList.forEach(item => {
            markLineData.push({xAxis: i++})
            data.push([item.timer, item.avgAge])
          })
          let option = {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#FEC101'
                }
              }
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, '30%'],
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#FEC101'
                }
              },
              splitLine: {
                show: false
              }
            },
            // 鼠标放在点上显示数据
            tooltip: {
              trigger: 'axis'
            },
            visualMap: {
              type: 'piecewise',
              show: false,
              dimension: 0,
              seriesIndex: 0,
              pieces: [{
                gt: 0,
                lt: 10000,
                color: 'rgba(0, 180, 0, 0.5)'
              }]
            },
            series: [
              {
                type: 'line',
                smooth: 0,
                symbol: 'none',
                markLine: {
                  symbol: ['none', 'none'],
                  label: {show: false},
                  data: markLineData
                },
                areaStyle: {},
                data: data
              }
            ]
          }
          ageTrendDIV.setOption(option)
        }
      },
      /** 男女比例 */
      genderRatio() {
        let genderRatio = this.timerScopeStatisticVO.genderRatio
        let maleNum = (genderRatio.maleNum ? genderRatio.maleNum : 0)
        let famaleNum = (genderRatio.femaleNum ? genderRatio.femaleNum : 0)
        this.gender.malePercentage = parseInt((maleNum / (maleNum + famaleNum)) * 100)
        this.gender.maleLogo = Math.round((this.gender.malePercentage / 100) * 20)
      },
      /** 到访峰值 */
      peakVisit() {
        let dataName = []
        let dataValue = []
        this.temporaryList.forEach(item => {
          dataName.push(item.hour)
          dataValue.push(item.number)
        })
        let peakVisitDIV = echarts.init(document.getElementById('peakVisitDIV'))
        let option = {
          grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            top: '5%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#ddd'
              }
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [4, 8],
            textStyle: {
              color: '#7588E4'
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
          },
          xAxis: {
            type: 'category',
            data: dataName,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#FFEFEB'
              }
            }
          },
          yAxis: {
            splitLine: {
              show: false,
              color: 'red'
            },
            axisLine: {
              lineStyle: {
                color: '#FFEFEB'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 10,
                color: '#FFEFEB'
              }
            }
          },
          series: [{
            name: '访问量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            radius: ['50%', '70%'],
            symbolSize: 10,
            data: dataValue,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(205,52,42, 0.5)'
                }, {
                  offset: 0.8,
                  color: 'rgba(235,235,21, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: '#f7b851'
              }
            }
          }]
        }
        if (option && typeof option === 'object') {
          peakVisitDIV.setOption(option, true)
        }
      },
      /** 流量走势 */
      flowDirection() {
        let xdata = []
        let ydata = []
        this.weekStatisticVO.visitPeakList.forEach(item => {
          xdata.push(item.timer)
          ydata.push(item.visitNum)
        })
        let sideData = ydata.map(item => item)
        let trafficTrendDIV = echarts.init(document.getElementById('trafficTrendDIV'))
        let option = {
          tooltip: {
            trigger: 'axis',
            formatter: '{b} : {c}',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            data: xdata,
            // 坐标轴
            axisLine: {
              lineStyle: {
                color: '#3eb2e8'
              }
            },
            // 坐标值标注
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            // 坐标轴
            axisLine: {
              show: false
            },
            // 坐标值标注
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            // 分格线
            splitLine: {
              lineStyle: {
                color: '#4784e8'
              }
            }
          },
          series: [{
            name: 'a',
            tooltip: {
              show: false
            },
            type: 'bar',
            barWidth: 24.5,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0B4EC3' // 0% 处的颜色
                }, {
                  offset: 0.6,
                  color: '#138CEB' // 60% 处的颜色
                }, {
                  offset: 1,
                  color: '#17AAFE' // 100% 处的颜色
                }], false)
              }
            },
            data: ydata,
            barGap: 0
          }, {
            type: 'bar',
            barWidth: 5,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#09337C' // 0% 处的颜色
                }, {
                  offset: 0.6,
                  color: '#0761C0' // 60% 处的颜色
                }, {
                  offset: 1,
                  color: '#0575DE' // 100% 处的颜色
                }], false)
              }
            },
            barGap: 0,
            data: sideData
          }]
        }
        if (option && typeof option === 'object') {
          trafficTrendDIV.setOption(option, true)
        }
      },
      /** 年龄比例 */
      ageRatio() {
        let ageRatioDIV = echarts.init(document.getElementById('ageRatioDIV'))
        let ageRatioVO = this.timerScopeStatisticVO.ageRatioVO
        let xData = []
        let allData = []
        for (let i = 0; i < this.ageRatioEnum.length; i++) {
          xData.push(this.ageRatioEnum[i]['content'])
          allData.push({name: this.ageRatioEnum[i]['content'], value: ageRatioVO[(this.ageRatioEnum[i]['name'])]})
        }
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            data: xData,
            orient: 'vertical',
            textStyle: {
              color: '#ffffff'
            },
            top: '30%',
            right: '5%'
          },
          series: [
            {
              type: 'pie',
              radius: [15, 80],
              center: ['35%', '50%'],
              roseType: 'radius',
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              data: allData
            }
          ]
        }
        if (option && typeof option === 'object') {
          ageRatioDIV.setOption(option, true)
        }
      },
      /** 情绪分布 */
      emotionDistribution() {
        let emotionVO = this.timerScopeStatisticVO.emotionDistributionVO
        let dataMax = 0
        let ydata = []
        let xData = []
        for (let i = 0; i < this.emotionEnum.length; i++) {
          let item = this.emotionEnum[i]
          ydata.push(emotionVO[item.name])
          if (emotionVO[item.name] > dataMax) {
            dataMax = emotionVO[item.name]
          }
        }
        for (let i = 0; i < this.emotionEnum.length; i++) {
          xData.push({name: this.emotionEnum[i]['content'], max: dataMax})
        }
        const source = {
          data: ydata,
          indicator: xData
        }
        const buildSeries = function (data) {
          const helper = data.map((item, index) => {
            const arr = new Array(data.length)
            arr.splice(index, 1, item)
            return arr
          })

          return [data, ...helper].map((item, index) => {
            return {
              type: 'radar',
              itemStyle: {
                color: '#31e586'
              },
              lineStyle: {
                color: index === 0 ? '#31e586' : 'transparent'
              },
              areaStyle: {
                color: index === 0 ? '#31e586' : 'transparent',
                opacity: 0.3
              },
              tooltip: {
                show: index === 0,
                formatter: function () {
                  return xData[index - 1].name + '比例：' + ydata[index - 1] + '%'
                }
              },
              z: index === 0 ? 1 : 2,
              data: [item]
            }
          })
        }
        let emotionalDistributionDIV = echarts.init(document.getElementById('emotionalDistributionDIV'))
        let option = {
          // backgroundColor: '#080b30',
          tooltip: {},
          radar: {
            // shape: 'circle',
            radius: ['10%', '60%'],
            name: {
              textStyle: {
                fontSize: 13,
                color: ['#d1dbf2'],
                padding: [3, 4]
              }
            },
            splitNumber: 4,
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(12,62,129,0)', 'rgba(12,62,129,0.3)', 'rgba(12,62,129,0)', 'rgba(12,62,129,0.3)']
              }
            },
            splitLine: {
              lineStyle: {
                color: '#0c3e81'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#0c3e81'
              }
            },
            indicator: source.indicator
          },
          series: buildSeries(source.data)
        }
        if (option && typeof option === 'object') {
          emotionalDistributionDIV.setOption(option, true)
        }
      },
      /** 实时抓拍 */
      showVisitors() {
        this.lastVisitor = this.realtimeVO.visitors[0]
        this.otherVisitors = []
        for (let i = 1; i < this.realtimeVO.visitors.length; i++) {
          if (this.realtimeVO.visitors[i]) {
            this.otherVisitors.push(this.realtimeVO.visitors[i])
          }
        }
      },
      loadingVisitPeaks() {
        // 访问峰值
        visitPeaks(this.marketId).then(res => {
          this.temporaryList = res.result
          this.peakVisit()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      loadingTimerScopeStatistic() {
        timerScopeStatistic(this.marketId, this.timerScope).then(res => {
          this.timerScopeStatisticVO = res.result
          this.recognitionRatio()
          this.genderRatio()
          this.ageRatio()
          this.emotionDistribution()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      loadingWeekStatistic() {
        weekStatistic(this.marketId).then(res => {
          this.weekStatisticVO = res.result
          this.doAgeTendency()
          this.flowDirection()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      loadingRealTimeStatistic() {
        realTimeStatistic(this.marketId).then(res => {
          this.realtimeVO = res.result
          console.info(this.realtimeVO)
          this.showVisitors()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    mounted() {
      /*this.marketId = this.$route.query.projectId
      // this.marketId = 31
      this.loadingVisitPeaks()
      this.loadingTimerScopeStatistic()
      this.loadingWeekStatistic()
      this.loadingRealTimeStatistic()*/
    }
  }
</script>

<style scoped>
  #bigdiv {
    /*这种写法是之后超大背景的写法*/
    background: url(../assets/img/main/bg.png) center top no-repeat fixed;
    background-size: cover;
    height: 100%;
  }

  body {
    height: 100%;
  }

  /*右侧展开与收起 开始4*/
  .open-right {
    z-index: 2;
    position: fixed;
    right: 0;
    top: 50%;
    height: 200px;
    transform: translate(0, -50%);
  }

  .open-right-btn {
    float: left;
    width: 40px;
    height: 70px;
    line-height: 70px;
    background: rgba(255, 255, 255, .3);
    border-radius: 20px 0 0 20px;
    transform: translate(0, 80%);
    color: rgba(255, 255, 255, .8);
    cursor: pointer;
  }

  .open-right .open-right-btn i {
    font-size: 40px;
  }

  .expand-right {
    float: left;
    width: 100px;
    height: 200px;
    background-color: rgba(255, 255, 255, .3);
    border-radius: 10px 0 0 10px;
  }

  .expand-right .expand-right-top {
    width: 70px;
    height: 80px;
    margin: 0 auto;
  }

  .expand-right .expand-right-top i {
    cursor: pointer;
    font-size: 66px;
    color: #fff;
  }

  .expand-right .expand-right-top i:hover {
    color: #081252;
  }

  /*右侧展开与收起 结束*/

  body::-webkit-scrollbar {
    display: none;
  }

  /*初始化页面样式开始*/
  * {
    margin: 0;
    padding: 0;
  }

  ul, li {
    list-style: none;
  }

  a:link,
  a:visited,
  a:active {
    text-decoration: none;
  }

  /*初始化页面样式结束*/

  /*清除浮动代码*/
  .clearfix:before,
  .clearfix:after {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  /*确定页面的版心*/
  .w {
    width: 1920px;
    margin: auto;
  }

  /*header start*/
  .header {
    width: 1200px;
    height: 113px;
    background-size: cover;
    padding: 50px;
  }

  .title {
    font-size: 48px;
    color: #e6f6ff;
    text-align: center;
    margin-bottom: 25px;
    text-shadow: .2rem 0rem .5rem red, -.2rem 0rem .5rem red, 0rem .2rem .5rem red, 0rem -.2rem .5rem red;
  }

  .timeed {
    height: 45px;
    text-align: center;
    font-size: 20px;
    color: #caecfd;
  }

  .timeBg {
    background-image: url(../assets/img/main/time-bottom.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  /*header end*/

  /*主体开始*/
  .maindiv {
    padding: 0 30px 30px;
  }

  /*左 上*/
  .main-left,
  .main-right {
    float: left;
    width: 34%;
  }

  .main-left-left,
  .main-right-left {
    float: left;
    position: relative;
    width: 50%;
    height: 272px;
    background-image: url(../assets/img/main/main-left-left.png);
    background-repeat: no-repeat;
  }

  .main-left-left-title,
  .main-right-left-title {
    position: absolute;
    top: 15px;
    left: 25px;
    font-size: 18px;
    /*color: rgba(255, 255, 255, .5);*/
    color: #e6f6ff;
  }

  .main-left-right-title,
  .main-right-right-title,
  .main-right-bottom-title {
    position: absolute;
    top: 15px;
    /*中间有10px的padding
    这里还没有搞清楚*/
    right: 35px;
    font-size: 18px;
    color: #e6f6ff;
  }

  .main-left-right,
  .main-right-right {
    float: right;
    position: relative;
    width: 50%;
    height: 272px;
    background-image: url(../assets/img/main/main-left-right.png);
    background-repeat: no-repeat;
  }

  /*男女比例开始*/
  .main-left-middle {
    position: relative;
    height: 180px;
    margin: 19px 0;
    background: url(../assets/img/main/main-left-middle.png) no-repeat;
  }

  .main-left-middle-title {
    position: absolute;
    top: 15px;
    left: 25px;
    font-size: 18px;
    color: #e6f6ff;
  }

  .main-left-middle-content {
    width: 90%;
    height: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  /*遍历小人*/
  .main-left-middle-content ul li {
    float: left;
    margin-right: 5px;
    cursor: pointer;
  }

  /*底部比例展示的样式*/
  .main-left-middle-bottom {
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 16px;
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translate(-55%, -50%);
  }

  .main-left-middle-bottom-left, .main-left-middle-bottom-right {
    display: flex;
  }

  .main-left-middle-bottom-left .man_data {
    width: 16px;
    height: 16px;
    margin-right: 9px;
    background-color: #2a71cf;
  }

  .main-left-middle-bottom-left span {
    font-size: 12px;
    color: #2a71cf;
    margin-right: 9px;
  }

  .main-left-middle-bottom-left strong,
  .main-left-middle-bottom-right strong {
    color: #fff;
    font-size: 12px;
  }

  .main-left-middle-bottom-right .woman_data {
    width: 16px;
    height: 16px;
    margin-right: 9px;
    background-color: #be6ed3;
  }

  .main-left-middle-bottom-right span {
    font-size: 12px;
    color: #be6ed3;
    margin-right: 9px;
  }

  /*男女比例结束*/

  .main-left-bottom {
    position: relative;
    height: 402px;
    background: url(../assets/img/main/main-left-bottom.png) no-repeat;
  }

  .main-middle {
    float: left;
    width: 32%;
  }

  .main-middle-top1,
  .main-middle-top2,
  .main-middle-top3,
  .main-middle-top4 {
    float: left;
    width: 120px;
    height: 80px;
    margin-right: 34px;
    background: rgba(7, 17, 79, .6);
    color: #7783a6;
    text-align: center;
    border: 2px solid #3b4b81;
  }

  .main-middle-top1 h5,
  .main-middle-top2 h5,
  .main-middle-top3 h5,
  .main-middle-top4 h5 {
    font-size: 16px;
    margin: 5px 0;
  }

  .main-middle-top1 span,
  .main-middle-top2 span,
  .main-middle-top3 span,
  .main-middle-top4 span {
    font-size: 18px;
    font-weight: 700;
    color: #bbe8ff;
  }

  .main-middle-top4 {
    margin-right: 0;
  }

  .main-middle-middle {
    position: relative;
    height: 371px;
    margin: 19px 0;
    background: url(../assets/img/main/main-middle-middle.png) no-repeat;
  }

  .main-middle-middle-title,
  .main-middle-bottom-title {
    /*position: absolute;
    top: 10px;
    left: 0;
    bottom: 0;*/
    height: 30px;
    font-size: 18px;
    color: #e6f6ff;
    text-align: center;
  }

  .main-middle-bottom-title {
    padding-top: 15px;
  }

  .main-middle-bottom {
    width: 581px;
    height: 408px;
    background: url(../assets/img/main/main-middle-bottom.png) no-repeat;
    padding-bottom: auto;
  }

  .main-right-bottom {
    position: relative;
    height: 601px;
    margin: 19px 0;
    background: url(../assets/img/main/main-right-bottom.png) no-repeat;
  }

  .main-right-bottom-title {

  }

  .main-right-bottom-top {
    float: left;
    width: 576px;
    height: 154px;
    margin: 50px 20px 20px 20px;
    background: url(../assets/img/main/main-right-bottom-top.png) no-repeat;
  }

  .avatar-left,
  .avatar-right,
  .avatar1,
  .avatar2,
  .avatar3,
  .avatar4 {
    position: relative;
    float: left;
    width: 130px;
    height: 130px;
    margin: 12px 0 12px 12px;
    border: 2px solid #ffbd0a;
    /*background: url(../assets/img/main/avatar.jpg);*/
    border-radius: 10%;
  }

  /*修改 2 3 4 号盒子的边框颜色*/
  .avatar2,
  .avatar3,
  .avatar4 {
    border: 2px solid #00c07e;
  }

  .avatar-right {
    border: 2px solid #3b4a88;
  }

  .avatar-left img,
  .avatar-right img,
  .avatar1 img,
  .avatar2 img,
  .avatar3 img,
  .avatar4 img {
    height: 100%;
    border-radius: 10%;
  }

  .avatar-left-timeBg, .user-avatar-timeBg1, .user-avatar-timeBg2, .user-avatar-timeBg3, .user-avatar-timeBg4 {
    position: absolute;
    width: 70px;
    height: 24px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    background-color: #ffbd0a;
    border-bottom-right-radius: 13%;
    border-top-left-radius: 20%;
  }

  .user-avatar-timeBg2, .user-avatar-timeBg3, .user-avatar-timeBg4 {
    background-color: #00c07e;
  }

  .user-info,
  .user-info1,
  .user-info2,
  .user-info3,
  .user-info4 {
    float: left;
    margin: 12px 0 12px 12px;
  }

  .user-info ul li,
  .user-info1 ul li,
  .user-info2 ul li,
  .user-info3 ul li,
  .user-info4 ul li {
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #e6f6ff;
  }

  .avatar-change {
    float: left;
    width: 30px;
    height: 30px;
    padding: 25px;
    margin: 60px auto;
    vertical-align: middle;
    background: url(../assets/img/main/avatar-change.png) no-repeat;
  }

  .main-right-bottom-bottom {
    width: 600px;
    /*不设置高度*/
    margin: 0 20px;
  }

  .main-right-bottom-bottom ul li .user1,
  .main-right-bottom-bottom ul li .user2,
  .main-right-bottom-bottom ul li .user3,
  .main-right-bottom-bottom ul li .user4 {
    float: left;
    width: 278px;
    height: 166px;
    border: 2px solid #00c07e;
    border-radius: 3%;
    margin-right: 18px;
    margin-bottom: 18px;
  }

  .main-right-bottom-bottom ul li .user1 {
    border: 2px solid #ffbd0a;
  }

  /*主体结束*/
</style>
