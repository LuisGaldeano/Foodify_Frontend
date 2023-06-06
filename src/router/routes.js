const routes = [
  {
    path: '/',
    component: () => import('pages/InitialPage.vue'),
  },
  {
    path: '/Login',
    component: () => import('pages/LoginPage.vue'),
  },


  {
    path: '/Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/Dashboard', component: () => import('pages/DashboardPage.vue')},
      {path: '/AddProduct', component: () => import('pages/AddProduct.vue')},
      {path: '/SpendProduct', component: () => import('pages/SpendProduct.vue')},
      {path: '/Chart', component: () => import('pages/Chart.vue')},
      {path: '/ShoppingList', component: () => import('pages/ShoppingList.vue')},


      // Not completed yet
      // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
