import { PageSelector } from "./PageSelector";
import { appMenu } from "./required";

export default function () {
  console.log("app-page-layer working");
  appMenu.register({ comp: PageSelector, props: {} });
}