export const removeItemsOnLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};
