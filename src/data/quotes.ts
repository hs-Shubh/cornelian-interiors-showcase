export interface DesignQuote {
  quote: string;
  author: string;
}

/** Curated interior / design quotes used across the site. */
export const designQuotes: DesignQuote[] = [
  {
    quote: "The details are not the details. They make the design.",
    author: "Charles Eames",
  },
  {
    quote:
      "Have nothing in your house that you do not know to be useful, or believe to be beautiful.",
    author: "William Morris",
  },
  {
    quote:
      "Your home should tell the story of who you are, and be a collection of what you love.",
    author: "Nate Berkus",
  },
  {
    quote: "Luxury must be comfortable, otherwise it is not luxury.",
    author: "Coco Chanel",
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    quote:
      "A room should never allow the eye to settle in one place. It should smile at you and create fantasy.",
    author: "Juan Montoya",
  },
];

export const quoteByIndex = (i: number): DesignQuote =>
  designQuotes[((i % designQuotes.length) + designQuotes.length) % designQuotes.length];
