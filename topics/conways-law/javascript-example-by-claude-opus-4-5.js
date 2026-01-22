/**
 * Conway's Law - Organization Structure Mirrors System Design
 *
 * Conway's Law states that organizations design systems that mirror their own
 * communication structures. First proposed by Melvin Conway in 1968, this
 * principle suggests that team structure significantly influences software
 * architecture. Understanding this helps in designing both teams and systems.
 *
 * Key Concepts:
 * - Organization-system mirroring
 * - Team topology impact
 * - Communication patterns
 * - Inverse Conway Maneuver
 * - Cross-functional teams
 */

// Example 1: Organization Structure Analyzer
class OrganizationAnalyzer {
  constructor() {
    this.teams = new Map();
    this.communicationChannels = [];
    this.dependencies = [];
  }

  /**
   * Add a team to the organization
   * @param {object} team - Team information
   */
  addTeam(team) {
    this.teams.set(team.name, {
      name: team.name,
      type: team.type, // 'frontend', 'backend', 'platform', 'product'
      members: team.members || [],
      responsibilities: team.responsibilities || [],
      services: team.services || []
    });
  }

  /**
   * Add a communication channel between teams
   * @param {string} team1 - First team
   * @param {string} team2 - Second team
   * @param {object} details - Channel details
   */
  addCommunicationChannel(team1, team2, details = {}) {
    this.communicationChannels.push({
      teams: [team1, team2],
      frequency: details.frequency || 'weekly',
      type: details.type || 'sync', // 'sync', 'async', 'ad-hoc'
      formality: details.formality || 'informal',
      purpose: details.purpose || 'coordination'
    });
  }

  /**
   * Add a dependency between teams
   * @param {string} dependent - Dependent team
   * @param {string} dependency - Team being depended on
   * @param {object} details - Dependency details
   */
  addDependency(dependent, dependency, details = {}) {
    this.dependencies.push({
      from: dependent,
      to: dependency,
      type: details.type || 'runtime', // 'runtime', 'build', 'data', 'api'
      criticality: details.criticality || 'medium'
    });
  }

  /**
   * Predict system architecture based on team structure
   * @returns {object}
   */
  predictArchitecture() {
    const predictions = {
      services: [],
      integrations: [],
      bottlenecks: [],
      recommendations: []
    };

    // Each team likely creates separate services
    for (const [name, team] of this.teams) {
      predictions.services.push({
        name: `${name}-service`,
        predictedOwner: name,
        basedOn: 'Team boundary',
        components: team.responsibilities
      });
    }

    // Communication channels predict API integrations
    this.communicationChannels.forEach(channel => {
      predictions.integrations.push({
        between: channel.teams,
        predictedType: this.predictIntegrationType(channel),
        complexity: channel.frequency === 'daily' ? 'high' : 'low'
      });
    });

    // Dependencies predict coupling
    const dependencyCount = this.countDependencies();
    for (const [team, count] of Object.entries(dependencyCount.inbound)) {
      if (count > 3) {
        predictions.bottlenecks.push({
          team,
          inboundDependencies: count,
          risk: 'High coordination overhead',
          recommendation: 'Consider splitting team or creating platform team'
        });
      }
    }

    // Generate recommendations
    predictions.recommendations = this.generateRecommendations();

    return predictions;
  }

  /**
   * Predict integration type from communication pattern
   * @param {object} channel - Communication channel
   * @returns {string}
   */
  predictIntegrationType(channel) {
    if (channel.type === 'async') return 'Event-driven / Message Queue';
    if (channel.frequency === 'realtime') return 'Direct API / RPC';
    if (channel.formality === 'formal') return 'Contract-based API';
    return 'REST API';
  }

  /**
   * Count inbound and outbound dependencies
   * @returns {object}
   */
  countDependencies() {
    const inbound = {};
    const outbound = {};

    this.dependencies.forEach(dep => {
      inbound[dep.to] = (inbound[dep.to] || 0) + 1;
      outbound[dep.from] = (outbound[dep.from] || 0) + 1;
    });

    return { inbound, outbound };
  }

  /**
   * Generate recommendations based on structure
   * @returns {Array}
   */
  generateRecommendations() {
    const recommendations = [];
    const teamCount = this.teams.size;
    const channelCount = this.communicationChannels.length;

    // Check communication density
    const maxChannels = (teamCount * (teamCount - 1)) / 2;
    const density = channelCount / maxChannels;

    if (density > 0.8) {
      recommendations.push({
        type: 'warning',
        message: 'High communication density - consider consolidating teams',
        impact: 'System likely has many integrations'
      });
    }

    if (density < 0.3 && teamCount > 3) {
      recommendations.push({
        type: 'info',
        message: 'Low communication density - teams may be siloed',
        impact: 'System components may lack proper integration'
      });
    }

    // Check for hub-and-spoke pattern
    const deps = this.countDependencies();
    const maxInbound = Math.max(...Object.values(deps.inbound || { default: 0 }));
    if (maxInbound > teamCount / 2) {
      recommendations.push({
        type: 'warning',
        message: 'Central team dependency detected',
        impact: 'System likely has a monolithic core or central service'
      });
    }

    return recommendations;
  }

  /**
   * Calculate organization coupling score
   * @returns {object}
   */
  calculateCoupling() {
    const teamCount = this.teams.size;
    const depCount = this.dependencies.length;
    const channelCount = this.communicationChannels.length;

    const maxPossible = teamCount * (teamCount - 1);
    const coupling = maxPossible > 0 ? (depCount + channelCount) / maxPossible : 0;

    return {
      score: (coupling * 100).toFixed(1),
      level: coupling > 0.6 ? 'high' : coupling > 0.3 ? 'medium' : 'low',
      interpretation: coupling > 0.6
        ? 'Highly coupled organization - expect tightly coupled system'
        : coupling > 0.3
        ? 'Moderate coupling - system will have clear integrations'
        : 'Loosely coupled - expect independent services'
    };
  }
}

// Example 2: System-Team Alignment Checker
class SystemTeamAlignmentChecker {
  constructor() {
    this.systemComponents = [];
    this.teams = [];
    this.alignmentMap = new Map();
  }

  /**
   * Add a system component
   * @param {object} component - Component information
   */
  addSystemComponent(component) {
    this.systemComponents.push({
      name: component.name,
      type: component.type,
      dependencies: component.dependencies || [],
      owner: component.owner
    });
  }

  /**
   * Add a team
   * @param {object} team - Team information
   */
  addTeam(team) {
    this.teams.push({
      name: team.name,
      components: team.components || []
    });
  }

  /**
   * Check alignment between system and organization
   * @returns {object}
   */
  checkAlignment() {
    const issues = [];
    const aligned = [];

    // Check for shared ownership (violation of Conway's Law ideal)
    const componentOwners = new Map();
    this.teams.forEach(team => {
      team.components.forEach(comp => {
        if (!componentOwners.has(comp)) {
          componentOwners.set(comp, []);
        }
        componentOwners.get(comp).push(team.name);
      });
    });

    for (const [component, owners] of componentOwners) {
      if (owners.length > 1) {
        issues.push({
          type: 'shared_ownership',
          component,
          teams: owners,
          issue: 'Multiple teams own same component',
          recommendation: 'Assign clear ownership or split component'
        });
      } else {
        aligned.push({ component, owner: owners[0] });
      }
    }

    // Check for cross-team dependencies
    this.systemComponents.forEach(comp => {
      comp.dependencies.forEach(dep => {
        const compOwner = this.findOwner(comp.name);
        const depOwner = this.findOwner(dep);

        if (compOwner && depOwner && compOwner !== depOwner) {
          // Check if teams have communication channel
          const hasChannel = this.hasTeamCommunication(compOwner, depOwner);
          if (!hasChannel) {
            issues.push({
              type: 'missing_communication',
              component: comp.name,
              dependency: dep,
              teams: [compOwner, depOwner],
              issue: 'Component dependency crosses team boundary without communication',
              recommendation: 'Establish regular sync between teams or realign ownership'
            });
          }
        }
      });
    });

    return {
      alignmentScore: this.calculateAlignmentScore(issues, aligned),
      issues,
      aligned,
      summary: this.generateSummary(issues)
    };
  }

  /**
   * Find owner of a component
   * @param {string} componentName - Component name
   * @returns {string|null}
   */
  findOwner(componentName) {
    for (const team of this.teams) {
      if (team.components.includes(componentName)) {
        return team.name;
      }
    }
    return null;
  }

  /**
   * Check if teams have communication
   * @param {string} team1 - First team
   * @param {string} team2 - Second team
   * @returns {boolean}
   */
  hasTeamCommunication(team1, team2) {
    // Simplified - in real implementation would check actual channels
    return true;
  }

  /**
   * Calculate alignment score
   * @param {Array} issues - Alignment issues
   * @param {Array} aligned - Aligned components
   * @returns {number}
   */
  calculateAlignmentScore(issues, aligned) {
    const total = issues.length + aligned.length;
    if (total === 0) return 100;
    return Math.round((aligned.length / total) * 100);
  }

  /**
   * Generate summary
   * @param {Array} issues - Issues found
   * @returns {object}
   */
  generateSummary(issues) {
    const byType = issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {});

    return {
      totalIssues: issues.length,
      byType,
      recommendation: issues.length === 0
        ? 'System and organization are well-aligned'
        : issues.length > 5
        ? 'Consider reorganizing teams to match desired architecture'
        : 'Address specific alignment issues identified'
    };
  }
}

// Example 3: Inverse Conway Maneuver Planner
class InverseConwayPlanner {
  /**
   * Plan team structure for desired architecture
   * @param {object} desiredArchitecture - Target architecture
   * @returns {object}
   */
  static planTeamStructure(desiredArchitecture) {
    const teams = [];
    const communications = [];

    // Create team for each bounded context/service
    desiredArchitecture.services.forEach(service => {
      teams.push({
        name: `${service.name}-team`,
        type: this.determineTeamType(service),
        responsibilities: service.responsibilities,
        suggestedSize: this.suggestTeamSize(service),
        skills: this.identifyRequiredSkills(service)
      });
    });

    // Create communication channels based on service interactions
    desiredArchitecture.interactions?.forEach(interaction => {
      communications.push({
        teams: [`${interaction.from}-team`, `${interaction.to}-team`],
        type: interaction.sync ? 'synchronous' : 'asynchronous',
        frequency: this.suggestMeetingFrequency(interaction),
        purpose: interaction.purpose
      });
    });

    // Identify platform/enabling teams
    const platformTeams = this.identifyPlatformTeams(desiredArchitecture);

    return {
      streamAlignedTeams: teams,
      platformTeams,
      communications,
      transitionPlan: this.createTransitionPlan(teams, desiredArchitecture)
    };
  }

  /**
   * Determine team type based on service characteristics
   * @param {object} service - Service definition
   * @returns {string}
   */
  static determineTeamType(service) {
    if (service.type === 'platform') return 'platform';
    if (service.type === 'infrastructure') return 'enabling';
    if (service.crossCutting) return 'complicated-subsystem';
    return 'stream-aligned';
  }

  /**
   * Suggest team size based on service complexity
   * @param {object} service - Service definition
   * @returns {object}
   */
  static suggestTeamSize(service) {
    const complexity = service.complexity || 'medium';
    const sizes = {
      low: { min: 3, max: 5 },
      medium: { min: 5, max: 8 },
      high: { min: 6, max: 9 }
    };
    return sizes[complexity] || sizes.medium;
  }

  /**
   * Identify required skills for a service
   * @param {object} service - Service definition
   * @returns {Array}
   */
  static identifyRequiredSkills(service) {
    const skills = [];

    if (service.hasUI) skills.push('frontend', 'UX');
    if (service.hasAPI) skills.push('backend', 'API design');
    if (service.hasDatabase) skills.push('database', 'data modeling');
    if (service.hasSecurity) skills.push('security');

    skills.push('testing', 'DevOps');

    return skills;
  }

  /**
   * Suggest meeting frequency based on interaction
   * @param {object} interaction - Interaction definition
   * @returns {string}
   */
  static suggestMeetingFrequency(interaction) {
    if (interaction.frequency === 'high') return 'daily standup';
    if (interaction.frequency === 'medium') return 'weekly sync';
    return 'bi-weekly or as-needed';
  }

  /**
   * Identify platform teams needed
   * @param {object} architecture - Architecture definition
   * @returns {Array}
   */
  static identifyPlatformTeams(architecture) {
    const platforms = [];

    if (architecture.needsSharedInfra) {
      platforms.push({
        name: 'Platform Team',
        purpose: 'Provide shared infrastructure and tooling',
        capabilities: ['CI/CD', 'Monitoring', 'Logging', 'Security']
      });
    }

    if (architecture.needsDataPlatform) {
      platforms.push({
        name: 'Data Platform Team',
        purpose: 'Provide data infrastructure and analytics',
        capabilities: ['Data pipelines', 'Analytics', 'ML infrastructure']
      });
    }

    return platforms;
  }

  /**
   * Create transition plan
   * @param {Array} teams - Target teams
   * @param {object} architecture - Target architecture
   * @returns {object}
   */
  static createTransitionPlan(teams, architecture) {
    return {
      phases: [
        {
          name: 'Assessment',
          duration: '2 weeks',
          activities: ['Map current teams to services', 'Identify gaps', 'Plan transitions']
        },
        {
          name: 'Team Formation',
          duration: '4-6 weeks',
          activities: ['Form new teams', 'Establish communication patterns', 'Define ownership']
        },
        {
          name: 'Knowledge Transfer',
          duration: '4-8 weeks',
          activities: ['Transfer domain knowledge', 'Pair programming', 'Documentation']
        },
        {
          name: 'Stabilization',
          duration: '4 weeks',
          activities: ['Monitor team effectiveness', 'Adjust boundaries', 'Optimize workflows']
        }
      ],
      risks: [
        'Temporary productivity drop during transition',
        'Knowledge silos may form',
        'Communication overhead may increase initially'
      ]
    };
  }
}

// Demonstration
console.log("=== Conway's Law Examples ===\n");

// Organization Analysis
const org = new OrganizationAnalyzer();

org.addTeam({ name: 'Frontend', type: 'frontend', responsibilities: ['UI', 'UX'] });
org.addTeam({ name: 'Backend', type: 'backend', responsibilities: ['API', 'Business Logic'] });
org.addTeam({ name: 'Data', type: 'data', responsibilities: ['Database', 'Analytics'] });
org.addTeam({ name: 'Platform', type: 'platform', responsibilities: ['Infrastructure', 'CI/CD'] });

org.addCommunicationChannel('Frontend', 'Backend', { frequency: 'daily', type: 'sync' });
org.addCommunicationChannel('Backend', 'Data', { frequency: 'weekly', type: 'async' });
org.addCommunicationChannel('Platform', 'Backend', { frequency: 'weekly', type: 'async' });

org.addDependency('Frontend', 'Backend', { type: 'api', criticality: 'high' });
org.addDependency('Backend', 'Data', { type: 'data', criticality: 'high' });
org.addDependency('Frontend', 'Platform', { type: 'build', criticality: 'medium' });
org.addDependency('Backend', 'Platform', { type: 'build', criticality: 'medium' });

console.log('--- Organization Analysis ---\n');
const predictions = org.predictArchitecture();
console.log('Predicted Services:');
predictions.services.forEach(s => {
  console.log(`  - ${s.name} (owned by ${s.predictedOwner})`);
});

console.log('\nPredicted Integrations:');
predictions.integrations.forEach(i => {
  console.log(`  - ${i.between.join(' <-> ')}: ${i.predictedType}`);
});

const coupling = org.calculateCoupling();
console.log(`\nOrganization Coupling: ${coupling.score}% (${coupling.level})`);
console.log(`Interpretation: ${coupling.interpretation}`);

// Inverse Conway Maneuver
console.log('\n--- Inverse Conway Maneuver ---\n');

const desiredArch = {
  services: [
    { name: 'user', responsibilities: ['Authentication', 'Profile'], hasAPI: true, hasDatabase: true },
    { name: 'orders', responsibilities: ['Order management', 'Checkout'], hasAPI: true, hasDatabase: true },
    { name: 'inventory', responsibilities: ['Stock management', 'Warehousing'], hasAPI: true, hasDatabase: true }
  ],
  interactions: [
    { from: 'orders', to: 'user', sync: true, frequency: 'high', purpose: 'User validation' },
    { from: 'orders', to: 'inventory', sync: true, frequency: 'high', purpose: 'Stock check' }
  ],
  needsSharedInfra: true
};

const teamPlan = InverseConwayPlanner.planTeamStructure(desiredArch);
console.log('Recommended Teams:');
teamPlan.streamAlignedTeams.forEach(t => {
  console.log(`  ${t.name}: ${t.responsibilities.join(', ')}`);
  console.log(`    Size: ${t.suggestedSize.min}-${t.suggestedSize.max} people`);
});

if (teamPlan.platformTeams.length > 0) {
  console.log('\nPlatform Teams:');
  teamPlan.platformTeams.forEach(t => {
    console.log(`  ${t.name}: ${t.purpose}`);
  });
}

console.log('\nTransition Plan Phases:');
teamPlan.transitionPlan.phases.forEach(p => {
  console.log(`  ${p.name} (${p.duration})`);
});

/**
 * Conway's Law Key Insights:
 *
 * 1. Team structure shapes system architecture - design teams intentionally
 *
 * 2. Communication patterns become integration patterns
 *
 * 3. Use Inverse Conway Maneuver: structure teams for desired architecture
 *
 * 4. Cross-functional teams lead to more cohesive services
 *
 * 5. Siloed teams create siloed systems
 *
 * 6. Team dependencies become system dependencies
 *
 * 7. Cognitive load limits effective team size
 *
 * 8. Consider Team Topologies: Stream-aligned, Platform, Enabling, Complicated-subsystem
 */
