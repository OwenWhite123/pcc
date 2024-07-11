<template>
  <el-dialog v-model="dialogVisible" ref="dialogRef" width="750">
    <div class="mind">
      <div class="img-box">
        <img class="img" src="@/assets/logo.svg"></img>
      </div>
      <Login @goRegister="close" @success="close"></Login>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Login from '../Login.vue';
const emits = defineEmits(['closePopover'])

const dialogVisible = ref(false)

onMounted(() => {

})

function open() {
  dialogVisible.value = true
}
function close() {
  dialogVisible.value = false
}

defineExpose({
  open,
  close
})
</script>

<style scoped lang="scss">
.mind {
  @include flexCenter;

  .img-box {
    width: 350px;
    height: 100%;

    .img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
