export type SolutionBlock = {
  label: string;
  leftTitle?: string;
  leftText: string;
  rightTitle?: string;
  rightText: string;
  images: { src: string; alt?: string }[];
  impactTitle?: string;
  impactText?: string;
};

export type CaseStudy = {
  overview: string[];
  challenge: string[];
  researchTitle: string;
  researchIntro: string[];
  researchNotes: { title: string; points?: string[] }[];
  findingsTitle?: string;
  findingsIntro?: string[];
  findings?: { title: string; quotes: string[] }[];
  insightsTitle: string;
  insightsIntro: string[];
  insights: { title: string; description: string }[];
  solutionsTitle: string;
  solutionsIntro: string[];
  solutions: SolutionBlock[];
  outcomesTitle: string;
  outcomesIntro: string[];
  closingNote: string[];
  outcomes: { label: string; metric: string }[];
  learnedTitle: string;
  learned: string[];
};

export type Project = {
  slug: string;
  title: string;
  meta: string;
  tag: string;
  description: string;
  gradient: string;
  image?: string;
  caseStudy?: CaseStudy;
  /** Not shippable yet — hero image stays blurred, with a "Coming soon" lock overlay on hover. */
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    slug: "airtribe",
    title: "Airtribe - AI Learning Experience",
    meta: "EduTech, 2025",
    tag: "Product Design",
    description:
      "Designed an AI experience for the users to ease their learning experience through out the site.",
    gradient: "from-[#123600] to-[#005266]",
    image: "/images/case-studies/airtribe/frame-7.png",
    caseStudy: {
      overview: [
        "An AI-powered redesign of Airtribe's learning platform focused on helping learners navigate courses more confidently, reduce friction, and receive contextual AI assistance throughout their learning journey.",
        "Airtribe is a cohort-based edtech platform where professionals learn through live sessions, mentorship, assignments, and community-driven programs.",
      ],
      challenge: [
        "Although Airtribe offered quality learning content, the overall experience made it difficult for learners to understand where they were, what to do next, and how to make the most of the platform.",
        "My goal was to redesign the learning experience while exploring how AI could provide contextual assistance without overwhelming users.",
      ],
      researchTitle: "Breaking Down the Problem",
      researchIntro: [
        "To dig deeper, I broke the problem down into four areas: how learners moved through their course journey, how they navigated the platform, how information was prioritized, and how engaged they felt along the way.",
        "Each area became its own lens for uncovering exactly where the friction was coming from.",
      ],
      researchNotes: [
        {
          title: "Learning Journey",
          points: [
            "Users struggled to understand the overall course flow.",
            "Progress wasn't clearly communicated.",
          ],
        },
        {
          title: "Navigation",
          points: [
            "Finding recordings, assignments, and resources required unnecessary effort.",
            "Core sections felt disconnected.",
          ],
        },
        {
          title: "Information Hierarchy",
          points: [
            "Important actions competed for attention.",
            "Users had difficulty identifying priorities.",
          ],
        },
        {
          title: "Engagement",
          points: [
            "The platform lacked proactive guidance.",
            "Learners often had to search for information instead of receiving timely support.",
          ],
        },
      ],
      findingsTitle: "Research & Findings",
      findingsIntro: [
        "After reviewing the existing platform, studying the user journey, and comparing similar learning platforms, I found that most friction didn't come from the content itself — it came from how learners interacted with the platform.",
        "Users weren't looking for more features. They wanted a learning experience that felt structured, guided, and easy to navigate.",
        "The research highlighted four recurring themes that became the foundation of the redesign.",
      ],
      findings: [
        {
          title: "Learning Flow",
          quotes: [
            "Not sure where to start.",
            "The course journey feels confusing.",
            "I don't know what's coming next.",
          ],
        },
        {
          title: "Navigation",
          quotes: [
            "Finding recordings takes too many clicks.",
            "I keep jumping between different sections.",
            "Assignments and resources feel disconnected.",
          ],
        },
        {
          title: "Info. Hierarchy",
          quotes: ["Everything feels the same.", "Not sure what to do.", "Easy to miss updates."],
        },
        {
          title: "AI",
          quotes: [
            "Need instant answers.",
            "Resources are hard to find.",
            "Need tailored recommendations.",
          ],
        },
      ],
      insightsTitle: "Insights",
      insightsIntro: [
        "The research uncovered recurring patterns in user behavior that revealed where learners experienced the most friction. These insights guided the redesign and shaped every feature that followed.",
      ],
      insights: [
        {
          title: "Reduce cognitive load",
          description:
            "Learning should feel effortless. Surface only what's relevant instead of making learners process everything at once.",
        },
        {
          title: "Guide, don't overwhelm",
          description:
            "Instead of presenting every resource upfront, provide contextual guidance and clear next steps based on where the learner is in their journey.",
        },
        {
          title: "Context beats search",
          description:
            "Learners shouldn't have to remember where information lives. Answers should appear within the context of the task they're already doing.",
        },
        {
          title: "AI should augment, not replace",
          description:
            "AI is most valuable when it supports mentors and learners with summaries, recommendations, and guidance — not when it attempts to replace human teaching.",
        },
      ],
      solutionsTitle: "Solutions",
      solutionsIntro: ["The redesign focused on solving the most critical pain points uncovered during research."],
      solutions: [
        {
          label: "AI Learning Companion",
          leftText:
            "Learners spent too much time searching for answers across recordings, discussions, and resources.",
          rightTitle: "Why this solution",
          rightText:
            "Redesigned the hero around a stronger value proposition with supporting visuals and clear CTAs.",
          images: [{ src: "/images/case-studies/airtribe/cs-image-12.png", alt: "AI learning companion" }],
          impactTitle: "Impact",
          impactText: "Faster access to information, reduced friction, and a more guided learning experience.",
        },
        {
          label: "Redesigned Dashboard",
          leftText: "Users couldn't quickly understand their progress or what required attention.",
          rightText: "Highlights priorities, upcoming sessions, and progress in a single, easy-to-scan view.",
          images: [
            { src: "/images/case-studies/airtribe/cs-screenshot-before.png", alt: "Before" },
            { src: "/images/case-studies/airtribe/cs-image-5-after.png", alt: "After" },
          ],
          impactTitle: "Why it works",
          impactText: "Learners can see exactly what needs attention at a glance, without digging through multiple screens.",
        },
        {
          label: "Simplified Navigation",
          leftText: "Finding recordings, assignments, and resources required unnecessary effort.",
          rightText: "Users can reach core sections faster with a more predictable navigation experience.",
          images: [
            { src: "/images/case-studies/airtribe/cs-ai-curated-section.png", alt: "AI curated section" },
            { src: "/images/case-studies/airtribe/cs-quick-notes.png", alt: "Quick notes" },
            { src: "/images/case-studies/airtribe/cs-container.png", alt: "Workspace container" },
            { src: "/images/case-studies/airtribe/cs-projects-mock.png", alt: "Projects" },
          ],
        },
        {
          label: "Improved Information Hierarchy",
          leftText: "Important information competed equally for attention.",
          rightTitle: "Why it works",
          rightText: "Reorganized content using stronger hierarchy, spacing, and visual emphasis.",
          images: [
            { src: "/images/case-studies/airtribe/cs-image-6.png" },
            { src: "/images/case-studies/airtribe/cs-image-12.png" },
            { src: "/images/case-studies/airtribe/cs-image-7.png" },
          ],
          impactTitle: "Impact",
          impactText: "Users can identify priorities at a glance and make decisions more confidently.",
        },
      ],
      outcomesTitle: "Outcomes",
      outcomesIntro: [
        "The redesign focused on creating a clearer and more guided learning experience by simplifying navigation, improving information hierarchy, and introducing contextual AI support.",
      ],
      closingNote: ["You've officially graduated from this case study.", "Time to enroll in the next one."],
      outcomes: [
        { label: "Clear Learning Journey", metric: "↓ Cognitive Load (Qualitative)" },
        { label: "Faster Navigation", metric: "3 → 1 Clicks" },
        { label: "Contextual AI Support", metric: "24/7 Assistance" },
        { label: "Better Information Hierarchy", metric: "↑ Task Visibility" },
      ],
      learnedTitle: "What I Learned",
      learned: [
        "This project helped me think beyond just designing screens. I learned how small UX decisions can shape the entire learning experience and how AI should solve real user problems instead of being added just because it's trending.",
      ],
    },
  },
  {
    slug: "kodex",
    title: "Kodex",
    meta: "BASENINE, 2026",
    tag: "Web Redesign",
    description: "Redesigning Kodex's digital experience for enterprise customers.",
    gradient: "from-[#7f5d83] to-[#7c7340]",
    image: "/images/case-studies/kodex/kodex-screenshot.png",
    caseStudy: {
      overview: [
        "Kodex is a B2B compliance platform that helps organizations integrate regulatory workflows into their existing systems.",
        "Redesigning the marketing website to better communicate the product, improve usability, and create a stronger enterprise-first experience.",
      ],
      challenge: [
        "The existing website didn't effectively communicate the value of the product. Technical information was difficult to digest, navigation lacked structure, and the overall experience didn't reflect the maturity of the platform.",
      ],
      researchTitle: "Understanding the Existing Experience",
      researchIntro: ["After reviewing the existing website, I identified several areas that created friction for users."],
      researchNotes: [
        { title: "Product messaging wasn't immediately clear." },
        { title: "Important content lacked visual hierarchy." },
        { title: "Navigation made exploration feel difficult." },
        { title: "Enterprise trust wasn't communicated effectively." },
        { title: "Visual consistency varied across pages." },
      ],
      insightsTitle: "Design Goals",
      insightsIntro: [
        "After identifying the key pain points, I defined a few design goals that guided the entire redesign. The focus wasn't just on improving the UI, but on making the experience clearer, easier to navigate, and more aligned with how enterprise users explore and understand a product like Kodex.",
      ],
      insights: [
        {
          title: "Product Clarity",
          description: "Help visitors understand what Kodex does within the first few seconds.",
        },
        {
          title: "Enterprise Trust",
          description: "Create a premium visual language that reflects the maturity of the platform.",
        },
        {
          title: "Simplify Navigation",
          description: "Reduce friction and make important information easier to discover.",
        },
        {
          title: "Drive Conversions",
          description:
            "Design clear user journeys that naturally lead visitors toward booking a demo or exploring documentation.",
        },
      ],
      solutionsTitle: "The Redesign",
      solutionsIntro: ["The redesign focused on solving the most critical pain points uncovered during research."],
      solutions: [
        {
          label: "Hero Experience",
          leftText: "The hero section didn't clearly communicate Kodex's value proposition.",
          rightTitle: "Why this solution",
          rightText:
            "Redesigned the hero with stronger messaging, supporting visuals, and clear primary actions to immediately explain the platform.",
          images: [{ src: "/images/case-studies/kodex/kx-hero-image.png", alt: "Kodex hero redesign" }],
          impactTitle: "Why it works",
          impactText: "Visitors understand what Kodex does within seconds and know where to go next.",
        },
        {
          label: "Information Architecture & Navigation",
          leftText:
            "Users had difficulty discovering products, industries, and integrations due to an unstructured navigation system.",
          rightText: "Reorganized the navigation around user intent and introduced a clearer information architecture.",
          images: [
            { src: "/images/case-studies/kodex/kx-nav-frame2.png" },
            { src: "/images/case-studies/kodex/kx-nav-frame1.png" },
            { src: "/images/case-studies/kodex/kx-nav-image9.png" },
          ],
          impactTitle: "Why it works",
          impactText: "Makes exploring the platform more intuitive while reducing decision fatigue.",
        },
        {
          label: "Product Storytelling",
          leftText: "Complex compliance workflows were difficult to understand through text-heavy sections.",
          rightText: "Rebuilt product pages using modular layouts, visual storytelling, and clearer content hierarchy.",
          images: [
            { src: "/images/case-studies/kodex/kx-story-image10.png" },
            { src: "/images/case-studies/kodex/kx-story-image11.png" },
          ],
          impactTitle: "Why it works",
          impactText: "Transforms technical information into content that's easier to scan and understand.",
        },
        {
          label: "Enterprise Trust",
          leftText: "The website lacked visual elements that reinforced credibility and trust.",
          rightTitle: "Why it works",
          rightText:
            "Introduced stronger typography, consistent spacing, customer logos, supporting visuals, and enterprise-focused layouts.",
          images: [
            { src: "/images/case-studies/kodex/kx-trust-chart.png" },
            { src: "/images/case-studies/kodex/kx-trust-frame1.png" },
            { src: "/images/case-studies/kodex/kx-trust-frame3.png" },
            { src: "/images/case-studies/kodex/kx-trust-frame2.png" },
          ],
          impactTitle: "Impact",
          impactText: "Creates a more credible and professional experience for enterprise buyers.",
        },
      ],
      outcomesTitle: "Outcomes",
      outcomesIntro: [
        "The redesign transformed Kodex's website into a clearer, more structured experience that better communicates the product while reinforcing trust with enterprise customers.",
      ],
      closingNote: [
        "Phew... that was a lot of compliance.",
        "Thanks for sticking around. Let's move on to something a little less regulated.",
      ],
      outcomes: [
        { label: "Clearer Product Communication", metric: "↓ Learning Curve" },
        { label: "Improved Navigation", metric: "3 → 1 Navigation Path" },
        { label: "Stronger Enterprise Trust", metric: "↑ Brand Trust" },
        { label: "Conversion-Focused Journey", metric: "↑ CTA Visibility" },
      ],
      learnedTitle: "What I Learned",
      learned: [
        "Working on Kodex taught me that designing for B2B products goes beyond creating clean interfaces — it's about simplifying complex ideas and communicating them with clarity. I also learned how to balance stakeholder feedback, business goals, and technical constraints while building a scalable experience that feels intuitive, trustworthy, and ready to grow.",
      ],
    },
  },
  {
    slug: "uniqkey",
    title: "Uniqkey",
    meta: "BASENINE, 2026",
    tag: "Web Design",
    description: "Designing a landing page that turns security awareness into action.",
    gradient: "from-[#3a4855] to-[#545b3c]",
    image: "/images/case-studies/uniqkey/uniqkey-screenshot.png",
    caseStudy: {
      overview: [
        "Uniqkey is a European password and access management platform that helps businesses secure employee credentials and manage access across their organization.",
        "Design a focused landing page that explains Data Breach Monitoring in a simple way, builds trust, and encourages businesses to assess their security posture.",
      ],
      challenge: [
        "Data breach monitoring is a technical topic that can easily overwhelm visitors. The challenge was to communicate the value of the feature in a way that felt approachable, trustworthy, and conversion-focused without sacrificing technical credibility.",
      ],
      researchTitle: "Understanding the Existing Experience",
      researchIntro: [
        "I reviewed how information was presented and how users progressed through the page to identify opportunities for improving clarity and conversions.",
      ],
      researchNotes: [
        { title: "Technical messaging felt overwhelming." },
        { title: "Important benefits lacked emphasis." },
        { title: "Value proposition wasn't immediately obvious." },
        { title: "The page needed a stronger narrative flow." },
        { title: "Calls-to-action could be more prominent." },
      ],
      insightsTitle: "Design Goals",
      insightsIntro: [
        "The redesign focused on balancing technical depth with simplicity while guiding visitors toward meaningful action.",
      ],
      insights: [
        {
          title: "Complex Security Concepts",
          description: "Make cybersecurity easier for non-technical decision makers.",
        },
        {
          title: "Enterprise Trust",
          description: "Use visual hierarchy and credibility cues to reinforce confidence.",
        },
        {
          title: "Improve Storytelling",
          description: "Create a logical flow that gradually explains the problem and solution.",
        },
        {
          title: "Drive Conversions",
          description: "Design a clearer path toward trying the feature or booking a demo.",
        },
      ],
      solutionsTitle: "The Redesign",
      solutionsIntro: ["The redesign focused on solving the most critical pain points uncovered during research."],
      solutions: [
        {
          label: "Hero Experience",
          leftText: "The hero didn't immediately explain why data breach monitoring matters.",
          rightTitle: "Why this solution",
          rightText:
            "Redesigned the hero around a stronger value proposition with supporting visuals and clear CTAs.",
          images: [{ src: "/images/case-studies/uniqkey/uk-hero-image.png", alt: "Uniqkey hero redesign" }],
          impactTitle: "Why it works",
          impactText: "Visitors immediately understand the problem and how Uniqkey solves it.",
        },
        {
          label: "Problem & Risk Communication",
          leftText: "The impact of a data breach wasn't clearly communicated.",
          rightText: "Introduced structured content and visual storytelling to explain the risks and their business impact.",
          images: [
            { src: "/images/case-studies/uniqkey/uk-risk-frame2.png" },
            { src: "/images/case-studies/uniqkey/uk-risk-frame3.png" },
            { src: "/images/case-studies/uniqkey/uk-risk-frame1.png" },
          ],
          impactTitle: "Why it works",
          impactText: "Creates urgency without overwhelming users.",
        },
        {
          label: "Feature Breakdown",
          leftText: "Core features were buried within large blocks of content.",
          rightText: "Redesigned feature sections using modular cards, icons, and concise explanations.",
          images: [
            { src: "/images/case-studies/uniqkey/uk-feature-frame4.png" },
            { src: "/images/case-studies/uniqkey/uk-feature-frame2.png" },
            { src: "/images/case-studies/uniqkey/uk-feature-frame1.png" },
            { src: "/images/case-studies/uniqkey/uk-feature-frame3.png" },
          ],
          impactTitle: "Why it works",
          impactText: "Makes capabilities easier to scan and compare.",
        },
        {
          label: "Trust & Credibility",
          leftText: "The page lacked enough proof to reassure enterprise buyers.",
          rightTitle: "Why it works",
          rightText: "Added stronger trust signals through testimonials, certifications, and supporting visuals.",
          images: [
            { src: "/images/case-studies/uniqkey/uk-trust-image1.png" },
            { src: "/images/case-studies/uniqkey/uk-trust-image2.png" },
          ],
          impactTitle: "Impact",
          impactText: "Builds confidence before users reach the CTA.",
        },
      ],
      outcomesTitle: "Outcomes",
      outcomesIntro: [
        "The redesign focused on creating a clearer, more structured experience that better communicates the product while making it easier for enterprise users to explore, understand, and take action.",
      ],
      closingNote: [
        "Phew... that was a lot of breach talk.",
        "Thanks for sticking around. Let's move on to something a little less alarming.",
      ],
      outcomes: [
        { label: "Clearer Security Communication", metric: "↓ Complexity" },
        { label: "Stronger Storytelling", metric: "1 Clear User Journey" },
        { label: "Enterprise-ready Experience", metric: "↑ Brand Trust" },
        { label: "Better Conversion Flow", metric: "↑ CTA Visibility" },
      ],
      learnedTitle: "What I Learned",
      learned: [
        "Designing for cybersecurity taught me that users don't need every technical detail upfront — they need clarity, confidence, and a clear understanding of why the product matters. This project strengthened my ability to simplify complex topics while designing experiences that educate, build trust, and encourage action.",
      ],
    },
  },
  {
    slug: "khaata",
    title: "Khaata",
    meta: "FinTech, 2026",
    tag: "FinTech",
    description: "Your finance, tracked.",
    gradient: "from-[#1f6f4f] to-[#123a5e]",
    image: "/images/case-studies/khaata/khaata-app.png",
    comingSoon: true,
  },
];
