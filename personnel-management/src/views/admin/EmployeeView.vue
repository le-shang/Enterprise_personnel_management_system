<script setup>
import { ref, unref, reactive, onMounted, computed } from 'vue';
import { getEmployee, editEmployee, deleteEmployee, addEmployee } from '../../request/api';
import { useEmployeeStore } from '../../stores/employee';
import { Table } from 'ant-design-vue'

const store = useEmployeeStore()

onMounted(() => {
  if (!store.employeeInfo) {
    getEmployee().then((res) => {
      store.employeeInfo = res.employeeInfo
    })
  }
})
// 编辑单元格
const isEdit = reactive({}) // 选中哪一个要编辑的元素
const EditData = reactive({}) // 存放编辑的数据

const edit = (record, column) => {
  isEdit.attribute = column.dataIndex
  isEdit.ID = record.ID
  EditData.value = record[column.dataIndex]
}
const save = (record, column) => {
  // 如果数值发生变化，才需要修改
  if (EditData.value !== record[column.dataIndex]) {
    // 上传数据到后台
    editEmployee({
      ID: isEdit.ID,
      attribute: isEdit.attribute,
      value: EditData.value
    }).then((res) => {
      console.log(res);
      if (res.message === 'success') {
        // 改变本地数据
        store.employeeInfo.map((item) => {
          if (item.ID === isEdit.ID) {
            item[isEdit.attribute] = EditData.value
          }
        })
        console.log(record);
        record[column.dataIndex] = EditData.value
      }
    })
  }
  delete isEdit.attribute
  delete isEdit.ID
}
const close = () => {
  delete isEdit.attribute
  delete isEdit.ID
}
// 多选功能配置
const selectedRowKeys = ref([])
const onSelectChange = changableRowKeys => {
  selectedRowKeys.value = changableRowKeys;
};
const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  }
})
// 删除数组元素
var deleteArray = function (source, target) {
  var newArray = [];
  for (let i = 0; i < source.length; i++) {
    if (source[i].ID !== target) {
      newArray.push(source[i]);
    }
  }
  return newArray;
}
const deleteKey = () => {
  deleteEmployee(selectedRowKeys).then((res) => {
    if (res.success) {
      if (selectedRowKeys.value !== store.employeeInfo.length) {
        for (let i = 0; i < selectedRowKeys.value.length; i++) {
          store.employeeInfo = deleteArray(store.employeeInfo, selectedRowKeys.value[i])
        }
      } else {
        store.employeeInfo = []
        console.log(store.employeeInfo);
      }
    }
    selectedRowKeys.value = []
  })
}
// 自定义筛选(搜索)功能
const searchInput = ref();
const searchText = ref('')
const searchedColumn = ref('')
const search = (selectedKeys, confirm, dataIndex) => {
  confirm();
  searchText.value = selectedKeys[0];
  searchedColumn.value = dataIndex;
}
const Reset = clearFilters => {
  clearFilters({
    confirm: true,
  });
  searchText.value = ''
};
// 添加用户
const addData = reactive({})
const addFormVisible = ref(false);
const confirmLoading = ref(false);
const handleOk = () => { }
const showModal = () => {
  addFormVisible.value = true;
};
const closeModal = () => {
  addFormVisible.value = false;
}
const onFinish = values => {
  for (let i in values) {
    if (!values[i]) {
      if (i === 'age') {
        values[i] = 18
      }
      else {
        values = ''
      }
    }
  }
  confirmLoading.value = true;
  addEmployee(values).then(res => {
    console.log(res);
    addFormVisible.value = false;
    confirmLoading.value = false;
  })
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const validateAge = (rule, value) => {
  if (value <= 0) {
    return Promise.reject("不能小于1")
  }
  return Promise.resolve()
}
// 可伸缩列
const handleResizeColumn = (w, col) => {
  col.width = w;
}
// 展示表头顺序
const columnVisible = ref(false)
const columnsSequenceForm = reactive([])
const columnsSequence = reactive([
  {
    title: "姓名",
    dataIndex: 'name',
    customFilterDropdown: true,
    onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: addFormVisible => {
      if (addFormVisible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    fixed: 'left',
    width: 150,
    resizable: true,  // 可伸缩列
  },
  {
    title: "性别",
    dataIndex: "sex",
    filters: [
      { text: '男', value: '男' },
      { text: '女', value: '女' }
    ],
    onFilter: (value, record) => record.sex.indexOf(value) === 0,
    width: 150,
    resizable: true,
  },
  {
    title: "年龄",
    dataIndex: "age",
    sorter: {
      compare: (a, b) => a.age - b.age
    },
    width: 150,
    resizable: true,
  },
  {
    title: "身份证",
    dataIndex: 'ID',
    ellipsis: true,  // 自动省略
    width: 350,
    resizable: true,
  }
])
const addColumns = (data) => {
  console.log('data', data);
  if (data.length < 3) {
    data.unshift(columnsSequenceForm.length + 1)
    console.log('成立', data);
    columnsSequenceForm.push(data)
    console.log(columnsSequenceForm);
  }
}
// 自定义表头
const columns = reactive([
  {
    title: "姓名",
    dataIndex: 'name',
    customFilterDropdown: true,
    onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: addFormVisible => {
      if (addFormVisible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    fixed: 'left',
    width: 150,
    resizable: true,  // 可伸缩列
  },
  {
    title: "性别",
    dataIndex: "sex",
    filters: [
      { text: '男', value: '男' },
      { text: '女', value: '女' }
    ],
    onFilter: (value, record) => record.sex.indexOf(value) === 0,
    width: 150,
    resizable: true,
  },
  {
    title: "年龄",
    dataIndex: "age",
    sorter: {
      compare: (a, b) => a.age - b.age
    },
    width: 150,
    resizable: true,
  },
  {
    title: "身份证",
    dataIndex: 'ID',
    ellipsis: true,  // 自动省略
    width: 350,
    resizable: true,
  }
])
//新增员工属性
const columnFormVisible = ref(false)
const columnFormData = reactive({
  title: '',
  dataIndex: '',
  ellipsis: true,
  width: 150,
  resizable: true,
})
</script >

<template>
  <a-table :dataSource="store.employeeInfo" :columns="columns" :row-selection="rowSelection" rowKey="ID" sticky
    :scroll="{ x: 1200 }" @resizeColumn="handleResizeColumn">
    <!-- 自定义筛选菜单 -->
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div class="search">
        <a-input type="text" :value="selectedKeys[0]" :placeholder="`搜索 ${column.title}`"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="search(selectedKeys, confirm, column.dataIndex)" ref="searchInput" />
        <div class="button">
          <a-button danger @click="Reset(clearFilters)"><close-outlined />重置</a-button>
          <a-button type="primary" @click="search(selectedKeys, confirm, column.dataIndex)">
            <SearchOutlined />搜索
          </a-button>
        </div>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <!-- 单元格编辑 -->
    <template #bodyCell="{ column, text, record }">
      <div v-if="isEdit.ID === record.ID && isEdit.attribute === column.dataIndex">
        <template v-if="column.dataIndex === 'name'">
          <input type="text" v-model="EditData.value" class="editBox" style="width: 60px;">
        </template>
        <template v-if="column.dataIndex === 'sex'">
          <input type="text" v-model="EditData.value" class="editBox" style="width: 30px;">
        </template>
        <template v-if="column.dataIndex === 'age'">
          <input type="text" v-model="EditData.value" class="editBox" style="width: 30px;">
        </template>
        <template v-if="column.dataIndex === 'ID'">
          <input type="text" v-model="EditData.value" class="editBox">
        </template>
        <check-outlined @click="save(record, column)" class="Icon save" />
        <close-outlined @click="close" class="Icon close" />
      </div>
      <div v-else class="text">
        <span>{{ text }}</span>
        <edit-outlined @click="edit(record, column)" class="Icon edit" />
      </div>
    </template>
  </a-table>
  <div class="btn-box">
    <!-- 添加员工 -->
    <a-button type="primary" @click="showModal">新增员工</a-button>
    <a-modal v-model:visible="addFormVisible" title="添加员工" :confirm-loading="confirmLoading" @ok="handleOk"
      :footer="null">

      <a-form :model="addData" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">

        <template v-for="item in columns" :key="item.dataIndex">

          <template v-if="item.dataIndex === 'sex'">
            <a-form-item :label="item.title" :name="item.dataIndex" :rules="[{ required: true, message: '必填项' }]">
              <a-select v-model:value="addData[item.dataIndex]">
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select></a-form-item>
          </template>
          <template v-else-if="item.dataIndex === 'age'">
            <a-form-item :label="item.title" :name="item.dataIndex"
              :rules="[{ required: true, validator: validateAge, }]">
              <a-input v-model:value="addData[item.dataIndex]" type="number" />
            </a-form-item>
          </template>
          <template v-else-if="item.dataIndex === 'ID'">
            <a-form-item :label="item.title" :name="item.dataIndex"
              :rules="[{ required: true, min: 18, max: 18, message: '身份证是18位' }]">
              <a-input v-model:value="addData[item.dataIndex]" type="text" />
            </a-form-item>
          </template>
          <template v-else>
            <a-form-item :label="item.title" :name="item.dataIndex" :rules="[{ required: true, message: '必填项' }]">
              <a-input v-model:value="addData[item.dataIndex]" />
            </a-form-item>
          </template>
        </template>
        <div class="modal-floor">
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-button @click="closeModal">取消</a-button>
        </div>
      </a-form>
    </a-modal>
    <!-- 新增员工属性 -->
    <a-button @click="columnFormVisible = true">新增员工属性</a-button>
    <a-modal v-model:visible="columnFormVisible" title="Basic Modal" @ok="handleOk">
      <a-input v-model:value="columnFormData.columnName"></a-input>
    </a-modal>
    <!-- 改变列的显示顺序 -->
    <a-button @click="columnVisible = true">改变列序</a-button>
    <a-modal v-model:visible="columnVisible" title="Basic Modal" @ok="handleOk">
      <a-row>
        <a-col :span="12">
          <a-list item-layout="horizontal" :data-source="columnsSequence.map(item => [item.dataIndex, item.title])">
            <template #renderItem="{ item }">
              <a-list-item @click="addColumns(item)"
                style="justify-content: space-around;">{{ `${item[0]} : ${item[1]}` }}</a-list-item>
            </template>
          </a-list>
        </a-col>
        <a-col :span="12">
          <a-list item-layout="horizontal" :data-source="columnsSequenceForm">
            <template #renderItem="{ item }">
              <a-list-item
                style="justify-content: space-around;">{{ `    ${item[0]} : ${item[1]} : ${item[2]}` }}</a-list-item>
            </template>
          </a-list>
        </a-col>
      </a-row>
    </a-modal>
    <!-- 删除按钮 -->
    <a-popconfirm title="确定删除？" @confirm="deleteKey" v-if="selectedRowKeys.length">
      <template #icon><question-circle-outlined style="color: red" /></template>
      <a-button type="primary" danger>删除</a-button>
    </a-popconfirm>
  </div>
</template>

<style lang="less" scoped>
.ant-col-12 {
  border: 1px dashed rgb(122, 174, 233);
}

.modal-floor {
  display: flex;
  flex-direction: row-reverse;

  button {
    margin-left: 20px;
  }
}

.btn-box {
  position: relative;
  top: -48px;

  button {
    margin-right: 20px;
  }


}

.search {
  width: 200px;
  background-color: #fff;
  padding: 10px;

  .button {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
}

.Icon {
  float: right;
  font-size: 18px;
}

.save {
  color: #4c624c55;
}

.edit {
  color: #0003;
}

.close {
  color: #d005;
  margin-right: 10px;
}

.editBox {
  width: 300px;
  outline-style: none;
  border: none;
  background-color: #c4e5db;
}
</style>