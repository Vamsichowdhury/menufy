<template>
    <v-card :theme="getTheme">
        <v-layout>
            <v-app-bar color="primary" prominent>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>ABC</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-if="$vuetify.display.mdAndUp">
                    <v-btn v-for="item in navBarList" :key="item.value" :to="item.path">
                        <v-icon class="mx-2">{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </v-btn>
                </template>

                <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
            </v-app-bar>

            <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
                <v-list color="primary" density="compact" nav>
                    <v-list-item v-for="item in navList" :key="item.value" :prepend-icon="item.icon" :title="item.title"
                        :value="item.value" :to="item.path"></v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list density="compact" nav>
                    <v-list-item :prepend-icon="getTheme === 'light' ? 'mdi-track-light-off' : 'mdi-track-light'"
                        :title="getTheme === 'light' ? 'Dark' : 'Light'" @click="handleTheme()"></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 100vh;">
                <router-view color="bcg"></router-view>
                <v-bottom-navigation color="primary" grow v-if="!$vuetify.display.mdAndUp">
                    <v-btn v-for="item in navBarList" :key="item.value" :to="item.path">
                        <v-icon size="x-large" color="primary">{{ item.icon }}</v-icon>
                        <span>{{ item.title }}</span>
                    </v-btn>
                </v-bottom-navigation>
            </v-main>
        </v-layout>
    </v-card>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    data: () => ({
        value: 1,
        drawer: false,
        theme: localStorage.getItem("theme") || "light",
        navList: [
            { icon: "mdi-home", title: "Home", value: "home", path: "/home" },
            { icon: "mdi-widgets", title: "Menu", value: "menu", path: "/menu" },
            { icon: "mdi-cart", title: "Cart", value: "cart", path: "/cart" },
            { icon: "mdi-heart", title: "Wishlist", value: "wishlist", path: "/wishlist" },
            { icon: "mdi-map-marker", title: "Contact", value: "contact", path: "/contact" },
            { icon: "mdi-account", title: "Admin", value: "admin", path: "/admin/categories" }
        ],
        navBarList: [
            { icon: "mdi-home", title: "Home", value: "home", path: "/home" },
            { icon: "mdi-widgets", title: "Menu", value: "menu", path: "/menu" },
            { icon: "mdi-cart", title: "Cart", value: "cart", path: "/cart" },
        ],
    }),
    computed: {
        ...mapGetters("settings/settings", ["getTheme"]),
    },
    methods: {

        ...mapMutations("settings/settings", ["setTheme"]),

        handleTheme() {
            if (this.getTheme === 'light') {
                localStorage.setItem("theme", 'dark')
                this.setTheme("dark")
            } else {
                localStorage.setItem("theme", 'light')
                this.setTheme("light")
            }
        }
    },
    created() {
        console.log("created")
    },
    updated() {
        console.log("updated")
    }
}
</script>

<style lang="scss" scoped></style>