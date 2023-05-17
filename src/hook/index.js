import {
  ref,
  reactive,
  onMounted,
  computed,
  getCurrentInstance,
  watch,
  onUpdated,
  onBeforeUnmount,
} from "vue";
import _ from "lodash";
import * as echarts from "echarts";
import { Message } from "view-ui-plus";

// 使用es6解构，可任意设置变量
export const useState = (value) => {
  // 模拟react hook useState
  const state = typeof value === "function" ? ref(value()) : ref(value);
  const setState = (newValue) => {
    state.value = newValue;
  };
  return [state, setState];
};

export const useEffect = (callback, array) => {
  // 模拟react hook useEffect
  let func;
  onMounted(() => {
    func = callback();
  });
  onUpdated(() => {
    if (!array) {
      // 不传array,只要更新就触发
      func = callback();
    }
  });
  onBeforeUnmount(() => {
    if (typeof func === "function") {
      // return函数得情况下 消除effect
      func();
    }
  });
  array &&
    watch(array, (newValue, oldValue) => {
      // array传值监听
      func = callback();
    });
};

export const useLoading = () => {
  // loading状态
  const loading = ref(false);
  const showLoading = () => {
    loading.value = true;
  };
  const closeLoading = () => {
    loading.value = false;
  };
  return {
    loading,
    showLoading,
    closeLoading,
  };
};

export const useModal = () => {
  // 模态框开关
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  return [visible, openModal, closeModal];
};

export const usePage = () => {
  // 分页
  const pages = reactive({
    current: 1,
    limit: 10,
    total: 0,
  });
  const queryPageFunc = (callback) => {
    pages.current = 1;
    callback && callback();
  };
  const queryCurrentFunc = (value, callback) => {
    pages.current = value;
    callback && callback();
  };
  const queryLimitFunc = (value, callback) => {
    pages.current = 1;
    pages.limit = value;
    callback && callback();
  };
  return {
    pages,
    queryPageFunc,
    queryCurrentFunc,
    queryLimitFunc,
  };
};

export const useForm = (form) => {
  let base = form ? form : {};
  const AppliForm = reactive(_.cloneDeep(base));

  const formRef = ref(null);

  const resetForm = (validCheck) => {
    if (validCheck) {
      formRef.value.resetFields();
    } else {
      Object.keys(AppliForm).map((x) => {
        AppliForm[x] = base[x];
      });
    }
  };

  const validateForm = () => {
    return new Promise((resolve) => {
      formRef.value.validate((valid) => {
        resolve(valid);
      });
    });
  };

  const validateFieldForm = (prop) => {
    return new Promise((resolve) => {
      formRef.value.validateField(prop, (errorInfo) => {
        resolve(errorInfo);
      });
    });
  };

  return [formRef, AppliForm, resetForm, validateForm, validateFieldForm];
};

import { agencyStr } from "@/axiosConfig/enviromentConfig.js";
export const useUpload = (url) => {
  // 上传控件
  const uploadRef = ref(null);
  const uploadAction = url;
  const [defaultList, setDefaultlist] = useState([]);
  const showUploadBtn = ref(true);
  const hideUploadBtn = () => {
    showUploadBtn.value = false;
  };
  const visibleUploadBtn = () => {
    showUploadBtn.value = true;
  };
  const handleSucFunc = (res, file, fileList) => {
    const getFile = JSON.parse(JSON.stringify(file));
    const getFileList = JSON.parse(JSON.stringify(fileList));
    // 上传成功
    if (res.code === 1) {
      defaultList.value.push({
        name: getFile.name,
        url: agencyStr + "/file" + res.data.path,
        filePath: res.data.path,
      });
      Message.success(res.msg);
    } else {
      defaultList.value = getFileList.filter((x) => {
        return x.uid !== getFile.uid;
      });
      Message.error(res.msg);
    }
  };
  const handleErrFunc = (error, file, fileList) => {
    // 上传失败
    Message.error("上传失败");
  };
  const handleRemove = (file, fileList) => {
    const getFileList = JSON.parse(JSON.stringify(fileList));
    // 移除
    defaultList.value = getFileList;
  };
  const handleFormatError = (file, fileList) => {
    // 格式验证错误
    uploadRef.value &&
      Message.warning(
        `仅可上传格式为${uploadRef.value.format.join("、")}的文件`
      );
  };
  const handleMaxSize = (file, fileList) => {
    // 超出文件限制大小
    uploadRef.value &&
      Message.warning(`文件大小不可以超过${uploadRef.value.maxSize / 1024}M`);
  };
  const clearFiles = () => {
    // 清除文件
    uploadRef.value.clearFiles();
  };
  return [
    uploadRef,
    uploadAction,
    defaultList,
    setDefaultlist,
    showUploadBtn,
    hideUploadBtn,
    visibleUploadBtn,
    handleSucFunc,
    handleErrFunc,
    handleRemove,
    handleFormatError,
    handleMaxSize,
    clearFiles,
  ];
};

export const useTable = (key) => {
  // 表格
  const [loading, setLoading] = useState(false);
  const [datalist, setDatalist] = useState([]);
  // 多选
  const [selectionlist, setSelectionlist] = useState([]); // 选择的数据
  const onSelect = (selection, row) => {
    // 选中某一项
    selectionlist.value.push(row);
  };
  const onSelectCancel = (selection, row) => {
    // 取消选中某一项
    selectionlist.value = selectionlist.value.filter((x) => {
      return x[key] !== row[key];
    });
  };
  const onSelectAll = (selection) => {
    // 选中当前页所有项
    selection.map((x) => {
      let idx = selectionlist.value.findIndex((y) => {
        return x[key] === y[key];
      });
      if (idx < 0) {
        selectionlist.value.push(x);
      }
    });
  };
  const onSelectAllCancel = (selection) => {
    // 取消选中当前页所有项
    datalist.value.map((x) => {
      let idx = selectionlist.value.findIndex((y) => {
        return x[key] === y[key];
      });
      if (idx > -1) {
        selectionlist.value.splice(idx, 1);
      }
    });
  };
  const onSelectionChange = (selection) => {
    // 选中项发生变化时
    setSelectionlist(selection);
  };
  const selectDefault = () => {
    // 默认选中部分
    datalist.value.map((x, i) => {
      let idx = selectionlist.value.findIndex((y) => {
        return x[key] === y[key];
      });
      if (idx > -1) {
        datalist.value[i]._checked = true;
      } else {
        datalist.value[i]._checked = false;
      }
    });
  };
  const selectDisabled = () => {
    // 默认禁用
    datalist.value.map((x, i) => {
      let idx = selectionlist.value.findIndex((y) => {
        return x[key] === y[key];
      });
      if (idx > -1) {
        datalist.value[i]._disabled = true;
      } else {
        datalist.value[i]._disabled = false;
      }
    });
  };
  return {
    datalist,
    setDatalist,
    loading,
    setLoading,
    selectionlist,
    setSelectionlist,
    onSelect,
    onSelectCancel,
    onSelectAll,
    onSelectAllCancel,
    onSelectionChange,
    selectDefault,
    selectDisabled,
  };
};

export const useTablePaste = (value) => {
  const [modelValue, setModelVule] = useState(value);
  const [inputProps, setInputPros] = useState({
    rows: 4,
    placeholder: "尝试从网页、Excel 或其它软件复制一段表格数据，粘贴在这里",
  });
  const [tableProps, setTablePros] = useState({});
  const [tableDatas, setTableDatas] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  const handleSuccess = (tableData) => {
    if (tableData.data || tableData.columns != []) {
      setTableColumns(
        tableData.columns.map((x) => {
          x["width"] = 200;
          x["ellipsis"] = true;
          x["resizable"] = true;
          return x;
        })
      );
      setTableDatas(tableData.data);
    }
  };
  const handleError = (tableData, errorIndex) => {
    console.log(tableData, errorIndex);
  };
  return [
    modelValue,
    setModelVule,
    inputProps,
    setInputPros,
    tableProps,
    setTablePros,
    tableDatas,
    setTableDatas,
    tableColumns,
    setTableColumns,
    handleSuccess,
    handleError,
  ];
};

//标签与音频播放联合
export const userPlayListAudio = () => {
  const [audioList, setAudioList] = useState([
    // 'https://ea-sycdn.kuwo.cn/17f594cdaf5f405649e551eba31f0ed9/645f0d7e/resource/n2/26/44/830758683.mp3',
    // 'https://nc01-sycdn.kuwo.cn/127bb0f1793eec70ddceb5fbcb443a28/645f064c/resource/n3/93/0/3048220642.mp3',
    // 'https://ea-sycdn.kuwo.cn/9c976ee3809e07ca99ffc0037cb85186/645f0d94/resource/n3/56/75/326371242.mp3',
    // 'https://nc01-sycdn.kuwo.cn/68992f909b72830d234d7ad6de81c8d4/645f0dc0/resource/n3/19/58/362172331.mp3',
    // 'https://other-web-ra01-sycdn.kuwo.cn/0f6aef95b40298b558c7e64517670825/645f0dd5/resource/n2/128/10/88/3432878407.mp3',
  ]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  const handlePlay = (audioPlayer) => {
    let index = audioPlayer.currentPlayIndex;
    setCurrentAudioIndex(index);
  };
  const handlePlayPrev = (audioPlayer) => {
    let index = audioPlayer.currentPlayIndex;
    setCurrentAudioIndex(index);
  };
  const handlePlayNext = (audioPlayer) => {
    let index = audioPlayer.currentPlayIndex;
    setCurrentAudioIndex(index);
  };
  const handleTagClose = (index) => {
    audioList.value.splice(index, 1);
    console.log(audioList);
  };
  const handleTagClick = (index, audioPlayer) => {
    setCurrentAudioIndex(index);
    if (!audioPlayer.isPlaying) {
      audioPlayer.play();
    }

    while (audioPlayer.currentPlayIndex != index) {
      console.log(audioPlayer.currentPlayIndex, index);
      if (audioPlayer.currentPlayIndex < index) {
        audioPlayer.playNext();
      }
      if (audioPlayer.currentPlayIndex > index) {
        audioPlayer.playPrev();
      }
    }
  };

  // http://localhost:8081/#/admin/productManagement
  return [
    audioList,
    setAudioList,
    currentAudioIndex,
    setCurrentAudioIndex,
    handlePlay,
    handlePlayPrev,
    handlePlayNext,
    handleTagClose,
    handleTagClick,
  ];
};

export const useEcharts = () => {
  // echarts
  const echartRef = ref(null);
  const [datalist, setDatalist] = useState([]);
  const [option, setOption] = useState({});
  const myChart = ref(null);

  const clearChart = () => {
    myChart.value.clear();
  };

  const initChart = () => {
    myChart.value && clearChart();
    myChart.value = echarts.init(echartRef.value);
    myChart.value.setOption(option.value);
  };

  const resizeChart = () => {
    myChart.value && myChart.value.resize();
  };

  onMounted(() => {
    window.addEventListener("resize", resizeChart, true);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeChart, true);
  });

  return [
    echartRef,
    datalist,
    setDatalist,
    myChart,
    option,
    setOption,
    initChart,
    clearChart,
    resizeChart,
  ];
};

export const useVuex = () => {
  // vuex
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("必须在setup()方法里使用!!");
  }
  const store = vm.proxy.$store;

  const useVuexState = (key, namespaced) => {
    if (namespaced) {
      return computed(() => store.state[namespaced][key]);
    }
    return computed(() => store.state[key]);
  };

  const useMutations = (key, ...data) => {
    store.commit(key, ...data);
  };

  const useActions = (mutation, ...data) => {
    store.dispatch(mutation, ...data);
  };

  return {
    useVuexState,
    useMutations,
    useActions,
  };
};

class BusEvent {
  constructor() {
    // 收集订阅信息,调度中心
    this.list = {};
  }

  // 订阅
  $on(name, fn) {
    this.list[name] = this.list[name] || [];
    this.list[name].push(fn);
  }

  // 发布
  $emit(name, data) {
    if (this.list[name]) {
      this.list[name].forEach((fn) => {
        fn(data);
      });
    }
  }

  // 取消订阅
  $off(name) {
    if (this.list[name]) {
      delete this.list[name];
    }
  }
}
const Bus = new BusEvent();

export const useBus = (name, fn) => {
  // bus传值
  onMounted(() => {
    Bus.$on(name, fn);
  });
  onBeforeUnmount(() => {
    Bus.$off(name);
  });
  return {
    Bus,
  };
};

export const useRouter = () => {
  // 获取router
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("必须在setup()方法里使用!!");
  }
  const router = vm.proxy.$router;
  return {
    router,
  };
};

export const useRoute = () => {
  // 获取 route
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("必须在setup()方法里使用!!");
  }
  const route = vm.proxy.$route;
  const routeQuery = route.query;
  const routeParams = route.params;
  const routeMeta = route.meta;
  return {
    route,
    routeQuery,
    routeParams,
    routeMeta,
  };
};

export const useRefs = () => {
  // 获取refs
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("必须在setup()方法里使用!!");
  }
  const refs = vm.proxy.$refs;
  return {
    refs,
  };
};

export const useViewer = () => {
  // 获取viewerApi
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("必须在setup()方法里使用!!");
  }
  const viewerApi = vm.proxy.$viewerApi;
  return {
    viewerApi,
  };
};

export const useUserInfo = () => {
  const { useVuexState } = useVuex();
  const userInfo = useVuexState("userInfo", "user");
  // 用户基本信息
  return {
    userInfo,
  };
};
