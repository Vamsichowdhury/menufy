<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-item class="pa-5">
      <v-card-title class="text-h5 text-center">
        <span class="text-h5 text-center">Contact</span>
      </v-card-title>

    </v-card-item>
    <v-divider></v-divider>

    <v-list>
      <v-list-item prepend-icon="mdi-phone" title="+91 883 816 4294"></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item append-icon="mdi-message-text" prepend-icon="mdi-phone" title="+91 939 034 5173"></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item prepend-icon="mdi-email" title="vamsichowdhury@gmail.com"></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item prepend-icon="mdi-map-marker" title="Kondapur, Hyderabad, Telangana, 500084"></v-list-item>
      <v-divider inset></v-divider>

      <!-- <v-list-item prepend-icon="mdi-earth" title="Review Us on Google">

      </v-list-item> -->
      <v-list-item prepend-icon="mdi-earth">
        <!-- <template v-slot:default="{ active, toggle }"> -->
          <a href="https://www.google.com" class="v-list-item v-list-item--link" target="_blank">
            <!-- <v-list-item-icon>
              <v-icon>mdi-earth</v-icon>
            </v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title>Review Us on Google</v-list-item-title>
            </v-list-item-content>
          </a>
        <!-- </template> -->
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item prepend-icon="mdi-clock">

        <span>Monday-Saturday : 9AM - 11PM</span><br />
        <span>Sunday : 9AM - 9PM</span>
      </v-list-item>
    </v-list>

    <v-img height="200" src="https://picsum.photos/700?image=996" cover></v-img>
  </v-card>
</template>