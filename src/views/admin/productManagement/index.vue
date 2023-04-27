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
                v-model="AppliForm.data_name"
                class="cdp-input"
                placeholder="商品名称"
                clearable
              ></Input>
            </Col>
            <Col span="4" align="left">
              <Space direction="horizontal">
                <Button type="primary" @click="queryPageFunc(query)"
                  >查询</Button
                >
                <Button type="primary" @click="resetForm()">重置</Button>
                <Button type="success" @click="addFunc({})">新增</Button>
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
          <template #data_pic_path="{ row }">
            <img v-lazy="row.data_pic_path" alt="" style="width: 100%" />
          </template>
          <template #data_status="{ row }">
            <i-switch
              v-model="row.data_status"
              :true-value="true"
              @on-change="
                (value) => {
                  switchChange(value, row);
                }
              "
              :false-value="false"
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
  datasetGet,
  datasetDelete,
  datasetUpdate,
  datasetGetDetail,
} from "@/api/index";
import { Message } from "view-ui-plus";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";

const columns = [
  {
    title: "序号",
    type: "index",
    align: "center",
    width: 80,
  },
  {
    title: "商品图片",
    key: "data_pic_path",
    slot: "data_pic_path",
    align: "center",
    width: 150,
  },
  {
    title: "商品名称",
    key: "data_name",
    align: "center",
  },
  {
    title: "商品描述",
    key: "data_intro",
    align: "center",
  },
  {
    title: "价格",
    key: "data_per_price",
    align: "center",
  },
  {
    title: "是否上架",
    width: 100,
    key: "data_status",
    slot: "data_status",
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
  data_name: "",
};
const [formRef, AppliForm, resetForm] = useForm(form);
const { userInfo } = useUserInfo();
const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器
const [detailInfo, setDetailInfo] = useState({});

// 查询  表格数据
const { datalist, setDatalist, loading, setLoading } = useTable();
const query = () => {
  let params = `?page=${pages.current}&count=${pages.limit}&data_name=${AppliForm.data_name}`;
  setLoading(true);
  datasetGet(params).then((res) => {
    setLoading(false);
    if (res.data.code === 1) {
      let arr = res.data.data.data.map((x) => {
        x.data_pic_path = agencyStr + "/file" + x.data_pic;
        return x;
      });
      setDatalist(arr);
      pages.total = res.data.data.page.total_count;
    }
  });
};

useEffect(query, []);

// 新增/编辑 模态框
const [addFormShow, openAddModal, closeAddModal] = useModal();
const addFunc = (info) => {
  setDetailInfo(info);
  openAddModal();
};

// 删除
const deleteFunc = (info) => {
  let params = {
    data_id: info.data_id,
  };
  datasetDelete(params).then((res) => {
    if (res.data.code === 1) {
      Message.success(res.data.msg);
      queryPageFunc(query);
    } else {
      Message.error(res.data.msg);
    }
  });
};

const switchChange = async (value, row) => {
  let result = {};
  let detailparams = `?data_id=${row.data_id}`;
  const res = await datasetGetDetail(detailparams);
  if (res.data.code === 1) result = res.data.data;
  let updateParams = {
    data_name: result.data_name,
    data_intro: result.data_intro,
    data_use: result.data_use,
    data_type: result.data_type,
    data_field: result.data_field,
    image_format: result.image_format,
    text_language: result.text_language,
    text_avg_len: result.text_avg_len,
    attr_num: result.attr_num,
    quality: result.quality,
    data_per_price: result.data_per_price,
    data_status: row.data_status,
    data_id: result.data_id,
    data_pic: result.data_pic,
  };
  datasetUpdate(updateParams).then(
    (res1) => {
      query();
      if (res1.data.code === 1) {
        Message.success(res1.data.msg);
      } else {
        Message.error(res1.data.msg);
      }
    },
    (err) => {
      query();
    }
  );
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
