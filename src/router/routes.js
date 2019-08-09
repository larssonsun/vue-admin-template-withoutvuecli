import Layout from "@/Layout"

const routes = [
  {
    path: "/",
    redirect: "/todo"
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true
  },
  {
    path: "/todo",
    component: Layout,
    children: [{
      path: "",
      name: "Todo",
      component: () => import("@/views/todo"),
      meta: { title: 'Todo', icon: 'todo' }
    }]
  },
]

export default routes