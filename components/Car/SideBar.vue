<!--////////////////////////////////script//////////////////////////////////-->
<script setup>
const { makes } = useCars();

// import { objectToString } from "@vue/shared";

const modal = ref({
  make: false,
  location: false,
  price: false,
});

const city = ref("");
const route = useRoute();
const router = useRouter();
const PriceRange = ref({
  min: "",
  max: "",
});

console.log(route.query);

const PriceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;

  if (!minPrice && !maxPrice) return "Any";
  else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `>$${minPrice}`;
  } else {
    return `$${minPrice}-$${maxPrice}`;
  }
});

const updateModal = (key) => {
  modal.value[key] = !modal.value[key];
};

const onChangeLocation = () => {
  if (!city.value) return;
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 400,
      message: "Invalid city format.",
    });
  }
  updateModal("location");
  navigateTo(`/city/${city.value}/car/${route.params.make}`);

  //so once again, it's going to navigate to /city/[entered city]/car/[given car]

  city.value = " ";
};

const onChangeMake = (make) => {
  updateModal("make");
  navigateTo(`/city/${route.params.city}/car/${make}`);
};

const onChangePrice = () => {
  updateModal("Price");
  if (PriceRange.value.max && PriceRange.value.min) {
    if (PriceRange.value.min > PriceRange.value.max) return;
  }

  router.push({
    query: {
      minPrice: PriceRange.value.min,
      maxPrice: PriceRange.value.max,
    },
  });
};
</script>
<!--////////////////////////////////script//////////////////////////////////-->

<template>
  <div class="shadow border w-64 mr-10 z-30 h-[246px]">
    <!--LOCATION STARTS-->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('location')">
        {{ route.params.city }}
      </h3>

      <!--if modal.location is selected, the following section will take place-->
      <!--like this tiny box is gonna appear if you click on the city-->
      <div
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
        v-if="modal.location"
      >
        <input type="text" class="border p-1 rounded" v-model="city" />
        <!--v-model creates a link between the input element value
           attribute and a data value in the Vue instance. When you 
           change the input, the data updates and when the data changes,
            the input updates as well (two-way binding).-->
        <button
          @click="onChangeLocation"
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
        >
          Apply
        </button>
      </div>
    </div>
    <!--LOCATION END-->
    <!--MAKE STARTS-->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
        {{ route.params.make || "Any" }}
      </h3>
      <!--will either display "any" or if you click on any and choose car, it 
      will display that car.-->
      <div
        class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
        v-if="modal.make"
      >
        <h4
          v-for="make in makes"
          :key="make"
          class="w-1/3"
          @click="onChangeMake(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>
    <!--MAKE ENDS-->
    <!--PRICE----------------------------------------------------------->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('Price')">
        {{ PriceRangeText }}
      </h3>
      <div
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
        v-if="modal.price"
      >
        <input
          type="number"
          placeholder="Min"
          v-model="PriceRange.min"
          class="border p-1 rounded"
        />
        <input
          type="number"
          placeholder="Max"
          v-model="PriceRange.max"
          class="border p-1 rounded"
        />
        <button
          class="bg-blue-400 text-white w-full mt-2 rounded p-1"
          @click="onChangePrice"
        >
          Apply
        </button>
      </div>
    </div>
    <!--PRICE----------------------------------------------------------->
  </div>
</template>
