<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.email" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            form: {
                email: '',
                password: ''
            },
            rules: {
              email: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/auth/login', this.form).then(res => {
                      console.log(res)
                      if(res.status == 200 && res.data.success == 1) {
                        Cookies.set('user', this.form.userName);
                        Cookies.set('password', this.form.password);
                        
                        this.$store.dispatch('logined', res.data.data.token_type + ' ' + res.data.data.access_token)
                        
                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        /*if (this.form.userName === 'iview_admin') {
                          Cookies.set('access', 0);
                        } else {
                          Cookies.set('access', 1);
                        }*/
                        this.$Message.success('恭喜您，登录成功!', 2)
                        
                        setTimeout(() => {
                          this.$router.push({path: '/home'});
                        }, 2000)
                      }else{
                        this.$Message.error(res.data.msg);
                      }
                    })
                }
            });
        }
    }
};
</script>

<style>

</style>
