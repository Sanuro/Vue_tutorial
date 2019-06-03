Vue.component("product",{
    props:{
        premium: {
            type: Boolean,
            required: true
        }
        
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image">
                <!-- <img :src="image"> this works too-->
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inventory > 10">In stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Out of stock</p>
                <p>Shipping: {{ shipping }}</p>
                <p>User is premium: {{ premium }}</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div v-for="(variant, index) in variants" :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor}"
                @mouseover= "updateProduct(index)">
                </div>

                <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add to cart</button>

                 

            </div>
        </div>
    `,
     data(){
         return {
            brand: "Vue Mastery",
            product: "Socks",
            selectedVariant: 0,
            inventory: 8,
            details: ["90% cotton", "4% you", "all the people"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ]
        }
     },
        methods: {
            addToCart() {
                this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
            },
        
            updateProduct(index){
                this.selectedVariant = index
                console.log(index)
            }
        
        },
        computed: {
            title(){
                return this.brand + " " + this.product
            },
            image(){
                return this.variants[this.selectedVariant].variantImage
            },
            inStock(){
                return this.variants[this.selectedVariant].variantQuantity
            },
            shipping(){
                if (this.premium){
                    return "Free"
                }
                return 2.99
            }
        }
})

var app = new Vue({
    el: "#app",
    data:{
        premium: false,
        cart: [] 

    },
    methods: {
        updateCart(id){
            this.cart.push(id)

        }
    }

})