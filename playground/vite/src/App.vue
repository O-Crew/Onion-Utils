<template>
  <button @click="handleClick">count:{{ a }}</button>
</template>

<script setup lang='ts'>
import { useDebounce } from '@onion/core'
import { ref } from 'vue';
const a = ref(1)

const debouncedFn = useDebounce(() => {
  a.value++
}, 1000, {
  maxWait: 5000
})

const handleClick = () => {
  console.log('click');
  debouncedFn()
}
</script>

<style lang='scss' scoped></style>