<template>
  <div class="reports">
    <el-table :data="reportList" stripe style="width: 100%">
      <el-table-column prop="date" label="发布日期" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="description" label="描述" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="dele(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name:'',
    components: {},
    props:[''],
    data () {
      return {
        reportList: [
          {
            // year: 2022,
            // // month: 02,
            // // day: 09,
            // title: '“空天地”一体化打造南海社会治理新格局',
            // brief: '2月8日，佛山市南海区举行2022年开春首场会议——佛山市南海区推进全面深化改革加快广东省城乡融合发展改革创新实验区建设大会。'
          }
        ],
      };
    },
    watch: {},
    created() {},
    befovwount() {},
    mounted() {
      this.getReportList()
    },
    methods: {
      getReportList() {
        this.$api.get('/imapcloud/news/all').then(res => {
          console.log('res: ', res);
          if (res.code == 20000) {
            let data = res.param.res || []
            data.length && data.forEach(item => {
              item.date = item.date.split('T')[0].split('-')
            })
            this.reportList = res.param.res
            console.log('this.reportList: ', this.reportList);
          }
        })
      },
      dele(id) {

      },
      edit(id) {
        this.$router.push({
          path: '/reportsEdit',
          query: {id: id}
        })
      },
    },
    computed: {}
  }
</script>
<style lang='scss' scoped>
.reports {
  .headImg {
    width: 100%;
    height: 38vw;
    object-fit: cover;
  }
  .title {
    font-size: 2.34vw;
    font-weight: bold;
    color: #000000;
    line-height: 0.44vw;
    margin-top: 3.33vw;
    text-align: center;
  }
  .jobList {
    margin: 3vw 16vw 15vw;
    .jobItem {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #EEEEEE;
      padding: 2.2vw 2.9vw;
      .left {
        align-items: center;
        display: flex;
        font-size: 2.12vw;
        color: #000000;
        .split {
          margin: auto .36vw;
        }
        .year_month {
          width: 3vw;
          font-size: 0.96vw;
          color: #202020;
        }
      }
      .right {
        border-left: 1px solid #EEEEEE;
        padding-left: 2.45vw;
        margin-left: 2.7vw;
        .right_title {
          font-size: 1.3vw;
          font-weight: 400;
          color: #000000;
          line-height: 3.6vw;
        }
        .brief {
          font-size: 1.1vw;
          font-weight: 300;
          color: #5A5D63;
          line-height: 1.8vw;
        }
      }
    }
  }
}
</style>