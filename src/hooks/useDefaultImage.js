import {
  mdiAccountBoxOutline,
  mdiShieldSwordOutline,
  mdiHomeCity,
  mdiCastle,
} from "@mdi/js";

const useDefaultImage = (type) => {
  switch (type) {
    case "character":
      return mdiAccountBoxOutline;
    case "location":
      return mdiHomeCity;
    case "object":
      return mdiShieldSwordOutline;
    case "campaign":
      return mdiCastle;
    default:
      return "";
  }
};

export default useDefaultImage;
