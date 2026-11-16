# Cisco Meraki MX: One-Armed VPN Concentrator Mode vs. Routed (NAT) Mode – Which Architecture Should You Choose?

**A practical comparison of AutoVPN hub deployments, data center integration, routing, and high availability.**

---

## 1. Introduction: Understanding the Two Deployment Models

Cisco Meraki AutoVPN is a cloud-managed site-to-site VPN technology that automatically establishes secure IPsec VPN tunnels between Meraki MX appliances.

Instead of manually configuring IPsec parameters, tunnel endpoints, encryption settings, and peer relationships at every branch, Meraki uses its cloud-based VPN registry to orchestrate connectivity between MX appliances.

This makes connecting multiple branch offices to a central headquarters or data center significantly easier.

However, when designing a data center or central hub deployment, one important architectural decision needs to be made:

**Should the Meraki MX operate in Routed (NAT) Mode or One-Armed VPN Concentrator Mode?**

Both deployment models can terminate AutoVPN tunnels from remote branches. However, they differ significantly in how traffic enters and exits the appliance, where routing decisions are made, and how they integrate with an existing data center infrastructure.

Choosing the wrong deployment model can introduce unnecessary network complexity, additional NAT operations, routing challenges, or limitations when integrating with existing firewalls and core switches.

Let's understand both architectures from a network engineering perspective.

---

## 2. What Is Routed (NAT) Mode?

Routed Mode is the default operating mode of a Cisco Meraki MX appliance.

In this deployment, the MX operates as a Layer 3 router and security gateway, typically positioned at the network perimeter.

It connects two different network segments:

- **WAN Interface:** Connects to the ISP or upstream network.
- **LAN Interface:** Connects to the internal network, distribution switch, or core switch.

The MX becomes the primary gateway responsible for routing traffic between the internal network and external destinations.

### How Does Routed Mode Work?

In Routed Mode, the MX performs several network functions:

1. Layer 3 routing between WAN and LAN networks.
2. Network Address Translation (NAT) for Internet-bound traffic.
3. Stateful firewall inspection.
4. Layer 7 firewall policies and traffic filtering.
5. Site-to-site AutoVPN termination.
6. Security services such as IDS/IPS, depending on the model and licensing.

### Architecture

```text
                   INTERNET
                      |
                      |
                   [ ISP ]
                      |
                      |
              +---------------+
              |   MERAKI MX   |
              |               |
              |  WAN Interface|
              |       |       |
              |   NAT / FW    |
              |       |       |
              |  LAN Interface
              +-------+-------+
                      |
                      |
               [ CORE SWITCH ]
                      |
             +--------+--------+
             |        |        |
           VLAN 10  VLAN 20  VLAN 30
             |        |        |
           Users   Servers   Storage
```

In this architecture, the MX acts as the network's edge firewall and routing gateway.

There is no requirement for a separate third-party edge firewall in this basic design because the MX itself provides perimeter security.

### Packet Flow in Routed Mode

Consider a branch office attempting to access a server hosted in the data center.

Assume:

- Branch subnet: `10.10.10.0/24`
- Data center subnet: `10.20.20.0/24`
- MX WAN IP: `203.0.113.10`
- Data center server: `10.20.20.50`

The packet flow looks like this:

**Step 1: Branch initiates traffic**

A client at the branch sends traffic destined for `10.20.20.50`.

The branch MX identifies the destination as a remote VPN subnet.

**Step 2: AutoVPN encapsulation**

The branch MX encrypts the original IP packet and forwards it through the established AutoVPN tunnel.

**Step 3: Data center MX receives traffic**

The data center MX receives the encrypted IPsec packet on its WAN interface.

It decrypts the packet and identifies the original destination.

**Step 4: Routing and firewall inspection**

The MX evaluates its routing table and applicable firewall policies.

Because the destination belongs to an internal LAN subnet, the MX forwards the packet through its LAN interface.

**Step 5: Core switch forwards the packet**

The core switch receives the packet and forwards it to the destination server.

The return traffic follows the reverse path.

### When Should You Use Routed Mode?

Routed Mode is ideal when:

- The MX is intended to be the primary Internet gateway.
- You want the MX to perform NAT and firewall functions.
- The organization does not already have a dedicated enterprise firewall.
- You need a relatively straightforward branch-to-headquarters deployment.
- You want a single appliance handling routing, security, and VPN termination.

**Practical example:**

A company has five branch offices and a small headquarters.

The headquarters does not have an existing Palo Alto, Fortinet, or Cisco Secure Firewall deployment.

Deploying an MX in Routed Mode allows the organization to use the same appliance for Internet connectivity, security policies, and AutoVPN termination.

---

## 3. What Is One-Armed VPN Concentrator Mode?

One-Armed VPN Concentrator Mode (also called Passthrough or VPN Concentrator mode in Meraki Dashboard) is designed for organizations that already have an established data center network infrastructure and want the Meraki MX to function primarily as an AutoVPN termination point.

Unlike Routed Mode, the MX does not act as the primary Layer 3 gateway for internal networks.

Instead, it connects to an existing upstream network through a single Ethernet interface.

This is why the architecture is called **One-Armed**.

The MX uses its WAN 1 interface to send and receive traffic. Both encrypted VPN traffic and decrypted traffic use this same physical connection.

The existing enterprise firewall remains responsible for perimeter security, while the core routing infrastructure handles internal network connectivity. Cisco Meraki recommends placing a one-armed concentrator behind an edge firewall rather than exposing it directly to the public Internet.

### Architecture

```text
                    INTERNET
                       |
                       |
                    [ ISP ]
                       |
                       |
             +-------------------+
             |  EDGE FIREWALL    |
             |                   |
             | Palo Alto /       |
             | Fortinet / Cisco  |
             +---------+---------+
                       |
                       |
                +------+------+
                |             |
                |  DC NETWORK |
                |             |
          +-----+-----+  +----+-----------+
          |           |  |                |
          | MERAKI MX |  |  CORE SWITCH   |
          |           |  |                |
          | WAN 1     |  |                |
          | (Single   |  |                |
          | Interface)|  |                |
          +-----+-----+  +----------------+
                |
                |
          AutoVPN Tunnels
                |
        +-------+--------+
        |                |
     BRANCH 1         BRANCH 2
      MX                MX
```

*Note: The diagram represents logical connectivity. In a production deployment, the concentrator and core switch may connect through the same Layer 2 transit network or an appropriately designed routed segment.*

### How Does One-Armed Mode Work?

Let's understand the functionality.

**1. Single-interface operation**

The MX uses WAN 1 as its connection to the upstream network.

Unlike Routed Mode, it does not require separate WAN and LAN interfaces to forward traffic between network segments.

Both ingress and egress traffic use the same physical interface.

**2. Dedicated VPN termination**

The primary responsibility of the MX is to terminate AutoVPN tunnels from remote branch offices.

It receives encrypted traffic, decrypts it, and forwards the original packets back into the existing data center network.

**3. Existing firewall retains perimeter responsibility**

The organization can continue using its existing enterprise firewall for Internet access, security inspection, NAT, and perimeter policies.

The MX does not need to replace the existing firewall.

**4. Routing integration**

The data center routing infrastructure needs to know how to reach the remote branch subnets.

This can be achieved using:

- Static routes.
- OSPF route advertisement.
- BGP route exchange.

The available routing capabilities depend on the MX firmware, operating mode, and specific configuration.

### Packet Flow in One-Armed Mode

Let's use the same example.

- Branch subnet: `10.10.10.0/24`
- Data center subnet: `10.20.20.0/24`
- Data center server: `10.20.20.50`
- VPN concentrator: `10.20.30.10`

**Step 1: Branch initiates traffic**

A client in the branch sends a packet to `10.20.20.50`.

The branch MX identifies the destination as a remote VPN subnet.

**Step 2: AutoVPN encapsulation**

The branch MX encrypts the original packet and sends it through the established VPN tunnel.

**Step 3: Concentrator receives the packet**

The data center MX receives the encrypted packet through WAN 1.

It decrypts the packet and recovers the original IP packet:

```text
Source IP:      10.10.10.25
Destination IP: 10.20.20.50
```

**Step 4: Packet exits through the same interface**

The decrypted packet is forwarded through WAN 1 into the upstream data center network.

Notice something important here:

The encrypted packet enters through WAN 1, and the decrypted packet also exits through WAN 1.

There is no separate LAN interface involved in this forwarding operation.

**Step 5: Core switch forwards the traffic**

The core switch receives the packet and routes it toward the destination server.

For return traffic, the core switch must have a route for `10.10.10.0/24` pointing toward the VPN concentrator.

The return packet reaches the concentrator, is encrypted, and travels through the AutoVPN tunnel back to the branch.

### Why Do Enterprises Prefer One-Armed Mode?

There are several architectural advantages.

#### A. Non-disruptive integration

Organizations often already have an established data center architecture containing:

- Dedicated perimeter firewalls.
- Core switches.
- Distribution switches.
- Existing routing protocols.
- Security and segmentation policies.

Replacing the existing firewall or redesigning the network around a new MX appliance may introduce unnecessary complexity.

One-Armed Mode allows the organization to introduce Meraki AutoVPN without fundamentally changing its existing network architecture.

#### B. Dedicated VPN termination

The MX focuses on VPN termination rather than serving as the primary Internet gateway and NAT device.

This can simplify the network design and avoid unnecessary gateway or NAT responsibilities on the concentrator.

However, it is important not to assume that One-Armed Mode automatically delivers higher VPN throughput.

Actual throughput depends on the MX model, firmware, number of tunnels, encryption workload, and traffic characteristics.

Use the relevant model-specific performance specifications when sizing the deployment.

#### C. Dynamic routing integration

This is one of the most important considerations for enterprise deployments.

When multiple branches connect to a data center, manually maintaining routes for every branch subnet can become operationally difficult.

One-Armed Concentrator Mode supports integration with existing routing infrastructure.

**OSPF:**

The MX can advertise remote AutoVPN subnets to upstream OSPF neighbors, allowing the core network to learn branch routes dynamically. The MX advertises these routes; it does not learn routes from OSPF neighbors. In Routed mode, OSPF availability also depends on the MX firmware and LAN configuration.

**BGP:**

MX appliances support BGP integration with upstream network infrastructure and AutoVPN peers. BGP provides flexibility for environments with multiple data centers, route policies, and more complex WAN architectures. Supported peering options depend on firmware and deployment mode. Cisco Meraki documents eBGP support for passthrough hubs and Routed mode hubs on MX 18.207 or later; a Routed mode WAN eBGP peer requires NAT to be disabled on that uplink so advertised routes remain reachable.

#### D. Data center-to-data center failover

Consider an organization with two data centers:

- Primary DC: Mumbai
- Secondary DC: Bengaluru

Both data centers have their own Meraki VPN concentrators.

Branch offices can establish connectivity to both hubs.

If the primary data center becomes unavailable, the branch MX appliances can use the secondary hub based on the configured AutoVPN hub priorities and available routes.

This provides an additional layer of WAN resilience.

For enterprise deployments, combining AutoVPN hub redundancy with routing convergence and application-level failover provides a more complete disaster recovery strategy.

---

## 4. Architecture Diagrams: Side-by-Side Comparison

Let's visualize the fundamental difference between the two architectures.

### A. Routed (NAT) Mode

```text
                   INTERNET
                       |
                       |
                    [ ISP ]
                       |
                       |
               +---------------+
               |   MERAKI MX   |
               |               |
               | WAN Interface |
               |               |
               | NAT / Routing |
               | Firewall      |
               | VPN Termination
               |               |
               | LAN Interface |
               +-------+-------+
                       |
                       |
                [ CORE SWITCH ]
                       |
               +-------+-------+
               |       |       |
             VLAN 10 VLAN 20 VLAN 30
```

**Traffic direction:**

```text
Branch MX
    |
    | Encrypted AutoVPN traffic
    v
Meraki MX WAN
    |
    | Decryption
    v
Routing / Firewall Inspection
    |
    | LAN Interface
    v
Core Switch
    |
    v
Data Center Server
```

Here, the MX is responsible for both VPN termination and Layer 3 gateway functions.

### B. One-Armed VPN Concentrator Mode

```text
                    INTERNET
                        |
                        |
                     [ ISP ]
                        |
                        |
               +----------------+
               | EDGE FIREWALL  |
               |                |
               | Existing       |
               | Security       |
               +-------+--------+
                       |
                       |
                DC TRANSIT NETWORK
                       |
             +---------+---------+
             |                   |
       +-----+------+      +-----+------+
       |  MERAKI MX |      | CORE SWITCH|
       |            |      |            |
       |   WAN 1    |      |            |
       |            |      |            |
       | VPN        |      |            |
       | Termination|      |            |
       +-----+------+      +------+-----+
              |                   |
              |                   |
         AutoVPN              DC VLANs
              |                   |
          Branches             Servers
```

**Traffic direction:**

```text
Branch MX
    |
    | Encrypted AutoVPN traffic
    v
Meraki MX WAN 1
    |
    | Decryption
    v
Same WAN 1 Interface
    |
    | Original IP packet
    v
Core Routing Infrastructure
    |
    v
Data Center Server
```

The critical architectural difference is that the One-Armed MX uses the same physical interface for incoming and outgoing traffic, while the Routed MX forwards traffic between separate WAN and LAN interfaces.

---

## 5. Head-to-Head Comparison: Routed Mode vs. One-Armed Mode

| Parameter | Routed (NAT) Mode | One-Armed Concentrator Mode |
|---|---|---|
| Active interfaces | WAN and LAN | Single WAN 1 interface |
| Primary responsibility | Routing, NAT, firewall, VPN | VPN termination |
| Network placement | Network edge/gateway | Behind an existing firewall |
| NAT | Performs NAT for applicable outbound traffic | Does not perform NAT as the internal network gateway |
| Firewall | MX firewall and security capabilities, subject to model and licensing | Keep the upstream perimeter firewall in place; the concentrator is not a replacement for it |
| OSPF | Remote VPN route advertisement supported with applicable configuration | Remote VPN route advertisement supported |
| BGP | Supported, with firmware and configuration requirements | Supported |
| VPN termination | Yes | Yes |
| Core switch integration | Through LAN interface | Through the same upstream network as WAN 1 |
| Existing firewall integration | Can sit behind or replace an existing firewall, depending on design | Designed to integrate behind an existing firewall |
| High availability | Warm Spare / VRRP | Warm Spare / VRRP |
| DC-to-DC failover | Possible through multiple AutoVPN hubs | Possible through multiple AutoVPN hubs |
| Best use case | Branch gateway and smaller headquarters | Enterprise data center VPN headend |

### Important Technical Considerations

**1. OSPF on the MX advertises routes but does not learn OSPF routes.**

The MX can advertise remote VPN subnet routes through OSPF, but it does not learn OSPF routes as a full OSPF router would.

**2. Routing features depend on firmware and configuration.**

Cisco Meraki documents eBGP support for passthrough hubs and Routed mode hubs on MX 18.207 or later. WAN eBGP in Routed Mode requires NAT to be disabled on that uplink for advertised routes to remain reachable.

**3. One-Armed Mode does not automatically mean higher VPN throughput.**

It is an architectural choice, not a universal performance upgrade. Always compare the VPN throughput specifications for the exact MX models being considered.

**4. High availability requires planning.**

Meraki supports warm-spare HA for both deployment types. VPN concentrator HA uses a shared virtual IP configuration, and the pair operates in active/standby mode.

---

## 6. Decision Framework: Which One Should You Choose?

Let's consider four real-world deployment scenarios.

### Scenario 1: Small Organization with No Existing Data Center Firewall

**Infrastructure:**

- One headquarters.
- Five branch offices.
- Meraki MX at each branch.
- No dedicated enterprise firewall at headquarters.

**Recommended: Routed (NAT) Mode**

Why?

The MX can handle Internet access, NAT, firewall policies, routing, and AutoVPN termination.

There is no need to introduce additional infrastructure.

### Scenario 2: Large Enterprise with an Existing Data Center Firewall

**Infrastructure:**

- Palo Alto or Fortinet perimeter firewall.
- Cisco Catalyst or Nexus core switches.
- Multiple VLANs and server segments.
- Existing routing architecture.
- Multiple Meraki branch offices.

**Recommended: One-Armed VPN Concentrator Mode**

Why?

The organization already has an established security and routing architecture.

Deploying the MX as a dedicated VPN concentrator allows branch VPN connectivity without introducing another Internet gateway or changing the existing perimeter firewall design.

### Scenario 3: Enterprise with Two Data Centers

**Infrastructure:**

- Primary data center in Mumbai.
- Secondary data center in Bengaluru.
- Meraki MX concentrators at both locations.
- Multiple branch offices.
- Existing BGP routing infrastructure.

**Recommended: One-Armed Concentrator Mode**

Why?

This design allows the enterprise to integrate AutoVPN with its existing routing architecture.

Both data centers can serve as VPN hubs, and branches can be configured with appropriate hub priorities.

If the primary hub becomes unavailable, traffic can move toward the secondary hub.

BGP and route advertisement can help coordinate connectivity with the upstream network.

Remember that application recovery and data center failover require additional planning beyond VPN tunnel failover.

### Scenario 4: Organization Migrating from Traditional WAN to Meraki SD-WAN

**Infrastructure:**

- Existing MPLS network.
- Existing enterprise firewall.
- Multiple regional offices.
- Meraki MX deployment planned across branches.

**Recommended: One-Armed Concentrator Mode at the Data Center**

Why?

The organization can introduce Meraki AutoVPN while retaining its existing data center security infrastructure.

It also provides a migration path where branches can gradually move from traditional WAN connectivity to Meraki SD-WAN without requiring a complete data center redesign.

---

## 7. Conclusion: Choosing the Right Architecture Matters

Both Routed (NAT) Mode and One-Armed VPN Concentrator Mode support Cisco Meraki AutoVPN. However, they solve different architectural requirements.

The decision should not be based simply on which mode is better.

It should be based on the existing network infrastructure, security architecture, routing requirements, scalability, and operational responsibilities.

**Choose Routed (NAT) Mode when:**

- You want the MX to act as your primary gateway.
- You need NAT, routing, and firewall functionality in one appliance.
- You have a relatively straightforward network architecture.

**Choose One-Armed VPN Concentrator Mode when:**

- You already have an enterprise firewall.
- Your data center has an established core routing infrastructure.
- You want a dedicated AutoVPN termination point.
- You need to integrate branch routes with existing routing infrastructure.
- You are designing a scalable multi-data-center VPN architecture.

My architectural takeaway:

> For a small or medium-sized environment, Routed Mode offers simplicity. For an enterprise data center with an existing security and routing infrastructure, One-Armed Concentrator Mode generally provides a cleaner integration model.

Ultimately, the best SD-WAN architecture is one that integrates with your existing network rather than unnecessarily complicating it.

---

## 8. Let's Discuss!

If you are designing or managing a Cisco Meraki SD-WAN deployment, I would love to hear about your architecture.

- Are you using Routed Mode or One-Armed Concentrator Mode at your data center?
- Are you integrating your Meraki MX with Palo Alto, Fortinet, or Cisco Secure Firewall?
- Are you using BGP or OSPF for dynamic route advertisement?
- Have you implemented primary and secondary data center VPN hubs?

**Share your deployment architecture and experiences in the comments. Let's learn from real-world network designs!**

---

## 9. Official Cisco Meraki Documentation & Further Reading

The following official documentation is useful for understanding and implementing these architectures.

1. **VPN Concentrator Deployment Guide**

   https://documentation.meraki.com/SASE_and_SD-WAN/MX/Design_and_Configure/Deployment_Guides/VPN_Concentrator_Deployment_Guide

2. **Border Gateway Protocol (BGP)**

   https://documentation.meraki.com/SASE_and_SD-WAN/MX/Design_and_Configure/Configuration_Guides/Networks_and_Routing/Border_Gateway_Protocol_(BGP)

3. **VRRP Failover with BGP on VPN Concentrators**

   https://documentation.meraki.com/SASE_and_SD-WAN/MX/Design_and_Configure/Configuration_Guides/Networks_and_Routing/VRRP_Failover_with_BGP_on_VPN_Concentrators

4. **MX Warm Spare – High Availability Pair**

   https://documentation.meraki.com/SASE_and_SD-WAN/MX/Design_and_Configure/Deployment_Guides/MX_Warm_Spare_-_High_Availability_Pair

5. **MX Routing Behavior**

   https://documentation.meraki.com/SASE_and_SD-WAN/MX/Design_and_Configure/Configuration_Guides/Networks_and_Routing/MX_Routing_Behavior

*Note: Always validate feature availability, firmware requirements, licensing, and model-specific performance specifications against the latest Cisco Meraki documentation before implementing a production design.*

---

**Author:** Sadanand Miskin

**Topics:** Cisco Meraki | AutoVPN | SD-WAN | VPN Concentrator | BGP | OSPF | Data Center Architecture | Network Engineering
