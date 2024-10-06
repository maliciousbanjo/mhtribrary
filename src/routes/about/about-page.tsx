import classNames from 'classnames';
import { faqs } from './faqs';
import React from 'react';

export function AboutPage() {
  /**
   * 1. Why make this?
   * 2. Sources/Credit
   * 3.
   */
  return (
    <div className={classNames(['page', 'about'])}>
      <div className="faqs">
        <h1>Frequently Asked Questions</h1>
        {faqs.map(faq => (
          <React.Fragment key={faq.id}>
            <div className="question">
              <h2>{faq.question}</h2>
            </div>
            <div className="answer">{faq.answer}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="acknowledgements">
        <h1>Acknowledgements</h1>
        <p>
          Much of this information was found using the original community
          websites from 2010-2014 via the Internet Archive.
        </p>
        <p>
          I was unable to contact the original authors directly. If you are one
          of these people please reach out!
        </p>
        <div className="credits">
          <ul>
            <li>
              The{' '}
              <a href="https://gamefaqs.gamespot.com/wii/943655-monster-hunter-tri/faqs/59207">
                Blademaster Damage Formula
              </a>{' '}
              was discovered by GameFAQs users Lord Grahf and DS31.
            </li>
            <li>
              Game data was provided via the original{' '}
              <a href="https://web.archive.org/web/20130407144830/http://mhtri.stilltruth.com/">
                MHTri.StillTruth.com
              </a>{' '}
              (archive link) website, created by Capcom Unity user Feox
            </li>
            <li>
              Quest IDs were discovered thanks to the{' '}
              <a href="http://mh3analysis.web.fc2.com/quest/">MH3 Analysis</a>{' '}
              website.
            </li>
            <li>
              A proper understanding of monster HP was discovered Discord user
              Ze Spyro, a developer of the MH3SP project.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
