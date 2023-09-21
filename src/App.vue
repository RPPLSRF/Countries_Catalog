<template>
  <main
    class="dark:bg-black dark:text-white min-h-screen"
  >
    <div class="container mx-auto sm:px-12 pt-10">
      <header>
        <div>
          <div class="sm:text-6xl text-5xl font-bold inline-block">
            Countries Catalog
          </div>
        <!-- Dark Mode -->
        <div class="hidden md:block inline-block mt-4" style="float:right">
          <button
            @click="toggleDark()"
            class="py-2 px-4 bg-black text-white rounded-md dark:bg-white dark:text-black"
          >
            Toggle {{ isDark ? "Light" : "Dark" }} Mode
          </button>        
        </div>
        <!-- Dark Mode Mobile-->
        <div class="md:hidden m-2" style="float:right">
          <button
            @click="toggleDark()"
            class="py-1 px-2 bg-black text-white rounded-md dark:bg-white dark:text-black"
          >
            {{ isDark ? "Light" : "Dark" }} Mode
          </button>        
        </div>
      <!-- Search -->
          <div class="relative mt-8 text-black">
            <div>
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="none"
                  color="black"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                id="default-search"
                v-model="searchCountriesWorld"
                type="search"
                class="block p-4 pl-10 w-full rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search By Country Name"
              />
              <div class="text-red-400 mt-2.5 absolute">
                {{ error?.response?.data.message }}
              </div>
            </div>
          </div>

          <!-- Sorting -->
          <div class="mt-12 inline-block">Sorting By Country Name</div>
          <div class="mt-12 inline-block sm:block hidden" style="float:right">page: {{ page }}</div>
          <div class="flex">
            <div class="flex gap-x-2 flex-wrap">
              <button
                :class="{
                  'bg-sky-600 text-white':
                    orderCountriesNameBy === OrderByCountry.ASC,
                }"
                class="button-alt border-2 border-sky-700 hover:text-white"
                @click="orderCountryNameBy(OrderByCountry.ASC)"
              >
                Ascending
              </button>
              <button
                :class="{
                  'bg-sky-600 text-white':
                    orderCountriesNameBy === OrderByCountry.DESC,
                }"
                class="button-alt border-2 border-sky-700 hover:text-white"
                @click="orderCountryNameBy(OrderByCountry.DESC)"
              >
                Descending
              </button>
              <button class="button" @click="reset">Reset</button>
            </div>

            <!-- Pagination -->
            <div class="hidden ml-auto md:flex gap-x-2">
              <button
                :disabled="isFirstPage"
                :class="{
                  'bg-sky-600 text-white':
                    orderCountriesNameBy === OrderByCountry.ASC,
                  '!cursor-not-allowed !bg-gray-500 hover:!bg-gray-500':
                    isFirstPage,
                }"
                class="button"
                @click="prev"
              >
                Previous
              </button>
              <button
                :disabled="isLastPage"
                :class="{
                  'bg-sky-600 text-white':
                    orderCountriesNameBy === OrderByCountry.DESC,
                  '!cursor-not-allowed !bg-gray-500 hover:!bg-gray-500':
                    isLastPage,
                }"
                class="button"
                @click="next"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Country Catalog Wrapper -->
      <div
        class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-6 md:pb-12"
      >
        <!-- Country Card -->
        <div
          v-for="(country, index) in displayViewCountries"
          :key="index"
          class="rounded-xl"
        >
          <div
            class="aspect-[1.5] p-4 cursor-pointer"
            @click="viewCountryDetails(country)"
          >
            <img :src="country.flags.png" class="w-full h-full" />
          </div>
          <div class="p-4">
            <div class="font-bold truncate" :title="country.name.official">
              {{ country.name.official }}
            </div>
            <button class="button w-full" @click="viewCountryDetails(country)">
              More Details
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Pagination -->
      <div class="sm:hidden m-5 ml-0" style="float:right">page: {{ page }}</div>
      <div class="flex gap-x-2 justify-end pb-12 md:hidden px-4">
        <button
          :disabled="isFirstPage"
          :class="{
            'bg-sky-700 text-white':
              orderCountriesNameBy === OrderByCountry.ASC,
            '!cursor-not-allowed !bg-gray-500 hover:!bg-gray-500': isFirstPage,
          }"
          class="button"
          @click="prev(), scrollToTop()"
        >
          Previous
        </button>
        <button
          :disabled="isLastPage"
          :class="{
            'bg-sky-700 text-white':
              orderCountriesNameBy === OrderByCountry.DESC,
            '!cursor-not-allowed !bg-gray-500 hover:!bg-gray-500': isLastPage,
          }"
          class="button"
          @click="next(), scrollToTop()"
        >
          Next
        </button>
      </div>

      <!-- Country Dialog -->
      <TransitionRoot appear :show="isDialogOpen" as="template">
        <Dialog as="div" class="relative z-10" @close="closeModal">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <div class="aspect-[1.5]">
                    <img
                      :src="currentCountry?.flags.png"
                      class="w-full h-full"
                    />
                  </div>
                  <DialogTitle
                    as="h3"
                    class="text-lg font-bold leading-6 text-gray-900 mt-4"
                  >
                    {{ currentCountry?.name.official }}
                  </DialogTitle>
                  <div class="mt-2">
                    <div>
                      <span class="font-medium">CCA2:</span>
                      {{ currentCountry?.cca2 }}
                    </div>
                    <div>
                      <span class="font-medium">CCA3:</span>
                      {{ currentCountry?.cca3 }}
                    </div>
                    <div>
                      <span class="font-medium">Native Name:</span>
                      {{
                        currentCountry?.name.nativeName.ara ? currentCountry?.name.nativeName.ara.official
                          : (currentCountry?.name.nativeName.fra ? currentCountry?.name.nativeName.fra.official
                          : (currentCountry?.name.nativeName.eng ? currentCountry?.name.nativeName.eng.official 
                          : (currentCountry?.name.nativeName.prs ? currentCountry?.name.nativeName.prs.official 
                          : (currentCountry?.name.nativeName.spa ? currentCountry?.name.nativeName.spa.official 
                          : (currentCountry?.name.nativeName.afr ? currentCountry?.name.nativeName.afr.official 
                          : (currentCountry?.name.nativeName.bul ? currentCountry?.name.nativeName.bul.official 
                          : (currentCountry?.name.nativeName.amh ? currentCountry?.name.nativeName.amh.official 
                          : (currentCountry?.name.nativeName.lav ? currentCountry?.name.nativeName.lav.official 
                          : (currentCountry?.name.nativeName.nno ? currentCountry?.name.nativeName.nno.official 
                          : (currentCountry?.name.nativeName.fas ? currentCountry?.name.nativeName.fas.official 
                          : (currentCountry?.name.nativeName.ben ? currentCountry?.name.nativeName.ben.official 
                          : (currentCountry?.name.nativeName.bos ? currentCountry?.name.nativeName.bos.official 
                          : (currentCountry?.name.nativeName.kir ? currentCountry?.name.nativeName.kir.official 
                          : (currentCountry?.name.nativeName.por ? currentCountry?.name.nativeName.por.official 
                          : (currentCountry?.name.nativeName.sqi ? currentCountry?.name.nativeName.sqi.official 
                          : (currentCountry?.name.nativeName.ell ? currentCountry?.name.nativeName.ell.official 
                          : (currentCountry?.name.nativeName.nld ? currentCountry?.name.nativeName.nld.official 
                          : (currentCountry?.name.nativeName.lit ? currentCountry?.name.nativeName.lit.official 
                          : (currentCountry?.name.nativeName.ind ? currentCountry?.name.nativeName.ind.official 
                          : (currentCountry?.name.nativeName.aym ? currentCountry?.name.nativeName.aym.official 
                          : (currentCountry?.name.nativeName.dan ? currentCountry?.name.nativeName.dan.official 
                          : (currentCountry?.name.nativeName.kaz ? currentCountry?.name.nativeName.kaz.official 
                          : (currentCountry?.name.nativeName.bwg ? currentCountry?.name.nativeName.bwg.official 
                          : (currentCountry?.name.nativeName.grn ? currentCountry?.name.nativeName.grn.official 
                          : (currentCountry?.name.nativeName.mya ? currentCountry?.name.nativeName.mya.official 
                          : (currentCountry?.name.nativeName.fin ? currentCountry?.name.nativeName.fin.official 
                          : (currentCountry?.name.nativeName.rus ? currentCountry?.name.nativeName.rus.official 
                          : (currentCountry?.name.nativeName.khm ? currentCountry?.name.nativeName.khm.official 
                          : (currentCountry?.name.nativeName.hrv ? currentCountry?.name.nativeName.hrv.official 
                          : (currentCountry?.name.nativeName.slk ? currentCountry?.name.nativeName.slk.official 
                          : (currentCountry?.name.nativeName.est ? currentCountry?.name.nativeName.est.official 
                          : (currentCountry?.name.nativeName.ita ? currentCountry?.name.nativeName.ita.official 
                          : (currentCountry?.name.nativeName.kal ? currentCountry?.name.nativeName.kal.official 
                          : (currentCountry?.name.nativeName.nor ? currentCountry?.name.nativeName.nor.official 
                          : (currentCountry?.name.nativeName.vie ? currentCountry?.name.nativeName.vie.official 
                          : (currentCountry?.name.nativeName.cha ? currentCountry?.name.nativeName.cha.official 
                          : (currentCountry?.name.nativeName.kor ? currentCountry?.name.nativeName.kor.official 
                          : (currentCountry?.name.nativeName.cal ? currentCountry?.name.nativeName.cal.official 
                          : (currentCountry?.name.nativeName.deu ? currentCountry?.name.nativeName.deu.official 
                          : (currentCountry?.name.nativeName.ces ? currentCountry?.name.nativeName.ces.official 
                          : (currentCountry?.name.nativeName.tur ? currentCountry?.name.nativeName.tur.official 
                          : (currentCountry?.name.nativeName.aze ? currentCountry?.name.nativeName.aze.official 
                          : (currentCountry?.name.nativeName.sin ? currentCountry?.name.nativeName.sin.official 
                          : (currentCountry?.name.nativeName.div ? currentCountry?.name.nativeName.div.official 
                          : (currentCountry?.name.nativeName.crs ? currentCountry?.name.nativeName.crs.official 
                          : (currentCountry?.name.nativeName.ber ? currentCountry?.name.nativeName.ber.official 
                          : (currentCountry?.name.nativeName.ron ? currentCountry?.name.nativeName.ron.official 
                          : (currentCountry?.name.nativeName.jpn ? currentCountry?.name.nativeName.jpn.official 
                          : (currentCountry?.name.nativeName.hye ? currentCountry?.name.nativeName.hye.official 
                          : (currentCountry?.name.nativeName.bel ? currentCountry?.name.nativeName.bel.official 
                          : (currentCountry?.name.nativeName.nep ? currentCountry?.name.nativeName.nep.official 
                          : (currentCountry?.name.nativeName.pol ? currentCountry?.name.nativeName.pol.official 
                          : (currentCountry?.name.nativeName.bjz ? currentCountry?.name.nativeName.bjz.official 
                          : (currentCountry?.name.nativeName.slv ? currentCountry?.name.nativeName.slv.official 
                          : (currentCountry?.name.nativeName.ukr ? currentCountry?.name.nativeName.ukr.official 
                          : (currentCountry?.name.nativeName.lao ? currentCountry?.name.nativeName.lao.official 
                          : (currentCountry?.name.nativeName.swe ? currentCountry?.name.nativeName.swe.official 
                          : (currentCountry?.name.nativeName.mon ? currentCountry?.name.nativeName.mon.official 
                          : (currentCountry?.name.nativeName.hun ? currentCountry?.name.nativeName.hun.official 
                          : (currentCountry?.name.nativeName.dzo ? currentCountry?.name.nativeName.dzo.official 
                          : (currentCountry?.name.nativeName.msa ? currentCountry?.name.nativeName.msa.official 
                          : (currentCountry?.name.nativeName.kat ? currentCountry?.name.nativeName.kat.official 
                          : (currentCountry?.name.nativeName.srp ? currentCountry?.name.nativeName.srp.official 
                          : (currentCountry?.name.nativeName.zho ? currentCountry?.name.nativeName.zho.official 
                          : (currentCountry?.name.nativeName.cat ? currentCountry?.name.nativeName.cat.official 
                          : (currentCountry?.name.nativeName.cnr ? currentCountry?.name.nativeName.cnr.official 
                          : (currentCountry?.name.nativeName.tha ? currentCountry?.name.nativeName.tha.official 
                          : (currentCountry?.name.nativeName.isl ? currentCountry?.name.nativeName.isl.official 
                          : (currentCountry?.name.nativeName.bis ? currentCountry?.name.nativeName.bis.official 
                          : (currentCountry?.name.nativeName.bar ? currentCountry?.name.nativeName.bar.official 
                          : (currentCountry?.name.nativeName.mkd ? currentCountry?.name.nativeName.mkd.official 
                          : "No Translation Available!" )))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
                      }}
                    </div>
                    <div>
                      <span class="font-medium">Alternative Spellings:</span>
                      {{ currentCountry?.altSpellings.join(", ") }}
                    </div>
                    <div>
                      <span class="font-medium">IDD:</span>
                      {{ currentCountry?.idd.root
                      }}{{ currentCountry?.idd.suffixes.join(", ") }}
                    </div>
                  </div>

                  <div class="mt-4">
                    <button
                      type="button"
                      class="button_close w-full"
                      @click="closeModal"
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>

    <!-- Loading Spinner -->
    <div
      v-if="isLoading || loading"
      class="fixed inset-0 w-full h-full grid place-items-center bg-sky-100/60"
    >
      <half-circle-spinner
        :animation-duration="300"
        :size="60"
        color="#0ea5e9"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect, computed } from "vue";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useOffsetPagination } from "@vueuse/core";
import { HalfCircleSpinner } from "epic-spinners";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import _ from "lodash";

import { axiosInstance } from "./libs/http";
import { Country } from "./interfaces/Country";

import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
  }

const loading = ref(false);

/**
 * * Load data from API via Axios
 */
const {
  data: countries,
  isLoading,
  execute,
  error,
} = useAxios<Country[] | any>(
  "https://restcountries.com/v3.1/all",
  axiosInstance
);
const storeCountries = ref<Country[]>([]);
/**
 * * Search
 */
let searchTimeout: any; // for clearing search timeout functions to avoid excessive calls
const searchCountriesWorld = ref("");

watch(searchCountriesWorld, () => {
  // avoid excessive calls
  clearTimeout(searchTimeout);

  if (searchCountriesWorld.value) {
    // searchTimeout = setTimeout(() => {
    //   execute(`/name/${searchCountriesWorld.value}`);
    // }, 300);
    countries.value = storeCountries.value?.filter((country) =>
      country.name.official
        .toLowerCase()
        .includes(searchCountriesWorld.value.toLowerCase())
    );
  } else {
    // clearTimeout(searchTimeout);
    // searchTimeout = setTimeout(() => {
    //   execute();
    // }, 300);
    countries.value = storeCountries.value;
  }

  orderCountriesNameBy.value = "";
});

/**
 * * Pagination
 */
const displayViewCountries = ref();
const pageSize = ref(25);
const pageCount = ref();
const page = ref(1);

const fetchData = ({
  currentPage,
  currentPageSize,
}: {
  currentPage: number;
  currentPageSize: number;
}) => {
  const start = (currentPage - 1) * currentPageSize;
  const end = start + currentPageSize;
  displayViewCountries.value = countries.value?.slice(start, end);
};

const { currentPage, currentPageSize, isFirstPage, prev, next } =
  useOffsetPagination({
    total: countries.value?.length,
    page,
    pageSize,
    onPageChange: fetchData,
  });

/**
 * * Custom Last Page Logic
 *
 * Due to problem with useOffsetPagination package has bugs that doesn't
 * support async/await to get the actual pageCount
 */
const initalLoad = () => {
  // inital load
  displayViewCountries.value = countries.value?.slice(0, pageSize.value);
  page.value = 1;

  // custom last page logic for getting page count
  if (countries.value) {
    pageCount.value = Math.max(
      1,
      Math.ceil(countries.value.length / currentPageSize.value)
    );
  }

  // save all data
  if (countries.value && storeCountries.value.length <= 0) {
    storeCountries.value = countries.value;
  }
};

const isLastPage = computed(() => currentPage.value === pageCount.value);

watchEffect(() => {
  initalLoad();
});

/**
 * * Country Dialog
 */
const isDialogOpen = ref(false);
const currentCountry = ref<Country>();

const viewCountryDetails = (country: Country) => {
  currentCountry.value = country;
  isDialogOpen.value = true;
};

const closeModal = () => {
  isDialogOpen.value = false;
};

/**
 * * Order By
 */
enum OrderByCountry {
  ASC = "ASC",
  DESC = "DESC",
}
const orderCountriesNameBy = ref();

const orderCountryNameBy = (order: OrderByCountry) => {
  orderCountriesNameBy.value = order;
  loading.value = true;

  if (order === OrderByCountry.ASC) {
    countries.value = _.orderBy(countries.value, ["name.official"], "asc");
  } else if (order === OrderByCountry.DESC) {
    countries.value = _.orderBy(countries.value, ["name.official"], "desc");
  }

  // just additional UX
  setTimeout(() => {
    loading.value = false;
  }, 300);
};

const reset = () => {
  loading.value = true;
  orderCountriesNameBy.value = "";
  searchCountriesWorld.value = "";
  execute();
  initalLoad();

  setTimeout(() => {
    loading.value = false;
  }, 300);
};
</script>

<style lang="scss" scoped>
.button {
  @apply px-5 py-2.5 mt-4 text-white font-medium rounded-sm text-sm bg-blue-700 hover:bg-sky-800 focus:ring-2 focus:ring-blue-300;
}

.button-alt {
  @apply px-5 py-2.5 mt-4 font-medium rounded-sm text-sm hover:bg-blue-800 focus:ring-2 focus:ring-blue-300;
}

.button_close {
  @apply px-5 py-2.5 mt-4 text-white font-medium rounded-sm text-sm text-rose-100 bg-rose-500 hover:bg-rose-600;
}
</style>
