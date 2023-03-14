<!-- 用户管理 -->
<template>
  <div class="userManagement">
    <Card dis-hover>
      <!-- 查询表单 -->
      <div class="cdp-form">
        <Form ref="formRef" :model="AppliForm" label-position="right" :label-width="100">
          <Row style="margin-bottom: 10px" :gutter="10">
            <Col span="5">
              <Input v-model="AppliForm.roleId" class="cdp-input" placeholder="模型编号"></Input>
            </Col>
            <Col span="5">
              <Input v-model="AppliForm.userName" class="cdp-input" placeholder="模型名称"></Input>
            </Col>
            <Col span="5">
              <DatePicker class="cdp-input"  type="daterange" v-model="AppliForm.time" placeholder="创建时间" format="yyyy-MM-dd"></DatePicker>
            </Col>
            <Col span="5">
              <Input v-model="AppliForm.createUserName" class="cdp-input" placeholder="创建人"></Input>
            </Col>
            <Col span="4" align="left">
              <Space direction="horizontal">
                <Button type="primary" @click="queryPageFunc(query)">查询</Button>
                <Button type="primary" @click="resetForm()">重置</Button>
                <Button type="success" @click="addFunc({})">新增</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <!-- 表格数据 -->
      <div class="cdp-table">
        <i-table border :loading="loading" size="small" stripe :columns="columns" :data="datalist">
          <template #status="{ row, index }">
            <i-switch v-model="row.status" true-value="是"
              @on-change="(value) => {switchChange(value, row)}" false-value="否" true-color="#13ce66" false-color="#ff4949">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </template>
          <template #action="{ row, index }">
            <Button type="warning" size="small" style="margin-right: 5px"
             @click="addFunc(row)">编辑</Button>
            <Poptip confirm transfer title="您确定要删除这条数据吗?" placement="top-end" @on-ok="deleteFunc(row)">
              <Button  type="error" size="small">删除</Button>
            </Poptip>
          </template>
        </i-table>
        
        <div class="cdp-page">
          <Page
            @on-change="(value) => {queryCurrentFunc(value, query)}"
            :total="pages.total"
            :page-size="pages.limit"
            :page-size-opts="[10, 20, 50]"
            @on-page-size-change="(value) => {queryLimitFunc(value, query)}"
            :current="pages.current"
            placement="top"
            show-total show-sizer show-elevator />
        </div>
      </div>
    </Card>
    <addForm :detailInfo="detailInfo" :visible="addFormShow" @closeModal="closeAddModal" @updateList="query"></addForm>
  </div>
</template>

<script setup>
import { usePage, useTable, useForm, useUserInfo, useEffect, useState, useModal } from '@/hook/index.js';
import addForm from './addForm.vue'
// import { cutoverLevelLimitList, cutoverLevelLimitDel, cutoverLevelLimitEnabled, cutoverLevelLimitDisabled } from '@/api/index';
import { Message } from "view-ui-plus";

const columns = [
  {
    title: "模型编号",
    key: "roleId",
    align: 'center'
  },
  {
    title: "模型名称",
    key: "userName",
    align: 'center'
  },
  {
    title: "创建时间",
    key: "createTime",
    align: 'center'
  },
  {
    title: "创建人",
    key: "createUserName",
    align: 'center'
  },
  {
    title: "是否启用",
    width: 100,
    key: "status",
    slot: 'status',
    align: 'center'
  },
  {
    title: "修改时间",
    key: "updateTime",
    align: 'center'
  },
  {
    title: "操作",
    slot: 'action',
    width: 130,
    align: "center",
  }
]

  const form = {
    userName: "",
    roleId: "",
    createUserName: ""
  }
  const [ formRef, AppliForm, resetForm ] = useForm(form)
  const { userInfo } = useUserInfo()
  const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器
  const [detailInfo, setDetailInfo] = useState({})

  const getParams = () => {
    let params = {
      currentPage: pages.current,
      pageSize: pages.limit,
      createUserName: AppliForm.createUserName,
      userName: AppliForm.userName,
      roleId: AppliForm.roleId
    }
    return params;
  }

  // 查询  表格数据
  const { datalist, setDatalist, loading, setLoading } = useTable()
  const query = () => {
    let params = getParams()
    setDatalist([
      {
        userName: "线性回归",
        roleId: "mode-20230312-000000-001",
        status: "是",
        createUserName: "system",
        createTime: "2023-03-22 12:00:00",
        updateTime: "2023-03-22 12:00:00"
      },
      {
        userName: "逻辑回归",
        roleId: "mode-20230312-000000-002",
        status: "是",
        createUserName: "system",
        createTime: "2023-03-22 12:00:00",
        updateTime: ""
      }
    ])
    // setLoading(true)
    // cutoverLevelLimitList(params).then(res => {
    //   setLoading(false);
    //   if(res.data.code === 200) {
    //     setDatalist(res.data.result.records);
    //     pages.total = res.data.result.total;
    //   }
    // })
  }

  useEffect(query, [])

  // 新增/编辑 模态框
  const [addFormShow, openAddModal, closeAddModal] = useModal()
  const addFunc = (info) => {
    setDetailInfo(info)
    openAddModal()
  }

  // 删除
  const deleteFunc = (info) => {
    // let params = {
    //   id: info.id
    // }
    // cutoverLevelLimitDel(params).then(res => {
    //   if(res.data.code === 200) {
    //     Message.success(res.data.message);
    //     queryPageFunc(query)
    //   }else{
    //     Message.error(res.data.message);
    //   }
    // })
  }

  const switchChange = (value, row) => {
    // let func = value === 2 ? cutoverLevelLimitEnabled : cutoverLevelLimitDisabled
    // let params = {
    //   id: row.id
    // }
    // func(params).then(res => {
    //   if(res.data.code === 200) {
    //     Message.success(res.data.message);
    //   }else{
    //     Message.error(res.data.message);
    //     query()
    //   }
    // }, err => {
    //   query()
    // })
  }
</script>

<style scoped>
.cdp-page{
  padding-top: 10px;
  text-align: right;
}

.userManagement{
  width: 100%;
  margin-top: 10px;
}

.cdp-input{
  width: 100%;
}

</style>
