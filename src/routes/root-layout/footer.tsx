/**
 * Application footer, contains attribution
 */
export function Footer() {
  return (
    <footer>
      <div>
        <div id="app-version">
          <a
            target="_blank"
            href="https://github.com/maliciousbanjo/mhtribrary"
          >
            MH Tribrary v{__APP_VERSION__}
          </a>
        </div>
        <div>This site is not affiliated with Capcom Co., Ltd.</div>
        <div>
          Monster Hunter Tri is a registered trademark of Capcom Co., Ltd.
        </div>
      </div>
    </footer>
  );
}
