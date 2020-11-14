<template>
    <div class="parkingIndex">
        <!-- <filerForm :formItme="form_itme" @callbackComponent="callbackComponent" :formConfig="form_config" :addConfig="add_config" /> -->
        <TabalData ref="table" :config="table_config">
            <!-- 禁启用 -->
            <template v-slot:status="slotData">
                <el-switch :disabled="slotData.data.id == switch_disabled" @change="switchChange(slotData.data)" v-model="slotData.data.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <!-- 查看地图 -->
            <template v-slot:lnglat="slotData">
                <el-button type="success" size="mini" @click="showMap(slotData.data)">查看地图</el-button>
            </template>
        </TabalData>
        <MapLocation :flagVisible.sync="map_show" :data="parking_data"></MapLocation>
    </div>
</template>
<script>
import filerForm from "@c/listForm/index.vue";
import MapLocation from "@c/dialog/showMapLocation";
import TabalData from "@c/tableData";
//API
import { ParkingDelete,ParkingStatus } from "@/api/parking";
//common
import { address,parkingType } from "@/utils/common";
export default {
    name:"ParkingIndex",
    data(){
        return{
            
            //表格配置
            table_config:{
                thead:[
                    {label:"停车场名称",prop:"parkingName"},
                    {
                        label:"类型",
                        prop:"type",
                        type:"function",
                        callback:(row,prop)=>parkingType(row[prop])
                    },
                    {
                        label:"区域",
                        prop:"address",
                        type:"function",
                        callback:(row,prop)=>address(row[prop])
                    },
                    {label:"可停放车辆",prop:"carsNumber"},
                    {
                        label:"禁启用",
                        prop:"status",
                        type:"slot",
                        slotName:"status",
                        width: "100px"
                    },
                    {
                        label:"查看位置",
                        prop:"lnglat",
                        type:"slot",
                        slotName:"lnglat"
                    },
                    {
                        label:"操作",
                        type:"operation",
                        default:{
                            deleteButton:true,
                            editButton:true,
                            editButtonLink:"ParkingAdd",
                            id:"id"
                        }
                    }
                ],
                url:"parkingList",//真实URL请求地址
                data:{
                    pageSize:10,
                    pageNumber:1
                },
                search_form:true,
                form_item:[
                    {label:"区域",prop:"city",type:"City"},
                    {label:"类型",prop:"parkingType",type:"Select",width:"120px",options:this.$store.state.config.parking_type},
                    {label:"禁启用",prop:"status",type:"Select",width:'120px',options:this.$store.state.config.parking_status},
                    {label:"关键字",prop:"keyWord",type:"Keyword"}
                ],
                form_config:{
                    resetButton:false,
                },
                add_config:[
                    {label:"新增停车场",prop:"add",type:"danger",element:"link",router:"/parkingAdd"}
                ],
                pagination:true
            },
            switch_disabled:"",
            switch_flag:false,
            //禁启用
            parking_status:this.$store.state.config.radio_disabled,
            //停车场类型
            parking_type:this.$store.state.config.parking_type,
            //显示地图
            map_show:false,
            parking_data:{},
            table_loading:false,
            rowId:""
        }
    },
    components:{filerForm,TabalData,MapLocation},
    methods:{
        callbackComponent(params){
          console.log(params)//参数少了区域，类型
          if(params.function){this[params.function](params.data);}
      },
      /*search(){
          const requestData={
              pageSize:10,
              pageNumber:1
          }
          //过滤筛选
          const filterData = JSON.parse(Json.stringify(this.form))
      },*/
      /**禁启用 */
      switchChange(data){
          if(this.switch_flag){return false;}
          const requestData={
              id:data.id,
              status:data.status
          }
         this.switch_disabled = data.id;  // 第一种方式：组件本身的属性处理
            console.log(requestData)
            ParkingStatus(requestData).then(response => {
                this.$message({
                    type: 'success',
                    message: response.message
                });
                this.switch_disabled = "";
                // this.switch_flag = false;
            }).catch(error => {
                console.log(error)
                this.switch_disabled = "";
                // this.switch_flag = false;
            })
      },
      /**显示地图 */
      showMap(data){
          this.map_show = true;
          this.parking_data = data;
      }
    },
    //DOM元素渲染之前（生命周期）
    beforeMount(){},
    //DOM元素渲染完成
    mounted(){}
}
</script>
<style lang="scss" scoped>
.el-cascader{
    width: 120px;
}
</style>