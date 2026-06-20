import type { GlossaryCategoryMeta, GlossaryTerm } from '@/types';

export const GLOSSARY_CATEGORIES: Record<'hld' | 'lld', GlossaryCategoryMeta> = {
  hld: {
    slug: 'hld',
    title: 'High-Level Design',
    subtitle: 'HLD',
    description:
      'Architecture-level concepts for designing scalable, reliable distributed systems — capacity, data flow, tradeoffs, and failure modes.',
    icon: '🏛️',
  },
  lld: {
    slug: 'lld',
    title: 'Low-Level Design',
    subtitle: 'LLD',
    description:
      'Implementation-level concepts — OOP, design patterns, class relationships, concurrency, and how to structure code for real systems.',
    icon: '🔧',
  },
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ─── HLD ───────────────────────────────────────────────────────────────────
  {
    slug: 'scalability',
    name: 'Scalability',
    category: 'hld',
    shortDefinition: 'Ability of a system to handle growing load by adding resources.',
    definition:
      'Scalability is the capacity of a system to accommodate increased workload — more users, requests, or data — without proportional degradation in performance or cost. It is foundational to every system design interview because interviewers want to see how your architecture evolves from thousands to millions of users.',
    keyPoints: [
      'Vertical scaling (scale up): add CPU/RAM to a single machine — simpler but has hard limits.',
      'Horizontal scaling (scale out): add more machines — preferred at scale but requires load balancing and stateless design.',
      'Identify bottlenecks first: database, cache, single hot partition, or synchronous dependencies.',
      'Design for elasticity: auto-scaling groups, queue-based buffering, and read replicas.',
    ],
    examples: [
      'Twitter timeline: shard user feeds, cache hot timelines, async fan-out writes.',
      'E-commerce checkout: queue order processing, scale payment workers independently.',
    ],
    relatedTerms: [
      { slug: 'horizontal-vs-vertical-scaling', category: 'hld' },
      { slug: 'load-balancing', category: 'hld' },
      { slug: 'database-sharding', category: 'hld' },
    ],
    interviewTips: [
      'Always clarify read vs write ratio before proposing scaling strategy.',
      'Mention both traffic growth and data growth — they scale differently.',
    ],
  },
  {
    slug: 'availability',
    name: 'Availability',
    category: 'hld',
    shortDefinition: 'Percentage of time a system is operational and serving requests.',
    definition:
      'Availability measures how often a system is up and responsive. It is typically expressed as "nines" (99.9%, 99.99%). High availability requires redundancy, health checks, automatic failover, and graceful degradation when components fail.',
    keyPoints: [
      '99.9% ("three nines") ≈ 8.7 hours downtime/year; 99.99% ≈ 52 minutes.',
      'Eliminate single points of failure (SPOF): redundant load balancers, DB replicas, multi-AZ deployment.',
      'Health checks + automatic removal of unhealthy instances from rotation.',
      'Graceful degradation: serve cached/stale data rather than full outage.',
    ],
    examples: [
      'Multi-AZ RDS with automatic failover for database availability.',
      'CDN edge caching keeps static assets available even if origin is slow.',
    ],
    relatedTerms: [
      { slug: 'fault-tolerance', category: 'hld' },
      { slug: 'replication', category: 'hld' },
      { slug: 'slo-sli-sla', category: 'hld' },
    ],
    interviewTips: [
      'Distinguish availability from reliability — a system can be "up" but returning errors.',
      'Quote realistic nines based on the product (social feed vs payment system).',
    ],
  },
  {
    slug: 'cap-theorem',
    name: 'CAP Theorem',
    category: 'hld',
    shortDefinition: 'In a partition, a distributed system must choose between consistency and availability.',
    definition:
      'CAP states that a distributed data store can guarantee at most two of three properties during a network partition: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition tolerance (system continues despite network splits). Since partitions are inevitable, designers effectively choose CP or AP under failure.',
    keyPoints: [
      'Consistency: every read receives the most recent write or an error.',
      'Availability: every request receives a non-error response (may be stale).',
      'Partition tolerance: system operates despite dropped/delayed messages between nodes.',
      'PACELC extends CAP: else (no partition), choose Latency vs Consistency.',
    ],
    examples: [
      'Bank transfers (CP): prefer rejecting requests over inconsistent balances.',
      'Social media likes (AP): show approximate counts during partition.',
    ],
    relatedTerms: [
      { slug: 'eventual-consistency', category: 'hld' },
      { slug: 'replication', category: 'hld' },
    ],
    interviewTips: [
      'Do not say "pick 2 of 3" without mentioning partitions — CAP applies during partitions.',
      'Relate choice to business requirements, not textbook definitions alone.',
    ],
  },
  {
    slug: 'load-balancing',
    name: 'Load Balancing',
    category: 'hld',
    shortDefinition: 'Distributes incoming traffic across multiple servers.',
    definition:
      'Load balancers sit between clients and backend servers, distributing requests to improve throughput, availability, and fault tolerance. They can operate at Layer 4 (TCP) or Layer 7 (HTTP), support health checks, SSL termination, and sticky sessions when needed.',
    keyPoints: [
      'Algorithms: round-robin, least connections, weighted, consistent hashing for cache affinity.',
      'L4 vs L7: L4 is faster; L7 enables path-based routing and header inspection.',
      'Health checks remove failed backends automatically.',
      'Global load balancing (GeoDNS, Anycast) routes users to nearest region.',
    ],
    examples: [
      'AWS ALB routing /api/* to app servers and /static/* to object storage.',
      'NGINX terminating TLS and distributing to Kubernetes pods.',
    ],
    relatedTerms: [
      { slug: 'scalability', category: 'hld' },
      { slug: 'consistent-hashing', category: 'hld' },
      { slug: 'api-gateway', category: 'hld' },
    ],
    interviewTips: [
      'Mention where the load balancer sits: client → LB → app tier → DB.',
      'Discuss stateless app servers so any LB algorithm works cleanly.',
    ],
  },
  {
    slug: 'caching',
    name: 'Caching',
    category: 'hld',
    shortDefinition: 'Stores frequently accessed data in fast storage to reduce latency and load.',
    definition:
      'Caching stores copies of data closer to the consumer — in-memory (Redis), CDN edge, browser, or application layer — to avoid expensive recomputation or database reads. Effective caching requires TTL strategy, invalidation policy, and awareness of stale data tradeoffs.',
    keyPoints: [
      'Cache-aside: app checks cache, on miss reads DB and populates cache.',
      'Write-through / write-behind: synchronize or async writes to cache and DB.',
      'Eviction policies: LRU, LFU, TTL-based expiration.',
      'Cache stampede: use locking or probabilistic early expiration to prevent thundering herd.',
    ],
    examples: [
      'Redis caching user session tokens for fast auth lookups.',
      'CDN caching product images at edge locations worldwide.',
    ],
    relatedTerms: [
      { slug: 'cdn', category: 'hld' },
      { slug: 'lru-cache', category: 'lld' },
      { slug: 'database-sharding', category: 'hld' },
    ],
    interviewTips: [
      'Quantify hit rate impact: 90% cache hit = 10× fewer DB reads.',
      'Always discuss cache invalidation — "one of the two hard problems in CS."',
    ],
  },
  {
    slug: 'cdn',
    name: 'CDN (Content Delivery Network)',
    category: 'hld',
    shortDefinition: 'Geographically distributed cache for static and dynamic content.',
    definition:
      'A CDN is a network of edge servers that cache content close to users, reducing latency and origin load. CDNs excel at static assets (images, JS, CSS) but can also cache API responses with appropriate cache headers.',
    keyPoints: [
      'Edge caching reduces round-trip time for global users.',
      'Cache-Control headers define TTL and invalidation behavior.',
      'Origin shield / tiered caching reduces load on primary servers.',
      'DDoS protection and TLS termination are common CDN features.',
    ],
    examples: [
      'Cloudflare caching Netflix static UI assets at 300+ PoPs.',
      'YouTube serving video segments from edge caches.',
    ],
    relatedTerms: [
      { slug: 'caching', category: 'hld' },
      { slug: 'load-balancing', category: 'hld' },
    ],
    interviewTips: [
      'Separate static (CDN) from dynamic (API) paths in your diagram.',
      'Mention cache busting for deployments (hashed filenames).',
    ],
  },
  {
    slug: 'database-sharding',
    name: 'Database Sharding',
    category: 'hld',
    shortDefinition: 'Horizontally partitions data across multiple database instances.',
    definition:
      'Sharding splits data across multiple databases so no single node holds the entire dataset. Each shard owns a subset of keys (e.g., user_id % N). It enables write scalability but adds complexity for cross-shard queries, rebalancing, and joins.',
    keyPoints: [
      'Shard key choice is critical — avoid hot shards (celebrity user problem).',
      'Consistent hashing minimizes data movement when adding shards.',
      'Cross-shard transactions are expensive; design to avoid them.',
      'Directory-based vs range-based vs hash-based sharding strategies.',
    ],
    examples: [
      'Instagram sharding user data by user_id.',
      'Uber sharding trips by city or region.',
    ],
    relatedTerms: [
      { slug: 'consistent-hashing', category: 'hld' },
      { slug: 'replication', category: 'hld' },
      { slug: 'scalability', category: 'hld' },
    ],
    interviewTips: [
      'Shard only when vertical scaling and read replicas are insufficient.',
      'Discuss resharding plan before claiming "we will shard."',
    ],
  },
  {
    slug: 'replication',
    name: 'Replication',
    category: 'hld',
    shortDefinition: 'Copies data across multiple nodes for availability and read scale.',
    definition:
      'Replication maintains copies of data on multiple nodes. Leader-follower (primary-replica) is most common: writes go to leader, reads can go to replicas. Replication improves availability and read throughput but introduces replication lag and consistency challenges.',
    keyPoints: [
      'Synchronous replication: strong consistency, higher write latency.',
      'Asynchronous replication: lower latency, risk of stale reads.',
      'Multi-leader and leaderless (Dynamo-style) for specific use cases.',
      'Failover promotes a replica to leader when primary fails.',
    ],
    examples: [
      'MySQL read replicas for read-heavy analytics queries.',
      'MongoDB replica sets with automatic election on primary failure.',
    ],
    relatedTerms: [
      { slug: 'eventual-consistency', category: 'hld' },
      { slug: 'availability', category: 'hld' },
      { slug: 'cap-theorem', category: 'hld' },
    ],
    interviewTips: [
      'Mention replication lag when discussing read-your-writes consistency.',
      'Separate read scaling (replicas) from write scaling (sharding).',
    ],
  },
  {
    slug: 'microservices',
    name: 'Microservices',
    category: 'hld',
    shortDefinition: 'Architecture of independently deployable, bounded services.',
    definition:
      'Microservices decompose an application into small, autonomous services aligned to business capabilities. Each service owns its data, deploys independently, and communicates via APIs or messaging. Benefits include team autonomy and targeted scaling; costs include operational complexity and distributed system challenges.',
    keyPoints: [
      'Service boundaries should follow domain (DDD bounded contexts), not technical layers.',
      'Each service has its own database — avoid shared DB anti-pattern.',
      'Requires service discovery, API gateway, observability, and CI/CD maturity.',
      'Start monolith, split when scaling/team boundaries justify it.',
    ],
    examples: [
      'Netflix: separate services for recommendations, billing, streaming.',
      'Amazon: two-pizza teams owning independent services.',
    ],
    relatedTerms: [
      { slug: 'api-gateway', category: 'hld' },
      { slug: 'message-queue', category: 'hld' },
    ],
    interviewTips: [
      'Do not default to microservices — justify with team size, scale, or isolation needs.',
      'Discuss saga pattern for distributed transactions.',
    ],
  },
  {
    slug: 'api-gateway',
    name: 'API Gateway',
    category: 'hld',
    shortDefinition: 'Single entry point that routes, authenticates, and aggregates API requests.',
    definition:
      'An API gateway sits between clients and backend services, handling routing, authentication, rate limiting, SSL termination, request/response transformation, and sometimes response aggregation (BFF pattern). It simplifies the client and centralizes cross-cutting concerns.',
    keyPoints: [
      'Centralizes auth (JWT validation, API keys) so services stay simple.',
      'Rate limiting and throttling protect backend from abuse.',
      'BFF (Backend for Frontend): separate gateways per client type (web vs mobile).',
      'Avoid turning gateway into a "god service" with too much business logic.',
    ],
    examples: [
      'Kong or AWS API Gateway in front of microservices cluster.',
      'GraphQL gateway aggregating multiple REST services.',
    ],
    relatedTerms: [
      { slug: 'load-balancing', category: 'hld' },
      { slug: 'rate-limiting', category: 'hld' },
      { slug: 'microservices', category: 'hld' },
    ],
    interviewTips: [
      'Place gateway at the edge of your diagram between clients and services.',
      'Mention idempotency keys for retry-safe mutations at the gateway.',
    ],
  },
  {
    slug: 'message-queue',
    name: 'Message Queue',
    category: 'hld',
    shortDefinition: 'Async buffer decoupling producers from consumers.',
    definition:
      'Message queues (Kafka, RabbitMQ, SQS) enable asynchronous communication between services. Producers publish messages; consumers process them at their own pace. This decouples services, absorbs traffic spikes, and enables event-driven architectures.',
    keyPoints: [
      'At-least-once vs exactly-once delivery semantics — design consumers idempotently.',
      'Partitioning (Kafka) enables parallel consumption and ordering per key.',
      'Dead letter queues capture failed messages for retry or inspection.',
      'Backpressure: queue depth signals when consumers are overwhelmed.',
    ],
    examples: [
      'Order service publishes OrderCreated; email, inventory, analytics consume independently.',
      'Kafka log for event sourcing and stream processing.',
    ],
    relatedTerms: [
      { slug: 'microservices', category: 'hld' },
      { slug: 'rate-limiting', category: 'hld' },
    ],
    interviewTips: [
      'Use queues when work can be async and peak traffic exceeds steady processing.',
      'Discuss ordering guarantees only when the use case requires it.',
    ],
  },
  {
    slug: 'consistent-hashing',
    name: 'Consistent Hashing',
    category: 'hld',
    shortDefinition: 'Distributes keys across nodes with minimal remapping on scale changes.',
    definition:
      'Consistent hashing maps keys and nodes onto a hash ring. When nodes are added or removed, only keys adjacent to that node move — unlike naive modulo hashing where most keys remap. Essential for distributed caches and sharded storage.',
    keyPoints: [
      'Virtual nodes (vnodes) improve load balance when node count is small.',
      'Used in Dynamo, Cassandra, memcached clusters, and CDNs.',
      'Clockwise walk on ring finds responsible node for a key.',
      'Reduces cache invalidation storms during cluster resize.',
    ],
    examples: [
      'Amazon DynamoDB partition key hashing across storage nodes.',
      'Redis Cluster slot assignment using hash slots.',
    ],
    relatedTerms: [
      { slug: 'database-sharding', category: 'hld' },
      { slug: 'caching', category: 'hld' },
      { slug: 'load-balancing', category: 'hld' },
    ],
    interviewTips: [
      'Draw the hash ring when explaining — interviewers love visual intuition.',
      'Connect to virtual nodes when discussing uneven load distribution.',
    ],
  },
  {
    slug: 'rate-limiting',
    name: 'Rate Limiting',
    category: 'hld',
    shortDefinition: 'Controls how many requests a client can make in a time window.',
    definition:
      'Rate limiting protects services from abuse, ensures fair usage, and prevents cascade failures. Common algorithms include token bucket, sliding window, and fixed window. Limits can be applied per user, IP, API key, or endpoint.',
    keyPoints: [
      'Token bucket: allows bursts while enforcing average rate.',
      'Sliding window: smoother than fixed window, avoids boundary spikes.',
      'Distributed rate limiting requires shared store (Redis) or edge enforcement.',
      'Return 429 Too Many Requests with Retry-After header.',
    ],
    examples: [
      'Twitter API tier limits (300 requests per 15 minutes).',
      'Stripe rate limits per API key to protect payment infrastructure.',
    ],
    relatedTerms: [
      { slug: 'api-gateway', category: 'hld' },
      { slug: 'rate-limiter-design', category: 'lld' },
    ],
    interviewTips: [
      'Distinguish rate limiting (client quota) from load shedding (server overload).',
      'Mention token bucket when interviewer asks about burst traffic.',
    ],
  },
  {
    slug: 'eventual-consistency',
    name: 'Eventual Consistency',
    category: 'hld',
    shortDefinition: 'Replicas converge to the same state given enough time without new writes.',
    definition:
      'Eventual consistency guarantees that if no new updates are made, all replicas will eventually reflect the same data. It trades strong consistency for availability and partition tolerance — common in AP systems, CDNs, and social features where stale reads are acceptable.',
    keyPoints: [
      'Read-your-writes: route user reads to primary or version-checked replica.',
      'Causal consistency: preserve ordering of causally related operations.',
      'Conflict resolution: last-write-wins, vector clocks, or CRDTs.',
      'User-facing copy should set expectations ("Updating..." UI).',
    ],
    examples: [
      'DNS TTL propagation — changes visible globally after delay.',
      'Facebook like counts may briefly disagree across regions.',
    ],
    relatedTerms: [
      { slug: 'cap-theorem', category: 'hld' },
      { slug: 'replication', category: 'hld' },
    ],
    interviewTips: [
      'Name specific consistency level needed: strong, eventual, or causal.',
      'Tie to product: payment ledger vs notification badge count.',
    ],
  },
  {
    slug: 'horizontal-vs-vertical-scaling',
    name: 'Horizontal vs Vertical Scaling',
    category: 'hld',
    shortDefinition: 'Scale out (more machines) vs scale up (bigger machine).',
    definition:
      'Vertical scaling increases resources on a single node (CPU, RAM, disk). Horizontal scaling adds more nodes. Vertical scaling hits hardware ceilings and creates SPOF; horizontal scaling is the standard for large systems but requires distributed design patterns.',
    keyPoints: [
      'Vertical: simpler ops, no code changes, limited by largest instance size.',
      'Horizontal: unlimited theoretical scale, needs load balancing and partitioning.',
      'Stateless services scale horizontally easily; databases need sharding/replicas.',
      'Many systems vertical-scale DB first, then shard horizontally.',
    ],
    examples: [
      'Vertical: upgrade Postgres from 16GB to 64GB RAM.',
      'Horizontal: add 10 stateless API server instances behind a load balancer.',
    ],
    relatedTerms: [
      { slug: 'scalability', category: 'hld' },
      { slug: 'load-balancing', category: 'hld' },
      { slug: 'database-sharding', category: 'hld' },
    ],
    interviewTips: [
      'Start vertical for MVP, plan horizontal path before claiming billion-user scale.',
    ],
  },
  {
    slug: 'fault-tolerance',
    name: 'Fault Tolerance',
    category: 'hld',
    shortDefinition: 'System continues operating correctly when components fail.',
    definition:
      'Fault tolerance is the ability to continue service despite hardware failures, network issues, or software bugs. It relies on redundancy, isolation, retries with backoff, circuit breakers, and graceful degradation rather than perfect uptime of every component.',
    keyPoints: [
      'Fail fast vs retry: transient errors retry; persistent errors circuit-break.',
      'Bulkheads isolate failures (thread pools per dependency).',
      'Chaos engineering proactively validates failure handling.',
      'Idempotent operations make retries safe.',
    ],
    examples: [
      'Netflix Hystrix circuit breakers stopping calls to failing services.',
      'Multi-region active-passive failover for disaster recovery.',
    ],
    relatedTerms: [
      { slug: 'availability', category: 'hld' },
      { slug: 'message-queue', category: 'hld' },
    ],
    interviewTips: [
      'Walk through single component failure in your design — interviewers always ask this.',
    ],
  },
  {
    slug: 'slo-sli-sla',
    name: 'SLA, SLO, and SLI',
    category: 'hld',
    shortDefinition: 'Framework for defining and measuring service reliability targets.',
    definition:
      'SLI (Indicator) is a measured metric (latency P99, error rate). SLO (Objective) is an internal target (99.9% requests < 200ms). SLA (Agreement) is a contractual commitment with customer consequences. Error budgets connect SLOs to engineering velocity.',
    keyPoints: [
      'SLI examples: availability, latency percentiles, throughput, error rate.',
      'SLO should be stricter than SLA to provide buffer.',
      'Error budget: allowed downtime before pausing feature launches.',
      'Observability stack (metrics, logs, traces) measures SLIs.',
    ],
    examples: [
      'Google Cloud SLA: 99.95% monthly uptime for Compute Engine.',
      'Internal SLO: 99.99% of search requests under 100ms P99.',
    ],
    relatedTerms: [
      { slug: 'availability', category: 'hld' },
      { slug: 'fault-tolerance', category: 'hld' },
    ],
    interviewTips: [
      'Propose concrete SLIs for your design (e.g., "P99 latency < 300ms").',
    ],
  },

  // ─── LLD ───────────────────────────────────────────────────────────────────
  {
    slug: 'solid-principles',
    name: 'SOLID Principles',
    category: 'lld',
    shortDefinition: 'Five OOP design principles for maintainable, extensible code.',
    definition:
      'SOLID guides class and module design: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. They reduce coupling, improve testability, and make systems easier to extend in LLD interviews.',
    keyPoints: [
      'S — Single Responsibility: one reason to change per class.',
      'O — Open/Closed: open for extension, closed for modification.',
      'L — Liskov Substitution: subtypes must be substitutable for base types.',
      'I — Interface Segregation: many specific interfaces over one general.',
      'D — Dependency Inversion: depend on abstractions, not concretions.',
    ],
    examples: [
      'PaymentProcessor interface with CreditCard and PayPal implementations (D + O).',
      'Separate OrderValidator from OrderRepository (S).',
    ],
    relatedTerms: [
      { slug: 'dependency-injection', category: 'lld' },
      { slug: 'design-patterns', category: 'lld' },
    ],
    interviewTips: [
      'Apply SOLID while drawing classes — mention which principle guides each decision.',
    ],
  },
  {
    slug: 'design-patterns',
    name: 'Design Patterns',
    category: 'lld',
    shortDefinition: 'Reusable solutions to common object-oriented design problems.',
    definition:
      'Design patterns are proven templates for structuring code — creational (object creation), structural (composition), and behavioral (communication). In LLD interviews, patterns demonstrate you can organize code beyond ad-hoc classes.',
    keyPoints: [
      'Creational: Factory, Builder, Singleton, Prototype.',
      'Structural: Adapter, Decorator, Facade, Composite.',
      'Behavioral: Observer, Strategy, Command, State, Template Method.',
      'Use patterns to solve specific problems — do not force them everywhere.',
    ],
    examples: [
      'Strategy pattern for multiple pricing rules in e-commerce checkout.',
      'Observer for notifying UI when order status changes.',
    ],
    relatedTerms: [
      { slug: 'solid-principles', category: 'lld' },
      { slug: 'factory-pattern', category: 'lld' },
      { slug: 'observer-pattern', category: 'lld' },
    ],
    interviewTips: [
      'Name the pattern and explain why it fits — not just the pattern name alone.',
    ],
  },
  {
    slug: 'factory-pattern',
    name: 'Factory Pattern',
    category: 'lld',
    shortDefinition: 'Creates objects without exposing instantiation logic to the client.',
    definition:
      'The Factory pattern encapsulates object creation behind an interface or factory method. Simple Factory centralizes creation; Factory Method lets subclasses decide which class to instantiate; Abstract Factory creates families of related objects.',
    keyPoints: [
      'Decouples client code from concrete class names.',
      'Centralizes creation logic — easy to add new types.',
      'Factory Method: virtual create method overridden in subclasses.',
      'Abstract Factory: creates related products (UI widgets for Windows vs Mac).',
    ],
    examples: [
      'NotificationFactory.create(type) returns Email, SMS, or Push notifier.',
      'DatabaseConnectionFactory for MySQL vs Postgres drivers.',
    ],
    relatedTerms: [
      { slug: 'design-patterns', category: 'lld' },
      { slug: 'dependency-injection', category: 'lld' },
    ],
    interviewTips: [
      'Use when object type is determined at runtime from config or input.',
    ],
  },
  {
    slug: 'observer-pattern',
    name: 'Observer Pattern',
    category: 'lld',
    shortDefinition: 'One-to-many dependency where observers react to subject state changes.',
    definition:
      'The Observer pattern defines a subscription mechanism: when a subject changes state, all registered observers are notified automatically. It decouples event producers from consumers and is the foundation of event-driven UI and pub/sub systems at smaller scale.',
    keyPoints: [
      'Subject maintains list of observers; notify on state change.',
      'Push vs pull notification models.',
      'Avoid memory leaks — observers must unsubscribe.',
      'Related to pub/sub but typically in-process and synchronous.',
    ],
    examples: [
      'Stock price Subject notifies Portfolio and AlertService observers.',
      'React state updates re-rendering subscribed components (conceptually similar).',
    ],
    relatedTerms: [
      { slug: 'design-patterns', category: 'lld' },
      { slug: 'strategy-pattern', category: 'lld' },
    ],
    interviewTips: [
      'Contrast with message queue for cross-service async notification at HLD level.',
    ],
  },
  {
    slug: 'strategy-pattern',
    name: 'Strategy Pattern',
    category: 'lld',
    shortDefinition: 'Encapsulates interchangeable algorithms behind a common interface.',
    definition:
      'Strategy defines a family of algorithms, encapsulates each one, and makes them interchangeable. The context delegates to a strategy interface, allowing runtime algorithm selection without conditional spaghetti code.',
    keyPoints: [
      'Eliminates large if/else or switch on algorithm type.',
      'New strategies added without modifying context (Open/Closed).',
      'Composition over inheritance for behavior variation.',
      'Often combined with Factory to instantiate strategies.',
    ],
    examples: [
      'SortContext uses QuickSortStrategy or MergeSortStrategy.',
      'ShippingCalculator with Standard, Express, Overnight strategies.',
    ],
    relatedTerms: [
      { slug: 'design-patterns', category: 'lld' },
      { slug: 'solid-principles', category: 'lld' },
    ],
    interviewTips: [
      'Go-to pattern when interviewer says "support multiple types/behaviors."',
    ],
  },
  {
    slug: 'lru-cache',
    name: 'LRU Cache',
    category: 'lld',
    shortDefinition: 'Cache that evicts the least recently used item when full.',
    definition:
      'LRU (Least Recently Used) is a classic cache eviction policy and frequent LLD problem. Implement with a hash map for O(1) lookup plus a doubly linked list for O(1) move-to-front and eviction of tail.',
    keyPoints: [
      'HashMap: key → list node for O(1) access.',
      'Doubly linked list: MRU at head, LRU at tail.',
      'On get: move node to head. On put at capacity: remove tail.',
      'Thread-safe variant requires locks or concurrent structures.',
    ],
    examples: [
      'Redis maxmemory-policy allkeys-lru.',
      'Browser in-memory cache for recently visited pages.',
    ],
    relatedTerms: [
      { slug: 'caching', category: 'hld' },
      { slug: 'rate-limiter-design', category: 'lld' },
    ],
    interviewTips: [
      'State O(1) for get and put — draw map + linked list before coding.',
    ],
  },
  {
    slug: 'rate-limiter-design',
    name: 'Rate Limiter (LLD)',
    category: 'lld',
    shortDefinition: 'Class design for enforcing request rate limits in code.',
    definition:
      'LLD rate limiter design implements algorithms like token bucket or sliding window log as classes. Key design decisions: thread safety, distributed vs in-memory, configuration per client, and clean API (allowRequest(userId) → boolean).',
    keyPoints: [
      'Token bucket: refill tokens at fixed rate; each request consumes one.',
      'Sliding window log: store timestamps of recent requests in deque.',
      'Fixed window counter: simple but boundary burst problem.',
      'Interface RateLimiter with isAllowed(key): boolean for testability.',
    ],
    examples: [
      'Guava RateLimiter (token bucket) in Java services.',
      'Redis INCR + EXPIRE for distributed fixed-window limiter.',
    ],
    relatedTerms: [
      { slug: 'rate-limiting', category: 'hld' },
      { slug: 'lru-cache', category: 'lld' },
      { slug: 'concurrency', category: 'lld' },
    ],
    interviewTips: [
      'Clarify single-process vs distributed before choosing data structure.',
    ],
  },
  {
    slug: 'concurrency',
    name: 'Concurrency',
    category: 'lld',
    shortDefinition: 'Managing multiple threads or tasks executing simultaneously.',
    definition:
      'Concurrency deals with structuring programs so multiple operations make progress — via threads, async I/O, or coroutines. LLD interviews test understanding of race conditions, locks, atomic operations, and safe shared state access.',
    keyPoints: [
      'Race condition: outcome depends on thread scheduling order.',
      'Synchronization: mutex, read-write lock, semaphore.',
      'Prefer immutable data and message passing over shared mutable state.',
      'Thread pool reuses threads instead of spawning per request.',
    ],
    examples: [
      'ConcurrentHashMap for thread-safe cache in Java.',
      'Go goroutines with channels for CSP-style concurrency.',
    ],
    relatedTerms: [
      { slug: 'thread-pool', category: 'lld' },
      { slug: 'deadlock', category: 'lld' },
      { slug: 'lru-cache', category: 'lld' },
    ],
    interviewTips: [
      'Identify shared mutable state first — that is where bugs hide.',
    ],
  },
  {
    slug: 'thread-pool',
    name: 'Thread Pool',
    category: 'lld',
    shortDefinition: 'Fixed set of worker threads processing tasks from a queue.',
    definition:
      'A thread pool maintains N pre-created threads that pull tasks from a bounded or unbounded queue. It avoids thread creation overhead, limits resource usage, and provides a structured way to handle concurrent work in server applications.',
    keyPoints: [
      'Core pool size, max pool size, queue capacity are tunable parameters.',
      'RejectedExecutionHandler defines behavior when queue is full.',
      'Long-running tasks can starve the pool — separate pools per workload.',
      'Shutdown: graceful drain vs immediate interrupt.',
    ],
    examples: [
      'Java ExecutorService with fixed thread pool for HTTP request handling.',
      'Database connection pool (similar resource pooling pattern).',
    ],
    relatedTerms: [
      { slug: 'concurrency', category: 'lld' },
      { slug: 'connection-pool', category: 'lld' },
    ],
    interviewTips: [
      'Relate pool size to CPU cores for CPU-bound work; higher for I/O-bound.',
    ],
  },
  {
    slug: 'deadlock',
    name: 'Deadlock',
    category: 'lld',
    shortDefinition: 'Two or more threads blocked forever waiting for each other.',
    definition:
      'Deadlock occurs when threads hold resources and wait for others in a circular chain. Coffman conditions: mutual exclusion, hold and wait, no preemption, circular wait. Prevention, avoidance (banker), detection, and lock ordering are mitigation strategies.',
    keyPoints: [
      'Lock ordering: always acquire locks in same global order.',
      'Try-lock with timeout breaks indefinite waiting.',
      'Reduce lock scope and duration.',
      'Detect deadlocks in development with thread dumps and tools.',
    ],
    examples: [
      'Thread A locks account1 then account2; Thread B locks account2 then account1.',
      'Database deadlocks detected and one transaction aborted automatically.',
    ],
    relatedTerms: [
      { slug: 'concurrency', category: 'lld' },
    ],
    interviewTips: [
      'When using multiple locks, state your lock acquisition order explicitly.',
    ],
  },
  {
    slug: 'dependency-injection',
    name: 'Dependency Injection',
    category: 'lld',
    shortDefinition: 'Supplying dependencies from outside rather than creating them internally.',
    definition:
      'Dependency Injection (DI) inverts control of object creation — a class receives its dependencies via constructor, setter, or framework container. It enables testing with mocks, swapping implementations, and follows the Dependency Inversion Principle.',
    keyPoints: [
      'Constructor injection: required dependencies, immutable fields.',
      'Interface-based dependencies for flexibility and testing.',
      'DI containers (Spring, NestJS) manage object graphs.',
      'Avoid service locator anti-pattern when possible.',
    ],
    examples: [
      'OrderService receives PaymentGateway via constructor, not new StripeGateway().',
      'Unit test injects MockEmailService into NotificationService.',
    ],
    relatedTerms: [
      { slug: 'solid-principles', category: 'lld' },
      { slug: 'repository-pattern', category: 'lld' },
    ],
    interviewTips: [
      'Show constructor taking interface type — signals testable design.',
    ],
  },
  {
    slug: 'repository-pattern',
    name: 'Repository Pattern',
    category: 'lld',
    shortDefinition: 'Abstraction layer between domain logic and data access.',
    definition:
      'Repository mediates between domain and data mapping layers, providing collection-like interface for domain objects. Domain code calls findById(), save() on repository interface; concrete implementation handles SQL, NoSQL, or in-memory storage.',
    keyPoints: [
      'Domain layer never imports SQL or ORM specifics.',
      'Interface in domain; implementation in infrastructure layer.',
      'Simplifies unit testing with in-memory repository.',
      'One repository per aggregate root in DDD.',
    ],
    examples: [
      'UserRepository interface with JpaUserRepository implementation.',
      'OrderRepository backed by MongoDB or mock for tests.',
    ],
    relatedTerms: [
      { slug: 'dependency-injection', category: 'lld' },
      { slug: 'solid-principles', category: 'lld' },
    ],
    interviewTips: [
      'Draw Repository interface between Service and Database in LLD diagrams.',
    ],
  },
  {
    slug: 'rest-api-design',
    name: 'REST API Design',
    category: 'lld',
    shortDefinition: 'Conventions for designing HTTP-based resource-oriented APIs.',
    definition:
      'REST models resources (nouns) with standard HTTP verbs: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). Good API design includes consistent naming, proper status codes, pagination, versioning, and idempotent operations.',
    keyPoints: [
      'URLs represent resources: /users/{id}/orders not /getUserOrders.',
      'Use HTTP status codes: 200, 201, 400, 401, 404, 409, 429, 500.',
      'Pagination: cursor-based for large feeds, offset for admin UIs.',
      'Idempotency-Key header for safe POST retries (payments).',
    ],
    examples: [
      'GitHub REST API: GET /repos/{owner}/{repo}/issues.',
      'Stripe API versioning via URL path or header.',
    ],
    relatedTerms: [
      { slug: 'api-gateway', category: 'hld' },
      { slug: 'repository-pattern', category: 'lld' },
    ],
    interviewTips: [
      'Define request/response JSON schema when interviewer asks for API design.',
    ],
  },
  {
    slug: 'class-diagram',
    name: 'Class Diagram',
    category: 'lld',
    shortDefinition: 'UML diagram showing classes, attributes, methods, and relationships.',
    definition:
      'Class diagrams visualize static structure: classes as boxes with fields and methods, relationships as associations, aggregations, compositions, inheritance, and implementations. They are the primary deliverable in LLD interviews for OOP systems.',
    keyPoints: [
      'Association: uses-a; Composition: strong ownership (lifecycle tied).',
      'Inheritance: is-a; Interface implementation: dashed line with triangle.',
      'Multiplicity: 1, *, 0..1 on association ends.',
      'Keep diagram focused — 5–8 core classes, not every DTO.',
    ],
    examples: [
      'Parking lot: Vehicle, Spot, Ticket, Payment, Level classes.',
      'Elevator: Elevator, Request, Controller, Direction enum.',
    ],
    relatedTerms: [
      { slug: 'sequence-diagram', category: 'lld' },
      { slug: 'solid-principles', category: 'lld' },
    ],
    interviewTips: [
      'Draw core entities first, then add relationships — do not start with methods.',
    ],
  },
  {
    slug: 'sequence-diagram',
    name: 'Sequence Diagram',
    category: 'lld',
    shortDefinition: 'UML diagram showing object interactions over time.',
    definition:
      'Sequence diagrams show how objects exchange messages in chronological order — lifelines, synchronous/async calls, returns, and loops. They clarify flow for use cases like "user places order" and complement class diagrams in LLD.',
    keyPoints: [
      'Actors on left; time flows top to bottom.',
      'Solid arrow: sync call; open arrow: async message.',
      'Activation boxes show processing duration.',
      'Use alt/opt frames for conditional flows.',
    ],
    examples: [
      'Login flow: Client → Controller → AuthService → UserRepository → DB.',
      'Payment flow with external gateway callback.',
    ],
    relatedTerms: [
      { slug: 'class-diagram', category: 'lld' },
      { slug: 'rest-api-design', category: 'lld' },
    ],
    interviewTips: [
      'Draw sequence for the happiest path first, then error paths if time allows.',
    ],
  },
  {
    slug: 'connection-pool',
    name: 'Connection Pool',
    category: 'lld',
    shortDefinition: 'Reuses expensive database or network connections.',
    definition:
      'Opening DB connections is costly. Connection pools maintain a set of ready connections borrowed by application threads and returned after use. Pool size, timeout, and validation queries must be tuned to avoid exhaustion and stale connections.',
    keyPoints: [
      'Configure min/max pool size based on concurrent request load.',
      'Connection validation on checkout detects stale connections.',
      'Pool exhaustion causes requests to block or fail — monitor wait time.',
      'Similar pattern applies to HTTP client pools and Redis connections.',
    ],
    examples: [
      'HikariCP in Spring Boot applications.',
      'PgBouncer pooling connections to PostgreSQL.',
    ],
    relatedTerms: [
      { slug: 'thread-pool', category: 'lld' },
      { slug: 'repository-pattern', category: 'lld' },
    ],
    interviewTips: [
      'Mention pool sizing when design involves high DB concurrency.',
    ],
  },
  {
    slug: 'oop-fundamentals',
    name: 'OOP Fundamentals',
    category: 'lld',
    shortDefinition: 'Encapsulation, abstraction, inheritance, and polymorphism.',
    definition:
      'Object-Oriented Programming organizes code around objects combining data and behavior. The four pillars — encapsulation (hide internals), abstraction (expose essentials), inheritance (reuse via hierarchy), polymorphism (same interface, different behavior) — underpin most LLD solutions.',
    keyPoints: [
      'Encapsulation: private fields with public getters/setters or methods.',
      'Abstraction: interfaces and abstract classes hide implementation.',
      'Composition over inheritance for flexible reuse.',
      'Polymorphism: interface reference to concrete implementation.',
    ],
    examples: [
      'Animal interface with Dog.speak() and Cat.speak() — polymorphism.',
      'BankAccount with private balance and deposit()/withdraw() methods.',
    ],
    relatedTerms: [
      { slug: 'solid-principles', category: 'lld' },
      { slug: 'class-diagram', category: 'lld' },
    ],
    interviewTips: [
      'Prefer composition when interviewer asks "inheritance vs composition."',
    ],
  },
];
