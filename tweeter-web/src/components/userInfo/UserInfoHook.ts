import { useContext } from "react";
import { UserInfoContext } from "./UserInfoProvider";

const useInfoContext = () => useContext(UserInfoContext);

export default useInfoContext;
