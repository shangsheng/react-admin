<template>
    <div ref="editorDom"></div>
</template>
<script>
//富文本编译器
import Editor from "wangeditor";
export default {
    nmae:"",
    components:{},
    mounted(){
        this.editor = new Editor(this.$refs.editorDom);
        this.editor.config.onchange=html=>{
            this.$emit("update:content",html);
        };
        this.editor.create();//创建富文本实例
    },
    props:{
        isClear:{
            type:Boolean,
            default:false
        },
        value:{
            type:String,
            default:""
        }
    },
    watch:{
        isClear:{
            handler(){
                this.editor.txt.clear();
            }
        },
        value:{
            handler(newValue){
                this.editor.txt.html(newValue);
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>