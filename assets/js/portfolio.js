/**
 * RAVEMARK - Portfolio Filtering & Case Study Modal Viewer
 * Provides interactive category switching and deep-dive case studies
 */

const caseStudiesData = {
  'lumina-rebrand': {
    title: 'Lumina Tech Rebrand & Multi-City Blitz',
    client: 'Lumina Systems Inc.',
    category: 'Brand & Traditional',
    metric: '+280% Brand Recall',
    stat1: { val: '+280%', lbl: 'Brand Recall Surge' },
    stat2: { val: '45+', lbl: 'Metro Billboards Placed' },
    stat3: { val: '3.4x', lbl: 'Inbound Pipeline Growth' },
    challenge: 'Lumina was a high-growth B2B enterprise tech firm suffering from a generic visual identity and zero offline brand presence. Prospective enterprise clients felt their brand lacked gravitas and authority.',
    strategy: 'Ravemark developed a razor-sharp, futuristic brand architecture, complete with metallic typography guidelines, tactile collateral, and an aggressive 6-city prime transit and billboard takeover timed with their annual flagship summit.',
    deliverables: [
      'Comprehensive Visual Identity & Corporate Design Guidelines',
      'High-impact OOH Metro Billboard campaign across 6 Tier-1 cities',
      'Executive launch event production with custom lighting & stage design',
      'Interactive executive presentation decks and tactile investor stationery'
    ]
  },
  'apex-digital': {
    title: 'Apex Motors Omnichannel Performance Engine',
    client: 'Apex Electric Mobility',
    category: 'Digital Growth',
    metric: '4.8x ROAS',
    stat1: { val: '4.8x', lbl: 'Average ROAS' },
    stat2: { val: '12.5M+', lbl: 'High-Intent Impressions' },
    stat3: { val: '-42%', lbl: 'Customer Acquisition Cost' },
    challenge: 'Apex Electric launched a new line of premium commuter EVs but struggled to convert ad clicks into scheduled test drives and showroom walk-ins in competitive urban clusters.',
    strategy: 'We deployed full-funnel Meta & Google Performance Max campaigns coupled with hyperlocal geo-fenced mobile ads around competing dealerships and high-converting video creative showing instant acceleration and battery savings.',
    deliverables: [
      'Hyper-segmented Meta, YouTube & Google Search ad architecture',
      '35+ high-energy short-form video ads showcasing vehicle aesthetics',
      'Automated WhatsApp lead capture and instant dealership routing',
      'Custom real-time attribution and CRM revenue tracking dashboard'
    ]
  },
  'velvet-ooh': {
    title: 'Velvet & Oak Luxury Mall & Outdoor Curation',
    client: 'Velvet & Oak Haute Couture',
    category: 'OOH & Experiential',
    metric: '18,000+ Footfalls',
    stat1: { val: '18,000+', lbl: 'Opening Weekend Footfall' },
    stat2: { val: '2.8M', lbl: 'Social Impressions' },
    stat3: { val: '100%', lbl: 'VIP Capacity Attained' },
    challenge: 'Launching a flagship luxury boutique requires an experiential spectacle that digital alone cannot create. Velvet & Oak needed an unforgettable physical presence that drove affluent foot traffic.',
    strategy: 'Ravemark orchestrated an immersive sensory launch activation: large-format backlit monolithic airport displays, bespoke luxury invitations, and a VIP opening evening covered by top fashion media and tastemakers.',
    deliverables: [
      'Strategic airport corridor backlit monoliths & transit displays',
      'Bespoke velvet-embossed physical invitations with personalized QR codes',
      'End-to-end launch event management with curated influencer guest list',
      'Tier-1 lifestyle press release coverage and print magazine features'
    ]
  },
  'pulse-energy': {
    title: 'Pulse Hydration Viral Influencer & Social Blitz',
    client: 'Pulse Nutrition Global',
    category: 'Digital Growth',
    metric: '35M+ Viral Views',
    stat1: { val: '35M+', lbl: 'Total Viral Views' },
    stat2: { val: '180K+', lbl: 'New Social Followers' },
    stat3: { val: '5.2x', lbl: 'Direct-to-Consumer Sales' },
    challenge: 'Entering a crowded beverage market dominated by legacy giants required radical brand cut-through and hyper-relatable creator endorsement among Gen-Z and active professionals.',
    strategy: 'Ravemark activated 60+ micro and macro creators across fitness, gaming, and lifestyle verticals in a synchronised 72-hour challenge, generating an organic wave of user-generated content and retail stockouts.',
    deliverables: [
      'Creator scouting, briefing, and contract negotiation for 60+ influencers',
      'High-velocity TikTok & Instagram Reels creative direction',
      'Targeted retargeting ad campaigns pushing viewers directly to quick-checkout',
      'Real-time community management and trend hijacking'
    ]
  },
  'horizon-web': {
    title: 'Horizon Pay High-Conversion Web & Fintech Portal',
    client: 'Horizon Financial Technologies',
    category: 'Web & Tech',
    metric: '+142% Conversion Rate',
    stat1: { val: '+142%', lbl: 'Demo Booking Conversion' },
    stat2: { val: '99/100', lbl: 'Lighthouse Performance Score' },
    stat3: { val: '1.2s', lbl: 'Global Load Time' },
    challenge: 'Horizon Pay had an outdated web portal that was clunky, difficult to navigate on mobile, and failed to communicate their enterprise security credentials to financial institutions.',
    strategy: 'We designed and engineered a lightning-fast, ultra-modern website featuring interactive product walkthroughs, dynamic fee calculators, seamless HubSpot integration, and compliance trust signals.',
    deliverables: [
      'Complete UX research, user journey mapping, and Figma design system',
      'High-performance frontend architecture with 60fps micro-animations',
      'Interactive ROI calculator and dynamic payment flow demonstrator',
      'Enterprise SEO structure driving top rankings for key merchant terms'
    ]
  },
  'aurora-pr': {
    title: 'Aurora BioTech National Media & PR Launch',
    client: 'Aurora Health Labs',
    category: 'Brand & Traditional',
    metric: '40+ Tier-1 Features',
    stat1: { val: '40+', lbl: 'National Media Features' },
    stat2: { val: '₹4.5Cr', lbl: 'Earned Media Value' },
    stat3: { val: '14,000+', lbl: 'Early Access Waitlist' },
    challenge: 'Communicating complex proprietary healthcare diagnostics to mainstream business audiences and consumer publications without sounding overly academic or losing credibility.',
    strategy: 'Ravemark crafted an authoritative narrative framing Aurora as the future of preventative wellness, securing front-page business daily exclusives, television panel appearances, and radio syndication.',
    deliverables: [
      'Comprehensive media kit, founder profiles, and scientific whitepapers',
      'Press conference execution with national health and business journalists',
      'Secured coverage across Economic Times, Mint, Forbes, and CNBC-TV18',
      'Crisis communication playbook and executive media training'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Category Filtering
  const filterPills = document.querySelectorAll('.filter-pill');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterCategory = pill.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Case Study Modal Management
  const modalOverlay = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContentEl = document.getElementById('modalDynamicContent');

  if (!modalOverlay || !modalCloseBtn) return;

  function openCaseStudy(studyKey) {
    const data = caseStudiesData[studyKey];
    if (!data) return;

    modalContentEl.innerHTML = `
      <div class="modal-header">
        <div class="modal-header-tag">${data.category} • Case Study</div>
        <h3 class="modal-title">${data.title}</h3>
        <p class="modal-client"><strong>Client:</strong> ${data.client}</p>
      </div>
      <div class="modal-body">
        <div class="modal-stat-ribbon">
          <div>
            <div class="modal-stat-value">${data.stat1.val}</div>
            <div class="modal-stat-lbl">${data.stat1.lbl}</div>
          </div>
          <div>
            <div class="modal-stat-value">${data.stat2.val}</div>
            <div class="modal-stat-lbl">${data.stat2.lbl}</div>
          </div>
          <div>
            <div class="modal-stat-value">${data.stat3.val}</div>
            <div class="modal-stat-lbl">${data.stat3.lbl}</div>
          </div>
        </div>

        <div class="modal-section-block">
          <h4><i class="fas fa-exclamation-circle"></i> The Challenge</h4>
          <p>${data.challenge}</p>
        </div>

        <div class="modal-section-block">
          <h4><i class="fas fa-lightbulb"></i> The Ravemark Strategy</h4>
          <p>${data.strategy}</p>
        </div>

        <div class="modal-section-block">
          <h4><i class="fas fa-check-circle"></i> Key Deliverables</h4>
          <ul class="synergy-list" style="margin-top: 10px;">
            ${data.deliverables.map(item => `<li><i class="fas fa-chevron-right"></i> ${item}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-top: 32px; text-align: center;">
          <a href="#contact" class="btn btn-primary" onclick="closeModalAndScroll()">
            <span>Scale Your Brand Like This</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.closeModalAndScroll = function() {
    closeModal();
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      setTimeout(() => {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  // Attach click to items
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const studyId = item.getAttribute('data-study-id');
      if (studyId) openCaseStudy(studyId);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});
