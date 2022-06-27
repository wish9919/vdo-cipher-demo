export const getStatus = (text) => {
  switch (text) {
    case "ready":
      return {
        title: "Ready",
        color: "green",
      };
    case "PRE-Upload":
      return {
        title: "Pre-Upload",
        color: "gray",
      };

    default:
      return {
        title: "No Status",
        color: "gray",
      };
  }
};
