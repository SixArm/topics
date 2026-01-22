/**
 * Brooks' Law - Adding People to a Late Project
 *
 * Brooks' Law states that "adding manpower to a late software project makes
 * it later." Named after Fred Brooks from "The Mythical Man-Month" (1975),
 * this principle highlights the costs of communication overhead and
 * onboarding when adding team members to ongoing projects.
 *
 * Key Concepts:
 * - Communication overhead increases with team size
 * - Onboarding time reduces productivity
 * - Task divisibility limits parallelization
 * - Knowledge transfer takes time
 * - The mythical man-month fallacy
 */

// Example 1: Brooks' Law Calculator
class BrooksLawCalculator {
  constructor(config = {}) {
    this.config = {
      onboardingDays: config.onboardingDays || 20,
      communicationOverheadFactor: config.communicationOverheadFactor || 0.05,
      taskDivisibilityFactor: config.taskDivisibilityFactor || 0.7, // 0-1, how parallelizable
      knowledgeTransferDays: config.knowledgeTransferDays || 5,
      mentorProductivityLoss: config.mentorProductivityLoss || 0.3, // 30% productivity loss for mentors
      ...config
    };
  }

  /**
   * Calculate communication channels
   * Formula: n(n-1)/2 where n = team size
   * @param {number} teamSize - Number of team members
   * @returns {number} - Number of communication channels
   */
  calculateCommunicationChannels(teamSize) {
    return (teamSize * (teamSize - 1)) / 2;
  }

  /**
   * Calculate communication overhead as percentage of time
   * @param {number} teamSize - Number of team members
   * @returns {number} - Overhead percentage (0-1)
   */
  calculateCommunicationOverhead(teamSize) {
    const channels = this.calculateCommunicationChannels(teamSize);
    return Math.min(channels * this.config.communicationOverheadFactor, 0.8);
  }

  /**
   * Calculate effective team capacity
   * @param {number} teamSize - Number of team members
   * @returns {object} - Capacity metrics
   */
  calculateEffectiveCapacity(teamSize) {
    const overhead = this.calculateCommunicationOverhead(teamSize);
    const effectiveCapacity = teamSize * (1 - overhead);

    return {
      teamSize,
      communicationChannels: this.calculateCommunicationChannels(teamSize),
      overheadPercentage: (overhead * 100).toFixed(1) + '%',
      effectiveCapacity: effectiveCapacity.toFixed(2),
      utilizationRate: ((effectiveCapacity / teamSize) * 100).toFixed(1) + '%'
    };
  }

  /**
   * Calculate impact of adding new team members
   * @param {number} currentSize - Current team size
   * @param {number} newMembers - Number of new members to add
   * @param {number} daysRemaining - Days remaining in project
   * @returns {object} - Impact analysis
   */
  calculateAdditionImpact(currentSize, newMembers, daysRemaining) {
    const currentCapacity = this.calculateEffectiveCapacity(currentSize);
    const newSize = currentSize + newMembers;
    const newCapacity = this.calculateEffectiveCapacity(newSize);

    // Calculate onboarding impact
    const onboardingDays = this.config.onboardingDays;
    const effectiveNewMemberDays = Math.max(0, daysRemaining - onboardingDays) * newMembers;

    // Calculate mentor productivity loss
    const mentorsNeeded = Math.ceil(newMembers / 2); // 1 mentor per 2 new members
    const mentorProductivityLossDays = mentorsNeeded *
      this.config.mentorProductivityLoss *
      this.config.knowledgeTransferDays;

    // Calculate net gain/loss
    const potentialNewMemberContribution = effectiveNewMemberDays *
      (1 - parseFloat(newCapacity.overheadPercentage) / 100);
    const netImpact = potentialNewMemberContribution - mentorProductivityLossDays;

    // Break-even analysis
    const breakEvenDays = onboardingDays +
      (mentorProductivityLossDays / newMembers);

    return {
      currentTeam: currentCapacity,
      projectedTeam: newCapacity,
      onboardingPeriod: {
        days: onboardingDays,
        newMembersUnproductive: newMembers,
        mentorsNeeded,
        mentorProductivityLoss: (this.config.mentorProductivityLoss * 100) + '%'
      },
      impact: {
        potentialContribution: potentialNewMemberContribution.toFixed(1) + ' person-days',
        productivityCost: mentorProductivityLossDays.toFixed(1) + ' person-days',
        netImpact: netImpact.toFixed(1) + ' person-days',
        isPositive: netImpact > 0
      },
      breakEven: {
        days: breakEvenDays.toFixed(0),
        willBreakEven: breakEvenDays < daysRemaining
      },
      recommendation: this.generateRecommendation(netImpact, breakEvenDays, daysRemaining)
    };
  }

  /**
   * Generate recommendation based on analysis
   * @param {number} netImpact - Net impact in person-days
   * @param {number} breakEvenDays - Days to break even
   * @param {number} daysRemaining - Days remaining
   * @returns {string}
   */
  generateRecommendation(netImpact, breakEvenDays, daysRemaining) {
    if (breakEvenDays > daysRemaining) {
      return 'NOT RECOMMENDED: Team additions will not break even before deadline';
    }
    if (netImpact < 0) {
      return 'NOT RECOMMENDED: Net impact is negative';
    }
    if (netImpact > 0 && breakEvenDays < daysRemaining * 0.5) {
      return 'PROCEED WITH CAUTION: Additions may help, but monitor closely';
    }
    return 'MARGINAL: Consider other alternatives first';
  }
}

// Example 2: Team Productivity Simulator
class TeamProductivitySimulator {
  constructor() {
    this.history = [];
  }

  /**
   * Simulate team productivity over time
   * @param {object} scenario - Simulation scenario
   * @returns {Array} - Daily productivity data
   */
  simulate(scenario) {
    const {
      initialTeamSize,
      durationDays,
      additions = [] // [{day: 10, members: 2}, ...]
    } = scenario;

    const calculator = new BrooksLawCalculator();
    const results = [];
    let currentSize = initialTeamSize;
    const newMemberReadiness = new Map(); // Track new member productivity

    for (let day = 1; day <= durationDays; day++) {
      // Check for additions on this day
      const todaysAddition = additions.find(a => a.day === day);
      if (todaysAddition) {
        // Add new members with their join date
        for (let i = 0; i < todaysAddition.members; i++) {
          newMemberReadiness.set(`new_${currentSize + i}`, {
            joinDay: day,
            productivity: 0
          });
        }
        currentSize += todaysAddition.members;
      }

      // Update new member productivity (ramp up over 20 days)
      let newMemberContribution = 0;
      for (const [id, member] of newMemberReadiness) {
        const daysOnTeam = day - member.joinDay;
        member.productivity = Math.min(daysOnTeam / 20, 1); // Linear ramp to 100%
        newMemberContribution += member.productivity;
      }

      // Calculate effective productivity
      const capacity = calculator.calculateEffectiveCapacity(currentSize);
      const baseProductivity = parseFloat(capacity.effectiveCapacity);

      // Adjust for new member ramp-up
      const originalMembers = initialTeamSize;
      const newMembers = currentSize - initialTeamSize;
      const adjustedProductivity = originalMembers *
        (1 - parseFloat(capacity.overheadPercentage) / 100) +
        newMemberContribution;

      results.push({
        day,
        teamSize: currentSize,
        channels: capacity.communicationChannels,
        overhead: capacity.overheadPercentage,
        theoreticalCapacity: baseProductivity.toFixed(2),
        actualProductivity: adjustedProductivity.toFixed(2),
        newMemberProductivity: (newMemberContribution / (newMembers || 1)).toFixed(2)
      });
    }

    this.history.push({ scenario, results });
    return results;
  }

  /**
   * Compare scenarios
   * @param {Array} scenarios - Scenarios to compare
   * @returns {object}
   */
  compareScenarios(scenarios) {
    const results = scenarios.map(s => ({
      name: s.name,
      simulation: this.simulate(s)
    }));

    // Calculate total work completed for each scenario
    const totals = results.map(r => ({
      name: r.name,
      totalWork: r.simulation.reduce((sum, day) =>
        sum + parseFloat(day.actualProductivity), 0
      ).toFixed(1)
    }));

    return {
      scenarios: results,
      totals,
      winner: totals.reduce((max, s) =>
        parseFloat(s.totalWork) > parseFloat(max.totalWork) ? s : max
      ).name
    };
  }
}

// Example 3: Team Size Optimizer
class TeamSizeOptimizer {
  /**
   * Find optimal team size for a project
   * @param {object} project - Project parameters
   * @returns {object}
   */
  static findOptimalSize(project) {
    const {
      totalEffort, // in person-days
      deadline, // in days
      minTeamSize = 1,
      maxTeamSize = 20
    } = project;

    const calculator = new BrooksLawCalculator();
    const analyses = [];

    for (let size = minTeamSize; size <= maxTeamSize; size++) {
      const capacity = calculator.calculateEffectiveCapacity(size);
      const effectiveCapacity = parseFloat(capacity.effectiveCapacity);
      const daysToComplete = totalEffort / effectiveCapacity;
      const onSchedule = daysToComplete <= deadline;

      analyses.push({
        teamSize: size,
        effectiveCapacity: effectiveCapacity.toFixed(2),
        utilizationRate: capacity.utilizationRate,
        daysToComplete: daysToComplete.toFixed(1),
        onSchedule,
        buffer: onSchedule ? (deadline - daysToComplete).toFixed(1) : 'N/A'
      });
    }

    // Find optimal (smallest team that meets deadline with buffer)
    const viable = analyses.filter(a => a.onSchedule);
    const optimal = viable.length > 0
      ? viable.reduce((best, a) =>
          parseFloat(a.utilizationRate) > parseFloat(best.utilizationRate) ? a : best
        )
      : analyses[analyses.length - 1];

    return {
      analyses,
      optimal,
      recommendation: viable.length > 0
        ? `Optimal team size: ${optimal.teamSize} (${optimal.utilizationRate} utilization)`
        : `Project cannot be completed on time with given constraints`
    };
  }
}

// Example 4: Communication Pattern Analyzer
class CommunicationPatternAnalyzer {
  /**
   * Analyze communication patterns for different team structures
   * @param {number} teamSize - Total team size
   * @param {object} structure - Team structure (flat, hierarchical, pods)
   * @returns {object}
   */
  static analyze(teamSize, structure = { type: 'flat' }) {
    let channels;
    let description;

    switch (structure.type) {
      case 'flat':
        channels = (teamSize * (teamSize - 1)) / 2;
        description = 'Everyone communicates with everyone';
        break;

      case 'hierarchical':
        // Manager + n reports, only vertical communication
        const managers = structure.managers || Math.ceil(teamSize / 7);
        const reportsPerManager = Math.ceil((teamSize - managers) / managers);
        channels = (managers * reportsPerManager) + (managers * (managers - 1)) / 2;
        description = `${managers} managers with ~${reportsPerManager} reports each`;
        break;

      case 'pods':
        // Small pods with pod leads
        const podSize = structure.podSize || 4;
        const pods = Math.ceil(teamSize / podSize);
        const internalChannels = pods * (podSize * (podSize - 1)) / 2;
        const crossPodChannels = (pods * (pods - 1)) / 2;
        channels = internalChannels + crossPodChannels;
        description = `${pods} pods of ~${podSize} members`;
        break;

      default:
        channels = (teamSize * (teamSize - 1)) / 2;
        description = 'Flat structure';
    }

    const flatChannels = (teamSize * (teamSize - 1)) / 2;
    const reduction = ((flatChannels - channels) / flatChannels * 100).toFixed(1);

    return {
      teamSize,
      structure: structure.type,
      description,
      channels,
      flatEquivalent: flatChannels,
      channelReduction: reduction + '%',
      recommendedMeetings: this.recommendMeetingStructure(teamSize, structure)
    };
  }

  /**
   * Recommend meeting structure
   * @param {number} teamSize - Team size
   * @param {object} structure - Team structure
   * @returns {object}
   */
  static recommendMeetingStructure(teamSize, structure) {
    if (teamSize <= 5) {
      return {
        standup: 'Daily, whole team, 15 min',
        planning: 'Weekly, whole team, 1 hour',
        retro: 'Bi-weekly, whole team, 1 hour'
      };
    }

    if (structure.type === 'pods') {
      return {
        standup: 'Daily, pod-level, 15 min',
        podSync: 'Weekly, pod leads, 30 min',
        planning: 'Bi-weekly, whole team, 2 hours',
        retro: 'Bi-weekly, pod-level, 1 hour'
      };
    }

    return {
      standup: 'Daily, sub-teams, 15 min',
      syncUp: 'Weekly, leads, 30 min',
      planning: 'Weekly, representatives, 1 hour',
      retro: 'Bi-weekly, sub-teams, 1 hour'
    };
  }
}

// Demonstration
console.log("=== Brooks' Law Examples ===\n");

const calculator = new BrooksLawCalculator();

// Communication channels growth
console.log('--- Communication Channels by Team Size ---\n');
[3, 5, 7, 10, 15, 20].forEach(size => {
  const capacity = calculator.calculateEffectiveCapacity(size);
  console.log(`Team of ${size}: ${capacity.communicationChannels} channels, ${capacity.effectiveCapacity} effective capacity (${capacity.utilizationRate} utilization)`);
});

// Impact of adding people
console.log('\n--- Impact of Adding Team Members ---\n');
const impact = calculator.calculateAdditionImpact(5, 3, 30);
console.log('Scenario: Add 3 members to team of 5, with 30 days remaining');
console.log(`\nCurrent team: ${impact.currentTeam.effectiveCapacity} effective capacity`);
console.log(`Projected team: ${impact.projectedTeam.effectiveCapacity} effective capacity`);
console.log(`\nOnboarding period: ${impact.onboardingPeriod.days} days`);
console.log(`Mentors needed: ${impact.onboardingPeriod.mentorsNeeded}`);
console.log(`\nNet impact: ${impact.impact.netImpact}`);
console.log(`Break-even: ${impact.breakEven.days} days`);
console.log(`Will break even: ${impact.breakEven.willBreakEven}`);
console.log(`\nRecommendation: ${impact.recommendation}`);

// Productivity simulation
console.log('\n--- Productivity Simulation ---\n');
const simulator = new TeamProductivitySimulator();
const comparison = simulator.compareScenarios([
  {
    name: 'Keep team of 5',
    initialTeamSize: 5,
    durationDays: 30,
    additions: []
  },
  {
    name: 'Add 3 on day 5',
    initialTeamSize: 5,
    durationDays: 30,
    additions: [{ day: 5, members: 3 }]
  }
]);

console.log('Total work completed:');
comparison.totals.forEach(t => {
  console.log(`  ${t.name}: ${t.totalWork} person-days`);
});
console.log(`\nBetter approach: ${comparison.winner}`);

// Team structure analysis
console.log('\n--- Team Structure Analysis (15 people) ---\n');
['flat', 'hierarchical', 'pods'].forEach(type => {
  const analysis = CommunicationPatternAnalyzer.analyze(15, {
    type,
    podSize: 5,
    managers: 3
  });
  console.log(`${type.toUpperCase()}: ${analysis.channels} channels (${analysis.channelReduction} reduction from flat)`);
});

/**
 * Brooks' Law Implications:
 *
 * 1. Man-months are NOT interchangeable - tasks have inherent limits
 *
 * 2. Adding people increases communication overhead exponentially
 *
 * 3. New team members need onboarding time before contributing
 *
 * 4. Existing members lose productivity training newcomers
 *
 * 5. Not all tasks can be parallelized
 *
 * Mitigation Strategies:
 * - Add people EARLY in a project, not late
 * - Use smaller, autonomous teams (pods)
 * - Reduce communication needs through clear interfaces
 * - Document extensively to reduce knowledge transfer time
 * - Consider alternatives: reduce scope, extend deadline
 */
