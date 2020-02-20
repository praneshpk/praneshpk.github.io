import React, { useEffect } from 'react';
import './Nav.scss';

export default function Nav({ anchors = [] }) {
  document.onkeypress = (e) => {
    for (let i = 0; i < anchors.length; i++) {
      if (e.key === anchors[i][0].toLowerCase()) {
        window.location.hash = `#${anchors[i].toLowerCase()}`;
        break;
      }
    }
  };

  // Update anchor and navbar state based on position
  function updateAnchor(a) {
    const anchor = a ? a.toLowerCase() : anchors[0].toLowerCase();
    const links = document.querySelectorAll('nav li');
    let found = false;

    links.forEach((e) => {
      if (e.dataset.key.toLowerCase() === anchor) {
        e.classList.add('active');
        window.history.replaceState({}, '', `#/${anchor}`);
        found = true;
      } else {
        e.classList.remove('active');
      }
    });
    if (!found) {
      links[0].classList.add('active');
      window.location = `#/${anchors[0].toLowerCase()}`;
    }
  }

  // Attach updateAnchor to scroll event
  document.addEventListener('wheel', (evt) => {
    const index = Math.ceil(evt.pageY / window.innerHeight) - 1;
    updateAnchor(anchors[index]);
  }, { capture: false, passive: true });


  // Scroll to correct section on pageload
  useEffect(() => {
    window.addEventListener('hashchange', (evt) => updateAnchor(evt.currentTarget.location.hash.substr(2)));

    const hash = window.location.hash.substr(2);
    updateAnchor(hash);

    const nav = document.querySelector('nav');
    const index = [...nav.children].findIndex((e) => e.className === 'active') - 1;
    window.scrollTo(0, index * window.innerHeight);
  });

  return (
    <nav>
      <ul>
        {anchors.map((e) => (
          <li data-key={e}>
            <a href={`#${e.toLowerCase()}`}>{e}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}