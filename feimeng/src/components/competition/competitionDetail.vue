<template>
	<div class="container" >
		<div class="title"><img class="back" @click="goback" src="./back.png" alt=""/> 飞梦网</div>
		
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
import Global from 'common/js/global'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      baseurl: Global.baseURL,
      competition: {
				data: {
					list: []
				}
			}
    }
  },
  created () {
    this.getdata()
    this.getCompetitionDetail()
  },
  methods:{
  	goback(){
  		this.$router.go(-1)
  	},
  	getCompetitionDetail() {
      let that = this
      let loading = Loading.service({
          lock: true,
          text: '拼命加载中',
          background: 'rgba(0, 0, 0, 0.8)'
      })
//    axios.get(Global.baseURL + '/Mobile/Competition/detail.html', {
//         params: {
//        	id: id, uid: that.myData.uid
//      }}).then((response) => {
//       loading.close()
//      that.competitionDetail = response.data;
//      console.log(that.competitionDetail)
////      that.competition.data.list.forEach(item => {
////      })
//	      
//     })
         axios.get(Global.baseURL + '/Mobile/Competition/detail.html').then((response) => {
        that.competitionDetail = response.data
            console.log(that.competitionDetail)
         loading.close()
       })
       .catch(function (error) {
          console.log(error)
        })
       },
  	 getdata() {
         let that = this
         let userinfo = JSON.parse(localStorage.getItem('userInfo'))
         that.myData = userinfo.data
//          console.log(that.myData)
       }
  },
    components: {
      swiper,
      swiperSlide,
    }
}


</script>

<style>
	.container{
		width: 100%;
		height: 100%;
		background: #fff url(../coursecatalog/cscatalog.png) no-repeat;
		position: absolute;
		top: 0;
		display: block;
	}
	.back{
		 width: 10px;
        position: absolute;
        left: 0px;
        top: 10px;
        padding: 10px 14px;
	}
	.title{
			text-align:center;
      font-size: 20px;
      line-height: 60px;
      color: #fff;
      position: relative;
		}
</style>