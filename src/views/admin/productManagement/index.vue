<!-- 用户管理 -->
<template>
  <div class="userManagement">
    <Card dis-hover>
      <!-- 查询表单 -->
      <div class="cdp-form">
        <Form ref="formRef" :model="AppliForm" label-position="right" :label-width="100">
          <Row style="margin-bottom: 10px" :gutter="10">
            <Col span="8">
              <Input v-model="AppliForm.data_name" class="cdp-input" placeholder="商品名称"></Input>
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
          <template #proPic="{ row, index }">
            <img :src="row.proPic" alt="" style="width: 100%;">
          </template>
          <template #status="{ row, index }">
            <i-switch v-model="row.status" true-value="是"
              @on-change="(value) => {switchChange(value, row)}" false-value="否" true-color="#13ce66" false-color="#ff4949">
              <span slot="open">上架</span>
              <span slot="close">下架</span>
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
import { datasetGet, cutoverLevelLimitDel, cutoverLevelLimitEnabled, cutoverLevelLimitDisabled } from '@/api/index';
import { Message } from "view-ui-plus";

  const columns = [
    {
      title: "序号",
      type: "index",
      align: 'center'
    },
    {
      title: "商品图片",
      key: "proPic",
      slot: "proPic",
      align: 'center'
    },
    {
      title: "商品名称",
      key: "data_name",
      align: 'center'
    },
    {
      title: "商品描述",
      key: "desc",
      align: 'center'
    },
    {
      title: "价格",
      key: "price",
      align: 'center'
    },
    {
      title: "商品状态",
      width: 100,
      key: "status",
      slot: "status",
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
    data_name: "",
  }
  const [ formRef, AppliForm, resetForm ] = useForm(form)
  const { userInfo } = useUserInfo();
  const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器
  const [detailInfo, setDetailInfo] = useState({})

  // 查询  表格数据
  const { datalist, setDatalist, loading, setLoading } = useTable()
  const query = () => {
    let params = `?page=${pages.current}&count=${pages.limit}&data_name${AppliForm.data_name}`
    // setDatalist([
    //   {
    //     proPic: require("@/assets/logo.png"),
    //     data_name: "数智校对（政府集约化平台插件）",
    //     desc: "数智校对（贵州省政府网站集约化平台）面向党政网站发稿中的书写错误，依据媒体，出版等领域规范和业务标准，利用自然语言理解、文本挖掘和机器学习等技术，对文本开展深度语义分析，实现文本书写中字词语法、政治类、禁用词、敏感词等错误的自动识别，并依据识别结果提出修正建议。该服务为各行业的写稿辅助、内容审阅等实际行业场景提供支撑，全面提升文稿的内容质量。",
    //     price: "12000.00",
    //     status: "是",
    //   }
    // ])
    setLoading(true)
    datasetGet(params).then(res => {
      setLoading(false);
      if(res.data.code === 200) {
        setDatalist(res.data.result.records);
        pages.total = res.data.result.total;
      }
    })
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
