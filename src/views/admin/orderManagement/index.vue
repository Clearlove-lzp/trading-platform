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
                <Button type="primary" @click="queryPageFunc(refresh)"
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
        <TabPane :label="willpay" name="待付款"></TabPane>
        <TabPane :label="willSendOutLabel" name="待发货"></TabPane>
        <TabPane :label="hasSendOutLabel" name="已发货"></TabPane>
        <TabPane :label="drawbackLabel" name="退款中"></TabPane>
        <TabPane :label="hasReturn" name="已退款"></TabPane>
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
            <img :src="row.data_pic" alt="商品图片" style="width: 80%" />
          </template>
          <template #action="{ row }">
            <Button type="info" size="small" style="margin-right: 5px"
              >订单详情</Button
            >
            <Button @click="sendGoods(row.order_id)" type="primary" size="small" v-show="row.order_status === '待发货'"
              >发货</Button
            >
            <Button @click="returnPay(row.order_id)" type="primary" size="small" v-show="row.order_status === '退款中'"
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
import {
  orderManagementSelectById,
  orderManagementSelectByCondition,
  orderManagementSendGoods,
  orderManagementReturn,
  orderManagementSelectById2,
  cutoverLevelLimitDel,
  cutoverLevelLimitEnabled,
  cutoverLevelLimitDisabled,
} from "@/api/index";
import {flattenObject} from "@/libs/util";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";
import { Message } from "view-ui-plus";
import { resolveComponent } from "vue";


const allLabel = (h) => {
  return h("div", [
    h("span", "全部订单"),
    // h(resolveComponent("Badge"), {
    //   count: 3,
    // }),
  ]);
};

const willpay = (h) => {
  return h("div", [
    h("span", "待付款"),
    // h(resolveComponent("Badge"), {
    //   count: 3,
    // }),
  ]);
};

const willSendOutLabel = (h) => {
  return h("div", [
    h("span", "待发货"),
    // h(resolveComponent("Badge"), {
    //   count: 1,
    // }),
  ]);
};

const hasSendOutLabel = (h) => {
  return h("div", [
    h("span", "已发货"),
    // h(resolveComponent("Badge"), {
    //   count: 1,
    // }),
  ]);
};

const drawbackLabel = (h) => {
  return h("div", [
    h("span", "退款中"),
    // h(resolveComponent("Badge"), {
    //   count: 1,
    // }),
  ]);
};

const hasReturn = (h) => {
  return h("div", [
    h("span", "已退款"),
    // h(resolveComponent("Badge"), {
    //   count: 1,
    // }),
  ]);
};

const hasDoneLabel = (h) => {
  return h("div", [
    h("span", "已完成"),
    // h(resolveComponent("Badge"), {
    //   count: 1,
    // }),
  ]);
};

const columns = [
  {
    title: "订单日期",
    key: "order_buy_time",
    align: "center",
  },
  {
    title: "订单编号",
    key: "id",
    align: "center",
  },
  {
    title: "商品图片",
    key: "data_pic",
    slot: "proPic",
    align: "center",
  },
  {
    title: "单价",
    key: "data_per_price",
    align: "center",
  },
  {
    title: "数量",
    key: "order_buy_num",
    align: "center",
  },
  {
    title: "实收款",
    key: "order_pay",
    align: "center",
  },
  {
    title: "买家",
    key: "username",
    align: "center",
  },
  {
    title: "状态",
    key: "order_status",
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
  orderId: ''
};
const [formRef, AppliForm, resetForm] = useForm(form);
const { userInfo } = useUserInfo();
const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器
const [detailInfo, setDetailInfo] = useState({});

// 查询  表格数据
const { datalist, setDatalist, loading, setLoading } = useTable();

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

const queryAll = () => {
  let params = `?page=${pages.current}&count=${pages.limit}`;
  setLoading(true);
  orderManagementSelectById(params).then((res) => {
    setLoading(false);
    if (res.data.code === 1) {
      let arr = res.data.data.order.map((x) => {
        x.data.data_pic = agencyStr + "/file" + x.data.data_pic;
        return x;
      });
      setDatalist(flattenObject(arr));
      pages.total = res.data.data.page.total_count;
    }
  });
};

const queryStatus = (name) => {
  if (name === "全部订单"){
    name = '';
  }
  let params = `?page=${pages.current}&count=${pages.limit}&order_status=${name}&ID=${AppliForm.orderId}`;
  setLoading(true);
  orderManagementSelectByCondition(params).then((res) => {
    setLoading(false);
    if (res.data.code === 1) {
      let arr = res.data.data.order.map((x) => {
        x.data.data_pic = agencyStr + "/file" + x.data.data_pic;
        return x;
      });
      setDatalist(flattenObject(arr));
      pages.total = res.data.data.page.total_count;
    }
  });
};

const [tabname, setTablename] = useState("全部订单");
//刷新数据
const refresh = () => {
  // if (tabname.value === "全部订单") {
  //   queryAll();
  // } else {
  //   queryStatus(tabname.value);
  // }
  queryStatus(tabname.value);
};

const tabChange = (name) => {
  pages.current = 1;
  if (name) setTablename(name);
  refresh();
};

useEffect(() => {
  tabChange();
}, []);


//发货
const sendGoods = (order_id)=> {
  let params = `?order_id=${order_id}`;
  setLoading(true);
  orderManagementSendGoods(params).then((res) => {
    setLoading(false);
    if (res.data.code === 1) {
      Message.success(res.data.msg);
      refresh();
    }else{
      Message.error(res.data.msg);
    }
  })
}

//退款
const returnPay = (order_id)=> {
  let params = `?order_id=${order_id}`;
  setLoading(true);
  orderManagementReturn(params).then((res) => {
    setLoading(false);
    if (res.data.code === 1) {
      Message.success(res.data.msg);
      refresh();
    }else{
      Message.error(res.data.msg);
    }
  })
}

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
