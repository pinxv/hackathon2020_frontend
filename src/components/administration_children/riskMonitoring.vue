<template>
	<div>
		这是风险监测
		<mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>
	</div>
</template>

<script>
	import mapDrag from "../mapDrag.vue"
	export default {
		components: {
		  mapDrag
		},
		data () {
		  return {
		    dragData: {
		      lng: null,
		      lat: null,
		      address: null,
		      nearestJunction: null,
		      nearestRoad: null,
		      nearestPOI: null
		    }
		  }
		},
		methods: {
		  dragMap (data) {
		    this.dragData = {
		      lng: data.position.lng,
		      lat: data.position.lat,
		      address: data.address,
		      nearestJunction: data.nearestJunction,
		      nearestRoad: data.nearestRoad,
		      nearestPOI: data.nearestPOI
		    }
		  }
		}
	}
</script>

<style>
</style>
