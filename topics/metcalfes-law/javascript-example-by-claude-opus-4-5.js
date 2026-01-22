/**
 * Metcalfe's Law - Network Effect Value
 *
 * Metcalfe's Law states that the value of a telecommunications network
 * is proportional to the square of the number of connected users.
 * As more users join, the number of possible connections increases
 * exponentially, making the network more valuable.
 *
 * Key Concepts:
 * - Network value grows with n² where n is users
 * - Each new user adds value for all existing users
 * - Explains success of social networks
 * - Not all connections have equal value
 */

/**
 * Network represents a connected network of users.
 * Calculates value based on Metcalfe's Law.
 */
class Network {
    constructor(name, options = {}) {
        this.name = name;
        this.users = new Map();
        this.connections = [];
        this.valuePerConnection = options.valuePerConnection || 1;
        this.createdAt = new Date();
    }

    /**
     * Adds a user to the network
     * @param {Object} user - User to add
     */
    addUser(user) {
        const userId = user.id || `user-${this.users.size + 1}`;
        this.users.set(userId, {
            ...user,
            id: userId,
            joinedAt: new Date(),
            connections: []
        });

        // Automatically connect to existing users (simplified)
        this.createPotentialConnections(userId);

        return userId;
    }

    /**
     * Creates potential connections for a new user
     * @param {string} userId - New user ID
     */
    createPotentialConnections(userId) {
        // In Metcalfe's model, each user can potentially connect to all others
        for (const [otherId, _] of this.users) {
            if (otherId !== userId) {
                this.connections.push({
                    from: userId,
                    to: otherId,
                    potential: true,
                    active: false
                });
            }
        }
    }

    /**
     * Activates a connection between users
     * @param {string} userId1 - First user
     * @param {string} userId2 - Second user
     */
    connect(userId1, userId2) {
        const connection = this.connections.find(c =>
            (c.from === userId1 && c.to === userId2) ||
            (c.from === userId2 && c.to === userId1)
        );

        if (connection) {
            connection.active = true;
            connection.activatedAt = new Date();
        }
    }

    /**
     * Gets number of users
     * @returns {number} User count
     */
    get userCount() {
        return this.users.size;
    }

    /**
     * Calculates maximum possible connections (Metcalfe's formula base)
     * @returns {number} Maximum connections
     */
    getMaxConnections() {
        const n = this.users.size;
        return (n * (n - 1)) / 2;
    }

    /**
     * Calculates network value using Metcalfe's Law
     * @returns {number} Network value
     */
    calculateMetcalfeValue() {
        const n = this.users.size;
        return n * n * this.valuePerConnection;
    }

    /**
     * Calculates network value using actual connections
     * @returns {number} Actual network value
     */
    calculateActualValue() {
        const activeConnections = this.connections.filter(c => c.active).length;
        return activeConnections * this.valuePerConnection;
    }

    /**
     * Gets value per user (marginal value)
     * @returns {number} Value per user
     */
    getValuePerUser() {
        if (this.users.size === 0) return 0;
        return this.calculateMetcalfeValue() / this.users.size;
    }

    /**
     * Calculates marginal value of adding one more user
     * @returns {number} Marginal value
     */
    getMarginalValueOfNextUser() {
        const currentValue = this.calculateMetcalfeValue();
        const newN = this.users.size + 1;
        const newValue = newN * newN * this.valuePerConnection;
        return newValue - currentValue;
    }

    /**
     * Gets network statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        return {
            name: this.name,
            users: this.users.size,
            maxConnections: this.getMaxConnections(),
            activeConnections: this.connections.filter(c => c.active).length,
            metcalfeValue: this.calculateMetcalfeValue(),
            valuePerUser: this.getValuePerUser().toFixed(2),
            marginalValueNext: this.getMarginalValueOfNextUser().toFixed(2)
        };
    }
}

/**
 * NetworkGrowthSimulator simulates network growth over time.
 * Shows how value changes with user growth.
 */
class NetworkGrowthSimulator {
    constructor() {
        this.history = [];
    }

    /**
     * Simulates network growth
     * @param {number} targetUsers - Target number of users
     * @param {number} valuePerConnection - Value per connection
     * @returns {Array} Growth history
     */
    simulate(targetUsers, valuePerConnection = 1) {
        this.history = [];

        for (let n = 1; n <= targetUsers; n++) {
            const connections = (n * (n - 1)) / 2;
            const metcalfeValue = n * n * valuePerConnection;
            const marginalValue = n > 1
                ? metcalfeValue - ((n - 1) * (n - 1) * valuePerConnection)
                : metcalfeValue;

            this.history.push({
                users: n,
                connections,
                metcalfeValue,
                marginalValue,
                valuePerUser: metcalfeValue / n
            });
        }

        return this.history;
    }

    /**
     * Gets growth summary
     * @returns {Object} Summary
     */
    getSummary() {
        if (this.history.length === 0) return null;

        const last = this.history[this.history.length - 1];
        const mid = this.history[Math.floor(this.history.length / 2)];

        return {
            finalUsers: last.users,
            finalValue: last.metcalfeValue,
            finalConnections: last.connections,
            growthRatio: (last.metcalfeValue / mid.metcalfeValue).toFixed(2),
            valueMultiplier: (last.metcalfeValue / this.history[0].metcalfeValue).toFixed(0)
        };
    }

    /**
     * Finds break-even point given fixed costs
     * @param {number} fixedCostPerUser - Cost per user
     * @returns {Object} Break-even analysis
     */
    findBreakEven(fixedCostPerUser) {
        for (const point of this.history) {
            const totalCost = point.users * fixedCostPerUser;
            if (point.metcalfeValue >= totalCost) {
                return {
                    users: point.users,
                    value: point.metcalfeValue,
                    cost: totalCost,
                    profit: point.metcalfeValue - totalCost
                };
            }
        }

        return { breakEven: false, message: 'Break-even not reached' };
    }
}

/**
 * MetcalfeLawAnalyzer analyzes real-world network effects.
 * Examines limitations and variations of Metcalfe's Law.
 */
class MetcalfeLawAnalyzer {
    /**
     * Calculates different network value models
     * @param {number} n - Number of users
     * @returns {Object} Values under different models
     */
    static compareModels(n) {
        return {
            metcalfe: {
                name: "Metcalfe's Law (n²)",
                value: n * n,
                description: 'Original formulation - all connections equal'
            },
            sarnoff: {
                name: "Sarnoff's Law (n)",
                value: n,
                description: 'Broadcast networks - linear growth'
            },
            reed: {
                name: "Reed's Law (2ⁿ)",
                value: Math.pow(2, Math.min(n, 20)), // Capped to prevent overflow
                description: 'Group-forming networks - exponential'
            },
            zipf: {
                name: 'Zipf-adjusted (n·log(n))',
                value: n * Math.log2(n + 1),
                description: 'Accounts for diminishing connection value'
            }
        };
    }

    /**
     * Analyzes network effect strength
     * @param {Object} metrics - Network metrics
     * @returns {Object} Analysis
     */
    static analyzeNetworkEffect(metrics) {
        const { users, activeConnections, revenue } = metrics;
        const maxConnections = (users * (users - 1)) / 2;
        const connectionUtilization = activeConnections / maxConnections;
        const revenuePerUser = revenue / users;
        const metcalfeExpectedRevenue = users * users; // Simplified

        return {
            connectionUtilization: `${(connectionUtilization * 100).toFixed(1)}%`,
            revenuePerUser: revenuePerUser.toFixed(2),
            metcalfeEfficiency: (revenue / metcalfeExpectedRevenue).toFixed(2),
            networkEffectStrength: connectionUtilization > 0.1 ? 'strong' : 'weak'
        };
    }

    /**
     * Gets limitations of Metcalfe's Law
     * @returns {Array} Limitations
     */
    static getLimitations() {
        return [
            {
                limitation: 'Equal connection value assumption',
                reality: 'Not all connections are equally valuable',
                implication: 'Actual value may be lower than n²'
            },
            {
                limitation: 'Ignores network quality',
                reality: 'Spam, bots, inactive users reduce value',
                implication: 'User quality matters as much as quantity'
            },
            {
                limitation: 'No negative network effects',
                reality: 'Congestion, noise can decrease value',
                implication: 'There may be optimal network size'
            },
            {
                limitation: 'Assumes universal connectivity',
                reality: 'Users form clusters, not fully connected',
                implication: 'Actual connections far below theoretical max'
            },
            {
                limitation: 'Static model',
                reality: 'User engagement varies over time',
                implication: 'Value fluctuates with activity levels'
            }
        ];
    }
}

/**
 * NetworkValueCalculator helps estimate network value.
 * Provides practical calculations for business applications.
 */
class NetworkValueCalculator {
    /**
     * Calculates customer lifetime value adjusted for network effects
     * @param {Object} params - Calculation parameters
     * @returns {Object} Adjusted CLV
     */
    static calculateNetworkAdjustedCLV(params) {
        const { baseCLV, networkSize, avgConnections, referralRate } = params;

        // Network multiplier based on connections
        const networkMultiplier = 1 + (avgConnections * 0.1);

        // Referral value
        const referralValue = baseCLV * referralRate * avgConnections;

        const adjustedCLV = (baseCLV * networkMultiplier) + referralValue;

        return {
            baseCLV,
            networkMultiplier: networkMultiplier.toFixed(2),
            referralValue: referralValue.toFixed(2),
            adjustedCLV: adjustedCLV.toFixed(2),
            networkPremium: ((adjustedCLV / baseCLV - 1) * 100).toFixed(1) + '%'
        };
    }

    /**
     * Estimates optimal pricing based on network size
     * @param {number} users - Current users
     * @param {number} basePricePerUser - Base price
     * @returns {Object} Pricing analysis
     */
    static estimateOptimalPricing(users, basePricePerUser) {
        // As network grows, can charge more due to increased value
        const networkValueMultiplier = Math.log10(users + 10) / 2;
        const adjustedPrice = basePricePerUser * networkValueMultiplier;

        return {
            users,
            basePrice: basePricePerUser,
            networkMultiplier: networkValueMultiplier.toFixed(2),
            suggestedPrice: adjustedPrice.toFixed(2),
            totalPotentialRevenue: (users * adjustedPrice).toFixed(2)
        };
    }
}

// Demonstration
console.log("=== Metcalfe's Law Demo ===\n");

// Create a network
const socialNetwork = new Network('MySocialApp', { valuePerConnection: 10 });

// Add users
console.log('--- Network Growth ---');
for (let i = 0; i < 10; i++) {
    socialNetwork.addUser({ name: `User ${i + 1}` });
    console.log(`Users: ${socialNetwork.userCount}, Metcalfe Value: ${socialNetwork.calculateMetcalfeValue()}`);
}

console.log('\nNetwork Statistics:', socialNetwork.getStatistics());

// Simulate growth
console.log('\n--- Growth Simulation ---');
const simulator = new NetworkGrowthSimulator();
simulator.simulate(100);
console.log('Growth Summary:', simulator.getSummary());
console.log('Break-even at cost $5/user:', simulator.findBreakEven(5));

// Compare models
console.log('\n--- Model Comparison (n=1000) ---');
const models = MetcalfeLawAnalyzer.compareModels(1000);
Object.entries(models).forEach(([key, model]) => {
    console.log(`${model.name}: ${model.value.toLocaleString()}`);
});

// Analyze network effect
console.log('\n--- Network Effect Analysis ---');
const analysis = MetcalfeLawAnalyzer.analyzeNetworkEffect({
    users: 10000,
    activeConnections: 150000,
    revenue: 1000000
});
console.log(analysis);

// Limitations
console.log("\n--- Metcalfe's Law Limitations ---");
MetcalfeLawAnalyzer.getLimitations().slice(0, 3).forEach(l => {
    console.log(`• ${l.limitation}`);
    console.log(`  Reality: ${l.reality}`);
});

// Business calculations
console.log('\n--- Business Applications ---');
console.log('Network-adjusted CLV:', NetworkValueCalculator.calculateNetworkAdjustedCLV({
    baseCLV: 100,
    networkSize: 10000,
    avgConnections: 50,
    referralRate: 0.1
}));

console.log('Optimal pricing:', NetworkValueCalculator.estimateOptimalPricing(10000, 10));

/**
 * Best Practices for Network Effect Businesses:
 *
 * 1. Prioritize user growth in early stages
 * 2. Focus on activation and engagement, not just signups
 * 3. Build features that encourage connections
 * 4. Measure active connections, not just users
 * 5. Account for network effect in pricing strategy
 * 6. Watch for negative network effects (spam, congestion)
 * 7. Create network effects within product features
 * 8. Use virality coefficients to forecast growth
 * 9. Build switching costs through network value
 * 10. Remember: quality of connections matters
 */
