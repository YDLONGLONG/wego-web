<template>
   <div>
       <div class="bg"></div>
       <div class="main">
           <div class="write">
               <el-form class="demo-ruleForm">
                <el-form-item>
                    <el-input v-model="title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <quill-editor ref="myQuillEditor" v-model="content" class="myQuillEditor" :options="editorOption" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="send">发布</el-button>
                </el-form-item>
                </el-form>
           </div>
       </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'
import { sendTrend } from '../../api/trend'
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data() {
    return {
      title:'',
      content:'',
      editorOption: {  
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              size:2,
              action: 'http://localhost:3000/user/uploadMoreImg',
              response: (res) => {
                console.log(this.$apiServer+res.data[0].destination.slice(1)+res.data[0].originalname)
                return this.$apiServer+res.data[0].destination.slice(1) +res.data[0].originalname
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        },
    }
  },
  components: {
    quillEditor
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    async send(){
        if (!this.content.trim()) {
        this.content = ''
        return this.$message.warning('请输入内容')
      }
      let result = await sendTrend({ useid:this.userId ,title:this.title, content: this.content })
      this.$message.success(result.message)
      this.$router.push('/home/article')
    },
    async init() {
      if (!this.userId) {
        this.$message.warning('请先登录')
        return await this.$router.push('/login')
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.bg{
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(246,246,246);
}
.main{
    display: grid;
    width: 1200px;
    margin-left: 18%;
    .write{
        margin-top: 6rem;
        background-color: #fff;
        .demo-ruleForm{
            margin: 0 auto;
            padding-top: 3rem;
            width: 900px;
            .submit{
                margin-left: 43%;
                width: 100px;
            }
        }
    }
}
</style>