/**
 * Accessibility Testing - Ensuring Digital Inclusivity
 *
 * Accessibility testing evaluates whether websites, applications, or programs
 * are usable by people with disabilities. The goal is to ensure equal access
 * to digital services and content, while also helping businesses comply with
 * legal requirements like WCAG, ADA, and Section 508.
 *
 * Key Concepts:
 * - WCAG (Web Content Accessibility Guidelines) compliance
 * - Automated accessibility scanning
 * - Manual accessibility testing
 * - Screen reader compatibility
 * - Keyboard navigation testing
 * - Color contrast verification
 */

// Example 1: Accessibility Test Runner
class AccessibilityTestRunner {
  constructor(config = {}) {
    this.config = {
      standard: config.standard || 'WCAG2.1',
      level: config.level || 'AA', // A, AA, or AAA
      includeWarnings: config.includeWarnings !== false,
      ...config
    };
    this.violations = [];
    this.warnings = [];
    this.passes = [];
  }

  /**
   * Run all accessibility tests on a page
   * @param {object} page - Page object to test
   * @returns {object} - Test results
   */
  async runTests(page) {
    console.log(`Running ${this.config.standard} Level ${this.config.level} tests...\n`);

    // Run various accessibility checks
    await this.checkColorContrast(page);
    await this.checkAltText(page);
    await this.checkFormLabels(page);
    await this.checkHeadingStructure(page);
    await this.checkKeyboardNavigation(page);
    await this.checkARIAAttributes(page);
    await this.checkLinkText(page);
    await this.checkFocusIndicators(page);

    return this.generateReport();
  }

  /**
   * Check color contrast ratios
   * WCAG 2.1 Success Criterion 1.4.3 (Level AA)
   * @param {object} page - Page object
   */
  async checkColorContrast(page) {
    const elements = page.elements || [];
    const minContrastNormal = 4.5; // AA standard for normal text
    const minContrastLarge = 3.0;  // AA standard for large text

    for (const element of elements) {
      if (element.type === 'text') {
        const contrast = this.calculateContrastRatio(
          element.foregroundColor,
          element.backgroundColor
        );

        const isLargeText = element.fontSize >= 18 ||
                          (element.fontSize >= 14 && element.fontWeight >= 700);
        const requiredContrast = isLargeText ? minContrastLarge : minContrastNormal;

        if (contrast >= requiredContrast) {
          this.passes.push({
            rule: 'color-contrast',
            element: element.selector,
            message: `Contrast ratio ${contrast.toFixed(2)}:1 meets requirements`
          });
        } else {
          this.violations.push({
            rule: 'color-contrast',
            impact: 'serious',
            element: element.selector,
            message: `Contrast ratio ${contrast.toFixed(2)}:1 is below ${requiredContrast}:1 requirement`,
            wcag: '1.4.3'
          });
        }
      }
    }
  }

  /**
   * Calculate contrast ratio between two colors
   * @param {string} foreground - Foreground color (hex)
   * @param {string} background - Background color (hex)
   * @returns {number} - Contrast ratio
   */
  calculateContrastRatio(foreground, background) {
    const getLuminance = (hex) => {
      const rgb = this.hexToRgb(hex);
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Convert hex color to RGB
   * @param {string} hex - Hex color string
   * @returns {object} - RGB values
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  /**
   * Check images for alternative text
   * WCAG 2.1 Success Criterion 1.1.1 (Level A)
   * @param {object} page - Page object
   */
  async checkAltText(page) {
    const images = (page.elements || []).filter(e => e.type === 'image');

    for (const image of images) {
      if (!image.alt && !image.isDecorative) {
        this.violations.push({
          rule: 'image-alt',
          impact: 'critical',
          element: image.selector,
          message: 'Image missing alternative text',
          wcag: '1.1.1'
        });
      } else if (image.alt === image.src) {
        this.warnings.push({
          rule: 'image-alt',
          element: image.selector,
          message: 'Alt text appears to be filename, may not be descriptive'
        });
      } else {
        this.passes.push({
          rule: 'image-alt',
          element: image.selector,
          message: 'Image has appropriate alternative text'
        });
      }
    }
  }

  /**
   * Check form inputs for labels
   * WCAG 2.1 Success Criterion 1.3.1 (Level A)
   * @param {object} page - Page object
   */
  async checkFormLabels(page) {
    const inputs = (page.elements || []).filter(e => e.type === 'input');

    for (const input of inputs) {
      if (!input.label && !input.ariaLabel && !input.ariaLabelledby) {
        this.violations.push({
          rule: 'form-field-label',
          impact: 'critical',
          element: input.selector,
          message: 'Form input missing associated label',
          wcag: '1.3.1'
        });
      } else {
        this.passes.push({
          rule: 'form-field-label',
          element: input.selector,
          message: 'Form input has proper label'
        });
      }
    }
  }

  /**
   * Check heading structure
   * WCAG 2.1 Success Criterion 1.3.1 (Level A)
   * @param {object} page - Page object
   */
  async checkHeadingStructure(page) {
    const headings = (page.elements || [])
      .filter(e => e.type === 'heading')
      .sort((a, b) => a.order - b.order);

    let previousLevel = 0;

    for (const heading of headings) {
      if (heading.level - previousLevel > 1 && previousLevel !== 0) {
        this.violations.push({
          rule: 'heading-order',
          impact: 'moderate',
          element: heading.selector,
          message: `Heading level skipped from h${previousLevel} to h${heading.level}`,
          wcag: '1.3.1'
        });
      } else {
        this.passes.push({
          rule: 'heading-order',
          element: heading.selector,
          message: 'Heading level follows logical order'
        });
      }
      previousLevel = heading.level;
    }
  }

  /**
   * Check keyboard navigation
   * WCAG 2.1 Success Criterion 2.1.1 (Level A)
   * @param {object} page - Page object
   */
  async checkKeyboardNavigation(page) {
    const interactive = (page.elements || [])
      .filter(e => ['button', 'link', 'input'].includes(e.type));

    for (const element of interactive) {
      if (element.tabIndex < 0 && !element.inertParent) {
        this.violations.push({
          rule: 'keyboard-access',
          impact: 'serious',
          element: element.selector,
          message: 'Interactive element not keyboard accessible (negative tabindex)',
          wcag: '2.1.1'
        });
      } else {
        this.passes.push({
          rule: 'keyboard-access',
          element: element.selector,
          message: 'Element is keyboard accessible'
        });
      }
    }
  }

  /**
   * Check ARIA attributes
   * WCAG 2.1 Success Criterion 4.1.2 (Level A)
   * @param {object} page - Page object
   */
  async checkARIAAttributes(page) {
    const ariaElements = (page.elements || []).filter(e => e.hasAria);

    for (const element of ariaElements) {
      if (element.ariaRole && !this.isValidAriaRole(element.ariaRole)) {
        this.violations.push({
          rule: 'aria-valid-attr',
          impact: 'critical',
          element: element.selector,
          message: `Invalid ARIA role: ${element.ariaRole}`,
          wcag: '4.1.2'
        });
      }

      if (element.ariaHidden && element.containsFocusable) {
        this.violations.push({
          rule: 'aria-hidden-focus',
          impact: 'serious',
          element: element.selector,
          message: 'Element with aria-hidden contains focusable elements',
          wcag: '4.1.2'
        });
      }
    }
  }

  /**
   * Validate ARIA role
   * @param {string} role - ARIA role to validate
   * @returns {boolean}
   */
  isValidAriaRole(role) {
    const validRoles = [
      'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
      'cell', 'checkbox', 'columnheader', 'combobox', 'complementary',
      'contentinfo', 'definition', 'dialog', 'directory', 'document',
      'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading',
      'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
      'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
      'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
      'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup',
      'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 'slider',
      'spinbutton', 'status', 'switch', 'tab', 'table', 'tablist', 'tabpanel',
      'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid',
      'treeitem'
    ];
    return validRoles.includes(role);
  }

  /**
   * Check link text for accessibility
   * WCAG 2.1 Success Criterion 2.4.4 (Level A)
   * @param {object} page - Page object
   */
  async checkLinkText(page) {
    const links = (page.elements || []).filter(e => e.type === 'link');
    const genericTexts = ['click here', 'read more', 'learn more', 'here', 'more'];

    for (const link of links) {
      const text = (link.text || '').toLowerCase().trim();

      if (!text && !link.ariaLabel) {
        this.violations.push({
          rule: 'link-name',
          impact: 'serious',
          element: link.selector,
          message: 'Link has no discernible text',
          wcag: '2.4.4'
        });
      } else if (genericTexts.includes(text)) {
        this.warnings.push({
          rule: 'link-name',
          element: link.selector,
          message: `Link text "${text}" is not descriptive`
        });
      }
    }
  }

  /**
   * Check focus indicators
   * WCAG 2.1 Success Criterion 2.4.7 (Level AA)
   * @param {object} page - Page object
   */
  async checkFocusIndicators(page) {
    const focusable = (page.elements || [])
      .filter(e => ['button', 'link', 'input'].includes(e.type));

    for (const element of focusable) {
      if (!element.hasFocusIndicator) {
        this.violations.push({
          rule: 'focus-visible',
          impact: 'serious',
          element: element.selector,
          message: 'Element lacks visible focus indicator',
          wcag: '2.4.7'
        });
      }
    }
  }

  /**
   * Generate accessibility report
   * @returns {object} - Complete report
   */
  generateReport() {
    const criticalCount = this.violations.filter(v => v.impact === 'critical').length;
    const seriousCount = this.violations.filter(v => v.impact === 'serious').length;
    const moderateCount = this.violations.filter(v => v.impact === 'moderate').length;

    return {
      standard: `${this.config.standard} Level ${this.config.level}`,
      summary: {
        violations: this.violations.length,
        warnings: this.warnings.length,
        passes: this.passes.length,
        critical: criticalCount,
        serious: seriousCount,
        moderate: moderateCount
      },
      violations: this.violations,
      warnings: this.config.includeWarnings ? this.warnings : [],
      passes: this.passes,
      score: this.calculateScore(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculate accessibility score
   * @returns {number} - Score from 0-100
   */
  calculateScore() {
    const total = this.violations.length + this.passes.length;
    if (total === 0) return 100;

    // Weight violations by impact
    const weightedViolations = this.violations.reduce((sum, v) => {
      const weights = { critical: 3, serious: 2, moderate: 1 };
      return sum + (weights[v.impact] || 1);
    }, 0);

    const maxScore = total * 3; // Assuming all could be critical
    const score = Math.max(0, 100 - (weightedViolations / maxScore * 100));
    return Math.round(score);
  }
}

// Example 2: WCAG Guideline Reference
class WCAGReference {
  static guidelines = {
    '1.1.1': {
      name: 'Non-text Content',
      level: 'A',
      principle: 'Perceivable',
      description: 'All non-text content has text alternative'
    },
    '1.3.1': {
      name: 'Info and Relationships',
      level: 'A',
      principle: 'Perceivable',
      description: 'Information and relationships are programmatically determinable'
    },
    '1.4.3': {
      name: 'Contrast (Minimum)',
      level: 'AA',
      principle: 'Perceivable',
      description: 'Text has contrast ratio of at least 4.5:1'
    },
    '2.1.1': {
      name: 'Keyboard',
      level: 'A',
      principle: 'Operable',
      description: 'All functionality is available from keyboard'
    },
    '2.4.4': {
      name: 'Link Purpose',
      level: 'A',
      principle: 'Operable',
      description: 'Purpose of each link can be determined'
    },
    '2.4.7': {
      name: 'Focus Visible',
      level: 'AA',
      principle: 'Operable',
      description: 'Keyboard focus indicator is visible'
    },
    '4.1.2': {
      name: 'Name, Role, Value',
      level: 'A',
      principle: 'Robust',
      description: 'User interface components have accessible name and role'
    }
  };

  /**
   * Get guideline details
   * @param {string} id - WCAG criterion ID
   * @returns {object|null}
   */
  static getGuideline(id) {
    return this.guidelines[id] || null;
  }

  /**
   * Get all guidelines for a level
   * @param {string} level - A, AA, or AAA
   * @returns {Array}
   */
  static getGuidelinesByLevel(level) {
    return Object.entries(this.guidelines)
      .filter(([_, g]) => g.level === level)
      .map(([id, g]) => ({ id, ...g }));
  }
}

// Example 3: Screen Reader Simulator
class ScreenReaderSimulator {
  constructor() {
    this.announcements = [];
  }

  /**
   * Simulate reading a page
   * @param {object} page - Page structure
   * @returns {Array} - Announcements
   */
  readPage(page) {
    this.announcements = [];

    // Read page title
    if (page.title) {
      this.announce(`Page: ${page.title}`);
    }

    // Read landmarks
    this.readLandmarks(page.landmarks || []);

    // Read content in DOM order
    this.readElements(page.elements || []);

    return this.announcements;
  }

  /**
   * Read page landmarks
   * @param {Array} landmarks - Page landmarks
   */
  readLandmarks(landmarks) {
    landmarks.forEach(landmark => {
      this.announce(`${landmark.type} landmark: ${landmark.label || ''}`);
    });
  }

  /**
   * Read elements sequentially
   * @param {Array} elements - Page elements
   */
  readElements(elements) {
    elements.forEach(element => {
      switch (element.type) {
        case 'heading':
          this.announce(`Heading level ${element.level}: ${element.text}`);
          break;
        case 'link':
          this.announce(`Link: ${element.text || element.ariaLabel}`);
          break;
        case 'button':
          this.announce(`Button: ${element.text || element.ariaLabel}`);
          break;
        case 'image':
          if (element.alt) {
            this.announce(`Image: ${element.alt}`);
          } else if (!element.isDecorative) {
            this.announce('Image: No description');
          }
          break;
        case 'input':
          const label = element.label || element.ariaLabel || 'No label';
          this.announce(`${element.inputType || 'text'} input: ${label}`);
          break;
        case 'text':
          this.announce(element.text);
          break;
      }
    });
  }

  /**
   * Add announcement
   * @param {string} text - Text to announce
   */
  announce(text) {
    this.announcements.push({
      text,
      timestamp: Date.now()
    });
  }
}

// Demonstration
console.log('=== Accessibility Testing Examples ===\n');

// Create test runner
const a11yRunner = new AccessibilityTestRunner({
  standard: 'WCAG2.1',
  level: 'AA'
});

// Simulate page with elements
const mockPage = {
  title: 'Example Page',
  elements: [
    {
      type: 'text',
      selector: '.hero-text',
      foregroundColor: '#767676',
      backgroundColor: '#ffffff',
      fontSize: 16
    },
    {
      type: 'text',
      selector: '.heading',
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      fontSize: 24
    },
    {
      type: 'image',
      selector: 'img.logo',
      alt: 'Company Logo'
    },
    {
      type: 'image',
      selector: 'img.hero',
      alt: null,
      isDecorative: false
    },
    {
      type: 'input',
      selector: '#email',
      inputType: 'email',
      label: 'Email Address'
    },
    {
      type: 'input',
      selector: '#phone',
      inputType: 'tel',
      label: null,
      ariaLabel: null
    },
    {
      type: 'heading',
      selector: 'h1',
      level: 1,
      order: 1
    },
    {
      type: 'heading',
      selector: 'h3',
      level: 3,
      order: 2
    },
    {
      type: 'link',
      selector: 'a.more',
      text: 'Click here',
      tabIndex: 0
    },
    {
      type: 'button',
      selector: 'button.submit',
      text: 'Submit',
      tabIndex: 0,
      hasFocusIndicator: true
    }
  ]
};

// Run tests
a11yRunner.runTests(mockPage).then(report => {
  console.log('=== Accessibility Report ===\n');
  console.log(`Standard: ${report.standard}`);
  console.log(`Score: ${report.score}/100`);
  console.log(`\nSummary:`);
  console.log(`  Violations: ${report.summary.violations}`);
  console.log(`  Warnings: ${report.summary.warnings}`);
  console.log(`  Passes: ${report.summary.passes}`);

  if (report.violations.length > 0) {
    console.log('\nViolations:');
    report.violations.forEach(v => {
      console.log(`  [${v.impact.toUpperCase()}] ${v.rule}: ${v.message}`);
      console.log(`    Element: ${v.element}`);
      console.log(`    WCAG: ${v.wcag}`);
    });
  }
});

// Screen reader simulation
console.log('\n=== Screen Reader Simulation ===\n');

const screenReader = new ScreenReaderSimulator();
const announcements = screenReader.readPage({
  title: 'Welcome Page',
  landmarks: [
    { type: 'navigation', label: 'Main navigation' },
    { type: 'main', label: 'Main content' }
  ],
  elements: [
    { type: 'heading', level: 1, text: 'Welcome to Our Site' },
    { type: 'text', text: 'Discover amazing products and services.' },
    { type: 'link', text: 'Browse Products' },
    { type: 'button', text: 'Sign Up Now' },
    { type: 'image', alt: 'Happy customers using our product' }
  ]
});

console.log('Screen Reader Announcements:');
announcements.forEach((a, i) => {
  console.log(`  ${i + 1}. ${a.text}`);
});

/**
 * Accessibility Testing Best Practices:
 *
 * 1. Combine Automated and Manual Testing: Automated tools catch ~30% of issues
 *
 * 2. Test with Real Assistive Technology: Use actual screen readers (NVDA, VoiceOver)
 *
 * 3. Keyboard-Only Navigation: Test all functionality without a mouse
 *
 * 4. Color Contrast: Verify minimum 4.5:1 for normal text, 3:1 for large text
 *
 * 5. Semantic HTML: Use proper elements (button, nav, main, heading hierarchy)
 *
 * 6. Focus Management: Ensure visible focus indicators and logical tab order
 *
 * 7. Alternative Text: Provide meaningful descriptions for non-text content
 *
 * 8. Form Accessibility: Label all inputs, provide error messages, and instructions
 *
 * 9. Include Users with Disabilities: Conduct usability testing with real users
 *
 * 10. Document Accessibility: Provide accessibility statements and feedback channels
 */
