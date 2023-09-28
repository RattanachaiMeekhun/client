export const HOST = {
  apiUrl: import.meta.env.VITE_API_URL || "api",
};

export const APIS = {
  Auth: {
    login: `/login`,
  },
  User: {
    image: "/tmp/images/user/",
  },
  Order:{
    getBuyerOrderByStatus:"/orders/getBuyerOrderByStatus"
  }
};
