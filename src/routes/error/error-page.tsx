import { Classes } from '@blueprintjs/core';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div id="error-content">
        <h1>You fainted.</h1>
        <div className={Classes.CODE_BLOCK}>{(error as Error).message}</div>
        <br />
        <p>Please let the site maintainer know about this issue.</p>
        <p>
          You can find me, @malicious_banjo, in the{' '}
          <a href="https://discord.gg/4sBmXC55V6">MH3SP Discord Server.</a>
        </p>
      </div>
    </div>
  );
}
