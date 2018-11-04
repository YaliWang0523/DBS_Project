<template lang="jade">
	div(class="modal-header")
		h5(class="modal-title") {{title}}
		button(type="button" class="close" data-dismiss="modal" aria-label="Close")
			span(aria-hidden="true") &times;
</template>

<script>
export default {
  name: 'LoginHeader',
  props: ['title']
}
</script>

