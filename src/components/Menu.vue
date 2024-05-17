<template>
  <v-card>
    <v-tabs v-model="tab" align-tabs="center" color="primary">
      <v-tab :value="1">All</v-tab>
      <v-tab :value="2">Veg</v-tab>
      <v-tab :value="3">Non-Veg</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="n in 3" :key="n" :value="n">

        <v-container fluid class="scrollable-container">
          <v-row>
            <v-col v-for="i in 12" :key="i" cols="12" md="3">
              <v-hover v-slot="{ isHovering, props }">
                <v-card v-for="(item, index) in cardItems" :class="{ 'on-hover': isHovering }"
                  :elevation="isHovering ? 24 : 12" v-bind="props" :key="index" :disabled="item.loading"
                  :loading="item.loading" class="mx-auto my-12" max-width="374">
                  <template v-slot:loader="{ isActive }">
                    <v-progress-linear :active="isActive" color="primary" height="4" indeterminate></v-progress-linear>
                  </template>

                  <v-img height="250" :src="item.imageSrc" cover></v-img>

                  <v-card-item>
                    <v-card-title>{{ item.title }}</v-card-title>

                    <v-card-subtitle>
                      <span class="me-1">{{ item.subtitle }}</span>

                      <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                    </v-card-subtitle>
                  </v-card-item>

                  <v-card-text>
                    <!-- <v-row align="center" class="mx-0">
                    <v-rating :model-value="item.rating" color="amber" density="compact" size="small" half-increments
                      readonly></v-rating>

                    <div class="text-grey ms-4">
                      {{ item.rating }} ({{ item.reviews }})
                    </div>
                  </v-row> -->

                    <div class="my-4 text-subtitle-1">
                      {{ item.description }}
                    </div>

                    <div class="text-h3">{{ item.additionalInfo }}</div>
                  </v-card-text>

                  <v-divider class="mx-4 mb-1"></v-divider>

                  <!-- <v-card-title>{{ item.availabilityTitle }}</v-card-title>

                <div class="px-4 mb-2">
                  <v-chip-group v-model="item.selectedTime" selected-class="bg-deep-purple-lighten-2">
                    <v-chip v-for="(time, i) in item.availability" :key="i">{{ time }}</v-chip>
                  </v-chip-group>
                </div> -->

                  <v-card-actions>

                    <v-btn color="primary" text="Add to Cart" block border @click="reserve(index)">
                      <v-icon class="mx-2">mdi-cart</v-icon>
                      Add to Cart
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    tab: null,
    scrollInvoked: 0,
    cardItems: [
      {
        loading: false,
        imageSrc: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        title: "Cafe Badilico",
        subtitle: "Local Favorite",
        rating: 4.5,
        reviews: 413,
        description: "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
        additionalInfo: "$ 500/-",
        availabilityTitle: "Tonight's availability",
        availability: ["5:30PM", "7:30PM", "8:00PM", "9:00PM"],
        selectedTime: null
      },
    ]
  }),
  methods: {
    reserve(index) {
      this.cardItems[index].loading = true;
      setTimeout(() => (this.cardItems[index].loading = false), 2000);
    },
  },
}
</script>

<style lang="scss" scoped>
.scrollable-container {
  height: 85vh;
  overflow-y: auto;
}
</style>
