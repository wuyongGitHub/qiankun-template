<template>
  <div>
    <el-button
      v-permission="'system:menu:edit'"
      link
      type="warning"
      icon="ele-Edit"
    >
      修改
    </el-button>
    <el-button
      v-permission="'system:menu:add'"
      link
      type="warning"
      icon="ele-Edit"
    >
      新增
    </el-button>
    <el-button
      v-permission="'system:menu:aaa'"
      link
      type="warning"
      icon="ele-Edit"
    >
      新增
    </el-button>
    <el-button icon="ele-Plus" type="success" @click="handleAddBefore()"
      >新增用户</el-button
    >
  </div>
</template>
 <script lang="ts" setup name="statisticBlock">
import { getStatisticsData } from "../../../api/home/index";
import { onMounted, reactive } from "vue";
import { permission } from "../../../utils/authFunction";
import { ElMessage } from "element-plus";
const state = reactive({
  loading: false,
  statisticData: {
    totalOrderNum: 0,
    totalSaleMoney: 0,
    totalReturnedMoney: 0,
    totalIncomeMoney: 0,
  } as any,
});
onMounted(() => {
  loadStatisticsData();
});
function handleAddBefore() {
  if (!permission("system:user:add")) {
    return ElMessage({
      message: "没有权限.",
      type: "warning",
    });
  } else {
    return ElMessage({
      message: "有权限.",
      type: "success",
    });
  }
}
async function loadStatisticsData() {
  try {
    state.loading = true;
    const { data } = await getStatisticsData();
    console.log("data", data);
    // state.statisticData = data;
  } catch (error) {
  } finally {
    state.loading = false;
  }
}
</script>
 
 <style>
</style>