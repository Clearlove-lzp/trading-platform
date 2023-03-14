<template>
  <div class="container">
    <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-primary mt_150">
            <div class="panel-heading text-center"><h4>后台管理系统</h4></div>
            <div class="panel-body">
                <form id="login" class="form-horizontal" autocomplete="off">
                    <div class="form-group">
                        <label for="inputUserName3" class="col-sm-3 control-label">用户名</label>
                        <div class="col-sm-9">
                            <input name="username" type="text" class="form-control" id="inputUserName3" placeholder="请输入用户名">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword3" class="col-sm-3 control-label">密码</label>
                        <div class="col-sm-9">
                            <input name="password" type="password" class="form-control" id="inputPassword3" placeholder="请输入密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-10">
                            <button type="reset" class="btn btn-default mr_50">重置</button>
                            <button type="submit" class="btn btn-primary" @click="loginFunc">登录</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue"

const loginFunc = () => {
  
}
</script>

<style scoped>
</style>