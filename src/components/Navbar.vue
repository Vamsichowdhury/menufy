<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary" prominent>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>ABC</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-if="$vuetify.display.mdAndUp">
                    <v-btn v-for="item in navList" :key="item.value" :to="item.path">
                        <v-icon class="mx-2">{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </v-btn>
                </template>

                <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
            </v-app-bar>

            <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
                <v-list density="compact" nav>
                    <v-list-item v-for="item in navList" :key="item.value" :prepend-icon="item.icon" :title="item.title"
                        :value="item.value" :to="item.path"></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 100vh;">
                <router-view></router-view>

                <!-- <v-card-text>
                    The navigation drawer will appear from the bottom on smaller size screens.
                </v-card-text> -->
            </v-main>
        </v-layout>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        drawer: false,
        navList: [
            { icon: "mdi-home", title: "Home", value: "home", path: "home" },
            { icon: "mdi-widgets", title: "Menu", value: "menu", path: "menu" },
            { icon: "mdi-cart", title: "Cart", value: "cart", path: "cart" },
            { icon: "mdi-heart", title: "Wishlist", value: "wishlist", path: "wishlist" },
            { icon: "mdi-map-marker", title: "Contact", value: "contact", path: "contact" },
            { icon: "mdi-account", title: "Admin", value: "admin", path: "admin" }
        ]
    }),
}
</script>

<style lang="scss" scoped></style>