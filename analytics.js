/* ============================================
   ANALYTICS & TRACKING
   ============================================ */

/**
 * Google Analytics 4 (GA4) Configuration
 * Replace 'G-XXXXX' with your actual GA4 measurement ID
 */

// Google Analytics Script
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXX', {
    'page_path': window.location.pathname,
    'anonymize_ip': true,
});

/**
 * Track page view
 */
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname
        });
    }
}

/**
 * Track calculator usage
 */
function trackCalculatorUsage(angle, supplement) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_calculation', {
            'event_category': 'engagement',
            'event_label': 'supplementary_calculator',
            'angle_value': angle,
            'supplement_value': supplement,
            'value': 1
        });
    }
}

/**
 * Track embed code copy
 */
function trackEmbedCopy() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'embed_code_copied', {
            'event_category': 'embedding',
            'event_label': 'calculator_embed'
        });
    }
}

/**
 * Track external link clicks
 */
function trackExternalLink(url, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'external_link',
            'event_label': label || url,
            'value': url
        });
    }
}

/**
 * Track file downloads
 */
function trackDownload(file, type) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'file_download', {
            'event_category': 'downloads',
            'event_label': type || 'file',
            'file_name': file
        });
    }
}

/**
 * Track form submissions
 */
function trackFormSubmit(formName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'engagement',
            'event_label': formName || 'contact_form'
        });
    }
}

/**
 * Track scroll depth
 */
function trackScrollDepth() {
    let scrollThreshold = [25, 50, 75, 90];
    let scrollTracked = {};

    window.addEventListener('scroll', function() {
        let scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        scrollThreshold.forEach(threshold => {
            if (scrollPercentage >= threshold && !scrollTracked[threshold]) {
                scrollTracked[threshold] = true;
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                        'event_category': 'engagement',
                        'event_label': threshold + '%',
                        'value': threshold
                    });
                }
            }
        });
    });
}

/**
 * Track time on page
 */
function trackTimeOnPage() {
    let startTime = Date.now();

    window.addEventListener('beforeunload', function() {
        let timeSpent = Math.round((Date.now() - startTime) / 1000);

        if (typeof gtag !== 'undefined' && timeSpent > 5) {
            gtag('event', 'page_engagement', {
                'event_category': 'engagement',
                'event_label': 'time_on_page',
                'value': timeSpent,
                'engagement_time_msec': timeSpent * 1000
            });
        }
    });
}

/**
 * Track FAQ interactions
 */
function trackFAQClick() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'faq_interaction', {
                    'event_category': 'engagement',
                    'event_label': 'faq_item_' + (index + 1),
                    'faq_position': index + 1
                });
            }
        });
    });
}

/**
 * Initialize analytics
 */
function initAnalytics() {
    // Track page view
    trackPageView();

    // Track scroll depth
    trackScrollDepth();

    // Track time on page
    trackTimeOnPage();

    // Track FAQ interactions
    trackFAQClick();

    // Track external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            trackExternalLink(this.href, this.textContent);
        });
    });
}

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}

/**
 * Heatmap Integration (Optional - Hotjar or Microsoft Clarity)
 * Uncomment to enable
 */

// Hotjar
/*
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:XXXXX,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
*/

// Microsoft Clarity
/*
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "YOUR_CLARITY_ID");
*/

/**
 * Export functions for external use
 */
if (typeof window.AnalyticsTracking === 'undefined') {
    window.AnalyticsTracking = {
        calculator: trackCalculatorUsage,
        embed: trackEmbedCopy,
        externalLink: trackExternalLink,
        download: trackDownload,
        formSubmit: trackFormSubmit,
    };
}
