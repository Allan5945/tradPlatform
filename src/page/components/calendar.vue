<template>
  <div id="calendar" onselectstart="return false;" @click.stop>
    <div class="chead">
    <div class="pre-mbtn mbtn">
        <span @click="preMonth()"><i class="icon-item">&#xe60a;</i></span>
      </div>
      <span class="tle">{{ curY +"."+ curM }}</span>
      <div class="next-mbtn mbtn">
        <span @click="nextMonth()"><i class="icon-item">&#xe686;</i></span>
      </div>
    </div>
    <div class="cweek">
      <ul>
        <li>SU</li><li>MO</li><li>TU</li><li>WE</li><li>TH</li><li>FR</li><li>SA</li>
      </ul>
    </div>
    <div class="cbody">
      <ul>
        <li v-for="day in days" >
          <span v-text="day.num" :title="day.date"
          :class="{otherMonth: day.otherMonth, today:day.date===today,checkday: day.date===checkDay}"
          @click="pick(day.date)">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      checkDay: "", //选中日期
      today: "", //今日
      curY: 0, //check年份
      curM: 0, //check月份
      days: [
        // num: 号数,
        // date: 完整日期,
        // otherMonth: 是否其它月
      ]
    };
  },
  props: ["initDay"], //默认选中日期
  methods: {
    formatDate: function(year, month, day) {
      // 返回 类似 2016-01-02 格式的字符串
      let y = year,
        m = month;
      if (m < 10) m = "0" + m;
      let d = day;
      if (d < 10) d = "0" + d;
      return y + "/" + m + "/" + d;
    },
    initDate: function(markDate) {
      //初始化
      let that = this,
        today = new Date(),
        cur = markDate ? new Date(markDate) : today, //初始日期
        cday = cur.getDate(), //号数
        cmon = cur.getMonth() + 1, //月份
        cyear = cur.getFullYear(); //年份
      this.today = this.formatDate(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      return this.render(cyear, cmon);
    },
    render: function(y, m) {
      //渲染内容  m=1~12
      this.curY = y;
      this.curM = m;
      this.days = [];
      let cur = new Date(y, m - 1, 1),
        sumDay = new Date(y, m, 0).getDate(), //当月总天数
        lastSumDay = new Date(y, m - 1, 0).getDate(), //上月总天数
        week = cur.getDay(), //本月1号周几
        /*total = sumDay + week + 1 > 35 ? 42 : 35; *///适应最大展示数量
        total = 42;
      for (let i = 0; i < total; i++) {
        if (i < week) {
          this.days.push({
            //上月
            num: lastSumDay - week + i + 1,
            date: this.formatDate(y, m - 1, lastSumDay - week + i + 1),
            otherMonth: true
          });
        } else if (i - week < sumDay) {
          this.days.push({
            //本月
            num: i - week + 1,
            date: this.formatDate(y, m, i - week + 1),
            otherMonth: false
          });
        } else {
          this.days.push({
            //下月
            num: i - sumDay - week + 1,
            date: this.formatDate(y, m + 1, i - sumDay - week + 1),
            otherMonth: true
          });
        }
      }
    },
    pick: function(date) {
      //选中日期并传出
      this.checkDay = date;
      let cur = new Date(date),
        cy = cur.getFullYear(),
        cm = cur.getMonth() + 1;
      this.render(cy, cm);
      return this.sentToFather(this.checkDay);
    },
    preMonth: function() {
      let nd = new Date(this.curY, Number(this.curM) - 1, 1),
        y = nd.getFullYear(),
        m = nd.getMonth();
      if (m === 0) {
        y = y - 1;
        m = 12;
      }
      return this.render(y, m);
    },
    nextMonth: function() {
      let nd = new Date(this.curY, Number(this.curM) + 1, 1),
        y = nd.getFullYear(),
        m = nd.getMonth();
      if (m === 0) {
        y = y - 1;
        m = 12;
      }
      return this.render(y, m);
    },
    sentToFather: function(d) {
      d = d.replace(/\//g, ".");
      this.$emit("changeDate", d);
    }
  },
  created: function() {},
  mounted: function() {
    let d = this.initDay;
    d = d.replace(/-/g, "/");
    this.checkDay = d;
    this.initDate(d);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
#calendar {
  width: 265px;
  height: 220px;
  position: relative;
  font-size: 13px;
  color: #605e7c;
  display: inline-block;
  border:1px solid rgba(151,151,151,.3);
  border-radius: 5px;
  padding: 0 20px;
  margin:0 1px;
  /* box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12); */
}
ul {
  list-style: none;
  margin:0;
  padding: 0;
}
.cbody ul{
  height:123px;
  width:225px;
}
ul li {
  display: inline-block;
  position: relative;
  width: 14.285%;
  height:16.6666667%;
}
.chead {
  position: relative;
  width: 100%;
  height:40px;
  display: flex;
}
.chead .tle {
  width: 100%;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
}
.icon-item{
      font-size: 1.6rem;
      font-family: iconfont;
    }
.chead .mbtn {
  /* display: flex;
  justify-content: space-between; */
  position:absolute;
  font-size: 18px;
  color: #888;
  height:20px;
  width:20px;
  text-align: center;
}
.chead .mbtn span{
  display: block;
  height:20px;
  width:20px;
}
.chead .pre-mbtn{
  top:6px;
  left:30px;
}
.chead .next-mbtn{
  top:6px;
  right:30px;
}
.chead .mbtn span:hover {
  color: rgb(0, 189, 255);
}
.chead .mbtn span:active {
  font-size: 17px;
  color: rgb(0, 189, 255);
}
.chead span {
  cursor: pointer;
}
.cweek {
  height:20px;
  line-height: 20px;
  /* margin-top: 25px; */
}
.cweek ul{
  text-align: center;
}
.cbody {
  position: relative;
}
.cbody span {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 24.6px;
  text-align: center;
}
.today {
  background-color: #eee;
}
.checkday {
  background-color: #3c78ff;
  color: #fff;
}
.otherMonth {
  color: #aaa;
}
</style>
