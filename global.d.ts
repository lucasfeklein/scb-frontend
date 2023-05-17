declare namespace JSX {
  interface IntrinsicElements {
    // Add 'stripe-pricing-table' as a valid intrinsic element for JSX
    "stripe-pricing-table": {
      // Add specific attributes for the 'stripe-pricing-table' custom element
      "pricing-table-id": string;
      "publishable-key": string;
    };
  }
}
