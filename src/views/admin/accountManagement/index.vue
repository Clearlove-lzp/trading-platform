<!-- 用户管理 -->
<template>
  <div class="userManagement">
    <Card dis-hover>
      <!-- 查询表单 -->
      <div class="cdp-form">
        <Form
          ref="formRef"
          :model="AppliForm"
          label-position="right"
          :label-width="100"
        >
          <Row style="margin-bottom: 10px" :gutter="10">
            <Col span="8">
              <Input
                v-model="AppliForm.orderId"
                class="cdp-input"
                placeholder="订单编号"
              ></Input>
            </Col>
            <Col span="8" align="left">
              <Space direction="horizontal">
                <Button type="primary" @click="queryPageFunc(query)"
                  >查询</Button
                >
                <Button type="primary" @click="resetForm()">重置</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <!-- 表格数据 -->
      <div class="cdp-table">
        <i-table
          border
          :loading="loading"
          size="small"
          stripe
          :columns="columns"
          :data="datalist"
        >
        </i-table>
        <div class="cdp-page">
          <Page
            @on-change="
              (value) => {
                queryCurrentFunc(value, query);
              }
            "
            :total="pages.total"
            :page-size="pages.limit"
            :page-size-opts="[10, 20, 50]"
            @on-page-size-change="
              (value) => {
                queryLimitFunc(value, query);
              }
            "
            :current="pages.current"
            placement="top"
            show-total
            show-sizer
            show-elevator
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import {
  usePage,
  useTable,
  useForm,
  useUserInfo,
  useEffect,
  useState,
} from "@/hook/index.js";
// import { cutoverLevelLimitList, cutoverLevelLimitDel, cutoverLevelLimitEnabled, cutoverLevelLimitDisabled } from '@/api/index';
import { Message } from "view-ui-plus";

const columns = [
  {
    title: "时间",
    key: "time",
    align: "center",
  },
  {
    title: "原因",
    key: "reason",
    align: "center",
  },
  {
    title: "金额/币种",
    key: "amount",
    align: "center",
  },
  {
    title: "来源账户",
    key: "accountFrom",
    align: "center",
  },
  {
    title: "去向账户",
    key: "amountTo",
    align: "center",
  },
  {
    title: "创建时间",
    key: "createTime",
    align: "center",
  },
  {
    title: "业务描述",
    key: "desc",
    align: "center",
  },
  {
    title: "订单编号",
    key: "orderId",
    width: 130,
    align: "center",
  },
];

const form = {
  orderId: "",
};
const [formRef, AppliForm, resetForm] = useForm(form);
const { userInfo } = useUserInfo();
const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器

const getParams = () => {
  let params = {
    currentPage: pages.current,
    pageSize: pages.limit,
    orderId: AppliForm.orderId,
  };
  return params;
};

// 查询  表格数据
const { datalist, setDatalist, loading, setLoading } = useTable();
const query = () => {
  let params = getParams();
  setDatalist([
    {
      time: "2022.09.16",
      orderId: "2209162215364527",
      reason: "数据商品交易",
      amount: "人民币",
      createTime: "2023-03-22 12:00:00",
      accountFrom: "sj1689254848",
      amountTo: "cn33674595978",
      desc: "人脸识别数据",
    },
  ]);
  // setLoading(true)
  // cutoverLevelLimitList(params).then(res => {
  //   setLoading(false);
  //   if(res.data.code === 200) {
  //     setDatalist(res.data.result.records);
  //     pages.total = res.data.result.total;
  //   }
  // })
};

useEffect(query, []);
</script>

<style scoped>
.cdp-page {
  padding-top: 10px;
  text-align: right;
}

.userManagement {
  width: 100%;
  margin-top: 10px;
}

.cdp-input {
  width: 100%;
}
</style>
