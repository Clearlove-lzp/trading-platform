<!-- 用户管理 -->
<template>
  <div class="userManagement">
    <Card dis-hover>
      <!-- 查询表单 -->
      <div class="cdp-form">
        <Form ref="formRef" :model="AppliForm" label-position="right" :label-width="100">
          <Row style="margin-bottom: 10px" :gutter="10">
            <Col span="8">
              <Input v-model="AppliForm.orderId" class="cdp-input" placeholder="订单编号"></Input>
            </Col>
            <Col span="8" align="left">
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
            <div style="textAlign: center" :style="{backgroundColor: row.status === 1 ? '#59c9af' :
              row.status === 2 || row.status === 4 ? '#f1bc6a' :
              row.status === 3 ? '#ccc' : ''}"
            >{{row.status === 1 ? '创建' : row.status === 2 ? '审核中' : row.status === 3 ? '驳回' :
              row.status === 4 ? '已完成' : ''}}</div>
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
    title: "订单编号",
    key: "orderId",
    align: 'center'
  },
  {
    title: "买方",
    key: "buyer",
    align: 'center'
  },
  {
    title: "卖方",
    key: "seller",
    align: 'center'
  },
  {
    title: "交易内容",
    key: "content1",
    align: 'center'
  },
  {
    title: "交易金额",
    key: "amount",
    align: 'center'
  },
  {
    title: "创建时间",
    key: "createTime",
    align: 'center'
  },
  {
    title: "完成时间",
    key: "updateTime",
    align: 'center'
  },
  {
    title: "交易状态",
    width: 100,
    key: "status",
    slot: 'status',
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
    buyer: "",
    orderId: ""
  }
  const [ formRef, AppliForm, resetForm ] = useForm(form)
  const { userInfo } = useUserInfo()
  const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器
  const [detailInfo, setDetailInfo] = useState({})

  const getParams = () => {
    let params = {
      currentPage: pages.current,
      pageSize: pages.limit,
      orderId: AppliForm.orderId
    }
    return params;
  }

  // 查询  表格数据
  const { datalist, setDatalist, loading, setLoading } = useTable()
  const query = () => {
    let params = getParams()
    setDatalist([
      {
        buyer: "买家1",
        orderId: "mode-20230312-000000-001",
        content1: "交易内容1",
        amount: "100",
        createTime: "2023-03-22 12:00:00",
        status: 2,
        seller: "卖家1",
        updateTime: "2023-03-22 12:00:00"
      },
      {
        buyer: "买家2",
        orderId: "mode-20230312-000000-002",
        content1: "交易内容2",
        amount: "200",
        createTime: "2023-03-22 12:00:00",
        status: 1,
        seller: "卖家2",
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
