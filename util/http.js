/*
  This app using realtime database of firebase
  This file create to store function that connect to database
  The code belove using axios and realtime REST api to connect to database, 
  not using SDKs.
*/

import axios from "axios";

const BACKEND_URL =
  "https://ecommerce-15c19-default-rtdb.asia-southeast1.firebasedatabase.app/";

async function storeData(token, path, data) {
  const response = await axios.post(
    BACKEND_URL + `${path}?auth=${token}`,
    data
  );
  const id = response.data.name;
  return id;
}

export function storeProduct(token, productData) {
  return storeData(token, "/products.json", productData);
}

export function storeBanner(token, banner) {
  return storeData(token, "/banners.json", banner);
}

export async function postReview(token, productId, data) {
  return storeData(token, `/reviews/${productId}.json`, data);
}

export async function addToCart(token, userId, productId, data) {
  return axios.put(
    BACKEND_URL + `/users/${userId}/cart/${productId}.json?auth=${token}`,
    data
  );
}

export async function updateCartProductQuantity(
  token,
  userId,
  productId,
  quantity
) {
  return axios.put(
    BACKEND_URL + `/users/${userId}/cart/${productId}.json?auth=${token}`,
    { quantity: quantity }
  );
}

export async function fetchCartProducts(token, userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/cart.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const products = [];

  for (const key in response.data) {
    const product = {
      productId: key,
      ...response.data[key],
    };
    products.push(product);
  }

  return products;
}

export async function getProductById(token, productId) {
  const response = await axios.get(
    BACKEND_URL + `/products/${productId}.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );

  const product = {
    productId: productId,
    brand: response.data.brand,
    price: response.data.price,
    offer: response.data.offer,
    imageUri: response.data.imageUri,
  };

  return product;
}

export async function getCouponByCode(token, code) {
  const response = await axios.get(
    BACKEND_URL +
      `/coupons.json?auth=${token}&orderBy="code"&equalTo="${code}"`,
    {
      timeout: 30000,
    }
  );
  const coupons = [];

  for (const key in response.data) {
    coupons.push(response.data[key]);
  }
  return coupons;
}

export async function fetchProducts(token) {
  const response = await axios.get(
    BACKEND_URL + `/products.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const products = [];

  for (const key in response.data) {
    const product = {
      productId: key,
      brand: response.data[key].brand,
      price: response.data[key].price,
      offer: response.data[key].offer,
      imageUri: response.data[key].imageUri,
    };
    products.push(product);
  }

  return products;
}

export async function fetchBanners(token) {
  const response = await axios.get(
    BACKEND_URL + `/banners.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const banners = [];

  for (const key in response.data) {
    const banner = {
      id: key,
      imageUri: response.data[key].imageUri,
    };
    banners.push(banner);
  }

  return banners;
}

export async function fetchReviews(token, productId) {
  const response = await axios.get(
    BACKEND_URL + `/reviews/${productId}.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const reviews = [];

  for (const key in response.data) {
    const review = {
      reviewId: key,
      ...response.data[key],
    };
    reviews.push(review);
  }

  return reviews;
}

export function deleteCartProduct(token, userId, productId) {
  return axios.delete(
    BACKEND_URL + `/users/${userId}/cart/${productId}.json?auth=${token}`
  );
}

export function deleteCart(token, userId) {
  return axios.delete(BACKEND_URL + `/users/${userId}/cart.json?auth=${token}`);
}

export function addCoupons(token, coupon) {
  return storeData(token, "/coupons.json", coupon);
}
export function addUserAddress(token, userId, address) {
  return storeData(token, `/users/${userId}/address.json`, address);
}

export async function fetchAddress(token, userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/address.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const address = [];

  for (const key in response.data) {
    const item = {
      addressId: key,
      ...response.data[key],
    };
    address.push(item);
  }

  return address;
}

export async function updateUserAddress(token, userId, addressId, data) {
  return axios.put(
    BACKEND_URL + `/users/${userId}/address/${addressId}.json?auth=${token}`,
    data
  );
}

export function deleteUserAddress(token, userId, addressId) {
  return axios.delete(
    BACKEND_URL + `/users/${userId}/address/${addressId}.json?auth=${token}`
  );
}

export async function fetchUserProfile(token, userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/profile.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );

  return response.data;
}

export async function updateUserProfile(token, userId, data) {
  return axios.put(
    BACKEND_URL + `/users/${userId}/profile.json?auth=${token}`,
    data
  );
}

export function addUserCard(token, userId, card) {
  return storeData(token, `/users/${userId}/card.json`, card);
}

export async function fetchUserCard(token, userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/card.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const card = [];

  for (const key in response.data) {
    const item = {
      cardId: key,
      ...response.data[key],
    };
    card.push(item);
  }

  return card;
}

export async function updateUserCard(token, userId, cardId, data) {
  return axios.put(
    BACKEND_URL + `/users/${userId}/card/${cardId}.json?auth=${token}`,
    data
  );
}

export function deleteUserCard(token, userId, cardId) {
  return axios.delete(
    BACKEND_URL + `/users/${userId}/card/${cardId}.json?auth=${token}`
  );
}

export function addFavoriteProduct(token, userId, productId, data) {
  return axios.put(
    BACKEND_URL +
      `/users/${userId}/favoriteProducts/${productId}.json?auth=${token}`,
    data
  );
}

export function deleteFavoriteProduct(token, userId, productId) {
  return axios.delete(
    BACKEND_URL +
      `/users/${userId}/favoriteProducts/${productId}.json?auth=${token}`
  );
}

export async function fetchFavoriteProducts(token, userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/favoriteProducts.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const products = [];

  for (const key in response.data) {
    const item = {
      productId: key,
      ...response.data[key],
    };
    products.push(item);
  }

  return products;
}

export function addOrder(token, order) {
  return storeData(token, "/orders.json", order);
}

export async function fetchOrders(token, userId) {
  const response = await axios.get(BACKEND_URL + `/orders.json?auth=${token}`, {
    timeout: 30000,
  });
  const orders = [];

  for (const key in response.data) {
    if (response.data[key].userId === userId) {
      const order = {
        orderId: key,
        ...response.data[key],
      };
      orders.push(order);
    }
  }

  return orders;
}

export function addCategory(token, data) {
  return storeData(token, "/category.json", data);
}

export async function fetchCategory(token) {
  const response = await axios.get(
    BACKEND_URL + `/category.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const category = [];

  for (const key in response.data) {
    const cate = {
      categoryId: key,
      ...response.data[key],
    };
    category.push(cate);
  }

  return category;
}

export async function getProductIdByType(token, type, number) {
  const response = await axios.get(
    BACKEND_URL +
      `/type/${type}.json?auth=${token}&orderBy="$value"${
        !!number ? "&limitToFirst=" + number : ""
      }`,
    {
      timeout: 30000,
    }
  );
  const productIds = response.data?.filter((item) => item != null);

  return productIds;
}

export async function getNotificationById(token, notId) {
  const response = await axios.get(
    BACKEND_URL + `/notifications/${notId}.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );

  const notification = {
    notificationId: notId,
    ...response.data,
  };

  return notification;
}

export async function fetchUserNotifications(token, userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/notifications.json?auth=${token}`,
    {
      timeout: 30000,
    }
  );
  const notifications = [];

  for (const key in response.data) {
    const not = {
      userNotId: key,
      ...response.data[key],
    };
    notifications.push(not);
  }

  return notifications;
}

export async function updateUserNotifications(token, userId, data) {
  return axios.patch(
    BACKEND_URL +
      `/users/${userId}/notifications/${data.userNotId}/.json?auth=${token}`,
    {
      isChecked: true,
    }
  );
}

export async function getUserNotificationsNotCheck(token, userId) {
  const response = await axios.get(
    BACKEND_URL +
      `/users/${userId}/notifications.json?auth=${token}&orderBy="isChecked"&equalTo=false`,
    {
      timeout: 30000,
    }
  );
  const not = [];
  for (const key in response.data) {
    not.push(response.data[key]);
  }

  return not;
}
