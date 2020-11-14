<template>
    <div>
        <div class="filter-form">
            <el-row>
                <el-col :span="addConfig.length>0?21:24">
                    <el-form ref="form" :model="form_data" :inline="true" class="demoform-inline">
                        <el-form-item  v-for="item in formItme" :key="item.prop" :label="item.label" :prop="item.prop" :rules="item.rules">
                            <!-- City -->
                            <div v-if="item.type==='City'">
                                <CityArea ref="cityArea" :cityAreaValue.sync="city_value" />
                            </div>
                            <!-- Select -->
                             <el-select filterable v-if="item.type === 'Select'" :aaaa="item.options" v-model.trim="form_data[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" :disabled="item.disabled">
                                <el-option  v-for="selectItem in item.options" :key="selectItem.value || selectItem[item.select_value]" :label="selectItem.label || selectItem[item.select_label]" :value="selectItem.value || selectItem[item.select_value]"></el-option>
                            </el-select>
                             <!-- Input -->
                            <el-input v-if="item.type === 'Input'" v-model.trim="form_data[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" :disabled="item.disabled"></el-input>
                            <!-- Keyword -->
                            <div v-if="item.type === 'Keyword'">
                                <KeyWord ref="keyword" :options="['address','parkingName']" :value.sync="keyword"/>
                            </div>
                            <!-- slot -->
                            <slot v-if="item.type === 'Slot'" :name="item.slotName"></slot>
                            
                        </el-form-item>
                       
                        <!-- 按钮 -->
                        <el-form-item>
                            <el-button type="danger" @click="search">搜索</el-button>
                            <el-button type="danger" @click="onReset" v-if="formConfig.resetButton">重置</el-button>
                            <template v-for="item in formHandler">
                                <el-button v-if="item.element === 'link'" :key="item.key" :type="item.type">
                                    <router-link :to="item.router">
                                        {{item.label}}
                                    </router-link>
                                </el-button>
                                <el-button v-if="item.element === 'button'" :key="item.key" :type="item.type">
                                    {{item.label}}
                                </el-button>
                            </template>
                        </el-form-item>
                        </el-form>
                </el-col>
                <el-col :span="addConfig.length>0?3:0">
                    <template v-for="item in addConfig">
                        <el-button v-if="item.element === 'link'" :key="item.key" :type="item.type">
                            <router-link :to="item.router">
                                {{item.label}}
                            </router-link>
                        </el-button>
                        <el-button v-if="item.element === 'button'" :key="item.key" :type="item.type">
                            {{item.label}}
                        </el-button>
                    </template>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import CityArea from "@c/common/cityArea";
import KeyWord from "@c/common/keyWord";
export default {
    name:"Listform",
    data(){
        return{
            keyword:{},
            search_key:'',
            form_data: {
                
            },
            city_value:""
        }
    },
    props:{
        formItme:{
            type:Array,
            default:()=>[]
        },
        //按钮
        formHandler:{
            type:Array,
            default:()=>[]
        },
        formConfig:{
            type:Object,
            default:()=>{}
        },
        addConfig:{
            type:Array,
            default:()=>[]
        }
    },
    components:{CityArea,KeyWord},
    methods:{
        search() {
        const searchData = {};
        //过滤空数据
        for(let key in this.form_data){
            if(this.form_data[key]){
                searchData[key] = this.form_data[key]
            }else if(this.form_data[key] === undefined){
                searchData[key] = false
            }
        }
        /**组件 */
        //关键字
        if(this.$refs.keyword && this.keyword.key && this.keyword.value){
            searchData[this.keyword.key] = this.keyword.value;
        }
        //城市
        if(this.$refs.city && this.city_value){
            searchData.area = this.city_value;
        }
        this.$emit("callbackComponent",{
            function:"search",
            data:searchData
        })
      },
      onReset(){
          this.$refs.form.reseFields();
          //城市组件
          if(this.$refs.city[0]){this.$refs.city[0].clear()};
          //关键字
          if(this.$refs.keyword[0]){this.$refs.keyword[0].clear()};
      },
      initFormData(){
          this.formItme.forEach(item=>{
              //读取下拉选项的数据
              if(this.type === "Select"){this.selectOption(item)};
          })
      },
      //字段初始化
      initFormFelid(data){
          const felid = {};
          this.formItme.forEach(item=>{
              if(item.prop){
                  felid[item.prop] = ""
              }
          })
          this.form_data = felid;
      },
      //下拉选项
      selectOption(data){
          const options = this.$store.state.config[data.options];
          if(options){
              data.options = options;
          }
      },
      
    },
    watch:{
        formItme:{
            handler(newValue){
                console.log(newValue);
                this.initFormData();
                this.initFormFelid();
            },
            immediate:true
        }
    }
}
</script>
<style lang="scss" scoped>

</style>