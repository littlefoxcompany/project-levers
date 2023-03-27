<template>
  <main
    class="relative flex min-h-screen flex-col justify-center bg-sky-50 text-slate-800 dark:bg-zinc-900 dark:text-white">
    <div class="spacer py-8"></div>

    <div class="container relative mx-auto flex grow flex-col justify-center px-4 py-12">
      <div>
        <div class="text-lg font-medium text-indigo-600 dark:text-amber-400">Faster or Further?</div>
        <h2 class="mt-2 text-5xl font-semibold leading-[1.2em] md:text-6xl lg:text-7xl">Project Levers.</h2>
        <p class="mt-4 text-2xl font-light text-sky-800 dark:text-zinc-400 lg:text-3xl">
          Faster, bigger and cheaper? We'll guide you through the balance.
        </p>
      </div>
      <!-- Levers -->
      <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:gap-8 2xl:gap-10">
        <div
          v-for="(lever, index) in levers"
          class="rounded-2xl bg-white p-8 shadow-xl shadow-indigo-600/20 dark:bg-zinc-800 dark:shadow-black/30">
          <div class="text-2xl font-bold">{{ lever.title }}</div>
          <p class="mt-2 text-2xl font-light text-zinc-500 dark:text-zinc-400">{{ lever.description }}</p>

          <div class="mt-5 flex w-10/12 gap-0.5 rounded-full bg-sky-100/75 p-1 dark:bg-zinc-900">
            <ButtonInput
              v-for="(button, index) in lever.buttons"
              :label="button"
              @click="updateValue(lever.id, index)"
              :active="lever.value === index + 1" />
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-show="projectOutcome != 'Calculating...'"
        class="shadow-brand absolute left-1/2 bottom-32 mt-4 inline-flex -translate-x-1/2 items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2">
        <p class="text-lg font-medium">{{ projectOutcome }}</p>
        <button class="flex h-10 items-center rounded-full border px-4" @click="clear">Clear</button>
      </div>
    </transition>

    <footer class="flex items-center justify-center gap-3 py-12 text-center">
      <a
        class="group inline-flex items-center text-gray-400 transition-all hover:text-indigo-600"
        href="https://littlefox.studio"
        target="_blank"
        rel="noopener noreferrer">
        <Logo class="h-5 fill-gray-400 transition-all group-hover:fill-indigo-600" />
        Littlefox Studio
      </a>

      <select
        v-model="$colorMode.preference"
        class="flex appearance-none rounded-full border px-2 py-1 text-center dark:border-zinc-700 dark:bg-zinc-800">
        <option value="system">🧑‍💻</option>
        <option value="light">🌞</option>
        <option value="dark">🌙</option>
      </select>
    </footer>
  </main>
</template>

<script setup>
  const scope = ref(null)
  const budget = ref(null)
  const speed = ref(null)
  const quality = ref(null)
  const resources = ref(null)
  const stress = ref(null)

  const levers = ref([
    {
      id: 'scope',
      value: scope,
      title: 'Scope',
      description: 'The size, industry or complexity of the project.',
      buttons: ['Small', 'Medium', 'Large']
    },
    {
      id: 'budget',
      value: budget,
      title: 'Budget',
      description: 'The budget for costs like resources, time and quality.',
      buttons: ['$', '$$', '$$$']
    },
    {
      id: 'speed',
      value: speed,
      title: 'Speed',
      description: 'The amount of time available to complete milestones.',
      buttons: ['Slower', 'Medium', 'Faster']
    },
    {
      id: 'quality',
      value: quality,
      title: 'Quality',
      description: 'The confidence the solution will withstand all demands.',
      buttons: ['Lower', 'Medium', 'Higher']
    },

    {
      id: 'resources',
      value: resources,
      title: 'Resources',
      description: 'The number of people and skills available.',
      buttons: ['Less', 'Normal', 'More']
    },
    {
      id: 'stress',
      value: stress,
      title: 'Stress',
      description: 'The stress and pressure levels within the team and project.',
      buttons: ['Low', 'Medium', 'High']
    }
  ])

  const updateValue = (id, value) => {
    if (id === 'scope') {
      scope.value = value + 1
    } else if (id === 'budget') {
      budget.value = value + 1
      resources.value = value + 1
    } else if (id === 'speed') {
      speed.value = value + 1
      stress.value = speed.value
    } else if (id === 'quality') {
      quality.value = value + 1
    } else if (id === 'resources') {
      resources.value = value + 1
      budget.value = resources.value
    }

    //

    if (budget.value) {
      if (scope.value > budget.value) {
        quality.value = 1
        stress.value = 3
      } else if (scope.value <= budget.value) {
        quality.value = budget.value
        stress.value = speed.value
      }

      if (scope.value === 1 && speed.value === 3) {
        stress.value = 2
      }

      if (speed.value === 3) {
        quality.value = 2
      }
    }
  }

  const projectScore = computed(() => {
    if (
      scope.value === null ||
      budget.value === null ||
      speed.value === null ||
      quality.value === null ||
      resources.value === null ||
      stress.value === null
    ) {
      return null
    } else {
      return quality.value + budget.value + resources.value - scope.value - speed.value - stress.value
    }
  })

  const projectOutcome = computed(() => {
    if (projectScore.value && scope.value > budget.value) {
      return 'High Risk Project'
    } else if (projectScore.value < 0 || projectScore.value === 0) {
      return 'High Risk Project'
    } else if (projectScore.value > 0) {
      return 'Healthy Project'
    } else {
      return 'Calculating...'
    }
  })

  const clear = () => {
    scope.value = null
    budget.value = null
    speed.value = null
    quality.value = null
    resources.value = null
    stress.value = null
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
