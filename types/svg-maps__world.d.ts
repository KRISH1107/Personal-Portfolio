declare module "@svg-maps/world" {
  export type SvgMapLocation = {
    id: string;
    name: string;
    path: string;
  };

  export type SvgMap = {
    label: string;
    viewBox: string;
    locations: SvgMapLocation[];
  };

  const world: SvgMap;
  export default world;
}
