<template lang="jade">
	div(class="alert alert-danger")
		strong {{message}}
</template>

<script>

export default {
  name: 'ErrorMsg',
  props: ['message']
}
</script>

