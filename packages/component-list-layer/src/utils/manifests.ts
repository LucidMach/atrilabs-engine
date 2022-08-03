import type { ManifestRegistry } from "@atrilabs/core";
import { manifestRegistryController } from "@atrilabs/core";
// default import all manifest files here
import ButtonManifests from "@atrilabs/react-component-manifests/src/manifests/Button/Button";
import AccordianManifests from "@atrilabs/react-component-manifests/src/manifests/Accordion/Accordion";
import CarouselManifests from "@atrilabs/react-component-manifests/src/manifests/Carousel/Carousel";
import CountdownManifests from "@atrilabs/react-component-manifests/src/manifests/Countdown/Countdown";
import FlexManifests from "@atrilabs/react-component-manifests/src/manifests/Flex/Flex";
import ImageManifests from "@atrilabs/react-component-manifests/src/manifests/Image/Image";
import InputManifests from "@atrilabs/react-component-manifests/src/manifests/Input/Input";
import LabelManifests from "@atrilabs/react-component-manifests/src/manifests/Label/Label";
import RadioManifests from "@atrilabs/react-component-manifests/src/manifests/Radio/Radio";
import SliderManifests from "@atrilabs/react-component-manifests/src/manifests/Slider/Slider";
import StepManifests from "@atrilabs/react-component-manifests/src/manifests/Step/Step";
import ToggleManifests from "@atrilabs/react-component-manifests/src/manifests/Toggle/Toggle";
import UploadManifests from "@atrilabs/react-component-manifests/src/manifests/Upload/Upload";

const reactComponentManifestPkg = "@atrilabs/react-component-manifests";

function defaultImportsToRegistry(defaultImports: any[]) {
  const manifests: { [manifestId: string]: { components: any[] } } = {};
  for (let i = 0; i < defaultImports.length; i++) {
    const defaultImport = defaultImports[i]!;
    if (defaultImport && defaultImport["manifests"]) {
      const currManifests = defaultImport["manifests"];
      const manifestIds = Object.keys(currManifests);
      manifestIds.forEach((manifestId) => {
        if (
          currManifests[manifestId] &&
          !Array.isArray(currManifests[manifestId])
        ) {
          return;
        }
        if (manifests[manifestId]) {
          manifests[manifestId]!.components.push(...currManifests[manifestId]);
        } else {
          manifests[manifestId] = { components: currManifests[manifestId] };
        }
      });
    }
  }
  return manifests;
}

function registerComponents(
  registry: {
    [manifestId: string]: {
      components: ManifestRegistry["0"]["components"]["0"]["component"][];
    };
  },
  pkg: string
) {
  const manifestIds = Object.keys(registry);
  manifestIds.forEach((manifestId) => {
    const components = registry[manifestId]!.components.map((component) => {
      return { component, pkg };
    });
    manifestRegistryController.writeComponents(manifestId, components);
    console.log(manifestRegistryController.readManifestRegistry());
  });
}

// add default import to this array
const defaultImports = [
  ButtonManifests,
  AccordianManifests,
  CarouselManifests,
  CountdownManifests,
  FlexManifests,
  ImageManifests,
  InputManifests,
  LabelManifests,
  RadioManifests,
  SliderManifests,
  StepManifests,
  ToggleManifests,
  UploadManifests,
];

const registry = defaultImportsToRegistry(defaultImports);

registerComponents(registry, reactComponentManifestPkg);