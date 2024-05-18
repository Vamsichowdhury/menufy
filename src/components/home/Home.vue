<template>
    <v-app>
        <v-container fluid class="pa-0">
            <v-row no-gutters class="hero-section">
                <v-col cols="12" md="6"
                    :class="`d-flex align-center justify-center text-left ${$vuetify.display.mdAndUp ? 'pl-16' : 'pl-2 text-center'} `">
                    <v-container height="100vh">
                        <div>
                            <div>
                                <v-text block
                                    :class="`display-1 ${$vuetify.display.mdAndUp ? 'text-h2' : 'text-h5'} font-weight-bold`">Taste
                                    the World on Your
                                    Plate!</v-text>
                            </div>
                            <div class="py-4">
                                <v-text block class="subtitle-1 mb-5 text-h7 ">Every dish is prepared with passion and
                                    the finest ingredients. Join us and discover the perfect blend of taste and
                                    nutrition in every bite!
                                </v-text>

                            </div>
                            <v-btn :color="'primary'" class="text-none" :append-icon="'mdi-open-in-new'" size="x-large"
                                rounded variant="flat" flat to="/menu">Discover Menu</v-btn>
                        </div>
                    </v-container>
                </v-col>
                <v-col cols="12" md="6"
                    :class="`d-flex align-center justify-start ${$vuetify.display.mdAndUp ? 'pa-5' : 'mobile-image'}`">
                    <v-img src="../../assets/salad.png" aspect-ratio="1" contain></v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'HeroPage',
};
</script>

<style scoped>
.hero-section {
    height: 100vh;
}

.text-center {
    max-width: 900px;
}

.v-btn {
    margin-top: 20px;
}

.pa-5 {
    padding: 6rem !important;
}

.mobile-image {
    margin-bottom: 2rem !important;
}
</style>

<!-- <template>
    <v-app>
      <v-container fluid class="pa-0">
        <v-row no-gutters class="hero-section">
          <v-col cols="12" md="6" class="order-md-1 order-2">
            <v-sheet class="d-flex align-center justify-center text-center" height="100vh" color="black">
              <div class="text-white">
                <h1 class="display-1 font-weight-bold">Salads with freshness in every bite!</h1>
                <p class="subtitle-1 mb-5">Hungry and craving some tasty and nutritious salads? We've got you!</p>
                <v-btn color="green darken-1" dark large>Discover Menu</v-btn>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-center justify-center pa-5 order-md-2 order-1 mobile-image-wrapper">
            <v-img src="../assets/salad.png" aspect-ratio="1" contain class="mobile-image"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'HeroPage',
  };
  </script>
  
  <style scoped>
  .hero-section {
    background-color: #000;
    color: white;
    height: 100vh;
  }
  
  .text-center {
    max-width: 600px;
  }
  
  .v-btn {
    margin-top: 20px;
  }
  
  .pa-5 {
    padding: 5rem !important;
  }
  
  /* Styles for mobile view */
  @media (max-width: 960px) {
    .mobile-image-wrapper {
      position: relative;
      padding: 0;
    }
  
    .mobile-image {
      opacity: 0.5;
      height: 100vh;
      width: 100%;
      object-fit: cover;
    }
  
    .v-sheet {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      z-index: 1;
      height: 100%;
      justify-content: center;
    }
  }
  </style>
   -->