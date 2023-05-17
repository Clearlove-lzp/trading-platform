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
          <template #action="{ row }">
            <!-- <Button
              type="warning"
              size="small"
              style="margin-right: 5px"
              @click="addFunc(row)"
              >编辑</Button
            > -->
            <Poptip
              confirm
              transfer
              title="您确定要删除这条数据吗?"
              placement="top-end"
              @on-ok="deleteFunc(row)"
            >
              <Button type="error" size="small">删除</Button>
            </Poptip>
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
} from "@/hook/index.js";
import { getAllBusiness, deleteOrder } from "@/api/index";
import {flattenObject} from "@/libs/util"
import { Message } from "view-ui-plus";

const columns = [
  {
    title: "订单编号",
    key: "id",
    align: "center",
  },
  {
    title: "买方",
    key: "username",
    align: "center",
  },
  {
    title: "卖方",
    key: "seller_name",
    align: "center",
  },
  {
    title: "交易内容",
    key: "data_name",
    align: "center",
  },
  {
    title: "交易金额",
    key: "order_pay",
    align: "center",
  },
  {
    title: "创建时间",
    key: "order_buy_time",
    align: "center",
  },
  {
    title: "完成时间",
    key: "order_finish_time",
    align: "center",
  },
  {
    title: "交易状态",
    width: 100,
    key: "order_status",
    // slot: "status",
    align: "center",
  },
  {
    title: "操作",
    slot: "action",
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
const [detailInfo, setDetailInfo] = useState({});

// 查询  表格数据
const { datalist, setDatalist, loading, setLoading } = useTable();
const query = () => {
  let params = `?page=${pages.current}&count=${pages.limit}&id=${AppliForm.orderId}`;
  setLoading(true);
  getAllBusiness(params).then((res) => {
    setLoading(false);
    if (res.data.code === 1) {
      setDatalist(flattenObject(res.data.data.data));
      pages.total = res.data.data.page.total_count;
    }
  });
};

useEffect(query, []);

// 删除
const deleteFunc = (info) => {
  let params = `?order_id=${info.order_id}`;
  deleteOrder(params).then((res) => {
    if (res.data.code === 1) {
      Message.success(res.data.msg);
      queryPageFunc(query);
    } else {
      Message.error(res.data.msg);
    }
  });
};

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
