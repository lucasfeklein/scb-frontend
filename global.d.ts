declare module "stripe-pricing-table" {
  // Export the component, replacing `MyComponent` with the actual component's name from 'stripe-pricing-table'
  export function MyComponent(props: any): JSX.Element;
}

declare namespace JSX {
  interface IntrinsicElements {
    // Add 'stripe-pricing-table' as a valid intrinsic element for JSX
    "stripe-pricing-table": any;
  }
}
