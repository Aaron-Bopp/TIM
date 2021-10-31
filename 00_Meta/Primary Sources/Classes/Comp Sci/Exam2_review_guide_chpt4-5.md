Chapter 4

-   Forwarding vs routing -- forwarding moves packets from input to output port, routing determines the route

-   Routing algorithm -- determine route from source to destination

-   Forwarding table -- determines local forwarding at a router

-   Link-layer switches - Filters and forwards packets between LAN segments

-   Routers

-   Network service models -- services a channel provides ex guaranteed delivery, inorder delivery

-   Virtual-circuit networks...how they work

    -   Virtual circuit -- provides network layer connection service

-   And virtual circuits consist of

    -   Path from source to destination

    -   VC numbers for each link along the path

    -   Entries in forwarding table in router along path

    -   Packets carry VC number instead of dest addr

    -   Signaling protocols setup and maintain VC not used today

-   Setup

-   Datagram networks...how they work

    -   Datagram -- provides network layer connectionless service

    -   No call setup at network layer and no concept of connection

    -   Carry host address

    -   Forwarding table holds address range

-   Prefixes -- beginning of address range

-   Longest prefix matching rule

    -   When looking for destination entry use longest prefix that matches

-   Which type of network is the [[Internet]]? - datagram

-   Parts of a router

    -   Runs routing algos/protos

    -   Forwards datagrams

-   How the input operations of a router work

    -   Physical layer -- bit level reception

    -   Link layer protocol --

    -   Lookup output port from forwarding table, forwarding, queuing if datagrams arrive faster than forwarding rate

-   Switching techniques -- transfer packet from input buffer to output buffer

    -   Memory -- packet copied to memory, switching under CPU control, limited by memory bandwidth

    -   Via bus -- datagram from input to output memory via shared bus, limited by bus bandwidth

    -   Via interconnection network -- overcomes bus bandwidth with crossbar layout

-   Output processing -- bufereing required or packets will be lost due to congestion, scheduling datagrams takes into account who gets best performance

-   Queueing -- when input exceeds output, can result in loss

-   Packet loss...what can cause this within a router?

    -   buffering

-   Packet scheduler

-   The [[Internet]] Protocol

    -   Forwarding

    -   Addressing

-   Datagram format....know what the fields do

    - 

-   Datagram fragmentation...why?

    -   Max transfer size

-   Interface -- connection between host/router, routers have many, host have ethernet and wireless

-   Ip address length -- 32 bits, subnet left end, host right end

-   Dotted-decimal notation

-   Subnets -- detach each inferface from its host/router creating islands of networks

-   Subnet mask - /x

-   CIDR - classless interdomain routing

    -   Subnet portion of address is an arbitray length a.b.c.d/x where x is \# off bits in subnet portion

-   Prefix -- subnet portion

-   Address aggregation -- hard coded or dynamic

-   DHCP -- dynamic host configuration protocol

    -   Know the messaging interaction

    -   Discover, offer, request, ack

-   Plug and play protocol -- allow devices to automatically discover eachother

-   IP address lease time -- how long a device can use a certain ip address

-   NAT routers -- network address transaltion

    -   What do they provide -- security flexability

    -   How does the NAT translation table work -- translate LAN addr to new NAT specific WAN address and stores conversion in table

-   ICMP -- [[internet]] control message protocol, icmp messages carried in ip datagrams

    -   What is it used for -- communicates network level information, rerrors,

-   IPv6

    -   Differences compared to IPv4 -- larger, faster processing, header changes

    -   Addressing size -- 128 bits

    -   Fields in datagram -

-   Dual stack

-   Tunneling -- ip v6 LANs connected to other ipv6 LANs through ipv4 tunnels

-   Default or first-hop router

-   Least cost path

-   Shortest path

-   Static vs dynamic routing algorithms

-   Link-state vs distance vector routing algorithms

    -   All nodes know network, uses link stat broad cast

    -   Nodes know neighbors and neighbors neighbors, estimating fastest route, overtime gets close to best route, updates asynchonously

-   Hierarchical routing -- everybody cant hold everything its too large

    -   Autonomous systems -- all routers in AS use same routing proto

    -   Gateway routers -- link AS's, Intra-as proto computes best path from any router to gateway router

-   Hot-potato routing -- get message to nearest router with a path to the destination

-   BGP -- border gateway protocol

    -   What does it do -- obtains reachability info and propogates it to routers, determines best routes

    -   Generally routing works -- preferences to certains AS's, shortest AS-PATH (fewest AS pass throughs), next hop router (hot potato)

-   Broadcast -- gets packet to all nodes

    -   n-way Unicast -- single source sends packet to single destination

    -   uncontrolled flooding -- send packet to all neighbors except those they received it, causes cyles

    -   controlled flooding -- nodes only send if they haven't seen packet before (uses sequence number)

    -   reverse path forwarding -- checks to see

    -   spanning-tree broadcast -- tree connects all nodes -- nodes sends pack to all descendants and parent

    -   minimum spanning tree

-   Multicast -- single source to subset of nodes

    -   Address indirection -- single ip address for group of nodes, each ndes receives multcast

Chapter 5

-   Nodes

-   Links

-   Link-layer frame -- encapsulates datagram

-   Services provided by the link layer -- encapsulates datagram, MAC address, reliable data transfer

-   NIC -- network interface chip

-   How does the link layer perform error detection and correction?

    -   Errors caused by signal noise, receiver detects and signals for retransmission

-   -understand how parity works

-   -understand 2-d parity

-   what is a checksum? -- detects errors in transmitted packet (transport layer)

-   How do we calculate it? -- addition of segment contents

-   What is a CRC code? -- cyclic redundancy check

    -   Data bits D and redundancy bits R

    -   D \* 2\^R XOR R

-   How is it calculated?

-   Point-to-point protocol (PPP) links -- between ethernet switch and host

-   Broadcast link

-   LAN vs WAN

-   Multiple access problem -- shared broadcast channel

-   Collissions can happen if node receives two or more signals at once

-   Multiple access protocols:

    -   Channel partitioning protocols

        -   TDM/FDM -- time division multiple access/frequency division mu;ti\[le access

    -   Random access protocols -- transmit at full and deal with collisions

    -   Csma carrier sense multiple acess

    -   Taking-turns protocols

        -   Polling protocols -- master node invites slave nodes to transmit

        -   Token passing protocol -- passes token

-   Binary exponential backoff

-   ARP -- address resolution protocol

-   MAC address -- physical addres for network layer

-   MAC broadcast address

-   ARP table -- each node has ip/mac mappings for other nodes, ttl for mappings (20 mins)

-   Ethernet -

-   Ethernet switch (compared to routers) link layer device active role, plug and play, hosts don't acknowledge switches

-   Ethernet frame structure -- sender encapsulates ip datagram in ethernet frame

-   Switches

    -   Filtering -- filter

    -   Forwarding -- knows which host is connected to which interface

    -   Switch table -- mac address and interface

    -   [[Self]]-learning -- learns where hosts are

    -   Plug and play device

-   Figure 5.24 is an excellent example of router vs switch

-   Virtual LANs

-   Link Virtualization

-   Data center networking

    -   Blades

    -   TOR switches

    -   Tier1 and Tier2 switches

    -   Load Balancer -

    -   Access Router

    -   Border Router

-   Read through "A day in the life of a Web Page Request"
