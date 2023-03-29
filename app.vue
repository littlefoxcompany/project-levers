<template>
  <main
    class="relative flex min-h-screen flex-col justify-center bg-gradient-to-r from-sky-50 to-sky-50/50 text-slate-800 dark:from-zinc-900 dark:to-zinc-800 dark:text-white">
    <div
      class="background absolute inset-0 z-0 bg-[url('/images/mesh-light.svg')] bg-cover bg-right-top bg-no-repeat dark:bg-[url('/images/mesh-dark.svg')]" />

    <div class="spacer py-8"></div>
    <div class="relatve container relative z-20 mx-auto flex grow flex-col justify-center px-4 py-4 md:py-12">
      <div>
        <div class="relative flex gap-5 max-md:flex-col md:items-end">
          <h1 class="mt-2 text-5xl font-bold leading-[1.2em] md:text-6xl">Project Levers.</h1>

          <div
            v-show="projectOutcome != 'Calculating...'"
            class="z-20 inline-flex h-12 w-fit items-center gap-4 rounded-full py-2 px-6 text-white shadow-2xl dark:shadow-black/50 max-md:fixed max-md:bottom-8 max-md:left-1/2 max-md:-translate-x-1/2"
            :class="{
              'bg-indigo-500': projectScore > 0,
              'bg-emerald-500': projectScore === 0,
              'bg-red-400': projectScore < 0,
              'pr-2': edited
            }">
            <p class="text-lg">{{ projectOutcome }}</p>
            <button
              v-if="edited === true"
              class="flex h-9 items-center rounded-full border border-white/50 px-4 hover:border-white dark:text-white"
              @click="clear">
              Clear
            </button>
          </div>
        </div>

        <p class="mt-4 text-2xl font-light text-sky-800 dark:text-zinc-400 lg:text-3xl">
          Further or faster? A guide through the balance.
        </p>
      </div>
      <!-- Levers -->
      <div
        class="relatve group z-10 mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:gap-7 xl:grid-cols-3 xl:gap-8 2xl:gap-10">
        <!-- Card -->
        <div
          v-for="(lever, index) in levers"
          class="rounded-2xl bg-gradient-to-br from-white/50 to-white/75 p-8 shadow-2xl shadow-indigo-600/30 backdrop-blur dark:from-zinc-700/75 dark:to-zinc-700/50 dark:shadow-black/20">
          <h2 class="flex w-full items-center gap-2">
            <span class="text-2xl font-bold">
              {{ lever.title }}
            </span>
            <span
              v-if="lever.id === 'quality' || lever.id === 'stress'"
              class="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sky-800 dark:bg-black/25 dark:text-zinc-300">
              <span>Outcome Only</span>
            </span>
          </h2>
          <p class="mt-3 text-2xl font-light text-zinc-500 dark:text-zinc-400">
            {{ lever.description }}
          </p>

          <div class="mt-9 flex gap-0.5 rounded-full bg-sky-100/50 p-1 dark:bg-zinc-900/50">
            <ButtonInput
              v-for="(button, index) in lever.buttons"
              :hover="lever.id === 'quality' || lever.id === 'stress'"
              :label="button"
              @click="updateValue(lever.id, index)"
              :active="lever.value === index + 1" />
          </div>
        </div>
      </div>
    </div>

    <footer class="relatve z-10 flex items-center justify-center gap-6 py-12 text-center">
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
        class="flex appearance-none rounded-full border px-2 py-1 text-center outline-none ring-0 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-800">
        <option value="system">🧑‍💻</option>
        <option value="light">🌞</option>
        <option value="dark">🌙</option>
      </select>
    </footer>
  </main>
</template>

<script setup>
  const scope = ref(1)
  const budget = ref(1)
  const speed = ref(1)
  const quality = ref(1)
  const people = ref(1)
  const stress = ref(1)
  const edited = ref(false)

  const levers = ref([
    {
      id: 'scope',
      value: scope,
      title: 'Scope',
      description: 'The amount, size and complexity of the tasks.',
      buttons: ['Small', 'Medium', 'Large']
    },
    {
      id: 'budget',
      value: budget,
      title: 'Budget',
      description: 'The budget for costs like teams, time and quality.',
      buttons: ['$', '$$', '$$$']
    },
    {
      id: 'speed',
      value: speed,
      title: 'Speed',
      description: 'The amount of time available to complete milestones.',
      buttons: ['Slow', 'Average', 'Fast']
    },
    {
      id: 'people',
      value: people,
      title: 'Teams',
      description: 'The team size and skills available to the project.',
      buttons: ['Small', 'Regular', 'Large']
    },
    {
      id: 'quality',
      value: quality,
      title: 'Quality',
      description: 'The confidence the solution will withstand all demands.',
      buttons: ['Low', 'Medium', 'High']
    },
    {
      id: 'stress',
      value: stress,
      title: 'Stress',
      description: 'The stress and pressure levels within the team and project.',
      buttons: ['Low 😁', 'Medium', 'High 😡']
    }
  ])

  const updateValue = (id, value) => {
    if (id === 'scope') {
      scope.value = value + 1
      edited.value = true
    } else if (id === 'budget') {
      budget.value = value + 1
      edited.value = true
    } else if (id === 'speed') {
      speed.value = value + 1
      edited.value = true
    } else if (id === 'people') {
      people.value = value + 1
      edited.value = true
    } else if (id === 'quality') {
      quality.value = value + 1
      edited.value = true
    } else if (id === 'stress') {
      stress.value = value + 1
      edited.value = true
    }

    //

    if (scope.value && budget.value && speed.value) {
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

      if (speed.value === 3 && quality.value === 3) {
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
      people.value === null ||
      stress.value === null
    ) {
      return null
    } else {
      return quality.value + budget.value + people.value - scope.value - speed.value - stress.value
    }
  })

  const projectOutcome = computed(() => {
    if (projectScore.value && scope.value > budget.value) {
      return '👻 High Risk Project'
    } else if (projectScore.value < 0) {
      return '😅  Medium Risk Project'
    } else if (projectScore.value === 0) {
      return '🤞 Low Risk Project'
    } else if (projectScore.value > 0) {
      return '🎉 High Success Project'
    } else {
      return 'Calculating...'
    }
  })

  const clear = () => {
    scope.value = 1
    budget.value = 1
    speed.value = 1
    quality.value = 1
    people.value = 1
    stress.value = 1
    edited.value = false
  }
</script>
