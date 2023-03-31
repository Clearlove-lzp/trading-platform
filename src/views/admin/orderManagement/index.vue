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
            <Col span="6">
              <Input
                v-model="AppliForm.orderId"
                class="cdp-input"
                placeholder="订单编号"
              ></Input>
            </Col>
            <Col span="4" align="left">
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
      <Tabs value="全部订单" @on-click="tabChange">
        <TabPane :label="allLabel" name="全部订单"></TabPane>
        <TabPane :label="willSendOutLabel" name="待发货"></TabPane>
        <TabPane :label="hasSendOutLabel" name="已发货"></TabPane>
        <TabPane :label="drawbackLabel" name="退款中"></TabPane>
        <TabPane :label="hasDoneLabel" name="已完成"></TabPane>
      </Tabs>
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
          <template #proPic="{ row }">
            <img :src="row.proPic" alt="" style="width: 100%" />
          </template>
          <template #action="{ row }">
            <Button type="info" size="small" style="margin-right: 5px"
              >订单详情</Button
            >
            <Button type="primary" size="small" v-show="row.status === '待发货'"
              >发货</Button
            >
            <Button type="primary" size="small" v-show="row.status === '退款中'"
              >受理</Button
            >
          </template>
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
  useModal,
} from "@/hook/index.js";
// import { cutoverLevelLimitList, cutoverLevelLimitDel, cutoverLevelLimitEnabled, cutoverLevelLimitDisabled } from '@/api/index';
import { Message } from "view-ui-plus";
import { resolveComponent } from "vue";

const allLabel = (h) => {
  return h("div", [
    h("span", "全部订单"),
    h(resolveComponent("Badge"), {
      count: 3,
    }),
  ]);
};

const willSendOutLabel = (h) => {
  return h("div", [
    h("span", "待发货"),
    h(resolveComponent("Badge"), {
      count: 1,
    }),
  ]);
};

const hasSendOutLabel = (h) => {
  return h("div", [
    h("span", "已发货"),
    h(resolveComponent("Badge"), {
      count: 1,
    }),
  ]);
};

const drawbackLabel = (h) => {
  return h("div", [
    h("span", "退款中"),
    h(resolveComponent("Badge"), {
      count: 1,
    }),
  ]);
};

const hasDoneLabel = (h) => {
  return h("div", [
    h("span", "已完成"),
    h(resolveComponent("Badge"), {
      count: 1,
    }),
  ]);
};

const columns = [
  {
    title: "订单日期",
    key: "orderTime",
    align: "center",
  },
  {
    title: "订单编号",
    key: "orderId",
    align: "center",
  },
  {
    title: "商品图片",
    key: "proPic",
    slot: "proPic",
    align: "center",
  },
  {
    title: "单价",
    key: "price",
    align: "center",
  },
  {
    title: "数量",
    key: "count",
    align: "center",
  },
  {
    title: "实收款",
    key: "amount",
    align: "center",
  },
  {
    title: "买家",
    key: "buyer",
    align: "center",
  },
  {
    title: "操作",
    slot: "action",
    width: 160,
    align: "center",
  },
];

const form = {
  userName: "",
  roleId: "",
  createUserName: "",
};
const [formRef, AppliForm, resetForm] = useForm(form);
const { userInfo } = useUserInfo();
const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器
const [detailInfo, setDetailInfo] = useState({});

const getParams = () => {
  let params = {
    currentPage: pages.current,
    pageSize: pages.limit,
    orderId: AppliForm.orderId,
  };
  return params;
};

const AllData = [
  {
    orderTime: "2023-01-12 12:00:00",
    orderId: "order-20230112120000-001",
    proPic: require("@/assets/logo.png"),
    price: "80",
    count: "10",
    amount: "800",
    buyer: "t*****",
    status: "待发货",
  },
  {
    orderTime: "2023-01-12 12:00:00",
    orderId: "order-20230112120000-001",
    proPic: require("@/assets/logo.png"),
    price: "80",
    count: "10",
    amount: "800",
    buyer: "t*****",
    status: "已发货",
  },
  {
    orderTime: "2023-01-12 12:00:00",
    orderId: "order-20230112120000-001",
    proPic: require("@/assets/logo.png"),
    price: "80",
    count: "10",
    amount: "800",
    buyer: "t*****",
    status: "退款中",
  },
  {
    orderTime: "2023-01-12 12:00:00",
    orderId: "order-20230112120000-001",
    proPic: require("@/assets/logo.png"),
    price: "80",
    count: "10",
    amount: "800",
    buyer: "t*****",
    status: "已完成",
  },
];
// 查询  表格数据
const { datalist, setDatalist, loading, setLoading } = useTable();
const query = () => {
  let params = getParams();
  setDatalist(AllData);
  pages.total = datalist.value.length;
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
};

const tabChange = (name) => {
  if (name === "全部订单") {
    setDatalist(AllData);
  } else {
    setDatalist(
      AllData.filter((x) => {
        return x.status === name;
      })
    );
  }
  pages.total = datalist.value.length;
};
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
