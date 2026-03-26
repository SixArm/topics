# TODO

Add visual flows

For digital health guide:

= Three A's: Arrange (the method prep), Act (init the method), Assert.

- AI in digital health ("the art of the possible")
- Fake data
- Factories, fixtures, etc.
- Security
- RAID log
- Risk registry
- Hackathon?

Tools:

- Selenium browser testing
- Webdriver.IO browser testing
- Playwright E2E testing
- Cypress web testing

Testing frameworks:

- Jest
- ?

Containerization

- Docker
- Podman
- Kubernetes

# TODO

Cyclomatic complexity
Halstead volume

[Types of testing](topics/types-of-testing)

- [Exploratory testing](topics/exploratory-testing)
- [Ad hoc testing](topics/ad-hoc-testing)
- [Component testing](topics/component-testing)
- [System quality testing](topics/system-quality-testing)
- [Autonomous testing](topics/autonomous-testing)
- [Distributed testing](topics/distributed-testing)
- [Smoke testing](topics/smoke-testing)
- [Manual testing](topics/manual-testing)

[Alpha testing](topics/alpha-testing)
[Beta testing](topics/beta-testing)
[Canary testing](topics/canary-testing)

[Top-down testing](topics/top-down testing): An incremental approach to integration testing where the highest-level components are tested first, with lower level components being simulated by stubs. Tested components are then used to test lower level components. The process is repeated until the lowest level components are tested.

[Bottom-up testing](topics/bottom-up-testing): An incremental approach to integration testing where the lowest-level components are tested first, and then used to facilitate the testing of higher level components. This process is repeated until the highest-level components are tested.

[CSS selector](topics/css-selector)
[XPath selector](topics/xpath-selector)

XPath query

####

abuse case: A use case in which some actors with malcious intent are causing harm to the system or to other actors.

acceptance criteria: The exit criteria that a component or system must satisfy in order to be accepted by a user, customer, or other authorized entity.

[accuracy](topics/accuracy)
[precision](topics/precision)

The phase within the IDEAL model where the improvements are developed, put into practice, and deployed
across the organization. The acting phase consists of the activities: create solution, pilot/test solution,

actor: User or any other person or system that interacts with the test object in a specific way.

anomaly: Any condition that deviates from expectation based on requirements specifications, design documents, user documents, standards, etc., or from someone's perception or experience. Anomalies may be found during, but not limited to, reviewing, testing, analysis, compilation, or use of software products or applicable documentation.

audit: An independent evaluation of software products or processes to ascertain compliance to standards, guidelines, specifications, and/or procedures based on objective criteria, including documents that specify: the form or content of the products to be produced, the process by which the products shall be produced, and how compliance to standards or guidelines shall be measured.

audit trail: A path by which the original input to a process (e.g., data) can be traced back through the process, taking the process output as a starting point. This facilitates defect analysis and allows a process audit to be carried out.

defect density: The degree to which a component or system is operational and accessible when required for use. Often expressed as a percentage.

baseline: A specification or software product that has been formally reviewed or agreed upon, that thereafter serves as the basis for further development, and that can be changed only through a formal change control process.

basis test set
A set of test cases derived from the internal structure of a component or specification to ensure that 100% of a
specified coverage criterion will be achieved.

boundary value: An input value or output value which is on the edge of an equivalence partition or at the smallest incremental distance on either side of an edge, for example the minimum or maximum value of a range.

boundary value analysis: A black-box test design technique in which test cases are designed based on boundary values.

boundary value coverage: The percentage of boundary values that have been exercised by a test suite.

Capability Maturity Model Integration (CMMI)
Ref: CMMI
A framework that describes the key elements of an effective product development and maintenance process.
The Capability Maturity Model Integration covers best-practices for planning, engineering and managing
product development and maintenance.

A digital health approach, where inputs to the test object are recorded during manual testing in order to
generate automated test scripts that could be executed later (i.e. replayed).

causal analysis: The analysis of defects to determine their root cause.

cause-effect diagram: Synonyms: fishbone diagram , Ishikawa diagram. A graphical representation used to organize and display the interrelationships of various possible root causes of a problem. Possible causes of a real or potential defect or failure are organized in categories and subcategories
in a horizontal tree-structure, with the (potential) defect or failure as the root node.

checklist-based testing
An experience-based test design technique whereby the experienced tester uses a high-level list of items to be
noted, checked, or remembered, or a set of rules or criteria against which a product has to be verified.

classification tree: A tree showing equivalence partitions hierarchically ordered, which is used to design test cases in the

classification tree method: A black-box test design technique in which test cases, described by means of a classification tree, are designed to execute combinations of representatives of input and/or output domains.

concurrency testing: Testing to determine how the occurrence of two or more activities within the same interval of time, achieved either by interleaving the activities or by simultaneous execution, is handled by the component or system.

confidence interval

confirmation testing: Testing that runs test cases that failed the last time they were run, in order to verify the success of corrective actions.

consultative testing: Testing driven by the advice and guidance of appropriate experts from outside the test team (e.g., technology experts and/or business domain experts).

control flow testing

convergence metric: A metric that shows progress toward a defined criterion, e.g., convergence of the total number of tests executed to the total number of tests planned for execution.

critical success factor: An element necessary for an organization or project to achieve its mission. Critical success factors are the critical factors or activities required for ensuring the success.

cyclomatic complexity: The maximum number of linear, independent paths through a program. Cyclomatic complexity may be computed as L = N + 2P, where L = the number of edges/links in a graph, N = the number of nodes in a graph, P = the number of disconnected parts of the graph (e.g., a called graph or subroutine).

data flow: An abstract representation of the sequence and possible changes of the state of data objects, where the state of an object is any of creation, usage, or destruction.

data flow analysis: A form of static analysis based on the definition and usage of variables.
data flow coverage The percentage of definition-use pairs that have been exercised by a test suite.

data flow testing: A white-box test design technique in which test cases are designed to execute definition-use pairs of variables.

data obfuscation: Data transformation that makes it difficult for a human to recognize the original data.

data privacy: The protection of personally identifiable information or otherwise sensitive information from undesired disclosure

data quality: An attribute of data that indicates correctness with respect to some pre-defined criteria, e.g., business expectations, requirements on data integrity, data consistency.

data-driven testing: A scripting technique that stores test input and expected results in a table or spreadsheet, so that a single control script can execute all of the tests in the table. Data-driven testing is often used to support the application
of test execution tools such as capture/playback tools.

database integrity testing: Testing the methods and processes used to access and manage the data(base), to ensure access methods, processes and data rules function as expected and that during access to the database, data is not corrupted or unexpectedly deleted, updated or created.

debugging

decision coverage
The percentage of decision outcomes that have been exercised by a test suite. 100% decision coverage implies
both 100% branch coverage and 100% statement coverage.

decision table testing: A black-box test design technique in which test cases are designed to execute the combinations of inputs and/or stimuli (causes) shown in a decision table.
decision testing
A white-box test design technique in which test cases are designed to execute decision outcomes.

defect: A flaw in a component or system that can cause the component or system to fail to perform its required function, e.g., an incorrect statement or data definition. A defect, if encountered during execution, may cause a failure of the component or system. Synonyms: bug, fault, problem.

defect density: The number of defects identified in a component or system divided by the size of the component or system (expressed in standard measurement terms, e.g., lines-of-code, number of classes or function points). Synonyms: fault density.

defect taxonomy: A system of (hierarchical) categories designed to be a useful aid for reproducibly classifying defects. Synonyms: bug taxonomy.

documentation testing: Testing the quality of the documentation, e.g., user guide or installation guide.

entry criteria: The set of generic and specific conditions for permitting a process to go forward with a defined task, e.g., test
phase. The purpose of entry criteria is to prevent a task from starting which would entail more (wasted) effort
compared to the effort needed to remove the failed entry criteria.

entry point
An executable statement or process step which defines a point at which a given process is intended to begin.
equivalence partition
Synonyms: equivalence class
A portion of an input or output domain for which the behavior of a component or system is assumed to be the
same, based on the specification.

equivalence partition coverage
The percentage of equivalence partitions that have been exercised by a test suite.

equivalence partitioning
Synonyms: partition testing
A black-box test design technique in which test cases are designed to execute representatives from
equivalence partitions. In principle, test cases are designed to cover each partition at least once.

equivalent manual test effort (EMTE)
Effort required for running tests manually.

error
Ref: After IEEE 610
Synonyms: mistake
A human action that produces an incorrect result.

error tolerance
Ref: After IEEE 610
The ability of a system or component to continue normal operation despite the presence of erroneous inputs.

escaped defect
See Also: Defect Detection Percentage
A defect that was not detected in a previous test level which is supposed to find such type of defects.

establishing (IDEAL)
See Also: IDEAL
The phase within the IDEAL model where the specifics of how an organization will reach its destination are
planned. The establishing phase consists of the activities set priorities, develop approach and plan actions.

European Foundation for Quality Management excellence model (EFQM)
A non-prescriptive framework for an organization's quality management system, defined and owned by the
European Foundation for Quality Management, based on five 'Enabling' criteria (covering what an organization
does), and four 'Results' criteria (covering what an organization achieves).

exception handling
Behavior of a component or system in response to erroneous input, from either a human user or from another
component or system, or to an internal failure.
executable statement

exit criteria
Ref: After Gilb and Graham
Synonyms: completion criteria , test completion criteria
The set of generic and specific conditions, agreed upon with the stakeholders for permitting a process to be
officially completed. The purpose of exit criteria is to prevent a task from being considered completed when
there are still outstanding parts of the task which have not been finished. Exit criteria are used to report against
and to plan when to stop testing.

exit point
An executable statement or process step which defines a point at which a given process is intended to cease.

expected result
Synonyms: expected outcome , predicted outcome
The behavior predicted by the specification, or another source, of the component or system under specified
conditions.
experience-based test design technique
Synonyms: experience-based technique
Procedure to derive and/or select test cases based on the tester's experience, knowledge and intuition.

exploratory testing
Ref: After Bach
An informal test design technique where the tester actively controls the design of the tests as those tests are
performed and uses information gained while testing to design new and better tests.

fail
Synonyms: test fail
A test is deemed to fail if its actual result does not match its expected result.
failover testing
See Also: recoverability testing
Testing by simulating failure modes or actually causing failures in a controlled environment. Following a failure,
the failover mechanism is tested to ensure that data is not lost or corrupted and that any agreed service levels
are maintained (e.g., function availability or response times).

failure
Ref: After Fenton
Deviation of the component or system from its expected delivery, service or result.

failure mode
Ref: IEEE 610
The physical or functional manifestation of a failure. For example, a system in failure mode may be
characterized by slow operation, incorrect outputs, or complete termination of execution.

Failure Mode and Effect Analysis (FMEA)
See Also: Failure Mode, Effect and Criticality Analysis
Synonyms: Software Failure Mode and Effect Analysis
A systematic approach to risk identification and analysis of identifying possible modes of failure and attempting
to prevent their occurrence.

Failure Mode, Effects, and Criticality Analysis (FMECA)
See Also: Failure Mode and Effect Analysis
Synonyms: software failure mode
An extension of FMEA, as in addition to the basic FMEA, it includes a criticality analysis, which is used to chart
the probability of failure modes against the severity of their consequences. The result highlights failure modes
with relatively high probability and severity of consequences, allowing remedial effort to be directed where it will
produce the greatest value.

failure rate
Ref: IEEE 610
The ratio of the number of failures of a given category to a given unit of measure, e.g., failures per unit of time,
failures per number of transactions, failures per number of computer runs.

fault injection
See Also: fault tolerance
The process of intentionally adding defects to a system for the purpose of finding out whether the system can
detect, and possibly recover from, a defect. Fault injection is intended to mimic failures that might occur in the
field.

fault tolerance
Ref: ISO 9126 See Also: reliability, robustness
The capability of the software product to maintain a specified level of performance in cases of software faults
(defects) or of infringement of its specified interface.

Fault Tree Analysis (FTA)
Synonyms: Software Fault Tree Analysis
A technique used to analyze the causes of faults (defects). The technique visually models how logical
relationships between failures, human errors, and external events can combine to cause specific faults to
disclose.

feature-driven development
See Also: Agile software development
An iterative and incremental software development process driven from a client-valued functionality (feature)
perspective. Feature-driven development is mostly used in Agile software development.

formal review
A review characterized by documented procedures and requirements, e.g., inspection.

Function Point Analysis (FPA)
Method aiming to measure the size of the functionality of an information system. The measurement is
independent of the technology. This measurement may be used as a basis for the measurement of productivity,
the estimation of the needed resources, and project control.

functional requirement
Ref: IEEE 610
A requirement that specifies a function that a component or system must perform.

Goal Question Metric (GQM)
An approach to software measurement using a three-level model conceptual level (goal), operational level
(question) and quantitative level (metric).

GUI
Acronym for Graphical User Interface.
GUI testing
Testing performed by interacting with the software under test via the graphical user interface.
hacker
See Also: attacker
A person or organization who is actively involved in security attacks, usually with malicious intent.
hardware-software integration testing
See Also: integration testing
Testing performed to expose defects in the interfaces and interaction between hardware and software
components.
hashing
Transformation of a variable length string of characters into a usually shorter fixed-length value or key. Hashed
values, or hashes, are commonly used in table or database lookups. Cryptographic hash functions are used to
secure data.
hazard analysis
See Also: risk analysis
A technique used to characterize the elements of risk. The result of a hazard analysis will drive the methods
used for development and testing of a system.
heuristic evaluation
A usability review technique that targets usability problems in the user interface or user interface design. With
this technique, the reviewers examine the interface and judge its compliance with recognized usability principles
(the "heuristics").
high-level test case
See Also: low-level test case
Synonyms: abstract test case , logical test case
A test case without concrete (implementation level) values for input data and expected results. Logical operators
are used: instances of the actual values are not yet defined and/or available.
horizontal traceability
The tracing of requirements for a test level through the layers of test documentation (e.g., test plan, test design
specification, test case specification and test procedure specification or test script).
hyperlink
A pointer within a web page that leads to other web pages.
hyperlink test tool
A tool used to check that no broken hyperlinks are present on a web site.
IDEAL
An organizational improvement model that serves as a roadmap for initiating, planning, and implementing
improvement actions. The IDEAL model is named for the five phases it describes: initiating, diagnosing,
establishing, acting, and learning.
impact analysis
The assessment of change to the layers of development documentation, test documentation and components,
in order to implement a given change to specified requirements.
incident
Ref: After IEEE 1008
Synonyms: deviation , software test incident , test incident
Any event occurring that requires investigation.
incident logging
Recording the details of any incident that occurred, e.g., during testing.
incident management
Ref: After IEEE 1044
The process of recognizing, investigating, taking action and disposing of incidents. It involves logging incidents,
classifying them and identifying the impact.
incident management tool
See Also: defect management tool
A tool that facilitates the recording and status tracking of incidents. They often have workflow-oriented facilities
to track and control the allocation, correction and re-testing of incidents and provide reporting facilities.
incident report
Ref: After IEEE 829
Synonyms: deviation report , software test incident report , test incident report
A document reporting on any event that occurred, e.g., during the testing, which requires investigation.
incremental development model
A development lifecycle where a project is broken into a series of increments, each of which delivers a portion
of the functionality in the overall project requirements. The requirements are prioritized and delivered in priority
order in the appropriate increment. In some (but not all) versions of this lifecycle model, each subproject follows
a mini V-model with its own design, coding and testing phases.
incremental testing
Testing where components or systems are integrated and tested one or some at a time, until all the
components or systems are integrated and tested.
independence of testing
Ref: After DO-178b
Separation of responsibilities, which encourages the accomplishment of objective testing.
indicator
Ref: ISO 14598
A measure that can be used to estimate or predict another measure.
infeasible path
A path that cannot be exercised by any set of possible input values.
informal review
A review not based on a formal (documented) procedure.
information assurance
Ref: NIST.IR.7298
Measures that protect and defend information and information systems by ensuring their availability, integrity,
authentication, confidentiality, and non-repudiation. These measures include providing for restoration of
information systems by incorporating protection, detection, and reaction capabilities.
information security
Ref: NIST.IR.7298
Synonyms: cybersecurity
The protection of information and information systems from unauthorized access, use, disclosure, disruption,
modification, or destruction in order to provide confidentiality, integrity, and availability.
initiating (IDEAL)
See Also: IDEAL
The phase within the IDEAL model where the groundwork is laid for a successful improvement effort. The
initiating phase consists of the activities: set context, build sponsorship and charter infrastructure.
input
A variable (whether stored within a component or outside) that is read by a component.
input domain
See Also: domain
The set from which valid input values can be selected.
input value
See Also: input
An instance of an input.
insider threat
A security threat originating from within the organization, often by an authorized system user.
insourced testing
Testing performed by people who are co-located with the project team but are not fellow employees.
inspection
Ref: After IEEE 610, IEEE 1028 See Also: peer review
A type of peer review that relies on visual examination of documents to detect defects, e.g., violations of
development standards and non-conformance to higher level documentation. The most formal review technique
and therefore always based on a documented procedure.
installability
Ref: ISO 9126 . See Also: portability
The capability of the software product to be installed in a specified environment.
installability testing
See Also: portability testing
Testing the installability of a software product.
installation guide
Supplied instructions on any suitable media, which guides the installer through the installation process. This
may be a manual guide, step-by-step procedure, installation wizard, or any other similar process description.
installation wizard
Supplied software on any suitable media, which leads the installer through the installation process. It normally
runs the installation process, provides feedback on installation results, and prompts for options.
instrumentation
The insertion of additional code into the program in order to collect information about program behavior during
execution, e.g., for measuring code coverage.
instrumenter
Synonyms: program instrumenter
A software tool used to carry out instrumentation.
intake test
See Also: smoke test
Synonyms: pretest
A special instance of a smoke test to decide if the component or system is ready for detailed and further testing.
An intake test is typically carried out at the start of the test execution phase.
integration
The process of combining components or systems into larger assemblies.
integration testing
See Also: component integration testing, system integration testing
Testing performed to expose defects in the interfaces and in the interactions between integrated components or
systems.
interface testing
An integration test type that is concerned with testing the interfaces between components or systems.
interoperability
Ref: After ISO 9126 See Also: functionality
The capability of the software product to interact with one or more specified components or systems.
interoperability testing
See Also: functionality testing
Synonyms: compatibility testing
Testing to determine the interoperability of a software product.
intrusion detection system (IDS)
See Also: malware scanning
A system which monitors activities on the 7 layers of the OSI model from network to application level, to detect
violations of the security policy.
invalid testing
See Also: error tolerance, negative testing
Testing using input values that should be rejected by the component or system.
isolation testing
Testing of individual components in isolation from surrounding components, with surrounding components
being simulated by stubs and drivers, if needed.
iterative development model
A development lifecycle where a project is broken into a usually large number of iterations. An iteration is a
complete development loop resulting in a release (internal or external) of an executable product, a subset of the
final product under development, which grows from iteration to iteration to become the final product.
keyword-driven testing
See Also: data-driven testing
Synonyms: action word-driven testing
A scripting technique that uses data files to contain not only test data and expected results, but also keywords
related to the application being tested. The keywords are interpreted by special supporting scripts that are
called by the control script for the test.
LCSAJ
A Linear Code Sequence And Jump, consists of the following three items (conventionally identified by line
numbers in a source code listing): the start of the linear sequence of executable statements, the end of the
linear sequence, and the target line to which control flow is transferred at the end of the linear sequence.
LCSAJ coverage
The percentage of LCSAJs of a component that have been exercised by a test suite. 100% LCSAJ coverage
implies 100% decision coverage.
LCSAJ testing
A white-box test design technique in which test cases are designed to execute LCSAJs.
lead assessor
The person who leads an assessment. In some cases, for instance CMMI and TMMi when formal assessments
are conducted, the lead assessor must be accredited and formally trained.
learnability
Ref: ISO 9126 See Also: usability
The capability of the software product to enable the user to learn its application.
learning (IDEAL)
See Also: IDEAL
The phase within the IDEAL model where one learns from experiences and improves one's ability to adopt new
processes and technologies in the future. The learning phase consists of the activities: analyze and validate,
and propose future actions.
level of intrusion
The level to which a test object is modified by adjusting it for testability.
level test plan
See Also: test plan
A test plan that typically addresses one test level.
lifecycle model
Ref: CMMI See Also: software lifecycle
A partitioning of the life of a product or project into phases.
linear scripting
A simple scripting technique without any control structure in the test scripts.
load profile
See Also: operational profile
A specification of the activity which a component or system being tested may experience in production. A load
profile consists of a designated number of virtual users who process a defined set of transactions in a specified
time period and according to a predefined operational profile.
load testing
See Also: performance testing, stress testing
A type of performance testing conducted to evaluate the behavior of a component or system with increasing
load, e.g., numbers of parallel users and/or numbers of transactions, to determine what load can be handled by
the component or system.
load testing tool
See Also: performance testing tool
A tool to support load testing whereby it can simulate increasing load, e.g., numbers of concurrent users and/or
transactions within a specified time-period.
low-level test case
See Also: high-level test case
Synonyms: concrete test case
A test case with concrete (implementation level) values for input data and expected results. Logical operators
from high-level test cases are replaced by actual values that correspond to the objectives of the logical
operators.
maintainability
Ref: ISO 9126
The ease with which a software product can be modified to correct defects, modified to meet new
requirements, modified to make future maintenance easier, or adapted to a changed environment.
maintainability testing
Synonyms: serviceability testing
Testing to determine the maintainability of a software product.
maintenance
Ref: IEEE 1219
Modification of a software product after delivery to correct defects, to improve performance or other attributes,
or to adapt the product to a modified environment.
maintenance testing
Testing the changes to an operational system or the impact of a changed environment to an operational
system.
malware
Software that is intended to harm a system or its components.
malware scanning
See Also: intrusion detection system
Static analysis aiming to detect and remove malicious code received at an interface.
man-in-the-middle attack
The interception, mimicking and/or altering and subsequent relaying of communications (e.g., credit card
transactions) by a third party such that a user remains unaware of that third party's presence.
management review
Ref: After IEEE 610, IEEE 1028
A systematic evaluation of software acquisition, supply, development, operation, or maintenance process,
performed by or on behalf of management that monitors progress, determines the status of plans and
schedules, confirms requirements and their system allocation, or evaluates the effectiveness of management
approaches to achieve fitness for purpose.
manufacturing-based quality
Ref: After Garvin See Also: product-based quality, transcendent-based quality, user-based quality, value-based quality
A view of quality, whereby quality is measured by the degree to which a product or service conforms to its
intended design and requirements. Quality arises from the process(es) used.
master test plan
See Also: test plan
A test plan that typically addresses multiple test levels.
maturity
Ref: ISO 9126 See Also: Capability Maturity Model Integration, Test Maturity Model integration, reliability
(1) The capability of an organization with respect to the effectiveness and efficiency of its processes and work
practices. (2) The capability of the software product to avoid failure as a result of defects in the software.
maturity level
Ref: TMMi
Degree of process improvement across a predefined set of process areas in which all goals in the set are
attained.
maturity model
A structured collection of elements that describe certain aspects of maturity in an organization, and aid in the
definition and understanding of an organization's processes. A maturity model often provides a common
language, shared vision and framework for prioritizing improvement actions.
MBT model
Any model used in model-based testing.
mean time between failures (MTBF)
See Also: reliability growth model
The arithmetic mean (average) time between failures of a system. The MTBF is typically part of a reliability
growth model that assumes the failed system is immediately repaired, as a part of a defect fixing process.
mean time to repair (MTTR)
The arithmetic mean (average) time a system will take to recover from any failure. This typically includes testing
to insure that the defect has been resolved.
measure
Ref: ISO 14598
The number or category assigned to an attribute of an entity by making a measurement.
measurement
Ref: ISO 14598
The process of assigning a number or category to an entity to describe an attribute of that entity.
measurement scale
Ref: ISO 14598
A scale that constrains the type of data analysis that can be performed on it.
memory leak
A memory access failure due to a defect in a program's dynamic store allocation logic that causes it to fail to
release memory after it has finished using it, eventually causing the program and/or other concurrent processes
to fail due to lack of memory.
methodical test strategy
A test strategy whereby the test team uses a pre-determined set of test conditions such as a quality standard, a
checklist, or a collection of generalized, logical test conditions which may relate to a particular domain,
application or type of testing.
methodical testing
Testing based on a standard set of tests, e.g., a checklist, a quality standard, or a set of generalized test cases.
metric
Ref: ISO 14598
A measurement scale and the method used for measurement.
milestone
A point in time in a project at which defined (intermediate) deliverables and results should be ready.
mind map
A diagram used to represent words, ideas, tasks, or other items linked to and arranged around a central
keyword or idea. Mind maps are used to generate, visualize, structure, and classify ideas, and as an aid in
study, organization, problem solving, decision making, and writing.
model coverage
The degree, expressed as a percentage, to which model elements are planned to be or have been exercised
by a test suite.
model-based test strategy
A test strategy whereby the test team derives testware from models.
model-based testing (MBT)
Testing based on or involving models.
modeling tool
Ref: Graham .
A tool that supports the creation, amendment and verification of models of the software or system.
moderator
Synonyms: inspection leader
The leader and main person responsible for an inspection or other review process.
modified condition / decision coverage (MC/DC)
Synonyms: condition determination coverage , modified multiple condition coverage
The percentage of all single condition outcomes that independently affect a decision outcome that have been
exercised by a test case suite. 100% modified condition decision coverage implies 100% decision condition
coverage.
modified condition / decision testing
Synonyms: condition determination testing , modified multiple condition testing
A white-box test design technique in which test cases are designed to execute single condition outcomes that
independently affect a decision outcome.
monitoring tool
Ref: After IEEE 610.
A software tool or hardware device that runs concurrently with the component or system under test and
supervises, records and/or analyses the behavior of the component or system.
monkey testing
Testing by means of a random selection from a large range of inputs and by randomly pushing buttons,
ignorant of how the product is being used.
multiple condition coverage
Synonyms: branch condition combination coverage , condition combination coverage
The percentage of combinations of all single condition outcomes within one statement that have been exercised
by a test suite. 100% multiple condition coverage implies 100% modified condition decision coverage.
multiple condition testing
Synonyms: branch condition combination testing , condition combination testing
A white-box test design technique in which test cases are designed to execute combinations of single condition
outcomes (within one statement).
mutation analysis
A method to determine test suite thoroughness by measuring the extent to which a test suite can discriminate
the program from slight variants (mutants) of the program.
mutation testing
Synonyms: back-to-back testing
Testing in which two or more variants of a component or system are executed with the same inputs, the outputs
compared, and analyzed in cases of discrepancies.
Myers-Briggs Type Indicator (MBTI)
An indicator of psychological preference representing the different personalities and communication styles of
people.
N-switch coverage
Ref: Chow
Synonyms: Chow's coverage metrics
The percentage of sequences of N+1 transitions that have been exercised by a test suite.
N-switch testing
Ref: Chow See Also: state transition testing
A form of state transition testing in which test cases are designed to execute all valid sequences of N+1
transitions.
n-wise testing
See Also: combinatorial testing, orthogonal array testing, pairwise testing
A black-box test design technique in which test cases are designed to execute all possible discrete
combinations of any set of n input parameters.
negative testing
Ref: After Beizer.
Synonyms: dirty testing
Tests aimed at showing that a component or system does not work. Negative testing is related to the tester's
attitude rather than a specific test approach or test design technique, e.g., testing with invalid input values or
exceptions.
neighborhood integration testing
A form of integration testing where all of the nodes that connect to a given node are the basis for the integration
testing.
network zone
A sub-network with a defined level of trust. For example, the Internet or a public zone would be considered to
be untrusted.
non-conformity
Ref: ISO 9000
Non-fulfillment of a specified requirement.
non-functional requirement
A requirement that does not relate to functionality, but to attributes such as reliability, efficiency, usability,
maintainability and portability.
non-functional test design technique
See Also: black-box test design technique
Procedure to derive and/or select test cases for non-functional testing based on an analysis of the specification
of a component or system without reference to its internal structure.
non-functional testing
Testing the attributes of a component or system that do not relate to functionality, e.g., reliability, efficiency,
usability, maintainability and portability.
offline MBT
Model-based testing approach whereby test cases are generated into a repository for future execution.
online MBT
Synonyms: on-the-fly MBT
Model-based testing approach whereby test cases are generated and executed simultaneously.
open source tool
A software tool that is available to all potential users in source code form, usually via the internet. Its users are
permitted, usually under license, to study, change, improve and, at times, to distribute the software.
operability
Ref: ISO 9126 See Also: usability
The capability of the software product to enable the user to operate and control it.
operational acceptance testing
See Also: operational testing
Synonyms: production acceptance testing
Operational testing in the acceptance test phase, typically performed in a (simulated) operational environment
by operations and/or systems administration staff focusing on operational aspects, e.g., recoverability,
resource-behavior, installability and technical compliance.
operational environment
Hardware and software products installed at users' or customers' sites where the component or system under
test will be used. The software may include operating systems, database management systems, and other
applications.
operational profile
The representation of a distinct set of tasks performed by the component or system, possibly based on user
behavior when interacting with the component or system, and their probabilities of occurrence. A task is logical
rather that physical and can be executed over several machines or be executed in non-contiguous time
segments.
operational profile testing
Ref: Musa
Statistical testing using a model of system operations (short duration tasks) and their probability of typical use.
operational profiling
See Also: operational profile
The process of developing and implementing an operational profile.
operational testing
Ref: IEEE 610
Testing conducted to evaluate a component or system in its operational environment.
orthogonal array
A 2-dimensional array constructed with special mathematical properties, such that choosing any two columns in
the array provides every pair combination of each number in the array.
orthogonal array testing
See Also: combinatorial testing, n-wise testing, pairwise testing
A systematic way of testing all-pair combinations of variables using orthogonal arrays. It significantly reduces
the number of all combinations of variables to test all pair combinations.
output
A variable (whether stored within a component or outside) that is written by a component.
output domain
See Also: domain
The set from which valid output values can be selected.
output value
See Also: output
An instance of an output.
outsourced testing
Testing performed by people who are not co-located with the project team and are not fellow employees.
pair programming
A software development approach whereby lines of code (production and/or test) of a component are written by
two programmers sitting at a single computer. This implicitly means ongoing real-time code reviews are
performed.
pair testing
Two persons, e.g., two testers, a developer and a tester, or an end-user and a tester, working together to find
defects. Typically, they share one computer and trade control of it while testing.
pairwise integration testing
A form of integration testing that targets pairs of components that work together, as shown in a call graph.
pairwise testing
See Also: combinatorial testing, n-wise testing, orthogonal array testing
A black-box test design technique in which test cases are designed to execute all possible discrete
combinations of each pair of input parameters.
Pareto analysis
A statistical technique in decision making that is used for selection of a limited number of factors that produce
significant overall effect. In terms of quality improvement, a large majority of problems (80%) are produced by a
few key causes (20%).
pass
Synonyms: test pass
A test is deemed to pass if its actual result matches its expected result.
pass/fail criteria
Ref: IEEE 829
Decision rules used to determine whether a test item (function) or feature has passed or failed a test.
password cracking
Ref: after NIST.IR.7298
A security attack recovering secret passwords stored in a computer system or transmitted over a network.
path
Synonyms: control flow path
A sequence of events, e.g., executable statements, of a component or system from an entry point to an exit
point.
path coverage
The percentage of paths that have been exercised by a test suite. 100% path coverage implies 100% LCSAJ
coverage.
path sensitizing
Choosing a set of input values to force the execution of a given path.
path testing
A white-box test design technique in which test cases are designed to execute paths.
peer review
A review of a software work product by colleagues of the producer of the product for the purpose of identifying
defects and improvements. Examples are inspection, technical review and walkthrough.
penetration testing
A testing technique aiming to exploit security vulnerabilities (known or unknown) to gain unauthorized access.
performance
Ref: After IEEE 610 See Also: efficiency
Synonyms: time behavior
The degree to which a system or component accomplishes its designated functions within given constraints
regarding processing time and throughput rate.
performance indicator
Ref: CMMI
Synonyms: key performance indicator
A high-level metric of effectiveness and/or efficiency used to guide and control progressive development, e.g.,
lead-time slip for software development.
performance profiling
The task of analyzing, e.g., identifying performance bottlenecks based on generated metrics, and tuning the
performance of a software component or system using tools.
performance testing
See Also: efficiency testing
Testing to determine the performance of a software product.
performance testing tool
A tool to support performance testing that usually has two main facilities: load generation and test transaction
measurement. Load generation can simulate either multiple users or high volumes of input data. During
execution, response time measurements are taken from selected transactions and these are logged.
Performance testing tools normally provide reports based on test logs and graphs of load against response
times.
pharming
A security attack intended to redirect a web site's traffic to a fraudulent web site without the user's knowledge or
consent.
phase containment
The percentage of defects that are removed in the same phase of the software lifecycle in which they were
introduced.
phase test plan
See Also: test plan
A test plan that typically addresses one test phase.
phishing
An attempt to acquire personal or sensitive information by masquerading as a trustworthy entity in an electronic
communication.
planning poker
See Also: Agile software development, Wideband Delphi
A consensus-based estimation technique, mostly used to estimate effort or relative size of user stories in Agile
software development. It is a variation of the Wideband Delphi method using a deck of cards with values
representing the units in which the team estimates.
pointer
Ref: IEEE 610
A data item that specifies the location of another data item. For example, a data item that specifies the address
of the next employee record to be processed.
portability
Ref: ISO 9126
The ease with which the software product can be transferred from one hardware or software environment to
another.
portability testing
Synonyms: configuration testing
Testing to determine the portability of a software product.
post-execution comparison
Comparison of actual and expected results, performed after the software has finished running.
postcondition
Environmental and state conditions that must be fulfilled after the execution of a test or test procedure.
precondition
Environmental and state conditions that must be fulfilled before the component or system can be executed with
a particular test or test procedure.
predicate
See Also: decision
A statement that can evaluate to true or false and may be used to determine the control flow of subsequent
decision logic.
priority
The level of (business) importance assigned to an item, e.g., defect.
PRISMA
A systematic approach to risk-based testing that employs product risk identification and analysis to create a
product risk matrix based on likelihood and impact. Term is derived from Product RISk MAnagement.
probe effect
The effect on the component or system by the measurement instrument when the component or system is being
measured, e.g., by a performance testing tool or monitor. For example performance may be slightly worse when
performance testing tools are being used.
procedure testing
Testing aimed at ensuring that the component or system can operate in conjunction with new or existing users'
business procedures or operational procedures.
process
Ref: ISO 12207
A set of interrelated activities, which transform inputs into outputs.
process assessment
Ref: after ISO 15504
A disciplined evaluation of an organization's software processes against a reference model.
process cycle test
Ref: TMap See Also: procedure testing
A black-box test design technique in which test cases are designed to execute business procedures and
processes.
process improvement
Ref: CMMI
A program of activities designed to improve the performance and maturity of the organization's processes, and
the result of such a program.
process model
A framework wherein processes of the same nature are classified into a overall model, e.g., a test improvement
model.
process reference model
A process model providing a generic body of best practices and how to improve a process in a prescribed step-
by-step manner.
process-compliant test strategy
A test strategy whereby the test team follows a set of predefined processes, whereby the processes address
such items as documentation, the proper identification and use of the test basis and test oracle(s), and the
organization of the test team.
process-compliant testing
See Also: standard-compliant testing
Testing that follows a set of defined processes, e.g., defined by an external party such as a standards
committee.
process-driven scripting
A scripting technique where scripts are structured into scenarios which represent use cases of the software
under test. The scripts can be parameterized with test data.
product risk
See Also: risk
A risk directly related to the test object.
product-based quality
Ref: After Garvin See Also: manufacturing-based quality, quality attribute, transcendent-based quality, user-based quality,
value-based quality
A view of quality, wherein quality is based on a well-defined set of quality attributes. These attributes must be
measured in an objective and quantitative way. Differences in the quality of products of the same type can be
traced back to the way the specific quality attributes have been implemented.
project
Ref: ISO 9000
A project is a unique set of coordinated and controlled activities with start and finish dates undertaken to
achieve an objective conforming to specific requirements, including the constraints of time, cost and resources.
project retrospective
A structured way to capture lessons learned and to create specific action plans for improving on the next project
or next project phase.
project risk
See Also: risk
A risk related to management and control of the (test) project, e.g., lack of staffing, strict deadlines, changing
requirements, etc.
pseudo-random
A series which appears to be random but is in fact generated according to some prearranged sequence.
qualification
Ref: ISO 9000
The process of demonstrating the ability to fulfill specified requirements. Note the term "qualified" is used to
designate the corresponding status.
quality
Ref: After IEEE 610
The degree to which a component, system or process meets specified requirements and/or user/customer
needs and expectations.
quality assurance
Ref: ISO 9000
Part of quality management focused on providing confidence that quality requirements will be fulfilled.
quality attribute
Ref: IEEE 610
Synonyms: quality characteristic , software product characteristic , software quality characteristic
A feature or characteristic that affects an item's quality.
quality control
Ref: after ISO 8402
The operational techniques and activities, part of quality management, that are focused on fulfilling quality
requirements.
quality function deployment (QFD)
Ref: Akao
A method to transform user demands into design quality, to deploy the functions forming quality, and to deploy
methods for achieving the design quality into subsystems and component parts, and ultimately to specific
elements of the manufacturing process.
quality gate
A special milestone in a project. Quality gates are located between those phases of a project strongly
depending on the outcome of a previous phase. A quality gate includes a formal check of the documents of the
previous phase.
quality management
Ref: ISO 9000
Coordinated activities to direct and control an organization with regard to quality. Direction and control with
regard to quality generally includes the establishment of the quality policy and quality objectives, quality
planning, quality control, quality assurance and quality improvement.
quality risk
See Also: quality attribute, product risk
A product risk related to a quality attribute.
RACI matrix
A matrix describing the participation by various roles in completing tasks or deliverables for a project or
process. It is especially useful in clarifying roles and responsibilities. RACI is an acronym derived from the four
key responsibilities most typically used: Responsible, Accountable, Consulted, and Informed.
random testing
A black-box test design technique where test cases are selected, possibly using a pseudo-random generation
algorithm, to match an operational profile. This technique can be used for testing non-functional attributes such
as reliability and performance.
Rational Unified Process (RUP)
A proprietary adaptable iterative software development process framework consisting of four project lifecycle
phases: inception, elaboration, construction and transition.
reactive test strategy
A test strategy whereby the test team waits to design and implement tests until the software is received,
reacting to the actual system under test.
reactive testing
Testing that dynamically responds to the system under test and test results being obtained. Typically reactive
testing has a reduced planning cycle and the design and implementation test phases are not carried out until
the test object is received.
reconnaissance
Synonyms: footprinting
The exploration of a target area aiming to gain information that can be useful for an attack.
recoverability
Ref: ISO 9126 See Also: reliability
The capability of the software product to re-establish a specified level of performance and recover the data
directly affected in case of failure.
recoverability testing
See Also: reliability testing
Synonyms: recovery testing
Testing to determine the recoverability of a software product.
regression testing
Testing of a previously tested program following modification to ensure that defects have not been introduced
or uncovered in unchanged areas of the software, as a result of the changes made. It is performed when the
software or its environment is changed.
regression-averse test strategy
A test strategy whereby the test team applies various techniques to manage the risk of regression such as
functional and/or non-functional regression digital health at one or more levels.
regression-averse testing
Testing using various techniques to manage the risk of regression, e.g., by designing re-usable testware and by
extensive automation of testing at one or more test levels.
release note
Ref: After IEEE 829
Synonyms: item transmittal report , test item transmittal report
A document identifying test items, their configuration, current status and other delivery information delivered by
development to testing, and possibly other stakeholders, at the start of a test execution phase.
reliability
Ref: ISO 9126
The ability of the software product to perform its required functions under stated conditions for a specified
period of time, or for a specified number of operations.
reliability growth model
A model that shows the growth in reliability over time during continuous testing of a component or system as a
result of the removal of defects that result in reliability failures.
reliability testing
Testing to determine the reliability of a software product.
replaceability
Ref: ISO 9126 See Also: portability
The capability of the software product to be used in place of another specified software product for the same
purpose in the same environment.
requirement
Ref: After IEEE 610
A condition or capability needed by a user to solve a problem or achieve an objective that must be met or
possessed by a system or system component to satisfy a contract, standard, specification, or other formally
imposed document.
requirements management tool
A tool that supports the recording of requirements, requirements attributes (e.g., priority, knowledge
responsible) and annotation, and facilitates traceability through layers of requirements and requirements
change management. Some requirements management tools also provide facilities for static analysis, such as
consistency checking and violations to pre-defined requirements rules.
requirements phase
Ref: IEEE 610
The period of time in the software lifecycle during which the requirements for a software product are defined
and documented.
requirements-based testing
An approach to testing in which test cases are designed based on test objectives and test conditions derived
from requirements, e.g., tests that exercise specific functions or probe non-functional attributes such as
reliability or usability.
resource utilization
Ref: After ISO 9126 See Also: efficiency
Synonyms: storage
The capability of the software product to use appropriate amounts and types of resources, for example the
amounts of main and secondary memory used by the program and the sizes of required temporary or overflow
files, when the software performs its function under stated conditions.
resource utilization testing
See Also: efficiency testing
Synonyms: storage testing
The process of testing to determine the resource-utilization of a software product.
result
See Also: actual result, expected result
Synonyms: outcome , test outcome , test result
The consequence/outcome of the execution of a test. It includes outputs to screens, changes to data, reports,
and communication messages sent out.
resumption criteria
The criteria used to restart all or a portion of the testing activities that were suspended previously.
resumption requirements
Ref: After IEEE 829
The defined set of testing activities that must be repeated when testing is re-started after a suspension.
retrospective meeting
Synonyms: post-project meeting
A meeting at the end of a project during which the project team members evaluate the project and learn lessons
that can be applied to the next project.
review
Ref: After IEEE 1028
An evaluation of a product or project status to ascertain discrepancies from planned results and to recommend
improvements. Examples include management review, informal review, technical review, inspection, and
walkthrough.
review plan
A document describing the approach, resources and schedule of intended review activities. It identifies,
amongst others: documents and code to be reviewed, review types to be used, participants, as well as entry
and exit criteria to be applied in case of formal reviews, and the rationale for their choice. It is a record of the
review planning process.
review tool
A tool that provides support to the review process. Typical features include review planning and tracking
support, communication support, collaborative reviews and a repository for collecting and reporting of metrics.
reviewer
Synonyms: checker , inspector
The person involved in the review that identifies and describes anomalies in the product or project under
review. Reviewers can be chosen to represent different viewpoints and roles in the review process.
risk
A factor that could result in future negative consequences.
risk analysis
The process of assessing identified project or product risks to determine their level of risk, typically by
estimating their impact and probability of occurrence (likelihood).
risk assessment
See Also: product risk, project risk, risk, risk impact, risk level, risk likelihood
The process of identifying and subsequently analyzing the identified project or product risk to determine its level
of risk, typically by assigning likelihood and impact ratings.
risk identification
The process of identifying risks using techniques such as brainstorming, checklists and failure history.
risk impact
Synonyms: impact
The damage that will be caused if the risk becomes an actual outcome or event.
risk level
Synonyms: risk exposure
The importance of a risk as defined by its characteristics impact and likelihood. The level of risk can be used to
determine the intensity of testing to be performed. A risk level can be expressed either qualitatively (e.g., high,
medium, low) or quantitatively.
risk likelihood
Synonyms: likelihood
The estimated probability that a risk will become an actual outcome or event.
risk management
Systematic application of procedures and practices to the tasks of identifying, analyzing, prioritizing, and
controlling risk.
risk mitigation
Synonyms: risk control
The process through which decisions are reached and protective measures are implemented for reducing risks
to, or maintaining risks within, specified levels.
risk type
Synonyms: risk category
A set of risks grouped by one or more common factors such as a quality attribute, cause, location, or potential
effect of risk. A specific set of product risk types is related to the type of testing that can mitigate (control) that
risk type. For example, the risk of user interactions being misunderstood can be mitigated by usability testing.
risk-based testing
An approach to testing to reduce the level of product risks and inform stakeholders of their status, starting in
the initial stages of a project. It involves the identification of product risks and the use of risk levels to guide the
test process.
robustness
Ref: IEEE 610 See Also: error-tolerance, fault-tolerance
The degree to which a component or system can function correctly in the presence of invalid inputs or stressful
environmental conditions.
robustness testing
Testing to determine the robustness of the software product.
root cause
Ref: CMMI
A source of a defect such that if it is removed, the occurrence of the defect type is decreased or removed.
root cause analysis
An analysis technique aimed at identifying the root causes of defects. By directing corrective measures at root
causes, it is hoped that the likelihood of defect recurrence will be minimized.
S.M.A.R.T. goal methodology (SMART)
A methodology whereby objectives are defined very specifically rather than generically. SMART is an acronym
derived from the attributes of the objective to be defined: Specific, Measurable, Attainable, Relevant and
Timely.
safety
Ref: ISO 9126
The capability of the software product to achieve acceptable levels of risk of harm to people, business,
software, property or the environment in a specified context of use.
safety critical system
A system whose failure or malfunction may result in death or serious injury to people, or loss or severe damage
to equipment, or environmental harm.
safety testing
Testing to determine the safety of a software product.
salting
See Also: hashing
A cryptographic technique that adds random data (salt) to the user data prior to hashing.
scalability
Ref: After Gerrard
The capability of the software product to be upgraded to accommodate increased loads.
scalability testing
Testing to determine the scalability of the software product.
scorecard
See Also: balanced scorecard, dashboard
A representation of summarized performance measurements representing progress towards the implementation
of long-term goals. A scorecard provides static measurements of performance over or at the end of a defined
interval.
scribe
Synonyms: recorder
The person who records each defect mentioned and any suggestions for process improvement during a review
meeting, on a logging form. The scribe should ensure that the logging form is readable and understandable.
script kiddie
See Also: hacker
A person who executes security attacks that have been created by other hackers rather than creating own
ones.
scripted testing
Test execution carried out by following a previously documented sequence of tests.
scripting language
A programming language in which executable test scripts are written, used by a test execution tool (e.g., a
capture/playback tool).
scrum
See Also: Agile software development
An iterative incremental framework for managing projects commonly used with Agile software development.
security
Ref: ISO 9126 See Also: functionality
Attributes of software products that bear on its ability to prevent unauthorized access, whether accidental or
deliberate, to programs and data.
security attack
Ref: after NIST.IR.7298
An attempt to gain unauthorized access to a system or component, resources, information, or an attempt to
compromise system integrity.
security audit
An audit evaluating an organization's security processes and infrastructure.
security policy
A high-level document describing the principles, approach and major objectives of the organization regarding
security.
security procedure
A set of steps required to implement the security policy and the steps to be taken in response to a security
incident.
security testing
See Also: functionality testing
Testing to determine the security of the software product.
security testing tool
A tool that provides support for testing security characteristics and vulnerabilities.
security tool
A tool that supports operational security.
security vulnerability
A weakness in the system that could allow for a successful security attack.
session-based test management
A method for measuring and managing session-based testing, e.g., exploratory testing.
session-based testing
An approach to testing in which test activities are planned as uninterrupted sessions of test design and
execution, often used in conjunction with exploratory testing.
severity
Ref: After IEEE 610
The degree of impact that a defect has on the development or operation of a component or system.
short-circuiting
A programming language/interpreter technique for evaluating compound conditions in which a condition on one
side of a logical operator may not be evaluated if the condition on the other side is sufficient to determine the
final outcome.
simulation
Ref: ISO 2382/1
The representation of selected behavioral characteristics of one physical or abstract system by another system.
simulator
Ref: After IEEE 610, DO178b See Also: emulator
A device, computer program or system used during testing, which behaves or operates like a given system
when provided with a set of controlled inputs.
site acceptance testing
Acceptance testing by users/customers at their site, to determine whether or not a component or system
satisfies the user/customer needs and fits within the business processes, normally including hardware as well
as software.
smoke test
See Also: build, verification test, intake test
Synonyms: confidence test , sanity test
A subset of all defined/planned test cases that cover the main functionality of a component or system, to
ascertaining that the most crucial functions of a program work, but not bothering with finer details.
social engineering
Ref: NIST.IR.7298
An attempt to trick someone into revealing information (e.g., a password) that can be used to attack systems or
networks.
software
Ref: IEEE 610
Computer programs, procedures, and possibly associated documentation and data pertaining to the operation
of a computer system.
software integrity level
The degree to which software complies or must comply with a set of stakeholder-selected software and/or
software-based system characteristics (e.g., software complexity, risk assessment, safety level, security level,
desired performance, reliability or cost) which are defined to reflect the importance of the software to its
stakeholders.
software lifecycle
The period of time that begins when a software product is conceived and ends when the software is no longer
available for use. The software lifecycle typically includes a concept phase, requirements phase, design phase,
implementation phase, test phase, installation and checkout phase, operation and maintenance phase, and
sometimes, retirement phase. Note these phases may overlap or be performed iteratively.
software process improvement (SPI)
Ref: After CMMI
A program of activities designed to improve the performance and maturity of the organization's software
processes and the results of such a program.
software quality
Ref: After ISO 9126 See Also: quality
The totality of functionality and features of a software product that bear on its ability to satisfy stated or implied
needs.
Software Usability Measurement Inventory (SUMI)
Ref: Kirakowski93
A questionnaire-based usability test technique for measuring software quality from the end user's point of view.
specification
Ref: After IEEE 610
A document that specifies, ideally in a complete, precise and verifiable manner, the requirements, design,
behavior, or other characteristics of a component or system, and, often, the procedures for determining whether
these provisions have been satisfied.
specified input
An input for which the specification predicts a result.
SQL injection
A security attack inserting malicious SQL statements into an entry field for execution.
stability
Ref: ISO 9126 See Also: maintainability
The capability of the software product to avoid unexpected effects from modifications in the software.
staged representation
See Also: CMMI
A model structure wherein attaining the goals of a set of process areas establishes a maturity level; each level
builds a foundation for subsequent levels.
standard
Ref: After CMMI
Formal, possibly mandatory, set of requirements developed and used to prescribe consistent approaches to the
way of working or to provide guidelines (e.g., ISO/IEC standards, IEEE standards, and organizational
standards).
standard-compliant test strategy
A test strategy whereby the test team follows a standard. Standards followed may be valid e.g., for a country
(legislation standards), a business domain (domain standards), or internally (organizational standards).
standard-compliant testing
See Also: process-compliant testing
Testing that complies to a set of requirements defined by a standard, e.g., an industry testing standard or a
standard for testing safety-critical systems.
state diagram
Ref: IEEE 610
A diagram that depicts the states that a component or system can assume, and shows the events or
circumstances that cause and/or result from a change from one state to another.
state table
A grid showing the resulting transitions for each state combined with each possible event, showing both valid
and invalid transitions.
state transition
A transition between two states of a component or system.
state transition testing
See Also: N-switch testing
Synonyms: finite state testing
A black-box test design technique in which test cases are designed to execute valid and invalid state
transitions.
statement
Synonyms: source statement
An entity in a programming language, which is typically the smallest indivisible unit of execution.
statement coverage
The percentage of executable statements that have been exercised by a test suite.
statement testing
A white-box test design technique in which test cases are designed to execute statements.
static analysis
Analysis of software development artifacts, e.g., requirements or code, carried out without execution of these
software development artifacts. Static analysis is usually carried out by means of a supporting tool.
static analyzer
Synonyms: analyzer , static analysis tool
A tool that carries out static analysis.
static code analysis
Analysis of source code carried out without execution of that software.
static testing
Testing of a software development artifact, e.g., requirements, design or code, without execution of these
artifacts, e.g., reviews or static analysis.
statistical testing
See Also: operational profile testing
A test design technique in which a model of the statistical distribution of the input is used to construct
representative test cases.
status accounting
Ref: IEEE 610
An element of configuration management consisting of the recording and reporting of information needed to
manage a configuration effectively. This information includes a listing of the approved configuration
identification, the status of proposed changes to the configuration, and the implementation status of the
approved changes.
stress testing
Ref: After IEEE 610 See Also: performance testing, load testing
A type of performance testing conducted to evaluate a system or component at or beyond the limits of its
anticipated or specified workloads, or with reduced availability of resources such as access to memory or
servers.
stress testing tool
A tool that supports stress testing.
structural coverage
Coverage measures based on the internal structure of a component or system.
structured scripting
A scripting technique that builds and utilizes a library of reusable (parts of) scripts.
stub
Ref: After IEEE 610
A skeletal or special-purpose implementation of a software component, used to develop or test a component
that calls or is otherwise dependent on it. It replaces a called component.
subpath
A sequence of executable statements within a component.
suitability
Ref: ISO 9126 See Also: functionality
The capability of the software product to provide an appropriate set of functions for specified tasks and user
objectives.
suitability testing
Testing to determine the suitability of a software product.
suspension criteria
Ref: After IEEE 829
The criteria used to (temporarily) stop all or a portion of the testing activities on the test items.
syntax testing
A black-box test design technique in which test cases are designed based upon the definition of the input
domain and/or output domain.
system
Ref: IEEE 610
A collection of components organized to accomplish a specific function or set of functions.
system hardening
The step-by-step process of reducing the security vulnerabilities of a system by applying a security policy and
different layers of protection.
system integration testing
Testing the integration of systems and packages; testing interfaces to external organizations (e.g., Electronic
Data Interchange, Internet).
system of systems
Multiple heterogeneous, distributed systems that are embedded in networks at multiple levels and in multiple
interconnected domains, addressing large-scale inter-disciplinary common problems and purposes, usually
without a common management structure.
system testing
Ref: Hetzel
Testing an integrated system to verify that it meets specified requirements.
system under test (SUT)
See test object.
Systematic Test and Evaluation Process (STEP)
See Also: content-based model
A structured testing methodology, also used as a content-based model for improving the testing process.
Systematic Test and Evaluation Process (STEP) does not require that improvements occur in a specific order.
technical review
Ref: Gilb and Graham, IEEE 1028 See Also: peer review
A peer group discussion activity that focuses on achieving consensus on the technical approach to be taken.
test
Ref: IEEE 829
A set of one or more test cases.
test adaptation layer
The layer in a digital health architecture which provides the necessary code to adapt test scripts on an
abstract level to the various components, configuration or interfaces of the SUT.
test analysis
The process of analyzing the test basis and defining test objectives.
test approach
The implementation of the test strategy for a specific project. It typically includes the decisions made that follow
based on the (test) project's goal and the risk assessment carried out, starting points regarding the test process,
the test design techniques to be applied, exit criteria and test types to be performed.
test architect
(1) A person who provides guidance and strategic direction for a test organization and for its relationship with
other disciplines. (2) A person who defines the way testing is structured for a given system, including topics
such as test tools and test data management.
digital health
The use of software to perform or support test activities, e.g., test management, test design, test execution and
results checking.
digital health architecture
An instantiation of the generic digital health architecture to define the architecture of a digital health
solution, i.e., its layers, components, services and interfaces.
digital health engineer
A person who is responsible for the design, implementation and maintenance of a digital health architecture
as well as the technical evolution of the resulting digital health solution.
digital health framework
A tool that provides an environment for digital health. It usually includes a test harness and test libraries.
digital health manager
A person who is responsible for the planning and supervision of the development and evolution of a test
automation solution.
digital health solution
A realization/implementation of a digital health architecture, i.e., a combination of components implementing
a specific digital health assignment. The components may include commercial off-the-shelf test tools, test
automation frameworks, as well as test hardware.
digital health strategy
A high-level plan to achieve long-term objectives of digital health under given boundary conditions.
test basis
Ref: After TMap
All documents from which the requirements of a component or system can be inferred. The documentation on
which the test cases are based. If a document can be amended only by way of formal amendment procedure,
then the test basis is called a frozen test basis.
test case
Ref: After IEEE 610
A set of input values, execution preconditions, expected results and execution postconditions, developed for a
particular objective or test condition, such as to exercise a particular program path or to verify compliance with
a specific requirement.
test case explosion
The disproportionate growth of the number of test cases with growing size of the test basis, when using a
certain test design technique. Test case explosion may also happen when applying the test design technique
systematically for the first time.
test case result
The final verdict on the execution of a test and its outcomes, such as pass, fail, or error. The result of error is
used for situations where it is not clear whether the problem is in the test object.
test case specification
Ref: After IEEE 829 See Also: test specification
A document specifying a set of test cases (objective, inputs, test actions, expected results, and execution
preconditions) for a test item.
test charter
See Also: exploratory testing
Synonyms: charter
A statement of test objectives, and possibly test ideas about how to test. Test charters are used in exploratory
testing.
test closure
See Also: test process
During the test closure phase of a test process data is collected from completed activities to consolidate
experience, testware, facts and numbers. The test closure phase consists of finalizing and archiving the
testware and evaluating the test process, including preparation of a test evaluation report.
test comparator
Synonyms: comparator
A test tool to perform automated test comparison of actual results with expected results.
test comparison
The process of identifying differences between the actual results produced by the component or system under
test and the expected results for a test. Test comparison can be performed during test execution (dynamic
comparison) or after test execution.
test condition
Synonyms: test requirement , test situation
An item or event of a component or system that could be verified by one or more test cases, e.g., a function,
transaction, feature, quality attribute, or structural element.
test control
See Also: test management
A test management task that deals with developing and applying a set of corrective actions to get a test project
on track when monitoring shows a deviation from what was planned.
test cycle
Execution of the test process against a single identifiable release of the test object.
test data
Data that exists (for example, in a database) before a test is executed, and that affects or is affected by the
component or system under test.
test data management
The process of analyzing test data requirements, designing test data structures, creating and maintaining test
data.
test data preparation tool
Synonyms: test generator
A type of test tool that enables data to be selected from existing databases or created, generated, manipulated
and edited for use in testing.
test definition layer
The layer in a generic digital health architecture which supports test implementation by supporting the
definition of test suites and/or test cases, e.g., by offering templates or guidelines.
test deliverable
See Also: deliverable
Any test (work) product that must be delivered to someone other than the test (work) product's author.
test design
See Also: test design specification
The process of transforming general test objectives into tangible test conditions and test cases.
test design specification
Ref: After IEEE 829 See Also: test specification
A document specifying the test conditions (coverage items) for a test item, the detailed test approach and
identifying the associated high-level test cases.
test design technique
Synonyms: test case design technique , test specification technique , test technique
Procedure used to derive and/or select test cases.
test design tool
A tool that supports the test design activity by generating test inputs from a specification that may be held in a
CASE tool repository, e.g., requirements management tool, from specified test conditions held in the tool itself,
or from code.
test director
See Also: test manager
A senior manager who manages test managers.
test environment
Ref: After IEEE 610
Synonyms: test bed , test rig
An environment containing hardware, instrumentation, simulators, software tools, and other support elements
needed to conduct a test.
test estimation
The calculated approximation of a result related to various aspects of testing (e.g., effort spent, completion
date, costs involved, number of test cases, etc.) which is usable even if input data may be incomplete,
uncertain, or noisy.
test evaluation report
A document produced at the end of the test process summarizing all testing activities and results. It also
contains an evaluation of the test process and lessons learned.
test execution
The process of running a test on the component or system under test, producing actual result(s).
test execution automation
The use of software, e.g., capture/playback tools, to control the execution of tests, the comparison of actual
results to expected results, the setting up of test preconditions, and other test control and reporting functions.
test execution layer
The layer in a generic digital health architecture which supports the execution of test suites and/or test
cases.
test execution phase
Ref: IEEE 610
The period of time in a software development lifecycle during which the components of a software product are
executed, and the software product is evaluated to determine whether or not requirements have been satisfied.
test execution schedule
A scheme for the execution of test procedures. Note: The test procedures are included in the test execution
schedule in their context and in the order in which they are to be executed.
test execution technique
The method used to perform the actual test execution, either manual or automated.
test execution tool
A type of test tool that is able to execute other software using an automated test script, e.g., capture/playback.
test generation layer
The layer in a generic digital health architecture which supports manual or automated design of test suites
and/or test cases.
test harness
A test environment comprised of stubs and drivers needed to execute a test.
test hook
A customized software interface that enables automated testing of a test object.
test implementation
The process of developing and prioritizing test procedures, creating test data and, optionally, preparing test
harnesses and writing automated test scripts.
test improvement plan
Ref: After CMMI
A plan for achieving organizational test process improvement objectives based on a thorough understanding of
the current strengths and weaknesses of the organization's test processes and test process assets.
test infrastructure
The organizational artifacts needed to perform testing, consisting of test environments, test tools, office
environment and procedures.
test input
The data received from an external source by the test object during test execution. The external source can be
hardware, software or human.
test item
See Also: test object
The individual element to be tested. There usually is one test object and many test items.
test level
Ref: After TMap
Synonyms: test stage
A group of test activities that are organized and managed together. A test level is linked to the responsibilities in
a project. Examples of test levels are component test, integration test, system test and acceptance test.
test log
Ref: IEEE 829
Synonyms: test record , test run log
A chronological record of relevant details about the execution of tests.
test logging
Synonyms: test recording
The process of recording information about tests executed into a test log.
test management
The planning, estimating, monitoring and control of test activities, typically carried out by a test manager.
test management tool
A tool that provides support to the test management and control part of a test process. It often has several
capabilities, such as testware management, scheduling of tests, the logging of results, progress tracking,
incident management and test reporting.
test manager
Synonyms: test leader
The person responsible for project management of testing activities and resources, and evaluation of a test
object. The individual who directs, controls, administers, plans and regulates the evaluation of a test object.
Test Maturity Model integration (TMMi)
A five-level staged framework for test process improvement, related to the Capability Maturity Model Integration
(CMMI), that describes the key elements of an effective test process.
test mission
See Also: test policy
The purpose of testing for an organization, often documented as part of the test policy.
test model
A model describing testware that is used for testing a component or a system under test.
test monitoring
See Also: test management
A test management task that deals with the activities related to periodically checking the status of a test project.
Reports are prepared that compare the actuals to that which was planned.
test object
See Also: test item
Synonyms: system under test
The component or system to be tested.
test objective
A reason or purpose for designing and executing a test.
test oracle
Ref: After Adrion
Synonyms: oracle
A source to determine expected results to compare with the actual result of the software under test. An oracle
may be the existing system (for a benchmark), other software, a user manual, or an individual's specialized
knowledge, but should not be the code.
test performance indicator
A high-level metric of effectiveness and/or efficiency used to guide and control progressive test development,
e.g., Defect Detection Percentage (DDP).
test phase
Ref: After Gerrard
A distinct set of test activities collected into a manageable phase of a project, e.g., the execution activities of a
test level.
test plan
Ref: After IEEE 829
A document describing the scope, approach, resources and schedule of intended test activities. It identifies
amongst others test items, the features to be tested, the testing tasks, who will do each task, degree of tester
independence, the test environment, the test design techniques and entry and exit criteria to be used, and the
rationale for their choice, and any risks requiring contingency planning. It is a record of the test planning
process.
test planning
The activity of establishing or updating a test plan.
Test Point Analysis (TPA)
Ref: TMap
A formula based test estimation method based on function point analysis.
test policy
A high-level document describing the principles, approach and major objectives of the organization regarding
testing.
test procedure specification
Ref: After IEEE 829 See Also: test specification
Synonyms: test procedure , test scenario
A document specifying a sequence of actions for the execution of a test. Also known as test script or manual
test script.
test process
The fundamental test process comprises test planning and control, test analysis and design, test
implementation and execution, evaluating exit criteria and reporting, and test closure activities.
test process group (TPG)
Ref: After CMMI
A collection of (test) specialists who facilitate the definition, maintenance, and improvement of the test
processes used by an organization.
test process improvement
Ref: After CMMI
A program of activities designed to improve the performance and maturity of the organization's test processes
and the results of such a program.
test process improvement manifesto
Ref: Veenendaal08
A statement that echoes the Agile manifesto, and defines values for improving the testing process. The values
are: flexibility over detailed processes, best practices over templates, deployment orientation over process
orientation, peer reviews over quality assurance (departments), business driven over model-driven.
test process improver
A person implementing improvements in the test process based on a test improvement plan.
test progress report
Synonyms: test report
A document summarizing testing activities and results, produced at regular intervals, to report progress of
testing activities against a baseline (such as the original test plan) and to communicate risks and alternatives
requiring a decision to management.
test reporting
See Also: test process
Collecting and analyzing data from testing activities and subsequently consolidating the data in a report to
inform stakeholders.
test reproducibility
An attribute of a test indicating whether the same results are produced each time the test is executed.
test run
Execution of a test on a specific version of the test object.
test schedule
A list of activities, tasks or events of the test process, identifying their intended start and finish dates and/or
times, and interdependencies.
test script
Commonly used to refer to a test procedure specification, especially an automated one.
test selection criteria
The criteria used to guide the generation of test cases or to select test cases in order to limit the size of a test.
test session
See Also: exploratory testing
An uninterrupted period of time spent in executing tests. In exploratory testing, each test session is focused on
a charter, but testers can also explore new opportunities or issues during a session. The tester creates and
executes on the fly and records their progress.
test specification
A document that consists of a test design specification, test case specification and/or test procedure
specification.
test strategy
A high-level description of the test levels to be performed and the testing within those levels for an organization
or programme (one or more projects).
test suite
Synonyms: test case suite , test set
A set of several test cases for a component or system under test, where the post condition of one test is often
used as the precondition for the next one.
test summary report
Ref: After IEEE 829
Synonyms: test report
A document summarizing testing activities and results. It also contains an evaluation of the corresponding test
items against exit criteria.
test target
A set of exit criteria.
test tool
Ref: TMap See Also: CAST
A software product that supports one or more test activities, such as planning and control, specification, building
initial files and data, test execution and test analysis.
test type
Ref: After TMap
A group of test activities aimed at testing a component or system focused on a specific test objective, i.e.
functional test, usability test, regression test etc. A test type may take place on one or more test levels or test
phases.
test-driven development (TDD)
A way of developing software where the test cases are developed, and often automated, before the software is
developed to run those test cases.
testability
Ref: ISO 9126 See Also: maintainability
The capability of the software product to enable modified software to be tested.
testability review
Ref: After TMap
A detailed check of the test basis to determine whether the test basis is at an adequate quality level to act as an
input document for the test process.
testable requirement
Ref: After IEEE 610
A requirements that is stated in terms that permit establishment of test designs (and subsequently test cases)
and execution of tests to determine whether the requirement has been met.
tester
A skilled professional who is involved in the testing of a component or system.
testing
The process consisting of all lifecycle activities, both static and dynamic, concerned with planning, preparation
and evaluation of software products and related work products to determine that they satisfy specified
requirements, to demonstrate that they are fit for purpose and to detect defects.
testware
Ref: After Fewster and Graham
Artifacts produced during the test process required to plan, design, and execute tests, such as documentation,
scripts, inputs, expected results, set-up and clear-up procedures, files, databases, environment, and any
additional software or utilities used in testing.
thread testing
An approach to component integration testing where the progressive integration of components follows the
implementation of subsets of the requirements, as opposed to the integration of components by levels of a
hierarchy.
three-point estimation
A test estimation method using estimated values for the "best case", "worst case", and "most likely case" of the
matter being estimated, to define the degree of certainty associated with the resultant estimate.

Total Quality Management (TQM)
Ref: After ISO 8402
An organization-wide management approach centered on quality, based on the participation of all members of
the organization and aiming at long-term success through customer satisfaction, and benefits to all members of
the organization and to society. Total Quality Management consists of planning, organizing, directing, control,
and assurance.
TPI Next
A continuous business-driven framework for test process improvement that describes the key elements of an
effective and efficient test process.
traceability
See Also: horizontal traceability, vertical traceability
The ability to identify related items in documentation and software, such as requirements with associated tests.
traceability matrix
A two-dimensional table, which correlates two entities (e.g., requirements and test cases). The table allows
tracing back and forth the links of one entity to the other, thus enabling the determination of coverage achieved
and the assessment of impact of proposed changes.
transactional analysis
The analysis of transactions between people and within people's minds; a transaction is defined as a stimulus
plus a response. Transactions take place between people and between the ego states (personality segments)
within one person's mind.
transcendent-based quality
Ref: After Garvin See Also: manufacturing-based quality, product-based quality, user-based quality, value-based quality
A view of quality, wherein quality cannot be precisely defined, but we know it when we see it, or are aware of its
absence when it is missing. Quality depends on the perception and affective feelings of an individual or group of
individuals toward a product.
understandability
Ref: ISO 9126 See Also: usability
The capability of the software product to enable the user to understand whether the software is suitable, and
how it can be used for particular tasks and conditions of use.
unit test framework
Ref: Graham
A tool that provides an environment for unit or component testing in which a component can be tested in
isolation or with suitable stubs and drivers. It also provides other support for the developer, such as debugging
capabilities.
unreachable code
Synonyms: dead code
Code that cannot be reached and therefore is impossible to execute.
usability
Ref: ISO 9126
The capability of the software to be understood, learned, used and attractive to the user when used under
specified conditions.
usability testing
Ref: After ISO 9126
Testing to determine the extent to which the software product is understood, easy to learn, easy to operate and
attractive to the users under specified conditions.
use case
A sequence of transactions in a dialogue between an actor and a component or system with a tangible result,
where an actor can be a user or anything that can exchange information with the system.
use case testing
Synonyms: scenario testing , user scenario testing
A black-box test design technique in which test cases are designed to execute scenarios of use cases.
user acceptance testing
See Also: acceptance testing
Acceptance testing carried out by future users in a (simulated) operational environment focusing on user
requirements and needs.
user story
See Also: Agile software development, requirement
A high-level user or business requirement commonly used in Agile software development, typically consisting of
one sentence in the everyday or business language capturing what functionality a user needs and the reason
behind this, any non-functional criteria, and also includes acceptance criteria.
user story testing
See Also: user story
A black-box test design technique in which test cases are designed based on user stories to verify their correct
implementation.
user test
A test whereby real-life users are involved to evaluate the usability of a component or system.
user-based quality
Ref: after Garvin See Also: manufacturing-based quality, product-based quality, transcendent-based quality, value-based
quality
A view of quality, wherein quality is the capacity to satisfy needs, wants and desires of the user(s). A product or
service that does not fulfill user needs is unlikely to find any users. This is a context dependent, contingent
approach to quality since different business characteristics require different qualities of a product.
V-model
A framework to describe the software development lifecycle activities from requirements specification to
maintenance. The V-model illustrates how testing activities can be integrated into each phase of the software
development lifecycle.
validation
Ref: ISO 9000
Confirmation by examination and through provision of objective evidence that the requirements for a specific
intended use or application have been fulfilled.
value-based quality
Ref: After Garvin See Also: manufacturing-based quality, product-based quality, transcendent-based quality, user-based
quality
A view of quality wherein quality is defined by price. A quality product or service is one that provides desired
performance at an acceptable cost. Quality is determined by means of a decision process with stakeholders on
trade-offs between time, effort and cost aspects.
variable
An element of storage in a computer that is accessible by a software program by referring to it by a name.
verification
Ref: ISO 9000
Confirmation by examination and through provision of objective evidence that specified requirements have been
fulfilled.
vertical traceability
The tracing of requirements through the layers of development documentation to components.
volume testing
See Also: resource-utilization testing
Testing where the system is subjected to large volumes of data.
vulnerability scanner
A static analyzer that is used to detect particular security vulnerabilities in the code.
walkthrough
Ref: Freedman and Weinberg, IEEE 1028 See Also: peer review
Synonyms: structured walkthrough
A step-by-step presentation by the author of a document in order to gather information and to establish a
common understanding of its content.
Website Analysis and Measurement Inventory (WAMMI)
A questionnaire-based usability test technique for measuring web site software quality from the end user's point
of view.
white-box test design technique
Synonyms: structural test design technique , structure-based test design technique , structure-based technique , white-box
technique
Procedure to derive and/or select test cases based on an analysis of the internal structure of a component or
system.
white-box testing
Synonyms: clear-box testing , code-based testing , glass-box testing , logic-coverage testing , logic-driven testing , structural
testing , structure-based testing
Testing based on an analysis of the internal structure of the component or system.
Wideband Delphi
An expert-based test estimation technique that aims at making an accurate estimation using the collective
wisdom of the team members.
wild pointer
See Also: pointer
A pointer that references a location that is out of scope for that pointer or that does not exist.
work breakdown structure (WBS)
Ref: CMMI
An arrangement of work elements and their relationship to each other and to the end product.

1. Test Case

A test case defines a specific scenario that tests a particular feature, function, or behavior of an application. It includes input data, execution steps, expected outcomes, and pass/fail criteria.

Function in Test Automation:
Automated test cases are executed by your automation tool to verify that the application behaves correctly under different conditions.

In Scandium, you can create reusable test cases in a few clicks, without writing a single line of code. Test cases are created visually, simply record your flow, and AI turns it into a reusable test. 2. Test Suite

A test suite is a logical collection of related test cases grouped together to validate a broader functionality or module.

Function in Test Automation:
Test suites help you run multiple test cases in sequence or parallel, saving time and improving coverage. It helps you organize, execute, and report on batches of test cases useful for regression and feature testing.

Scandium makes organizing test suites effortless through drag-and-drop and folder-based grouping.

A test suite is a group of related test cases bundled together for structured execution. 3. Test Execution

This is the process of running automated (or manual) test cases and recording the results.

Function:
Automated test execution ensures consistent validation and flags regressions quickly. It triggers actual validation logic and determines which tests pass or fail based on assertions.

Scandium allows you to run test executions locally, remotely, or in the cloud with real-time logs, screenshots, and diagnostic reports. 4. Test Automation Framework

A framework is a structured environment or set of guidelines that supports the development and execution of test scripts. It is the backbone for how tests are structured, maintained, and run. Popular frameworks include Selenium, Cypress, and Playwright.

Function:
Improves consistency, reusability, maintainability of tests, and provides structure to automated tests.

Scandium abstracts away framework complexity, giving teams a no-code environment with the power of advanced AI-powered automation behind the scenes. 5. Assertions

Assertions are conditions in a test that must be true for the test to be considered successful. They are conditions that define pass or fail for a test.

Function:
Validate outcomes like “the user is redirected,” “an error message is displayed,” or “a button is clickable.”

Scandium lets you add assertions visually, even across multiple pages or API responses. With Scandium’s visual builder, you can define assertions using simple dropdowns, not JavaScript or Python. 6. Test Script

A test script is the coded (or no-code) set of steps that the tool follows. A test script contains the instructions that the automation tool follows to test a specific functionality. It’s often written in code (or visually designed in no-code tools).

Function:
Automates the actions a human tester would take manually, like clicking buttons, submitting forms, or verifying responses.

Scandium auto-generates test scripts as you interact with the app with no code needed. It transforms your website interactions into reusable test scripts automatically with its scenario recording feature. 7. CI/CD Integration

CI/CD (Continuous Integration and Continuous Delivery/Deployment) is a DevOps practice that encourages frequent code changes and automated testing during the build and release process. CI/CD pipelines trigger tests as part of the deployment flow.

Function in Test Automation:
Automated tests are triggered whenever new code is pushed, ensuring that bugs are caught early.

Scandium integrates directly with GitHub Actions, Jenkins, GitLab CI, and CircleCI to automate your test pipeline, perfect for dev and QA sync. 8. Regression Testing

Regression testing is a repeatable set of tests that ensures new code changes don’t break existing features.

Function:
Regression Testing maintains application stability with every update. It re-runs previously passed tests after updates or fixes to catch unintended side effects.

Scandium allows you to organize regression test suites and re-run them anytime with real-time result tracking, reusable suites and cloud-based replays. 9. Test Coverage

Test coverage refers to how much of your application is tested by your test cases. It can refer to code (unit testing), features, or user flows.

Function:
Helps identify gaps in your testing strategy, improve overall quality assurance and gives insight into risk areas.

Scandium supports API mocking and dynamic test data generation out of the box for more stable test environments.

Data-Driven Testing (DDT): DDT uses multiple data sets to run the same test logic repeatedly with different inputs. Validates how the application handles a variety of data inputs (like usernames, emails, or payment details).

13. Exploratory Testing

Exploratory testing is unscripted, manual testing where testers actively explore the application to find issues that automated tests might miss.

Function:
Uncovers hidden bugs, usability issues, or unexpected behaviours.

Even with Scandium’s no-code automation, exploratory testing has its place, especially in early-stage releases.

14. Bug Tracking and Issue Reporting

15. Test Environment
