<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">Goods</span>
        <span slot="b">测试</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price2:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice | currency('$')}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="static/2.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">1000</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="static/3.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">500</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="static/4.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">2499</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="20">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <modal v-bind:mdShow="mdShow"  v-on:close="closeModal">
          <p slot="message">
            请先登录，否则无法加入到购物车中！
          </p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
      </modal>

      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>

      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import './../assets/css/base.css';
    import './../assets/css/product.css'
    import NavHeader from '@/components/NavHeader.vue'
    import NavFooter from './../components/NavFooter'
    import NavBread from './../components/NavBread'
    import Modal from './../components/Modal.vue'
    import axios from 'axios'
    export default{
        data(){
            return {
              goodsList:[],
              priceFilter:[
                {
                  startPrice:'0.00',
                  endPrice:'100.00'
                },
                {
                  startPrice:'100.00',
                  endPrice:'500.00'
                },
                {
                  startPrice:'500.00',
                  endPrice:'1000.00'
                },
                {
                  startPrice:'1000.00',
                  endPrice:'5000.00'
                }
              ],
              sortFlag:true,
              page:1,
              pageSize:8,
              busy:true,
              loading:false,
              priceChecked:'all',
              filterBy:false,
              mdShow:false,
              overLayFlag:false
            }
        },
        components:{
          NavHeader,
          NavFooter,
          NavBread,
          Modal
        },
       mounted:function(){
          this.getGoodsList();

       },
      methods:{
        getGoodsList(){
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceChecked
          };
          this.loading = true;
          var myData = {
            "status":"0",
            "msg":"",
            "result":{
              "count":8,
              "list":[
                {
                  "_id":"01",
                  "productId":"001",
                  "productName":"自拍杆",
                  "salePrice":39,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"02",
                  "productId":"002",
                  "productName":"自拍杆",
                  "salePrice":392,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"03",
                  "productId":"003",
                  "productName":"自拍杆",
                  "salePrice":393,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"04",
                  "productId":"004",
                  "productName":"自拍杆",
                  "salePrice":394,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"05",
                  "productId":"005",
                  "productName":"自拍杆",
                  "salePrice":395,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"06",
                  "productId":"006",
                  "productName":"自拍杆",
                  "salePrice":396,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"07",
                  "productId":"007",
                  "productName":"自拍杆",
                  "salePrice":37,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"08",
                  "productId":"008",
                  "productName":"自拍杆",
                  "salePrice":398,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"10",
                  "productId":"010",
                  "productName":"自拍杆",
                  "salePrice":3910,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"11",
                  "productId":"011",
                  "productName":"自拍杆",
                  "salePrice":3911,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                },
                {
                  "_id":"12",
                  "productId":"012",
                  "productName":"自拍杆",
                  "salePrice":3912,
                  "productImage":"zipai.jpg",
                  "productUrl":""
                }
              ]

            }
          };
          this.goodsList = myData.result.list;
          console.log( this.goodsList,'===== this.goodsList');

//          axios.get("/goods").then((result) => {
//            var res = result.data;
//            this.goodsList = res.result;
//          });

          axios.get("/goods/list,{params:param}").then((response) => {
              let res =response.data;
              this.loading = false;
              if(res.status == "0"){
                  if(flag){
                    this.goodsList = this.goodsList.concat(res.result.list);
                    if(res.result.count == 0){
                      this.busy = true;
                    }else{
                      this.busy = false;
                    }
                  }else{
                    this.goodsList = res.result.list;
                    this.busy = false;
                  }
              }else{
                this.goodsList = [];
              }
          })


        },
        closeModal(){
          this.mdShow = false;
          this.mdShowCart = false;
        },
        sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodsList();
        },
        loadMore(){
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
          }, 500);
        },
        addCart(productId){
          axios.post("/goods/addCart",{
            productId:productId
          }).then((res)=>{
            var res = res.data;
            if(res.status==0){
              this.mdShowCart = true;
              this.$store.commit("updateCartCount",1);
            }else{
              this.mdShow = true;
            }
          });
        },
        setPriceFilter(index){
            this.priceChecked = index;
            this.page = 1;
            this.getGoodsList();
        },
        showFilterPop(){
          this.filterBy=true;
          this.overLayFlag=true;
        },
        closePop(){
          this.filterBy=false;
          this.overLayFlag=false;
        }
      }
    }
</script>
