/*
 * GeoEstate Mobile UI + Map Repair
 * Load this file AFTER the existing page scripts.
 */
(function () {
  'use strict';

  var STYLE_ID = 'geoestate-mobile-repair-style';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var css = `
      @media (max-width: 768px) {
        html, body {
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
          -webkit-text-size-adjust: 100%;
        }

        /* HEADER */
        .geo-nav {
          position: relative !important;
          z-index: 3000 !important;
        }

        .geo-nav-inner {
          width: 100% !important;
          min-width: 0 !important;
          display: flex !important;
          align-items: center !important;
        }

        .geo-nav-links {
          display: none !important;
        }

        .geo-nav-cta {
          margin-left: auto !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        /* HAMBURGER */
        .ge-mobile-menu-button {
          appearance: none !important;
          -webkit-appearance: none !important;
          display: inline-flex !important;
          position: relative !important;
          z-index: 3100 !important;
          flex: 0 0 42px !important;
          width: 42px !important;
          height: 42px !important;
          min-width: 42px !important;
          min-height: 42px !important;
          margin: 0 0 0 4px !important;
          padding: 8px !important;
          border: 0 !important;
          border-radius: 10px !important;
          background: transparent !important;
          color: currentColor !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          touch-action: manipulation !important;
        }

        .ge-mobile-menu-button .ge-menu-bars,
        .ge-mobile-menu-button .ge-menu-bars::before,
        .ge-mobile-menu-button .ge-menu-bars::after {
          content: "" !important;
          display: block !important;
          width: 23px !important;
          height: 2.5px !important;
          border-radius: 2px !important;
          background: currentColor !important;
        }

        .ge-mobile-menu-button .ge-menu-bars {
          position: relative !important;
        }

        .ge-mobile-menu-button .ge-menu-bars::before,
        .ge-mobile-menu-button .ge-menu-bars::after {
          position: absolute !important;
          left: 0 !important;
        }

        .ge-mobile-menu-button .ge-menu-bars::before {
          top: -7px !important;
        }

        .ge-mobile-menu-button .ge-menu-bars::after {
          top: 7px !important;
        }

        .ge-mobile-menu-button[aria-expanded="true"] .ge-menu-bars {
          background: transparent !important;
        }

        .ge-mobile-menu-button[aria-expanded="true"] .ge-menu-bars::before {
          top: 0 !important;
          transform: rotate(45deg) !important;
        }

        .ge-mobile-menu-button[aria-expanded="true"] .ge-menu-bars::after {
          top: 0 !important;
          transform: rotate(-45deg) !important;
        }

        /* MOBILE MENU */
        .ge-mobile-menu-panel {
          display: none !important;
          position: fixed !important;
          top: 74px !important;
          left: 10px !important;
          right: 10px !important;
          z-index: 2999 !important;
          max-height: calc(100dvh - 94px) !important;
          overflow-y: auto !important;
          padding: 10px !important;
          border-radius: 16px !important;
          background: rgba(16,24,20,.98) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,.28) !important;
          border: 1px solid rgba(255,255,255,.10) !important;
        }

        .ge-mobile-menu-panel.is-open {
          display: block !important;
        }

        .ge-mobile-menu-panel a {
          display: flex !important;
          width: 100% !important;
          min-height: 46px !important;
          box-sizing: border-box !important;
          align-items: center !important;
          padding: 11px 14px !important;
          border-radius: 10px !important;
          color: #fff !important;
          text-decoration: none !important;
          font-size: .92rem !important;
        }

        .ge-mobile-menu-panel a:hover,
        .ge-mobile-menu-panel a:active {
          background: rgba(255,255,255,.08) !important;
        }

        .ge-mobile-menu-backdrop {
          display: none !important;
          position: fixed !important;
          inset: 0 !important;
          z-index: 2998 !important;
          background: rgba(0,0,0,.28) !important;
        }

        .ge-mobile-menu-backdrop.is-open {
          display: block !important;
        }

        /* MAP */
        #map,
        #mapid,
        .leaflet-container,
        [id*="map-container"],
        [id*="mapContainer"] {
          width: 100% !important;
          min-width: 0 !important;
          height: 390px !important;
          min-height: 320px !important;
          max-height: none !important;
          position: relative !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
          background: #dfe5e2 !important;
        }

        .leaflet-container {
          z-index: 1 !important;
          font-family: inherit !important;
        }

        .leaflet-tile-container,
        .leaflet-tile-pane,
        .leaflet-map-pane {
          z-index: 1 !important;
        }

        .leaflet-tile {
          max-width: none !important;
          max-height: none !important;
          width: 256px !important;
          height: 256px !important;
        }

        .leaflet-control-container {
          z-index: 1000 !important;
        }

        .leaflet-control-zoom {
          margin-left: 10px !important;
          margin-top: 10px !important;
        }
      }

      @media (max-width: 480px) {
        #map,
        #mapid,
        .leaflet-container,
        [id*="map-container"],
        [id*="mapContainer"] {
          height: 350px !important;
          min-height: 300px !important;
        }
      }

      @media (min-width: 769px) {
        .ge-mobile-menu-button,
        .ge-mobile-menu-panel,
        .ge-mobile-menu-backdrop {
          display: none !important;
        }
      }
    `;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function findHeader() {
    return document.querySelector(
      '.geo-nav-inner, .geo-nav, header .geo-nav-inner, header'
    );
  }

  function findThemeButton(root) {
    return root && root.querySelector(
      '.theme-toggle, [aria-label*="theme" i], [aria-label*="dark" i], [title*="theme" i], [title*="dark" i]'
    );
  }

  function createMobileMenu() {
    if (window.innerWidth > 768) return;

    var root = findHeader();
    if (!root) return;

    var nav =
      document.querySelector('.geo-nav') ||
      root.closest('header') ||
      root;

    var existing = root.querySelector(
      '.ge-mobile-menu-button, #geo-hamburger, .geo-hamburger, .mobile-menu-toggle, .nav-toggle, .menu-toggle, button[aria-label*="menu" i], a[aria-label*="menu" i]'
    );

    var button = existing;

    if (!button) {
      button = document.createElement('button');

      button.type = 'button';
      button.className = 'ge-mobile-menu-button';
      button.setAttribute('aria-label', 'Open navigation menu');
      button.setAttribute('aria-expanded', 'false');

      button.innerHTML =
        '<span class="ge-menu-bars" aria-hidden="true"></span>';

      var theme = findThemeButton(root);
      var cta = root.querySelector('.geo-nav-cta');

      if (cta) {
        cta.insertBefore(button, theme || null);
      } else {
        root.appendChild(button);
      }
    } else {
      button.classList.add('ge-mobile-menu-button');

      if (!button.querySelector('.ge-menu-bars')) {
        button.innerHTML =
          '<span class="ge-menu-bars" aria-hidden="true"></span>';
      }
    }

    var panel =
      document.getElementById('ge-mobile-menu-panel');

    if (!panel) {
      panel = document.createElement('nav');

      panel.id = 'ge-mobile-menu-panel';
      panel.className = 'ge-mobile-menu-panel';
      panel.setAttribute('aria-label', 'Mobile navigation');

      var links =
        document.querySelector('.geo-nav-links');

      if (links) {
        var cloned = links.cloneNode(true);

        cloned.removeAttribute('id');
        cloned.classList.remove('geo-nav-links');

        panel.appendChild(cloned);
      } else {
        var anchors =
          document.querySelectorAll('.geo-nav a[href]');

        anchors.forEach(function (a) {
          var href = a.getAttribute('href');
          var label = (a.textContent || '').trim();

          if (!href || !label) return;

          var copy = a.cloneNode(true);

          panel.appendChild(copy);
        });
      }

      nav.appendChild(panel);
    }

    var backdrop =
      document.getElementById('ge-mobile-menu-backdrop');

    if (!backdrop) {
      backdrop = document.createElement('div');

      backdrop.id = 'ge-mobile-menu-backdrop';
      backdrop.className = 'ge-mobile-menu-backdrop';

      document.body.appendChild(backdrop);
    }

    if (!button.dataset.geBound) {
      button.dataset.geBound = '1';

      function closeMenu() {
        panel.classList.remove('is-open');
        backdrop.classList.remove('is-open');

        button.setAttribute(
          'aria-expanded',
          'false'
        );

        button.setAttribute(
          'aria-label',
          'Open navigation menu'
        );
      }

      function toggleMenu() {
        var open =
          !panel.classList.contains('is-open');

        if (open) {
          panel.classList.add('is-open');
          backdrop.classList.add('is-open');

          button.setAttribute(
            'aria-expanded',
            'true'
          );

          button.setAttribute(
            'aria-label',
            'Close navigation menu'
          );
        } else {
          closeMenu();
        }
      }

      button.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          e.stopPropagation();

          toggleMenu();
        }
      );

      backdrop.addEventListener(
        'click',
        closeMenu
      );

      panel.addEventListener(
        'click',
        function (e) {
          if (e.target.closest('a')) {
            closeMenu();
          }
        }
      );

      document.addEventListener(
        'keydown',
        function (e) {
          if (e.key === 'Escape') {
            closeMenu();
          }
        }
      );
    }
  }

  function getLeafletMaps() {
    if (!window.L || !window.L.Map) {
      return [];
    }

    var maps = [];

    if (Array.isArray(window.L.Map._instances)) {
      maps = maps.concat(
        window.L.Map._instances
      );
    }

    if (Array.isArray(window.L.Map._maps)) {
      maps = maps.concat(
        window.L.Map._maps
      );
    }

    return maps.filter(function (map, index) {
      return (
        map &&
        maps.indexOf(map) === index
      );
    });
  }

  function repairMapContainer() {
    var candidates =
      document.querySelectorAll(
        '#map, #mapid, .leaflet-container, [id*="map-container"], [id*="mapContainer"]'
      );

    candidates.forEach(function (el) {
      if (
        el.classList.contains(
          'leaflet-container'
        )
      ) {
        el.style.width = '100%';

        el.style.height =
          window.innerWidth <= 480
            ? '350px'
            : '390px';

        el.style.minHeight =
          window.innerWidth <= 480
            ? '300px'
            : '320px';
      }
    });

    var maps = getLeafletMaps();

    maps.forEach(function (map) {
      try {
        map.invalidateSize(true);

        var container =
          map.getContainer &&
          map.getContainer();

        if (!container) return;

        var tilePane =
          container.querySelector(
            '.leaflet-tile-pane'
          );

        var tileImages =
          container.querySelectorAll(
            '.leaflet-tile'
          );

        if (
          window.L.tileLayer &&
          tilePane &&
          tileImages.length === 0
        ) {
          if (
            !container.dataset.geTilesRestored
          ) {
            window.L.tileLayer(
              'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              {
                maxZoom: 19,
                attribution:
                  '&copy; OpenStreetMap contributors',
                crossOrigin: true
              }
            ).addTo(map);

            container.dataset.geTilesRestored = '1';
          }
        }

        setTimeout(function () {
          try {
            map.invalidateSize(true);
          } catch (_) {}
        }, 300);

      } catch (_) {}
    });
  }

  function createMapIfNeeded() {
    if (
      !window.L ||
      typeof window.L.map !== 'function'
    ) {
      return;
    }

    var mapEl =
      document.querySelector(
        '#map:not(.leaflet-container), #mapid:not(.leaflet-container), [id*="map-container"]:not(.leaflet-container), [id*="mapContainer"]:not(.leaflet-container)'
      );

    if (!mapEl) return;

    if (
      mapEl.dataset.geMapCreated === '1'
    ) {
      return;
    }

    try {
      mapEl.style.width = '100%';

      mapEl.style.height =
        window.innerWidth <= 480
          ? '350px'
          : '390px';

      mapEl.style.minHeight =
        window.innerWidth <= 480
          ? '300px'
          : '320px';

      var map =
        window.L.map(
          mapEl,
          {
            zoomControl: true,
            scrollWheelZoom: true,
            tap: true
          }
        ).setView(
          [9.0820, 8.6753],
          6
        );

      window.L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; OpenStreetMap contributors',
          crossOrigin: true
        }
      ).addTo(map);

      mapEl.dataset.geMapCreated = '1';

      setTimeout(
        function () {
          map.invalidateSize(true);
        },
        100
      );

    } catch (_) {}
  }

  function boot() {
    injectStyles();
    createMobileMenu();
    repairMapContainer();
    createMapIfNeeded();

    setTimeout(
      function () {
        createMobileMenu();
        repairMapContainer();
        createMapIfNeeded();
      },
      800
    );

    setTimeout(
      function () {
        repairMapContainer();
      },
      2000
    );
  }

  if (
    document.readyState === 'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      boot
    );
  } else {
    boot();
  }

  window.addEventListener(
    'resize',
    function () {
      if (window.innerWidth <= 768) {
        createMobileMenu();
      }

      repairMapContainer();
    }
  );

})();
