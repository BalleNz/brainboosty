/** Mirrors brain_region_keys.REGION_KEYS + region_png_map.REGION_SECTION_PNG */

import amygdala from "@bb-assets/brain-sections/amygdala.png?url";
import brainLobes from "@bb-assets/brain-sections/lobes.png?url";
import frontalGyrus from "@bb-assets/brain-sections/frontal-gyrus.png?url";
import insula from "@bb-assets/brain-sections/insula.png?url";
import pfc from "@bb-assets/brain-sections/pfc.png?url";
import tpj from "@bb-assets/brain-sections/tpj.png?url";

export const REGION_KEYS = [
  "prefrontal_cortex",
  "brain_lobes",
  "insular_cortex",
  "temporoparietal_junction",
  "amygdala",
  "frontal_gyrus",
];

export const REGION_IMAGES = {
  prefrontal_cortex: pfc,
  brain_lobes: brainLobes,
  insular_cortex: insula,
  temporoparietal_junction: tpj,
  amygdala,
  frontal_gyrus: frontalGyrus,
};
