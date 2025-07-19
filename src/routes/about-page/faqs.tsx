export interface FAQ {
  /** Unique identifier for this FAQ */
  id: string;
  question: string;
  answer: JSX.Element;
}

/**
 * Collection of frequently asked questions
 */
export const faqs: FAQ[] = [
  {
    id: 'why',
    question: 'Why make this? What was wrong with the StillTruth calculator?',
    answer: (
      <>
        <p>
          The damage calculator people currently use is no longer maintained; it
          exists in a half-broken state via the Internet Archive. It also has a
          few noteworthy errors such as incorrect math for Lance, Longsword,
          Elder Dragon and Deviljho calculations.
        </p>
        <p>
          I wanted to provide a modern site that can be updated/improved with
          feedback from the community.
        </p>
      </>
    )
  },
  {
    id: 'what-else',
    question: `What else will this website provide?`,
    answer: (
      <>
        <p>
          I'm not sure! I have access to most information like quests, armor,
          skills, and items. What would you like to see?
        </p>
      </>
    )
  },
  {
    id: 'accuracy',
    question: 'How do you know your calculations are correct?',
    answer: (
      <>
        <p>
          Input data such as monster hitzones, tolerances, stagger limits, etc
          has been published by other members of the community (see
          <i> Acknowledgements</i>).
        </p>
        <p>
          I have verified it to the best of my ability using a Monster Info
          gecko code, and in a few cases found errors in the original data.
        </p>
      </>
    )
  },
  {
    id: 'contact',
    question: 'I have a request/correction. How can I contact the developer?',
    answer: (
      <>
        <p>
          You can find me, @malicious_banjo, in the{' '}
          <a href="https://discord.gg/4sBmXC55V6">MH3SP Discord Server.</a>
        </p>
        <p>
          Updates might be slow. Rest assured that I <i>am</i> working on it in
          my free time.
        </p>
      </>
    )
  }
];
