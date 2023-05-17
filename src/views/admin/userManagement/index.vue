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
            <Col span="4">
              <Input
                v-model="AppliForm.userName"
                class="cdp-input"
                placeholder="用户名"
              ></Input>
            </Col>
            <Col span="4">
              <Input
                v-model="AppliForm.neakName"
                class="cdp-input"
                placeholder="昵称"
              ></Input>
            </Col>
            <Col span="4">
              <Input
                v-model="AppliForm.phone"
                class="cdp-input"
                placeholder="手机号"
              ></Input>
            </Col>
            <Col span="4">
              <DatePicker
                class="cdp-input"
                type="daterange"
                v-model="AppliForm.time"
                placeholder="创建时间"
                format="yyyy-MM-dd"
              ></DatePicker>
            </Col>
            <Col span="4">
              <Input
                v-model="AppliForm.createUserName"
                class="cdp-input"
                placeholder="创建人"
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
      <Tabs v-model="AppliForm.role" @on-click="queryPageFunc(query)">
        <TabPane label="管理员" name="admin"></TabPane>
        <TabPane label="卖家" name="seller"></TabPane>
        <TabPane label="买家" name="user"></TabPane>
      </Tabs>
      <!-- 表格数据 -->
      <div class="cdp-table">
        <i-table
          border
          :loading="loading"
          size="small"
          stripe
          :columns="
            AppliForm.role === 'admin'
              ? adminColumns
              : AppliForm.role === 'seller'
              ? sellerColumns
              : userColumns
          "
          :data="datalist"
        >
          <template #status="{ row }">
            <i-switch
              v-model="row.status"
              true-value="是"
              @on-change="
                (value) => {
                  switchChange(value, row);
                }
              "
              false-value="否"
              true-color="#13ce66"
              false-color="#ff4949"
            >
              <template #open>
                <span>是</span>
              </template>
              <template #close>
                <span>否</span>
              </template>
            </i-switch>
          </template>
          <template #action="{ row }">
            <Button
              type="warning"
              size="small"
              style="margin-right: 5px"
              @click="addFunc(row)"
              >编辑</Button
            >
            <Poptip
              confirm
              transfer
              title="您确定要删除这条数据吗?"
              placement="top-end"
              @on-ok="deleteFunc(row)"
            >
              <Button type="error" v-show="row.role !== 'admin'" size="small"
                >删除</Button
              >
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
    <addForm
      :detailInfo="detailInfo"
      :visible="addFormShow"
      @closeModal="closeAddModal"
      @updateList="query"
    ></addForm>
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
import addForm from "./addForm.vue";
import {
  adminSelectAll,
  adminUserDelete,
  cutoverLevelLimitEnabled,
  cutoverLevelLimitDisabled,
} from "@/api/index";
import { Message } from "view-ui-plus";

const adminColumns = [
  {
    title: "账号",
    key: "admin_name",
    align: "center",
  },
  {
    title: "昵称",
    key: "admin_name",
    align: "center",
  },
];

const sellerColumns = [
  {
    title: "账号",
    key: "seller_account",
    align: "center",
  },
  {
    title: "店铺名",
    key: "seller_name",
    align: "center",
  },
  {
    title: "手机号",
    key: "seller_tel",
    align: "center",
  },
  {
    title: "邮箱",
    key: "seller_email",
    align: "center",
  },
  {
    title: "操作",
    slot: "action",
    width: 130,
    align: "center",
  },
];

const userColumns = [
  {
    title: "账号",
    key: "username",
    align: "center",
  },
  {
    title: "昵称",
    key: "name",
    align: "center",
  },
  {
    title: "手机号",
    key: "phone",
    align: "center",
  },
  {
    title: "邮箱",
    key: "email",
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
  userName: "",
  neakName: "",
  phone: "",
  createUserName: "",
  role: "admin",
};
const [formRef, AppliForm, resetForm] = useForm(form);
const { userInfo } = useUserInfo();
const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器
const [detailInfo, setDetailInfo] = useState({});

// 查询  表格数据
const { datalist, setDatalist, loading, setLoading } = useTable();
const query = () => {
  let params = `?page=${pages.current}&count=${pages.limit}&role=${AppliForm.role}&username=${AppliForm.userName}&name=${AppliForm.neakName}&phone=${AppliForm.phone}`;
  setLoading(true);
  adminSelectAll(params).then((res) => {
    setLoading(false);
    if (res.data.code === 1) {
      setDatalist(res.data.data.data);
      pages.total = res.data.data.page.total_count;
    }
  });
};

useEffect(query, []);

// 新增/编辑 模态框
const [addFormShow, openAddModal, closeAddModal] = useModal();
const addFunc = (info) => {
  setDetailInfo({ ...info, role: AppliForm.role });
  openAddModal();
};

// 删除
const deleteFunc = (info) => {
  let params = "";
  if (AppliForm.role === "seller") {
    params = `?username=${info.seller_account}&user_role=seller`;
  } else {
    params = `?username=${info.username}&user_role=user`;
  }

  adminUserDelete(params).then((res) => {
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
