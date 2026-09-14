/**
 * WebMCP tools for Synodic (document.modelContext).
 * No-ops in browsers that do not implement WebMCP.
 */
(function registerSynodicWebMCP() {
  const APP_STORE = 'https://apps.apple.com/in/app/synodic/id6787108404';
  const TESTFLIGHT = 'https://testflight.apple.com/join/FhpCu3CZ';
  const SUPPORT_EMAIL = 'support@synodic.app';

  const PRIVACY = {
    title: 'Synodic Privacy Policy',
    headline: 'We collect nothing.',
    effectiveDate: 'July 18, 2026',
    page: 'privacy.html',
    contactEmail: SUPPORT_EMAIL,
    summary:
      'Synodic does not collect, store, transmit, sell, or share any personal data. All moon-phase calculations run on the device. There is no account, no network use, and no tracking.',
    sections: [
      {
        heading: 'Data we collect',
        body: 'Synodic does not collect, store, transmit, sell, or share any personal data. There are no accounts, no sign-ins, and no forms.',
      },
      {
        heading: 'How the app works',
        body: 'All moon-phase information — phase, illumination, and cycle position — is computed entirely on the device from the device clock. The app makes no network requests and requires no internet connection.',
      },
      {
        heading: 'Analytics and tracking',
        body: 'Synodic contains no analytics, no advertising, no tracking technologies, and no third-party SDKs.',
      },
      {
        heading: 'Permissions',
        body: 'Synodic does not request access to location, contacts, photos, camera, microphone, or any other protected data.',
      },
      {
        heading: "Children's privacy",
        body: 'Because Synodic collects no data from anyone, it collects no data from children.',
      },
      {
        heading: 'Changes to this policy',
        body: 'If a future version of Synodic ever handles data differently, this policy will be updated before that version ships, with a new effective date.',
      },
      {
        heading: 'Contact',
        body: 'Questions about this policy: ' + SUPPORT_EMAIL,
      },
    ],
  };

  const SUPPORT = {
    title: 'Help with Synodic',
    lastUpdated: 'August 4, 2026',
    page: 'support.html',
    email: SUPPORT_EMAIL,
    platforms: 'iPhone and iPad',
    requires: 'iOS 17 or later',
    intro:
      'Synodic is a moon-phase viewer for iPhone and iPad. It requires iOS 17 or later. Email ' +
      SUPPORT_EMAIL +
      ' if something is not working or you have a question.',
    faqs: [
      {
        q: 'What does Synodic actually show?',
        a: "The Moon's current phase for your location's date and time — its shape, how much of the disc is lit, and where it sits in the current cycle. Nothing more.",
      },
      {
        q: 'Why only one cycle?',
        a: 'Synodic is deliberately built around the present synodic month — the 29.5 days from one new moon to the next. It is a viewer for tonight, not an almanac.',
      },
      {
        q: 'Does it need an internet connection?',
        a: 'No. Every phase is calculated on your device from its clock, so the app works in airplane mode and in the middle of nowhere.',
      },
      {
        q: 'Are there notifications?',
        a: 'Not yet. Full-moon and new-moon reminders are the most requested addition and are on the list for a future update.',
      },
      {
        q: 'The phase looks wrong to me.',
        a: "Check that your device's date, time, and time zone are set automatically in Settings → General → Date & Time. Phase drawings can also look inverted if you are comparing a Northern-Hemisphere illustration with a Southern-Hemisphere sky.",
      },
      {
        q: 'How do I get the app?',
        a: 'Download Synodic from the App Store, or join the TestFlight beta from the home page for the latest builds. Requires iOS 17 or later.',
      },
      {
        q: 'How do I join or leave the beta?',
        a: "Install Apple's TestFlight app and open the invite link from the home page. To leave, open TestFlight, tap Synodic, and choose Stop Testing.",
      },
      {
        q: 'How do I delete the app and my data?',
        a: 'Touch and hold the icon on your Home Screen and choose Delete App. Because Synodic stores nothing off-device, deleting the app removes everything.',
      },
    ],
    reportingAProblem: {
      intro: 'To help us fix things quickly, include the following in your email:',
      include: [
        'Your iPhone model and iOS version (Settings → General → About)',
        'The Synodic version in Settings, or the build number shown in TestFlight',
        'What you expected to see, and what you saw instead',
        'A screenshot or screen recording, if the issue is visual',
      ],
    },
    accessibility:
      'If you hit an accessibility barrier — VoiceOver, Dynamic Type, contrast, or anything else — email ' +
      SUPPORT_EMAIL +
      ' and it will be treated as a bug, not a feature request.',
    privacySummary:
      'Synodic collects no data of any kind. Everything is computed on your device. See the privacy policy for the full text.',
  };

  const INFO = {
    name: 'Synodic',
    tagline: 'The moon. Nothing else.',
    description:
      'A minimalist moon-phase viewer for iPhone and iPad. It shows tonight’s phase, illumination, and the current synodic month as a quiet animation. No accounts, no network calls, no analytics.',
    platforms: ['iPhone', 'iPad'],
    requires: 'iOS 17 or later',
    appStoreUrl: APP_STORE,
    testflightUrl: TESTFLIGHT,
    support: {
      email: SUPPORT.email,
      page: SUPPORT.page,
      lastUpdated: SUPPORT.lastUpdated,
    },
    privacy: {
      headline: PRIVACY.headline,
      effectiveDate: PRIVACY.effectiveDate,
      summary: PRIVACY.summary,
      page: PRIVACY.page,
    },
  };

  function context() {
    return document.modelContext || navigator.modelContext || null;
  }

  async function register(ctx, tool) {
    try {
      await ctx.registerTool(tool);
    } catch (err) {
      console.warn('[webmcp] ' + tool.name, err);
    }
  }

  function matchFaq(topic) {
    if (!topic) return SUPPORT.faqs;
    const needle = String(topic).toLowerCase();
    const hits = SUPPORT.faqs.filter(function (faq) {
      return (faq.q + ' ' + faq.a).toLowerCase().indexOf(needle) !== -1;
    });
    return hits.length ? hits : SUPPORT.faqs;
  }

  async function init() {
    const ctx = context();
    if (!ctx || typeof ctx.registerTool !== 'function') return;

    await register(ctx, {
      name: 'get_synodic_info',
      title: 'Get Synodic app info',
      description:
        'Returns what Synodic is, supported platforms (iPhone and iPad, iOS 17 or later), download links, and short pointers to privacy and support. Use get_privacy_policy or get_support_info for the full text.',
      inputSchema: { type: 'object', properties: {} },
      annotations: {
        readOnlyHint: true,
        consequentialHint: false,
        untrustedContentHint: false,
      },
      execute: async function () {
        return JSON.stringify(INFO);
      },
    });

    await register(ctx, {
      name: 'get_privacy_policy',
      title: 'Get privacy policy',
      description:
        'Returns the full Synodic privacy policy: data collection (none), on-device calculation, no analytics or tracking, no permissions, children’s privacy, how the policy is updated, and the contact email. Use this when the user asks what data the app collects or whether it is private.',
      inputSchema: { type: 'object', properties: {} },
      annotations: {
        readOnlyHint: true,
        consequentialHint: false,
        untrustedContentHint: false,
      },
      execute: async function () {
        return JSON.stringify(PRIVACY);
      },
    });

    await register(ctx, {
      name: 'get_support_info',
      title: 'Get support information',
      description:
        'Returns Synodic support details: contact email, platform requirements, FAQs (what the app shows, offline use, notifications, wrong phase, App Store vs TestFlight, deleting data), how to report a problem, and accessibility. Optional topic filters FAQs.',
      inputSchema: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description:
              'Optional keyword to filter FAQs, such as notifications, beta, offline, phase, delete, or App Store.',
          },
        },
      },
      annotations: {
        readOnlyHint: true,
        consequentialHint: false,
        untrustedContentHint: false,
      },
      execute: async function (args) {
        const topic = args && args.topic;
        return JSON.stringify({
          title: SUPPORT.title,
          lastUpdated: SUPPORT.lastUpdated,
          page: SUPPORT.page,
          email: SUPPORT.email,
          platforms: SUPPORT.platforms,
          requires: SUPPORT.requires,
          intro: SUPPORT.intro,
          faqs: matchFaq(topic),
          reportingAProblem: SUPPORT.reportingAProblem,
          accessibility: SUPPORT.accessibility,
          privacySummary: SUPPORT.privacySummary,
        });
      },
    });

    await register(ctx, {
      name: 'contact_support',
      title: 'Contact support',
      description:
        'Starts an email to support@synodic.app. Use after get_support_info if the user wants to write in. Mention that bug reports should include iPhone model, iOS version, the Synodic version, and what they expected versus what they saw.',
      inputSchema: { type: 'object', properties: {} },
      annotations: {
        readOnlyHint: false,
        consequentialHint: false,
        untrustedContentHint: false,
      },
      execute: async function () {
        window.location.href = 'mailto:' + SUPPORT_EMAIL + '?subject=' + encodeURIComponent('Synodic support');
        return JSON.stringify({
          opened: 'mailto',
          email: SUPPORT_EMAIL,
          include: SUPPORT.reportingAProblem.include,
        });
      },
    });

    await register(ctx, {
      name: 'open_app_store',
      title: 'Open App Store',
      description:
        'Opens the Synodic page on the Apple App Store so the user can download the app. Requires iOS 17 or later.',
      inputSchema: { type: 'object', properties: {} },
      annotations: {
        readOnlyHint: false,
        consequentialHint: false,
        untrustedContentHint: false,
      },
      execute: async function () {
        window.location.href = APP_STORE;
        return 'Opening the Synodic App Store listing.';
      },
    });

    await register(ctx, {
      name: 'join_testflight_beta',
      title: 'Join TestFlight beta',
      description:
        'Opens the public TestFlight invite so the user can install the Synodic beta. Requires iOS 17 or later.',
      inputSchema: { type: 'object', properties: {} },
      annotations: {
        readOnlyHint: false,
        consequentialHint: false,
        untrustedContentHint: false,
      },
      execute: async function () {
        window.location.href = TESTFLIGHT;
        return 'Opening the Synodic TestFlight beta invite.';
      },
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
