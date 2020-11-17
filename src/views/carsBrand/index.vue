<template>
    <div>
        <!-- 表格数据 -->
        <TabalData ref="table" :config="table_config">
            <template v-slot:status="slotData">
                <el-switch v-model="slotData.data.status" :disabled="slotData.data.id== switch_disabled" @change="switchChange(slotData.data)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <!-- 操作 -->
            <template v-slot:operation="slotData">
                <el-button type="danger" size="small" @click="edit(slotData.data)">编辑</el-button>
            </template>
        </TabalData>
        <!-- 父组件往子组件传输局时，是一个单向数据流 -->
        <AddCarsBrand :flagVisible.sync="dialog_show" :data="data_brand" @callbackComponent="callbackComponent"></AddCarsBrand>
    </div>
</template>
<script>
import TabalData from "@c/tableData";
import AddCarsBrand from "@c/dialog/addCarsBrand";
//API
import { BrandStatus } from "@/api/brand";
export default {
    name:"CarsBrandIndex",
    components:{AddCarsBrand,TabalData},
    data(){
        return{
            //表格配置
            table_config:{
                thead:[
                    {
                        label:"LOGO",
                        prop:"imgUrl",
                        type:"image",
                        width:"150px"
                    },
                    {
                        label:"车辆品牌",
                        prop:"nameCh",
                        type:"function",
                        callback:(row,prop)=>`${row.nameCh}/${row.nameEn}`
                    },
                    {
                        label:"禁启用",
                        prop:"status",
                        type:"slot",
                        slotName:"status"
                    },
                    {
                        label:"操作",
                        type:"operation",
                        width:"200px",
                        default:{
                            deleteButton:true
                        },
                        slotName:"operation"
                    }
                ],
                url:"brandList",//真实地址
                data:{
                    pageSize:10,
                    pageNumber:1
                },
                form_item:[
                     {label:"车辆品牌",prop:"brand",type:"Input",width:"150px",options:"parking_type",placeholder:"请输入车辆品牌"},
                ],
                form_handler:[
                    {label:"新增车辆品牌",prop:"add",type:"danger",element:"button",handler:()=>this.dialogShow()},
                ],
                form_config:{
                    resetButton:true
                }
            },
            //row_id
            row_id:"",
            data_brand:{},
            switch_disabled:"",
            //弹窗标记
            dialog_show:false,
            form:{
                brand:""
            }
        };
    },
    mounted(){
        console.log(this.dialog_show)
    },
    methods:{
        callbackComponent(params){
            console.log(params)
            if(params.function){this[params.function]()};
        },
        /**搜索 */
        search(){
            const requestData={
                pageSize:10,
                pageNumber:1
            };
            if(this.form.brand){requestData.brand = this.form.brand};
            console.log(requestData)
            //调用子组件方法
            this.$refs.table.requestData(requestData);
        },
        /**编辑 */
        edit(data){
            this.data_brand = Object.assign({},data);//ES6浅拷贝
            this.dialog_show = true;
        },
        /**禁启用 */
        switchChange(data){
            if(this.switch_flag){return false};
            const requestData={
                id:data.id,
                status:data.status
            }
            //this.switch_flag = true;
            this.switch_disabled = data.id;//第一种方式：组件本身属性处理
            BrandStatus(requestData).then(response=>{
                this.$message({
                    type:"success",
                    message:response.message
                });
                this.switch_disabled = "";
                //this.switch_flag =false;
            }).catch(error=>{
                this.switch_disabled = "";
                 //this.switch_flag =false;
            })
        },
        /**显示弹框 */
        dialogShow(){
            console.log(this.dialog_show)
            this.dialog_show = true;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>